import { z } from "zod"

export const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  birthLastName: z.string().optional(),

  birthDate: z.date().optional(),
  birthPlace: z.string().optional(),

  deathDate: z.date().optional(),
  deathPlace: z.string().optional(),
  causeOfDeath: z.string().optional(),

  isAlive: z.boolean().optional(),

  gender: z.string().optional(),
  nationality: z.string().optional(),
  ethnicity: z.string().optional(),
  religiousAffiliation: z.string().optional(),

  note: z.string().optional(),
})
