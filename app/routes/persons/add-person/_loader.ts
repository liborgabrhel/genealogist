import { prisma } from "~/utils/db.server"

export async function loader() {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      date: true,
    },
  })

  return { events }
}
