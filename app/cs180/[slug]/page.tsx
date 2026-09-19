import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkOut } from "@/components/site-chrome"
import { MediaGrid, Paragraphs } from "@/components/media"
import { CS180Header } from "../header"
import { getProject, projects } from "../projects"

/* One page per project: /cs180/proj0, /cs180/proj1, ... */

type Params = { slug: string }

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
        <div className="w-3/5">
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
                  <div key={part.id ?? i} id={part.id} className="mt-6 scroll-mt-8">
                    <div className="text-lg font-semibold font-newsreader">{part.title}</div>
                    <Paragraphs text={part.description} />
                    <MediaGrid items={part.media} columns={part.columns} />
                  </div>
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
