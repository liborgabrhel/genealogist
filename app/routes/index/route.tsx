// noinspection JSUnusedGlobalSymbols

import { Link } from "react-router"

import { Page } from "~/components/page"

export default function Route() {
  return (
    <Page>
      <Link to={"/persons"}>Persons</Link>
      <Link to={"/photos"}>Photos</Link>
    </Page>
  )
}

export { meta } from "./_meta"
