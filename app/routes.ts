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

  // Add
  route("add", "routes/add/route.tsx"),

  // Tree
  route("tree/:treePersonId", "routes/tree/index/route.tsx", [
    route("detail/:detailPersonId", "routes/tree/detail/route.tsx"),
  ]),

  ...prefix("resources", [
    route("documents/:fileName", "routes/resources/documents/route.ts"),
    route("photos/:photoId", "routes/resources/photos/route.ts"),
  ]),
] satisfies RouteConfig
