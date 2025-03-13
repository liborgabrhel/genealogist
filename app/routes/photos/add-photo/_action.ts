import { parseWithZod } from "@conform-to/zod"
import { createId } from "@paralleldrive/cuid2"
import { data, redirect } from "react-router"

import { prisma } from "~/utils/db.server"
import { getMultipartFormData } from "~/utils/get-multipart-form-data"
import { getStatusCodeFromSubmissionStatus } from "~/utils/get-status-code-from-submission-status"
import { slugify } from "~/utils/slugify"
import { throwDbError } from "~/utils/throw-db-error.server"

import type { Route } from "./+types/route"
import { schema } from "./_schema"

export async function action({ request }: Route.ActionArgs) {
  const formData = await getMultipartFormData(request)

  const submission = await parseWithZod(formData, {
    schema,
    async: true,
  })

  if (submission.status !== "success") {
    return data(
      { submissionResult: submission.reply() },
      { status: getStatusCodeFromSubmissionStatus(submission.status) }
    )
  }

  let wasCreated = false

  try {
    const id = createId()
    const {
      name,
      personsToConnect,
      description,
      file,
      note,
      typeToCreate,
      typeToConnect,
    } = submission.value
    const fileName = `${slugify(name)}-${id}`

    await prisma.photo.create({
      data: {
        id,
        name,
        description,
        altText: description,
        fileName,
        contentType: file.type,
        blob: await file.bytes(),
        note,
        persons: {
          connect: personsToConnect?.map((id) => ({ id })),
        },
        type: {
          ...(typeToConnect && { connect: { id: typeToConnect } }),
          ...(typeToCreate && { create: typeToCreate }),
        },
      },
    })

    wasCreated = true
  } catch (error) {
    throwDbError(error, "Failed to add photo")
  }

  if (wasCreated) {
    throw redirect("/photos")
  }

  return data({ submissionResult: null }, { status: 200 })
}
