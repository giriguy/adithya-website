import type { Project } from "./types"

/* /cs180/proj0 — see types.ts for the authoring guide. */

export const proj0: Project = {
  id: "proj0",
  label: "Project 0",
  title: "Becoming Friends with Your Camera",
  summary: "Shooting the same subject from different distances and focal lengths.",
  description: [
  ],
  parts: [
    {
      id: "selfie",
      title: "Part 1: Selfie: The Wrong Way vs. The Right Way",
      description: [
        "The same face photographed up close and from farther away."
      ],
      columns: 2,
      media: [
        { type: "image", src: "/cs180/1115.jpg", alt: "Selfie taken close to the camera", caption: "Close to the camera — features exaggerated" },
        { type: "image", src: "/cs180/1117.jpg", alt: "Selfie taken farther from the camera", caption: "Farther away — proportions flatten" },
      ],
    },
    {
      id: "architecture",
      title: "Part 2: Architectural Perspective Compression",
      description: [
        "Photo taken farther away zoomed and close up to show that building appears flatter as you zoom out."
      ],
      columns: 2,
      media: [
        { type: "image", src: "/cs180/1130.jpg", caption: "ASUC Building close up"},
        { type: "image", src: "/cs180/1129.jpg", caption: "ASUC Building with zoom" },

        { type: "image", src: "/cs180/1131.jpg", caption: "Wheeler hall close up"},
        { type: "image", src: "/cs180/1132.jpg", caption: "Wheeler hall with zoom"},
      ],
    },
    {
      id: "compression",
      title: "Part 3: Dolly Zoom (Vertigo) Effect",
      description: [
        "The same bottle shot from increasing distances, zooming in each time to keep "
          + "item roughly the same size in frame. As distance grows, the background "
          + "appears to compress toward the subject due to the Field of View decreasing.",
      ],
      columns: 1,
      media: [
        { type: "image", src: "/cs180/compression.gif", alt: "Animation cycling through the bottle photographed at increasing distances", caption: "Cycling through the sequence, closest to furthest — the background compresses toward the bottle", maxHeight: 380 },
      ],
    },
  ],
}
