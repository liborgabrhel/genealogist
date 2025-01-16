import type { LinkDescriptor } from "react-router"

const fontMap = {
  regular: "IBMPlexMono-Regular",
  text: "IBMPlexMono-Text",
  medium: "IBMPlexMono-Medium",
  semibold: "IBMPlexMono-SemiBold",
  bold: "IBMPlexMono-Bold",
}

const createLinkDescriptor = (font: string): LinkDescriptor => ({
  rel: "preload",
  as: "font",
  type: "font/woff2",
  href: `/fonts/${font}.woff2?v=1.1.0`,
  crossOrigin: "anonymous",
})

export const preloadFonts = (...fonts: (keyof typeof fontMap)[]) =>
  fonts.map((font) => createLinkDescriptor(fontMap[font]))
