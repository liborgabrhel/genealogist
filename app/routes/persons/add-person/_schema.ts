import { z } from "zod"

export const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  birthLastName: z.string().optional(),

  isAlive: z.boolean().optional(),

  gender: z.string().optional(),
  nationality: z.string().optional(),
  ethnicity: z.string().optional(),
  religiousAffiliation: z.string().optional(),

  note: z.string().optional(),

  eventsToCreate: z
    .array(
      z.object({
        name: z.string().nonempty(),
        type: z.string().nonempty(),
        date: z.date().optional(),
        place: z.string().optional(),
        note: z.string().optional(),
      })
    )
    .optional(),

  eventsToConnect: z.array(z.string()).optional(),
})
