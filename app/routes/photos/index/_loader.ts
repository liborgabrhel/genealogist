import { prisma } from "~/utils/db.server"

export async function loader() {
  const photos = await prisma.photo.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      name: true,
    },
  })

  return { photos }
}
