/**
 * Seed: inserta 4 mensajes de prueba con usuarios ficticios.
 * Uso: npx tsx prisma/seed-messages.ts
 *
 * Para borrar después: npx tsx prisma/seed-messages.ts --clean
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const TEST_USERS = [
  {
    id: "test_tetonito_rp",
    name: "Tetonito_RP",
    discordId: "999111000000000001",
    discordUsername: "tetonito_rp",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
    isStaff: false,
    isAdmin: false,
  },
  {
    id: "test_dr_kawasaki",
    name: "Dr. Kawasaki",
    discordId: "999111000000000002",
    discordUsername: "drkawasaki",
    image: "https://cdn.discordapp.com/embed/avatars/1.png",
    isStaff: true,  // staff badge
    isAdmin: false,
  },
  {
    id: "test_carmela",
    name: "Carmela Survives",
    discordId: "999111000000000003",
    discordUsername: "carmela.survives",
    image: "https://cdn.discordapp.com/embed/avatars/2.png",
    isStaff: false,
    isAdmin: false,
  },
  {
    id: "test_pve_forever",
    name: "PVE_Forever_88",
    discordId: "999111000000000004",
    discordUsername: "pveforever88",
    image: "https://cdn.discordapp.com/embed/avatars/3.png",
    isStaff: false,
    isAdmin: false,
  },
];

const TEST_MESSAGES = [
  {
    userId: "test_tetonito_rp",
    authorName: "Tetonito_RP",
    avatarIdx: 0,
    content:
      "Cinco años, capo. Cinco años de venir a la isla, perder bases, levantarlas, gritar en Discord, reírme con compañeros que no conocí en la vida real pero que ya son familia. No vine a este server por SCUM. SCUM era la excusa. Vine por ustedes. Gracias por todo.",
    daysAgo: 3,
    isHighlighted: false,
    isHidden: false,
  },
  {
    userId: "test_dr_kawasaki",
    authorName: "Dr. Kawasaki",
    avatarIdx: 1,
    content:
      "Tantas raids, tantos rats robando, tantas bases que me hicieron pelo. Pero cada vez que volví, volví porque sabía que iba a ver gente que ya era familia. TTON me dejó algo más que partidas. Hasta siempre, equipo.",
    daysAgo: 2,
    isHighlighted: true,  // staff pinned
    isHidden: false,
  },
  {
    userId: "test_carmela",
    authorName: "Carmela Survives",
    avatarIdx: 2,
    content:
      "Soy de las que jugaba a las 3 AM con la mamadera en la mano y el bebé dormido al lado. TTON fue mi cordura cuando todo el resto era caos. Que la próxima isla nos encuentre. Gracias J@voc y al equipo entero.",
    daysAgo: 1,
    isHighlighted: false,
    isHidden: false,
  },
  {
    userId: "test_pve_forever",
    authorName: "PVE_Forever_88",
    avatarIdx: 3,
    content:
      "Donde se puede llorar acá. Quería una edición más, una edición chill, una edición sin tanto bardo. Pero entiendo. ¿Alguien sabe de algún server PVE bueno donde la comunidad sea como la de acá? Difícil pedir tanto.",
    daysAgo: 0,
    isHighlighted: false,
    isHidden: false,
  },
];


async function clean() {
  console.log("Cleaning test data...");
  // Delete messages first (FK to user)
  const msgRes = await prisma.message.deleteMany({
    where: { userId: { in: TEST_USERS.map((u) => u.id) } },
  });
  // Delete users
  const userRes = await prisma.user.deleteMany({
    where: { id: { in: TEST_USERS.map((u) => u.id) } },
  });
  console.log(`  Deleted ${msgRes.count} messages and ${userRes.count} users.`);
}


async function seed() {
  console.log("Seeding test users and messages...");

  for (const u of TEST_USERS) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        name: u.name,
        image: u.image,
        discordId: u.discordId,
        discordUsername: u.discordUsername,
        isStaff: u.isStaff,
        isAdmin: u.isAdmin,
      },
      create: u,
    });
    console.log(`  User: ${u.name}`);
  }

  for (const m of TEST_MESSAGES) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - m.daysAgo);
    await prisma.message.create({
      data: {
        userId: m.userId,
        content: m.content,
        authorName: m.authorName,
        authorAvatar: `https://cdn.discordapp.com/embed/avatars/${m.avatarIdx}.png`,
        isHighlighted: m.isHighlighted,
        isHidden: m.isHidden,
        createdAt,
      },
    });
    console.log(`  Message by ${m.authorName} (${m.daysAgo}d ago)`);
  }

  console.log("\nDone. Refresca http://localhost:3000/#mensajes");
}


async function main() {
  if (process.argv.includes("--clean")) {
    await clean();
  } else {
    await seed();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
