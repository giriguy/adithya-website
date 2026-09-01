import type { Metadata } from "next"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkOut, SiteHeader, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Awards | Adithya Giri",
  description: "Awards, scholarships, and honors.",
}

const awards = [
  {
    name: "Regeneron Science Talent Search Scholar",
    href: "https://www.societyforscience.org/regeneron-sts/",
    date: "Jan 2025",
    detail: "Named a Scholar for original research — top 300 in the nation.",
  },
  {
    name: "Regents' and Chancellor's Scholarship",
    href: null,
    date: "2025",
    detail: "UC Berkeley's most prestigious merit scholarship, awarded to the top 1–2% of admitted students.",
  },
  {
    name: "National Merit Scholarship",
    href: null,
    date: "2025",
    detail: null,
  },
  {
    name: "USA Computing Olympiad (USACO), Gold Division",
    href: "https://usaco.org",
    date: "Dec 2023",
    detail: "Advanced to the Gold division of the national competitive programming olympiad.",
  },
  {
    name: "1st Place, AI/ML Track — DataHacks 2026",
    href: null,
    date: "Sept 2025",
    detail: "Won the AI/ML track for Seismo, an earthquake simulation and structural risk pipeline.",
  },
]

export default function Awards() {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/5">
          <SiteHeader />
          <div className="mt-15 mx-5 text-xl font-newsreader">
            <div className="text-2xl font-semibold font-newsreader ml-5">
              Awards
            </div>
            {awards.map((award) => (
              <Card key={award.name} className="-background mt-5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {award.href
                      ? <a href={award.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{award.name}</a>
                      : award.name}
                  </CardTitle>
                  <div className="text-lg font-medium text-muted-foreground">{award.date}</div>
                  {award.detail && (
                    <div className="text-base font-normal font-newsreader mt-2">{award.detail}</div>
                  )}
                </CardHeader>
              </Card>
            ))}
            <div className="mt-8 ml-5 text-lg font-medium text-muted-foreground">
              <LinkOut href="/AdithyaG-Resume.pdf" label="Full resume (PDF)" internal />
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
