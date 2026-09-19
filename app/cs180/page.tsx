import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CS180Header } from "./header"
import { coverOf, projects } from "./projects"

export const metadata: Metadata = {
  title: "CS 180 | Adithya Giri",
  description: "Project portfolio for CS 180: Intro to Computer Vision and Computational Photography.",
}

/* Index of projects. Each project has its own page at /cs180/<id>. */
export default function CS180() {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/5">
          <div className="mt-10 mx-5 text-xl font-newsreader">
            <CS180Header />

            {projects.length === 0 && (
              <div className="ml-5 mt-8 text-base font-normal font-newsreader text-muted-foreground">
                Coursework in progress — projects will be posted here as they are finished.
              </div>
            )}

            {projects.map((project) => {
              const cover = coverOf(project)
              return (
                <Card key={project.id} className="-background mt-5 shadow-2xl">
                  <CardHeader>
                    <Link href={`/cs180/${project.id}`} className="block">
                      <div className="flex items-start gap-4">
                        {cover && (
                          <img
                            src={cover}
                            alt=""
                            className="hidden sm:block w-32 h-24 object-cover rounded-sm shadow-md shrink-0"
                          />
                        )}
                        <div>
                          {project.label && (
                            <div className="text-lg font-medium text-muted-foreground">{project.label}</div>
                          )}
                          <CardTitle className="text-xl underline underline-offset-2">{project.title}</CardTitle>
                          {project.summary && (
                            <div className="text-lg font-medium text-muted-foreground mt-1">{project.summary}</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
