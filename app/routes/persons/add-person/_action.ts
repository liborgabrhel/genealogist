import { parseWithZod } from "@conform-to/zod"
import { data, redirect } from "react-router"

import { prisma } from "~/utils/db.server"
import { getStatusCodeFromSubmissionStatus } from "~/utils/get-status-code-from-submission-status"
import { throwDbError } from "~/utils/throw-db-error.server"

import type { Route } from "./+types/route"
import { schema } from "./_schema"

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

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
    const { eventsToCreate, eventsToConnect, ...rest } = submission.value

    await prisma.person.create({
      data: {
        events: {
          create: eventsToCreate,
          connect: eventsToConnect?.map((id) => ({ id })),
        },
        ...rest,
      },
    })
    wasCreated = true
  } catch (error) {
    throwDbError(error, "Failed to add person")
  }

  if (wasCreated) {
    throw redirect("/persons")
  }

  return data({ submissionResult: null }, { status: 200 })
}
