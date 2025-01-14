import { prisma } from "~/utils/db.server"

import type { Route } from "./+types/route"

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { photoId } = params

  const photo = await prisma.photo.findUniqueOrThrow({
    where: { id: photoId },
    select: { id: true, blob: true, contentType: true },
  })

  return new Response(photo.blob, {
    headers: {
      "Content-Type": photo.contentType,
      "Content-Length": photo.blob.byteLength.toString(),
      "Content-Disposition": `inline; filename="${photo.id}"`,
      "Cache-Control": "public, max-age=31536000, immutable", // 31536000 seconds = 365 days
    },
  })
}
