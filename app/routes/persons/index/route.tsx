// noinspection JSUnusedGlobalSymbols

import { Link } from "react-router"

import { Page } from "~/components/page"
import { PageBody } from "~/components/page-body"
import { PageHeader } from "~/components/page-header"

import type { Route } from "./+types/route"

export default function Route({ loaderData }: Route.ComponentProps) {
  console.log({ loaderData })

  return (
    <Page>
      <PageHeader>
        <h2>Persons</h2>
        <Link to={"/persons/add-person"}>+ Add Person</Link>
      </PageHeader>
      <PageBody>
        {loaderData.length > 0 ? (
          <ul>
            {loaderData.map((person) => (
              <li key={person.id}>
                {person.firstName} {person.lastName}{" "}
                {person.birthDate?.toLocaleDateString("cs-CZ", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p>No persons found</p>
        )}
      </PageBody>
    </Page>
  )
}

export { loader } from "./_loader"
export { meta } from "./_meta"
