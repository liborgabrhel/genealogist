// noinspection JSUnusedGlobalSymbols,HtmlRequiredTitleElement

import type { ReactNode } from "react"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import { AppBody } from "~/components/app-body"
import { AppFooter } from "~/components/app-footer"
import { AppHeader } from "~/components/app-header"
import { preloadFonts } from "~/utils/preload-fonts"

import type { Route } from "./+types/root"
// import stylesheet from "./app.css?url"

import "./styles/global.css"
import "./styles/colors.css"
import "./styles/fonts.css"

export const links: Route.LinksFunction = () => [
  ...preloadFonts("regular", "bold"),
  { rel: "alternate icon", href: "/favicon.ico" },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <AppHeader />
      <AppBody>
        <Outlet />
      </AppBody>
      <AppFooter />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
