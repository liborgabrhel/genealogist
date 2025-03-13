import type { Submission } from "@conform-to/react"

type Status = Submission<unknown>["status"]

export const getStatusCodeFromSubmissionStatus = (status: Status) => {
  if (status === "error") {
    return 400
  } else {
    return 200
  }
}
