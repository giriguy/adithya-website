import Link from "next/link"

/*
 * Shared masthead for /cs180 and the per-project pages. These pages stand alone
 * (no site nav), so the heading carries the attribution.
 */
export function CS180Header({ backToIndex = false }: { backToIndex?: boolean }) {
  return (
    <div className="ml-5">
      {backToIndex && (
        <Link href="/cs180" className="text-base font-normal font-newsreader underline underline-offset-2">
          &larr; All CS 180 projects
        </Link>
      )}
      <div className={`text-3xl font-semibold font-newsreader${backToIndex ? " mt-3" : ""}`}>
        CS 180
      </div>
      <div className="text-base font-normal font-newsreader mt-2 text-muted-foreground">
        Intro to Computer Vision and Computational Photography &middot; UC Berkeley
      </div>
      <div className="text-lg font-medium font-newsreader mt-3">
        Adithya Giri &middot; adithyag (at) berkeley (dot) edu
      </div>
    </div>
  )
}
