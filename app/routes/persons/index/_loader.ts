import { data } from "react-router"

import { prisma } from "~/utils/db.server"

export async function loader() {
  const persons = await prisma.person.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }, { birthDate: "desc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      deathDate: true,
    },
  })

  return data(persons, { status: 200 })
}
