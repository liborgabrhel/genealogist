import { prisma } from "~/utils/db.server"

import type { Route } from "./+types/route"

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { fileName } = params

  const document = await prisma.document.findUniqueOrThrow({
    where: { fileName },
    select: { fileName: true, contentType: true, blob: true },
  })

  return new Response(document.blob, {
    headers: {
      "Content-Type": document.contentType,
      "Content-Length": document.blob.byteLength.toString(),
      "Content-Disposition": `inline; filename="${document.fileName}"`,
      "Cache-Control": "public, max-age=31536000, immutable", // 31536000 seconds = 365 days
    },
  })
}
