import { prisma } from "~/utils/db.server"

export async function loader() {
  const typesPromise = prisma.photoType.findMany({
    orderBy: [{ name: "asc" }],
    select: {
      id: true,
      name: true,
    },
  })

  const personsPromise = prisma.person.findMany({
    orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      events: {
        where: {
          type: { in: ["birth", "death"] },
        },
        select: {
          id: true,
          date: true,
        },
      },
    },
  })

  const [types, persons] = await Promise.all([typesPromise, personsPromise])

  return { types, persons }
}
