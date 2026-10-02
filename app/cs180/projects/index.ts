import type { Project } from "./types"
import { proj0 } from "./proj0"
import { proj1 } from "./proj1"
import { proj2 } from "./proj2"

export type { Media, Part, PartGroup, Placeholder, Project } from "./types"

/*
 * Every project that should appear on /cs180, in the order shown there.
 * Each entry also becomes its own page at /cs180/<id>.
 */
export const projects: Project[] = [proj0, proj1, proj2]

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

/** First image in a project, used as the index-page thumbnail. */
export function coverOf(project: Project): string | undefined {
  if (project.cover) return project.cover
  const all = [...(project.media ?? []), ...(project.parts ?? []).flatMap((part) => part.media ?? [])]
  return all.find((item) => item.type === "image")?.src
}
