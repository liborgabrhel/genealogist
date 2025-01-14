// noinspection JSUnusedGlobalSymbols

import { Link } from "react-router"

export default function Route() {
  return (
    <div>
      <Link to={"/add"}>Add Person</Link>
    </div>
  )
}

export { meta } from "./_meta"
