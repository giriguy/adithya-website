import type { Project } from "./types"

/*
 * /cs180/proj1 — see types.ts for the authoring guide.
 *
 * Every image below has an empty `writeup: []` slot waiting for your notes.
 * An empty array renders nothing, so you can fill them in one at a time.
 * Fill one in like this — each string becomes its own paragraph:
 *
 *   writeup: [
 *     "G: (5, 2) · R: (12, 3)",
 *     "Single-scale search over ±15 pixels was enough at this size.",
 *   ],
 */

export const proj1: Project = {
  id: "proj1",
  label: "Project 1",
  title: "Images of the Russian Empire",
  summary: "Colorizing the Prokudin-Gorskii glass plate negatives.",
  cover: "/cs180/proj1/emir.jpg",
  description: [
    "",
  ],
  parts: [
    // A section for the method write-up, if you want one above the results.
    // Uncomment and fill in — a section with no body renders as a bare heading.
    // {
    //   id: "approach",
    //   title: "Approach",
    //   description: [
    //     "How the search works, what metric it scores with, how the pyramid is built.",
    //   ],
    // },
    {
      id: "small-plates",
      title: "Low-resolution plates (.jpg)",
      description: [
        "These small scans are searched without an image pyramid method. First you crop the image, and include margins of 20 pixels on each side. This is to ensure no padding or anything is needed. When you translate all translations will be in the image. The translation comparison is done between two images and outputs the offset needed for the second image to match the first image. We try positions starting from -20 to 20 on both the row and column, with the formula translated_img = img2[M+i:width-M+i, M+j:height-M+j]. The reference channel is Blue, and the other channels are matched to it, via alignment operations, then the other two channels are offset by their offsets (computed by the alignment function) and then stacked to form the final image.",
      ],
      columns: 3,
      media: [
        {
          type: "image",
          src: "/cs180/proj1/cathedral.jpg",
          alt: "Colorized cathedral plate",
          caption: "cathedral",
          writeup: [""],
        },
        {
          type: "image",
          src: "/cs180/proj1/monastery.jpg",
          alt: "Colorized monastery plate",
          caption: "monastery",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/tobolsk.jpg",
          alt: "Colorized tobolsk plate",
          caption: "tobolsk",
          writeup: [],
        },
      ],
    },
    {
      id: "large-plates",
      title: "High-resolution plates (.tif)",
      description: [
        "The full-resolution scans are far too large for an exhaustive search, so at each level of the image pyramid you find the best fit and then scale the offset up. The recurrence relation is described as follows: best_fit(img1, img2, try_amt, margin) = max image correlation for all i, j in {-try_amt, try_amt}, between ref image and image with offsets [2*best_fit(img1_downsampled, img2_downsampled, try_amt, margin/2)[0] + i, 2*best_fit(img1_downsampled, img2_downsampled, try_amt, margin/2)[0] + j]. More intuitively, this just states the best offset is the best similarity when trying try_amt shifts in the positive and negative direction and staring with and offset of (downsampled_offset times 2). Another important method is the downsampling itself. I use gaussian blurring to downsample properly with a filter size of 7. After intitial tests with this method I found that it didn't work amazingly, since the simlarity function was between the whole image. The red, green and blue might not be as similar as their edges. Hence, I applied a trick of passing the images through an x edge detector, a y edge detector and then taking the sum of their squared magnitude to get a gradient magnitude map over each channel. The similarity of this gradient magnitude map led to much better results with almost all images being near perfectly aligned across channels. ",
      ],
      columns: 2,
      media: [
        {
          type: "image",
          src: "/cs180/proj1/church.jpg",
          alt: "Colorized church plate",
          caption: "church",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/emir.jpg",
          alt: "Colorized emir plate",
          caption: "emir",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/harvesters.jpg",
          alt: "Colorized harvesters plate",
          caption: "harvesters",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/icon.jpg",
          alt: "Colorized icon plate",
          caption: "icon",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/melons.jpg",
          alt: "Colorized melons plate",
          caption: "melons",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/self_portrait.jpg",
          alt: "Colorized self-portrait plate",
          caption: "self_portrait",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/siren.jpg",
          alt: "Colorized siren plate",
          caption: "siren",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/three_generations.jpg",
          alt: "Colorized three generations plate",
          caption: "three_generations",
          writeup: [],
        },
      ],
    },
    {
      id: "extra-plates",
      title: "Additional plates from the collection",
      description: [
        "A few more scans pulled from the Library of Congress Prokudin-Gorskii archive "
          + "and run through the same pipeline.",
      ],
      columns: 2,
      media: [
        {
          type: "image",
          src: "/cs180/proj1/ilemselga.jpg",
          alt: "Colorized ilemselga plate",
          caption: "ilemselga",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/religous_painting.jpg",
          alt: "Colorized religious painting plate",
          caption: "religous_painting",
          writeup: [],
        },
        {
          type: "image",
          src: "/cs180/proj1/wharf.jpg",
          alt: "Colorized wharf plate",
          caption: "wharf",
          writeup: [],
        },
      ],
    },
  ],
}
