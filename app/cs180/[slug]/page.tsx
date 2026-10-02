import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkOut } from "@/components/site-chrome"
import { MediaGrid, Paragraphs } from "@/components/media"
import { CS180Header } from "../header"
import { getProject, projects } from "../projects"
import type { Placeholder } from "../projects"

/* One page per project: /cs180/proj0, /cs180/proj1, ... */

type Params = { slug: string }

function PlaceholderGrid({ items, columns = 2 }: { items?: Placeholder[]; columns?: 1 | 2 | 3 }) {
  if (!items?.length) return null
  const grid = columns === 1 ? "grid-cols-1" : columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"

  return (
    <div className={`grid ${grid} gap-3 mt-4`}>
      {items.map((item, i) => (
        <div
          key={`${item.title}-${i}`}
          className="min-h-36 rounded-md border border-dashed border-muted-foreground/45 bg-white/20 p-4 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {item.kind === "code" ? "Code slot" : item.kind === "writeup" ? "Writeup slot" : "Result slot"}
            </div>
            <div className="mt-2 text-base font-semibold">{item.title}</div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{item.prompt}</p>
        </div>
      ))}
    </div>
  )
}

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "CS 180 | Adithya Giri" }
  const heading = project.label ? `${project.label}: ${project.title}` : project.title
  return {
    title: `${heading} | CS 180 | Adithya Giri`,
    description: project.summary,
  }
}

export default async function CS180Project({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-[min(92vw,1100px)]">
          <div className="mt-10 mx-5 text-xl font-newsreader">
            <CS180Header backToIndex />

            {/* Section list — only worth showing for multi-part projects. */}
            {project.parts && project.parts.length > 1 && (
              <div className="ml-5 mt-6 text-lg">
                <ul className="list-none">
                  {project.parts.map((part, i) => (
                    <li key={part.id ?? i} className="mt-1">
                      {part.id ? (
                        <a href={`#${part.id}`} className="underline underline-offset-2">{part.title}</a>
                      ) : (
                        part.title
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Card id={project.id} className="-background mt-5 shadow-2xl scroll-mt-8">
              <CardHeader>
                {project.label && (
                  <div className="text-lg font-medium text-muted-foreground">{project.label}</div>
                )}
                <CardTitle className="text-xl">{project.title}</CardTitle>
                {project.summary && (
                  <div className="text-lg font-medium text-muted-foreground">{project.summary}</div>
                )}

                <Paragraphs text={project.description} />
                <MediaGrid items={project.media} columns={project.columns} />

                {project.parts?.map((part, i) => (
                  <section key={part.id ?? i} id={part.id} className="mt-10 border-t border-foreground/15 pt-8 scroll-mt-8 first:mt-7 first:border-0 first:pt-0">
                    <h2 className="text-2xl font-semibold font-newsreader">{part.title}</h2>
                    <Paragraphs text={part.description} />
                    <MediaGrid items={part.media} columns={part.columns} />
                    {part.groups?.map((group, groupIndex) => (
                      <section
                        key={group.id ?? groupIndex}
                        id={group.id}
                        className="mt-7 rounded-xl border border-foreground/10 bg-white/20 p-4 sm:p-5 scroll-mt-8"
                      >
                        <h3 className="text-xl font-semibold font-newsreader">{group.title}</h3>
                        <Paragraphs text={group.description} />
                        <MediaGrid items={group.media} columns={group.columns} />
                      </section>
                    ))}
                    <PlaceholderGrid items={part.placeholders} columns={part.placeholderColumns} />
                  </section>
                ))}

                {project.links && project.links.length > 0 && (
                  <div className="text-lg font-medium text-muted-foreground mt-4">
                    {project.links.map((link, i) => (
                      <LinkOut
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        className={i > 0 ? "ml-4" : ""}
                      />
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
