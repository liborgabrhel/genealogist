// noinspection JSUnusedGlobalSymbols

import { Link } from "react-router"

import { Page } from "~/components/page"
import { PageBody } from "~/components/page-body"
import { PageHeader } from "~/components/page-header"

import type { Route } from "./+types/route"

export default function Route({ loaderData }: Route.ComponentProps) {
  const { photos } = loaderData

  return (
    <Page>
      <PageHeader>
        <h2>Photos</h2>
        <Link to={"/photos/add-photo"}>+ Add Photo</Link>
      </PageHeader>
      <PageBody>
        {photos.length > 0 ? (
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>{photo.name}</li>
            ))}
          </ul>
        ) : (
          <p>No photos found</p>
        )}
      </PageBody>
    </Page>
  )
}

export { loader } from "./_loader"
export { meta } from "./_meta"
