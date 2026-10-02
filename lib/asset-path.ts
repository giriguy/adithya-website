/** Prefix public assets when the static site is hosted below a GitHub Pages base path. */
export function assetPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
