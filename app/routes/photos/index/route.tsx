// noinspection JSUnusedGlobalSymbols

import { Link } from "react-router"

import { Page } from "~/components/page"
import { PageHeader } from "~/components/page-header"

export default function Route() {
  return (
    <Page>
      <PageHeader>
        <h2>Photos</h2>
        <Link to={"/photos/add-photo"}>+ Add Photo</Link>
      </PageHeader>
    </Page>
  )
}
