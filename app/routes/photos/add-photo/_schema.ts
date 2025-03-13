import { z } from "zod"

export const schema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),

  typeToConnect: z.string().optional(),
  typeToCreate: z
    .object({
      name: z.string().nonempty(),
    })
    .optional(),

  file: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),

  note: z.string().optional(),

  personsToConnect: z.array(z.string()).optional(),
})
