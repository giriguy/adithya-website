import type { Metadata } from "next"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkOut, SiteHeader, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Work Experience | Adithya Giri",
  description: "Machine learning engineering and research roles.",
}

const roles = [
  {
    org: "Narada AI",
    href: "https://narada.ai",
    title: "Machine Learning Engineering Intern",
    dates: "June 2025 – Present",
    location: "Berkeley, CA",
    bullets: [
      "Used off-policy distillation on local LLMs for 45–50% improved agentic performance.",
      "Utilized GEPA to push our web agent to state-of-the-art performance on WebArena by over 10%.",
      "Created the entire agent evaluation pipeline used to benchmark our web agent's performance.",
    ],
  },
  {
    org: "Berkeley AI Research (BAIR)",
    href: "https://bair.berkeley.edu",
    title: "Machine Learning Research Intern",
    dates: "Nov 2025 – March 2026",
    location: "Berkeley, CA",
    bullets: [
      "Engineered distributed training infrastructure for multi-billion parameter early-fusion models on NVIDIA H200 clusters using PyTorch FSDP and optimized multiprocessing.",
      "Architected multi-million example datasets from raw video data to train and fine-tune world models.",
    ],
  },
  {
    org: "NASA Ames Research Center",
    href: "https://www.nasa.gov/ames",
    title: "Machine Learning Research Intern",
    dates: "May 2024 – Aug 2025",
    location: "Moffett Field, CA",
    bullets: [
      "Implemented efficient pipelines to train ensembled models across multiple cross-validation splits in PyTorch, classifying objects across 100GB+ of stellar light curve data.",
      "Developed robust training infrastructure implementing FGSM and PGD attacks; improved model reliability from 50% to 90% while maintaining zero accuracy regression.",
      "Engineered an adversarial benchmarking suite and integrated robustness evaluation into the ML production pipeline to automate large-scale experiment tracking.",
    ],
  },
]

export default function Experience() {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/5">
          <SiteHeader />
          <div className="mt-15 mx-5 text-xl font-newsreader">
            <div className="text-2xl font-semibold font-newsreader ml-5">
              Work Experience
            </div>
            {roles.map((role) => (
              <Card key={role.org} className="-background mt-5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {role.title}
                  </CardTitle>
                  <div className="text-lg font-medium">
                    <a href={role.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{role.org}</a>
                    <span className="text-muted-foreground"> &middot; {role.location} &middot; {role.dates}</span>
                  </div>
                  <ul className="mt-2 ml-5 list-disc text-base font-normal font-newsreader">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="mt-1">{bullet}</li>
                    ))}
                  </ul>
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
