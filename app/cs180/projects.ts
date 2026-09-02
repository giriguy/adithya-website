/*
 * CS 180 portfolio content.
 *
 * This is the only file you need to edit to add work to /cs180.
 * The page renders whatever is in the `projects` array below, in order.
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
 * ── Layout ──────────────────────────────────────────────────────────────────
 * `columns` controls how media is laid out: 1 (default), 2, or 3 across.
 * Use 2 for before/after comparisons, 3 for filter banks or sweeps.
 *
 * ── Structure ───────────────────────────────────────────────────────────────
 * A project can be flat (just description + media), or split into `parts`
 * for multi-stage assignments. Both are optional — use whichever fits.
 *
 * A fully worked example is at the bottom of this file, commented out.
 */

export type Media = {
  type: "image" | "video"
  src: string
  /** Describes the image for screen readers. Required for images. */
  alt?: string
  /** Shown under the media in small text. */
  caption?: string
  /** Video only: frame shown before playback. */
  poster?: string
  /** Video only: silent looping clip with no controls. */
  autoplay?: boolean
  /** Cap the rendered height in pixels and centre it, instead of filling the column. */
  maxHeight?: number
}

export type Part = {
  /** Anchor id, e.g. "gaussian-stack" -> /cs180#gaussian-stack. Optional. */
  id?: string
  title: string
  /** Each string renders as its own paragraph. */
  description?: string[]
  media?: Media[]
  columns?: 1 | 2 | 3
}

export type Project = {
  /** Anchor id used by the table of contents, e.g. "proj1". */
  id: string
  title: string
  /** e.g. "Project 1" or "September 2026" — shown next to the title. */
  label?: string
  /** One-line summary shown under the title. */
  summary?: string
  /** Each string renders as its own paragraph. */
  description?: string[]
  media?: Media[]
  columns?: 1 | 2 | 3
  links?: { label: string; href: string }[]
  /** Optional sub-sections for multi-stage assignments. */
  parts?: Part[]
}

export const projects: Project[] = [
  {
    id: "proj1",
    label: "Project 1",
    title: "Perspective, Distortion, and Compression",
    summary: "Shooting the same subject from different distances and focal lengths.",
    description: [
      "Photographs taken to show how camera distance changes the apparent shape of a "
        + "subject. Moving closer and zooming out exaggerates depth; backing up and "
        + "zooming in flattens it, even though the subject fills the frame the same way.",
    ],
    parts: [
      {
        id: "selfie",
        title: "Selfie: distance and facial distortion",
        description: [
          "The same face photographed up close and from farther away. Up close, the "
            + "nose and forehead are noticeably enlarged relative to the ears; from a "
            + "distance the proportions flatten out.",
        ],
        columns: 2,
        media: [
          { type: "image", src: "/cs180/1115.jpg", alt: "Selfie taken close to the camera", caption: "Close to the camera — features exaggerated" },
          { type: "image", src: "/cs180/1117.jpg", alt: "Selfie taken farther from the camera", caption: "Farther away — proportions flatten" },
        ],
      },
      {
        id: "compression",
        title: "Perspective compression",
        description: [
          "The same bottle shot from increasing distances, zooming in each time to keep "
            + "it roughly the same size in frame. As distance grows, the background "
            + "appears to compress toward the subject.",
        ],
        columns: 1,
        media: [
          { type: "image", src: "/cs180/compression.gif", alt: "Animation cycling through the bottle photographed at increasing distances", caption: "Cycling through the sequence, closest to furthest — the background compresses toward the bottle", maxHeight: 380 },
        ],
      },
      {
        id: "architecture",
        title: "Architecture at night",
        description: [
          "Campus buildings after dark, shot to play converging vertical lines and "
            + "artificial light against the remaining blue in the sky.",
        ],
        columns: 2,
        media: [
          { type: "image", src: "/cs180/1129.jpg", alt: "Modern campus building at night, viewed from the corner", caption: "Corner view" },
          { type: "image", src: "/cs180/1130.jpg", alt: "The same building from a lower angle", caption: "Lower angle" },
          { type: "image", src: "/cs180/1131.jpg", alt: "Neoclassical campus building lit at dusk", caption: "Dusk" },
          { type: "image", src: "/cs180/1132.jpg", alt: "Campus building with the Campanile behind it", caption: "Campanile behind" },
        ],
      },
    ],
  },
]

/*
 * ── EXAMPLE ─────────────────────────────────────────────────────────────────
 * Copy this into the array above and edit it.
 *
 * {
 *   id: "proj1",
 *   label: "Project 1",
 *   title: "Images of the Russian Empire",
 *   summary: "Aligning the Prokudin-Gorskii glass plate negatives into color images.",
 *   description: [
 *     "Each plate is three separate exposures stacked vertically. I split the scan "
 *       + "into thirds and aligned the red and green channels onto blue.",
 *     "A single-scale search worked for the small .jpg files, but the large .tif "
 *       + "scans needed an image pyramid to stay fast.",
 *   ],
 *   columns: 2,
 *   media: [
 *     { type: "image", src: "/cs180/cathedral-before.jpg", alt: "Unaligned plate", caption: "Naive stack" },
 *     { type: "image", src: "/cs180/cathedral-after.jpg", alt: "Aligned plate", caption: "After alignment" },
 *   ],
 *   links: [
 *     { label: "Code", href: "https://github.com/giriguy/..." },
 *   ],
 *   parts: [
 *     {
 *       id: "pyramid",
 *       title: "Multiscale alignment",
 *       description: ["Recursively halve the image and refine the offset at each level."],
 *       columns: 3,
 *       media: [
 *         { type: "image", src: "/cs180/emir.jpg", alt: "Emir" },
 *         { type: "image", src: "/cs180/harvesters.jpg", alt: "Harvesters" },
 *         { type: "video", src: "/cs180/sweep.mp4", caption: "Offset sweep", autoplay: true },
 *       ],
 *     },
 *   ],
 * },
 */
