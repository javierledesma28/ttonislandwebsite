import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Hard-coded admin Discord ID — owner of the server (J@voc)
// Used to flag isAdmin = true on user creation/login.
const ADMIN_DISCORD_IDS = new Set<string>(["510541406721409025"]);

// Known staff Discord IDs (Xemaxote, Tavo, Martín Lusa). For badges.
const STAFF_DISCORD_IDS = new Set<string>([
  "510541406721409025", // J@voc
  // TODO: add Xemaxote / Tavo / Martín Lusa Discord IDs when known
]);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
      // identify scope is default; explicit for clarity
      authorization: { params: { scope: "identify" } },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.global_name || profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${
                profile.avatar.startsWith("a_") ? "gif" : "png"
              }`
            : null,
          discordId: profile.id,
          discordUsername: profile.username,
          isAdmin: ADMIN_DISCORD_IDS.has(profile.id),
          isStaff: STAFF_DISCORD_IDS.has(profile.id),
        };
      },
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      // Expose our custom fields to the client session
      if (session.user) {
        session.user.id = user.id;
        // @ts-expect-error custom fields from adapter user
        session.user.discordId = user.discordId;
        // @ts-expect-error
        session.user.isStaff = user.isStaff;
        // @ts-expect-error
        session.user.isAdmin = user.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
});
