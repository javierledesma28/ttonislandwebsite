# syntax=docker/dockerfile:1.7

# ─────────────────────────────────────────────
# Stage 1: install deps
# ─────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Prisma necesita libssl en alpine para que el engine binario funcione
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma

# --ignore-scripts saltea el postinstall (prisma generate) que se corre
# explícitamente en el builder stage, donde src/ ya existe.
RUN npm ci --ignore-scripts

# ─────────────────────────────────────────────
# Stage 2: build the Next.js app
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables públicas del cliente se inyectan en build-time
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Generar el Prisma client para Alpine (linux-musl) ANTES de buildear
RUN npx prisma generate

RUN npm run build

# ─────────────────────────────────────────────
# Stage 3: minimal runtime image
# ─────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache openssl

# Crear usuario sin privilegios para correr el proceso Node
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Output standalone trae solo lo necesario (server.js + minimal node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Prisma client generado + schema (Standalone NO los copia automáticamente)
COPY --from=builder --chown=nextjs:nodejs /app/src/generated/prisma ./src/generated/prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Directorio para la DB SQLite — se monta volume aquí
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
