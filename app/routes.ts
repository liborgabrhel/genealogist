// noinspection JSUnusedGlobalSymbols

import {
  index,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  // Initial
  index("routes/index/route.tsx"),

  // Tree
  route("tree/:treePersonId", "routes/tree/index/route.tsx", [
    route("detail/:detailPersonId", "routes/tree/detail/route.tsx"),
  ]),

  // Persons
  ...prefix("persons", [
    index("routes/persons/index/route.tsx"),
    route("add-person", "routes/persons/add-person/route.tsx"),
    route("edit-person/:personId", "routes/persons/edit-person/route.tsx"),
  ]),

  // Photos
  ...prefix("photos", [
    index("routes/photos/index/route.tsx"),
    route("add-photo", "routes/photos/add-photo/route.tsx"),
    route("edit-photo/:photoId", "routes/photos/edit-photo/route.tsx"),
  ]),

  ...prefix("resources", [
    route("documents/:fileName", "routes/resources/documents/route.ts"),
    route("photos/:photoId", "routes/resources/photos/route.ts"),
  ]),
] satisfies RouteConfig
