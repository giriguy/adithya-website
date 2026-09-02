import type { Media } from "@/app/cs180/projects"

/* Renders the media described in app/cs180/projects.ts. */

const gridCols: Record<number, string> = {
  // Spelled out so Tailwind's scanner sees the full class names.
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
}

function MediaFigure({ item }: { item: Media }) {
  // With maxHeight set, the media is capped and centred instead of filling the column.
  const fit = item.maxHeight
    ? "max-w-full object-contain rounded-sm shadow-md mx-auto"
    : "w-full object-cover rounded-sm shadow-md"
  const style = item.maxHeight ? { maxHeight: `${item.maxHeight}px` } : undefined
  return (
    <figure className="m-0">
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className={fit}
          style={style}
        />
      ) : (
        <video
          src={item.src}
          poster={item.poster}
          className={fit}
          style={style}
          controls={!item.autoplay}
          autoPlay={item.autoplay}
          muted={item.autoplay}
          loop={item.autoplay}
          playsInline={item.autoplay}
        />
      )}
      {item.caption && (
        <figcaption className="mt-1 text-base font-normal text-muted-foreground">
          {item.caption}
        </figcaption>
      )}
    </figure>
  )
}

export function MediaGrid({ items, columns = 1 }: { items?: Media[]; columns?: 1 | 2 | 3 }) {
  if (!items || items.length === 0) return null
  return (
    <div className={`grid gap-4 mt-3 ${gridCols[columns]}`}>
      {/* Index key: the same file may legitimately appear twice in one grid. */}
      {items.map((item, i) => (
        <MediaFigure key={i} item={item} />
      ))}
    </div>
  )
}

export function Paragraphs({ text }: { text?: string[] }) {
  if (!text || text.length === 0) return null
  return (
    <div className="text-base font-normal font-newsreader mt-2">
      {text.map((paragraph, i) => (
        <p key={i} className={i > 0 ? "mt-2" : ""}>{paragraph}</p>
      ))}
    </div>
  )
}
