import type { Media, Part, Project } from "./types"
const output = (file: string, caption: string, alt = caption): Media => ({
  type: "image",
  src: `/cs180/proj2/output/${file}`,
  alt,
  caption,
})

const input = (file: string, caption: string, alt = caption): Media => ({
  type: "image",
  src: `/cs180/proj2/inputs/${file}`,
  alt,
  caption,
})

const parts: Part[] = [
  {
    id: "part-1-1",
    title: "Part 1.1: Convolutions from Scratch",
    description: [
      "I implemented 2D convolution from scratch using only NumPy. My first version uses four nested loops: two choose an output location, and two accumulate the products between the image and the flipped filter. In my second version, I kept the two loops over output locations but replaced the inner loops with an elementwise multiplication between the filter and an image window, followed by np.sum. I explicitly flipped the filter along both axes before applying the two-loop version.",
      "I supported same, full, and unpadded convolution. For same convolution, I zero-padded the image by half the filter width so the output retained the input dimensions. Full convolution used wider padding so the filter could partially overlap every edge position, while the unpadded version kept only locations where the entire filter fit inside the image. Zero padding caused the dark border visible near the edges of the smoothed image because pixels outside the image were treated as zero.",
      "I tested both custom implementations by applying a normalized 5 by 5 box filter to my grayscale portrait. The four-loop version was slowest because it performed every operation in Python, while the two-loop version was faster because NumPy handled each window at once. I also ran scipy.signal.convolve2d in same mode on the same portrait, allowing a direct pixel-for-pixel comparison with the two custom outputs.",
    ],
    groups: [
      {
        title: "5 × 5 box-filter results",
        description: ["All three implementations use the same portrait and normalized box filter."],
        columns: 2,
        media: [
          output("part1_1_original.png", "Original grayscale portrait"),
          output("part1_1_box_4_loops.png", "Four-loop convolution"),
          output("part1_1_box_2_loops.png", "Two-loop vectorized convolution"),
          output("part1_1_box_scipy.png", "SciPy reference convolution"),
        ],
      },
    ],
  },
  {
    id: "part-1-2",
    title: "Part 1.2:  Finite Difference Operator",
    description: [
      "I computed the horizontal and vertical derivatives of the cameraman image using 3 by 3 finite-difference filters. My x filter placed [-1, 0, 1] across each row, while my y filter placed rows of -1, 0, and 1. I convolved each filter with the image using scipy.signal.convolve2d in same mode, then combined the responses as √(Dx² + Dy²) to obtain the gradient magnitude.",
      "I converted the gradient magnitude into a binary edge image with a threshold of 0.9. This selective threshold suppresses weak intensity changes and much of the grass texture while preserving the strongest outlines of the cameraman, camera, and tripod. A lower threshold retains more fine detail but introduces more clutter; a higher threshold produces a cleaner result at the cost of weaker edges.",
    ],
    groups: [
      {
        title: "Directional derivatives",
        description: ["The x response highlights vertical intensity changes; the y response highlights horizontal changes."],
        columns: 3,
        media: [
          output("part1_2_cameraman.png", "Cameraman input"),
          output("part1_2_dx.png", "Partial derivative ∂I/∂x"),
          output("part1_2_dy.png", "Partial derivative ∂I/∂y"),
        ],
      },
      {
        title: "Gradient magnitude and edge map",
        description: ["I combined both directional responses, then thresholded the magnitude at 0.9."],
        columns: 2,
        media: [
          output("part1_2_gradient.png", "Gradient magnitude √(Dx² + Dy²)"),
          output("part1_2_edges.png", "Binarized edge image, threshold 0.9"),
        ],
      },
    ],
  },
  {
    id: "part-1-3",
    title: "Part 1.3: Derivative of Gaussian (DoG) Filters",
    description: [
      "I reduced the noise in the finite-difference result by smoothing the cameraman image before differentiating it. I constructed a normalized 3 × 3 Gaussian kernel directly from the two-dimensional Gaussian equation, using σ = 3/6 = 0.5, and convolved it with symmetric boundary handling. I then applied the same x and y derivative filters to the blurred image and recomputed the gradient magnitude.",
      "The Gaussian removed small, rapid intensity changes before differentiation, so the gradient response is smoother and less sensitive to texture than the result from Part 1.2. In the current pipeline, I pass this gradient-magnitude image into my binarize_grad_mag helper. That helper differentiates its input once more and applies its default threshold of 0.9, producing the displayed binary response.",
    ],
    groups: [
      {
        title: "Smoothing before differentiation",
        description: ["The three panels show the complete pipeline from Gaussian smoothing to the final thresholded response."],
        columns: 3,
        media: [
          output("part1_3_blurred.png", "Gaussian-smoothed cameraman"),
          output("part1_3_gradient.png", "Gradient magnitude after smoothing"),
          output("part1_3_edges.png", "Binarized response, threshold 0.9"),
        ],
      },
    ],
  },
  {
    id: "part-2-1",
    title: "Part 2.1: Image Sharpening",
    description: [
      "I implemented unsharp masking by subtracting a Gaussian blur filter from an identity filter. I used an odd filter size so the identity kernel could place a single 1 at its center and 0s everywhere else. I applied the resulting high-pass filter to the Taj Mahal and a color bonsai photograph, added the extracted detail back to each original, and clipped the displayed results to the valid intensity range.",
      "For each example, I also blurred the input and attempted to sharpen it again. In the recovery step, I add twice the extracted high-frequency residual to emphasize the remaining edges. The Taj recovery uses a 4-pixel unsharp scale after a 5-pixel Gaussian blur. The bonsai recovery applies a second 5-pixel blur before adding a 2× residual at the same scale. Both recovered versions have stronger local contrast, but neither can recreate detail removed by the earlier low-pass filtering.",
    ],
    groups: [
      {
        title: "Taj Mahal",
        description: ["The first comparison shows direct sharpening; the second tests how much detail can be recovered after Gaussian blur."],
        columns: 2,
        media: [
          input("taj.jpg", "Original"),
          output("part2_1_sharpened.png", "Sharpened with an unsharp mask"),
          output("part2_1_blurred.png", "Gaussian-blurred"),
          output("part2_1_recovered.png", "Sharpened after blurring"),
        ],
      },
      {
        title: "Bonsai",
        description: ["Repeating the experiment in color makes the boosted texture and the limits of reconstruction easier to compare."],
        columns: 2,
        media: [
          output("part2_1_original_extra.png", "Original"),
          output("part2_1_sharpened_extra.png", "Sharpened with an unsharp mask"),
          output("part2_1_blurred_extra.png", "Gaussian-blurred"),
          output("part2_1_recovered_extra.png", "Sharpened after blurring"),
        ],
      },
    ],
  },
  {
    id: "part-2-2",
    title: "Part 2.2: Hybrid Images",
    description: [
      "I created a grayscale hybrid image from Derek and Nutmeg. I aligned Nutmeg to Derek with an affine transformation computed from three corresponding landmarks around the eyes and nose. This alignment placed the main facial features in similar locations so that the two frequency components formed a reasonable combined image.",
      "I extracted Derek's low-frequency component with a 25 × 25 low-pass filter and Nutmeg's high-frequency component with a 21 × 21 unsharp filter. I combined them as 0.75 × Derek-low + 1.25 × Nutmeg-high, favoring Nutmeg's detail slightly because the high-frequency component had a lower magnitude.",
      "I also computed the centered log-magnitude Fourier transform of both inputs, both filtered components, and the final hybrid. The low-pass spectrum is concentrated near the center, while the high-pass spectrum suppresses the center and retains energy farther from the origin. The hybrid spectrum contains both patterns, matching the two viewing-distance interpretations.",
      "When I warped Nutmeg into Derek's coordinate system, I filled uncovered pixels with the median intensity sampled from Nutmeg's border. This avoids the repeated structures produced by reflected padding and gives the high-pass filter a more neutral boundary.",
      "For a second example, I aligned the happy Mr. Incredible image to the sad version with an affine transformation based on three facial landmarks. I retained the sad face at low frequencies with a 31 × 31 Gaussian filter and the happy face at high frequencies with a 21 × 21 unsharp filter, weighting the high-frequency component by 1.2.",
    ],
    groups: [
      {
        title: "Derek + Nutmeg",
        description: ["Derek supplies the low frequencies and the aligned Nutmeg image supplies the high frequencies."],
        columns: 3,
        media: [
          input("DerekPicture.jpg", "Derek: low-frequency input"),
          input("nutmeg.jpg", "Nutmeg: high-frequency input"),
          output("part2_2_hybrid.png", "Final hybrid image"),
        ],
      },
      {
        title: "Frequency analysis",
        description: ["Log-magnitude Fourier spectra show how the filters redistribute energy before the final combination."],
        columns: 3,
        media: [
          output("part2_2_fft_image_1.png", "Derek input spectrum"),
          output("part2_2_fft_image_2.png", "Nutmeg input spectrum"),
          output("part2_2_fft_low_image.png", "Low-pass Derek spectrum"),
          output("part2_2_fft_high_image.png", "High-pass Nutmeg spectrum"),
          output("part2_2_fft_hybrid.png", "Final hybrid spectrum"),
        ],
      },
      {
        title: "Mr. Incredible expression change",
        description: ["The sad expression supplies the low frequencies while the aligned happy expression supplies the high-frequency detail."],
        columns: 3,
        media: [
          input("mr_incredible_sad.png", "Sad expression: low-frequency input"),
          input("mr_incredible_happy.png", "Happy expression: high-frequency input"),
          output("part2_2_incredible_hybrid.png", "Expression hybrid"),
        ],
      },
    ],
  },
  {
    id: "part-2-3",
    title: "Part 2.3: Gaussian and Laplacian Stacks",
    description: [
      "I built six-level Gaussian and Laplacian stacks without downsampling, so every level retained the apple's original dimensions. The Gaussian stack begins with the original image and then applies progressively wider filters: 15, 29, 57, 113, and 225 pixels. I kept every kernel size odd so each filter remained centered on a single pixel.",
      "I formed each Laplacian level by subtracting adjacent Gaussian levels, with the final Gaussian level stored as the low-frequency residual. Adding the Laplacian bands and the residual reconstructs the original image.",
    ],
    groups: [
      {
        title: "Gaussian stack",
        description: ["Each level increases the blur scale without downsampling, progressing from the original image to its coarsest structure."],
        columns: 3,
        media: Array.from({ length: 6 }, (_, level) => output(`part2_3_gaussian_${level}.png`, `Gaussian level ${level}`)),
      },
      {
        title: "Laplacian stack",
        description: ["The first five levels isolate frequency bands; the final level stores the low-frequency residual."],
        columns: 3,
        media: Array.from({ length: 6 }, (_, level) => output(`part2_3_laplacian_${level}.png`, `Laplacian level ${level}`)),
      },
    ],
  },
  {
    id: "part-2-4",
    title: "Part 2.4: Multiresolution Blending",
    description: [
      "I implemented multiresolution blending by constructing six-level Laplacian stacks for two source images and a six-level Gaussian stack for their mask. At each frequency level, I multiplied the first Laplacian band by the softened mask and the second band by its complement, added the two masked bands, and reconstructed the final image by summing the blended stack. I used broader smoothing for lower frequencies and narrower smoothing for higher frequencies so the seam remained visually consistent across scales.",
      "For the oraple, I used a vertical half-image mask to combine the apple on the left with the orange on the right. For a second straight-seam example, I combined Jacques-Louis David's painting of Marat with a modern bathtub. I cropped Marat vertically, translated the painting 115 pixels right and 10 pixels down to align his head and torso with the tub, cropped 115 pixels from the left of both images, and then applied the same six-level blend with a vertical mask.",
      "For my irregular-mask result, I aligned my face to Andrew Garfield's face using an affine transformation based on corresponding eye and nose landmarks. I drew a polygonal face mask, matched the aligned face's per-channel mean and standard deviation to Andrew's lighting, and blended the images with six Laplacian levels and a 21-pixel base filter.",
    ],
    groups: [
      {
        title: "The Oraple",
        description: ["A vertical mask selects the apple on the left and the orange on the right; smoothing the mask at every scale removes the hard center seam."],
        columns: 2,
        media: [
          input("apple.jpeg", "Apple input"),
          input("orange.jpeg", "Orange input"),
          output("part2_4_mask.png", "Vertical half-image mask"),
          output("part2_4_oraple.png", "Final multiresolution oraple"),
        ],
      },
      {
        title: "Marat + bathtub",
        description: ["After aligning and cropping the two inputs, I used a vertical mask so the historical figure transitions smoothly into the modern bathtub."],
        columns: 3,
        media: [
          input("marat.png", "Marat painting input"),
          input("bathtub.png", "Bathtub input"),
          output("part2_4_marat_bathtub_blend.png", "Final Marat + bathtub blend"),
        ],
      },
      {
        title: "Irregular mask: face blend",
        description: ["This example combines affine alignment, color matching, a custom polygon mask, and multiresolution blending."],
        columns: 2,
        media: [
          input("my_face.png", "Source face"),
          input("andrew_garfield.png", "Target portrait"),
          output("part2_4_face_mask.png", "Irregular polygon mask"),
          output("part2_4_face_blend.png", "Final face blend"),
        ],
      },
      {
        title: "How the blend is assembled",
        description: ["The visualization places the masked contribution from each image beside their combined band at every Laplacian level."],
        columns: 1,
        media: [
          { ...output("part2_4_blending_stack.png", "Masked Laplacian blending stack", "Visualization of the masked Laplacian stack used for multiresolution blending"), maxHeight: 1050 },
        ],
      },
    ],
  },
]

export const proj2: Project = {
  id: "proj2",
  label: "Project 2",
  title: "Fun with Filters and Frequencies!",
  summary: "Convolutions, image frequencies, hybrid images, and multiresolution blending.",
  description: [
    "For this project, I implemented spatial convolution, finite-difference edge detection, Gaussian smoothing, unsharp masking, hybrid images, Gaussian and Laplacian stacks, and multiresolution blending. The results below show how filtering in different frequency bands can be used to detect structure, enhance detail, combine images across viewing distances, and create smooth seams.",
  ],
  cover: "/cs180/proj2/output/part2_4_oraple.png",
  parts,
}
