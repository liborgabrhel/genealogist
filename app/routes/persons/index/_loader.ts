import { data } from "react-router"

import { prisma } from "~/utils/db.server"

export async function loader() {
  const persons = await prisma.person.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  })

  return data(persons, { status: 200 })
}
