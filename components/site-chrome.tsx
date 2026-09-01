import Link from "next/link"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { ChevronRight } from "lucide-react"

/* Shared page chrome so the home, experience, and awards pages stay visually identical. */

/* `internal` routes through next/link so the GitHub Pages basePath gets prefixed. */
export function LinkOut({ href, label, className = "", internal = false }: { href: string; label: string; className?: string; internal?: boolean }) {
  const Tag = internal ? Link : "a"
  return (
    <Tag
      className={`inline-flex items-center text-lg leading-tight ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <ChevronRight className="h-5 w-5 align-middle relative top-[-1.5px] stroke-[3] stroke-linecap-round" />
    </Tag>
  )
}

export function SiteHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-3 mr-5 mt-5">
      <div className="ml-5 mt-5">
        <Link href="/" className="ml-5 align-middle font-newsreader font-medium text-3xl whitespace-nowrap">Adithya Giri</Link>
        <br/>
        <span className="ml-5 align-middle font-newsreader text-xl whitespace-nowrap">adithyag (at) berkeley (dot) edu</span>
      </div>
      <NavigationMenu className="flex justify-end text-lg font-newsreader">
        <NavigationMenuList className="flex-wrap justify-end gap-y-1">
          <Link href="/" className="mr-5">About</Link>
          <Link href="/#projects" className="mr-5">Projects</Link>
          <Link href="/experience" className="mr-5">Experience</Link>
          <Link href="/awards" className="mr-5">Awards</Link>
          <a href="https://github.com/giriguy" target="_blank" rel="noopener noreferrer" className="mr-5">Github</a>
          <a href="https://www.linkedin.com/in/adithya-giri" target="_blank" rel="noopener noreferrer" className="mr-5">LinkedIn</a>
          <Link href="/AdithyaG-Resume.pdf" target="_blank" rel="noopener noreferrer" className="mr-5">Resume</Link>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export function SiteFooter() {
  return (
    <div className="flex justify-center m-5">
      <p className="text-normal font-newsreader">&#169; {new Date().getFullYear()} Adithya Giri. All Rights Reserved</p>
    </div>
  )
}
