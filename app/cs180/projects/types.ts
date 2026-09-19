/*
 * CS 180 content types.
 *
 * Each project lives in its own file in this folder and gets its own page:
 *
 *     app/cs180/projects/proj1.ts   ->   /cs180/proj1
 *
 * To add a project: copy an existing file, edit it, then list it in index.ts.
 *
 * ── Adding media ────────────────────────────────────────────────────────────
 * Drop files into  public/cs180/  and reference them with a leading slash:
 *
 *     public/cs180/cathedral.jpg   ->   src: "/cs180/cathedral.jpg"
 *     public/cs180/morph.mp4       ->   src: "/cs180/morph.mp4"
 *
 * Images:  { type: "image", src: "/cs180/foo.jpg", alt: "...", caption: "..." }
 * Videos:  { type: "video", src: "/cs180/foo.mp4", caption: "..." }
 *
 * Video options:
 *   poster: "/cs180/thumb.jpg"  — frame shown before playback
 *   autoplay: true             — silent looping clip (no controls), good for
 *                                short animations like morphs or sweeps
 *
 * ── Writing about a single image ────────────────────────────────────────────
 * `caption` is the one-line label under the media. `writeup` is for anything
 * longer — offsets, what went wrong, what you tried. Each string is its own
 * paragraph, and an empty array renders nothing, so a `writeup: []` slot can
 * sit there until you fill it in:
 *
 *     {
 *       type: "image",
 *       src: "/cs180/proj1/emir.jpg",
 *       alt: "Colorized emir plate",
 *       caption: "emir",
 *       writeup: [
 *         "G: (49, 24) · R: (107, 40)",
 *         "The robe is bright in blue and dark in red, so raw intensity matching "
 *           + "fails here; matching on gradients instead fixes the seam.",
 *       ],
 *     }
 *
 * Images with a writeup read better one or two across than three.
 *
 * ── Layout ──────────────────────────────────────────────────────────────────
 * `columns` controls how media is laid out: 1 (default), 2, or 3 across.
 * Use 2 for before/after comparisons, 3 for filter banks or sweeps.
 *
 * ── Structure ───────────────────────────────────────────────────────────────
 * A project can be flat (just description + media), or split into `parts`
 * for multi-stage assignments. Both are optional — use whichever fits.
 */

export type Media = {
  type: "image" | "video"
  src: string
  /** Describes the image for screen readers. Required for images. */
  alt?: string
  /** One-line label shown under the media in small text. */
  caption?: string
  /** Longer per-image notes, one paragraph per string. Empty array renders nothing. */
  writeup?: string[]
  /** Video only: frame shown before playback. */
  poster?: string
  /** Video only: silent looping clip with no controls. */
  autoplay?: boolean
  /** Cap the rendered height in pixels and centre it, instead of filling the column. */
  maxHeight?: number
}

export type Part = {
  /** Anchor id, e.g. "gaussian-stack" -> /cs180/proj2#gaussian-stack. Optional. */
  id?: string
  title: string
  /** Each string renders as its own paragraph. */
  description?: string[]
  media?: Media[]
  columns?: 1 | 2 | 3
}

export type Project = {
  /** URL slug and anchor id, e.g. "proj1" -> /cs180/proj1. */
  id: string
  title: string
  /** e.g. "Project 1" or "September 2026" — shown next to the title. */
  label?: string
  /** One-line summary shown under the title and on the index page. */
  summary?: string
  /** Each string renders as its own paragraph. */
  description?: string[]
  media?: Media[]
  columns?: 1 | 2 | 3
  links?: { label: string; href: string }[]
  /** Optional sub-sections for multi-stage assignments. */
  parts?: Part[]
  /** Thumbnail for the index page. Falls back to the first image in the project. */
  cover?: string
}
