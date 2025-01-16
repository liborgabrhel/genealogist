import type { LinkDescriptor } from "react-router"

const fontMap = {
  regular: "IBMPlexMono-Regular",
  bold: "IBMPlexMono-Bold",
}

const createLinkDescriptor = (font: string): LinkDescriptor => ({
  rel: "preload",
  as: "font",
  type: "font/woff2",
  href: `/fonts/woff2/${font}.woff2`,
  crossOrigin: "anonymous",
})

export const preloadFonts = (...fonts: (keyof typeof fontMap)[]) =>
  fonts.map((font) => createLinkDescriptor(fontMap[font]))
