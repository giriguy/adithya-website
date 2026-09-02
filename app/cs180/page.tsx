import type { Metadata } from "next"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkOut } from "@/components/site-chrome"
import { MediaGrid, Paragraphs } from "@/components/media"
import { projects } from "./projects"

export const metadata: Metadata = {
  title: "CS 180 | Adithya Giri",
  description: "Project portfolio for CS 180: Intro to Computer Vision and Computational Photography.",
}

export default function CS180() {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/5">
          <div className="mt-10 mx-5 text-xl font-newsreader">
            {/* Standalone page: no site nav, so the heading carries the attribution. */}
            <div className="ml-5">
              <div className="text-3xl font-semibold font-newsreader">
                CS 180
              </div>
              <div className="text-base font-normal font-newsreader mt-2 text-muted-foreground">
                Intro to Computer Vision and Computational Photography &middot; UC Berkeley
              </div>
              <div className="text-lg font-medium font-newsreader mt-3">
                Adithya Giri &middot; adithyag (at) berkeley (dot) edu
              </div>
            </div>

            {/* Table of contents — only worth showing once there are a few projects. */}
            {projects.length > 1 && (
              <div className="ml-5 mt-6 text-lg">
                <ul className="list-none">
                  {projects.map((project) => (
                    <li key={project.id} className="mt-1">
                      <a href={`#${project.id}`} className="underline underline-offset-2">
                        {project.label ? `${project.label}: ${project.title}` : project.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {projects.length === 0 && (
              <div className="ml-5 mt-8 text-base font-normal font-newsreader text-muted-foreground">
                Coursework in progress — projects will be posted here as they are finished.
              </div>
            )}

            {projects.map((project) => (
              <Card key={project.id} id={project.id} className="-background mt-5 shadow-2xl scroll-mt-8">
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
                    <div key={i} id={part.id} className="mt-6 scroll-mt-8">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
