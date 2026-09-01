import { Card, CardHeader, CardTitle} from "@/components/ui/card"
import * as motion from "motion/react-client"
import Link from "next/link"
import { LinkOut, SiteHeader, SiteFooter } from "@/components/site-chrome"

export default function Home() {
  const text = ["\t I'm an EECS student at UC Berkeley working on making large models faster and more data efficient — attention mechanisms, mixture-of-experts routing, and agentic systems.", "I love playing basketball and hiking when I'm not breaking my computer training large, cool and new models."]
  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/5">
          <SiteHeader />
          <div className="flex justify-center items-start mt-5">
            <div id="about" className="mt-15 ml-5 text-xl font-newsreader w-1/2 mr-5 scroll-mt-8">
              {text[0].split("").map((char, i) => (
                <motion.div key = {i} custom={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.015*i}}
                  className="inline"
                >{char}</motion.div>
              ))}
              <br/>
              <br/>
                {text[1].split("").map((char, i) => (
                <motion.div key = {i} custom={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.015*i + 0.015*text[0].length}}
                  className="inline"
                >{char}</motion.div>
              ))}
              <br/>
              <br/>
              <div className="text-2xl font-semibold font-newsreader">
                    Publications
                    <Card className="-background mt-5 shadow-2xl">
                      <CardHeader>
                        <CardTitle>IBiT: Utilizing Inductive Biases to Create a More Data Efficient Attention Mechanism</CardTitle>
                        <img src="AttentionHeads.png" alt="Visualization of attention head activations from the IBiT paper" className="h-full object-cover object-bottom rounded-sm"/>
                        <div className="text-base font-normal font-newsreader mt-2">
                          A low-rank matrix factorization mechanism that injects inductive biases into Vision
                          Transformers, achieving +2% ImageNet accuracy over prior state-of-the-art models. Also
                          introduces an interpretable framework for attention heads that reduces reliance on
                          positional encodings and improves out-of-distribution generalization.
                        </div>
                        <div className="text-lg font-medium text-muted-foreground">
                          <LinkOut href="https://github.com/giriguy/ConvFormer" label="Github" />
                          <LinkOut href="https://arxiv.org/abs/2509.22719" label="Preprint" className="ml-4" />
                        </div>
                      </CardHeader>
                    </Card>
              </div>
              <br/>
              <div id="projects" className="text-2xl font-semibold font-newsreader scroll-mt-8">
                    Projects
                    <Card className="-background mt-5 shadow-2xl">
                      <CardHeader>
                        <CardTitle>Seismo &mdash; 1st Place, AI/ML Track at DataHacks 2026</CardTitle>
                        <div className="text-base font-normal font-newsreader mt-2">
                          A multi-model pipeline that uses historical earthquake data to simulate earthquakes in
                          Southern California, predict future collapse risk, and improve building structure through
                          reinforcement learning. Built with PyTorch and FastAPI.
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="-background mt-5 shadow-2xl">
                      <CardHeader>
                        <CardTitle>MoEPath: Multi-Token Expert Prediction</CardTitle>
                        <div className="text-base font-normal font-newsreader mt-2">
                          Ongoing research reducing mixture-of-experts VRAM requirements by up to 90% through
                          pre-gating expert prediction, increased shared experts, and efficient offloading of routed
                          experts to disk.
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="-background mt-5 shadow-2xl">
                      <CardHeader>
                        <CardTitle>Using Adversarial Training to Create More Robust Planetary Classification using Flux</CardTitle>
                        <img src="AdversarialExample.png" alt="Example of an adversarial perturbation applied to stellar light curve data" className="h-full object-cover object-bottom rounded-sm"/>
                        <div className="text-base font-normal font-newsreader mt-2">
                          Adversarial training with FGSM and PGD attacks on stellar light curve classifiers,
                          improving model reliability from 50% to 90% with zero accuracy regression.
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="-background mt-5 shadow-2xl">
                      <CardHeader>
                        <CardTitle>Carnatic Music Classification Using Transformers</CardTitle>
                        <div className="text-lg font-medium text-muted-foreground">
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
              </div>
              <div className="mt-5 ml-10 text-xl font-newsreader w-1/2 mr-5">
              <img src="AdithyaImg.jpg" alt="Adithya Giri" className="h-1/2 w-full object-cover object-bottom rounded-sm shadow-2xl"/>
              <div className="mt-10 ml-3">
                  <div className="text-2xl font-semibold font-newsreader">
                    Education
                  </div>
                  <ul className=" ml-5 list-none">
                    <li>
                      University of California, Berkeley (2025-2028)
                      <ul className="ml-5 list-none">
                        <li>
                          B.S Electrical Engineering and Computer Science
                        </li>
                        <li className="text-lg text-muted-foreground">
                          Regents&rsquo; and Chancellor&rsquo;s Scholar (top 1&ndash;2% of admitted students)
                        </li>
                        <li className="text-lg text-muted-foreground">
                          Coursework: Efficient Algorithms (CS 170), Data Structures (CS 61B), C and Assembly
                          (CS 61C), Machine Learning (CS 189), Computer Vision (CS 180), Natural Language
                          Processing (CS 183)
                        </li>
                        <li className="text-lg text-muted-foreground">
                          <a href="https://ml.berkeley.edu" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Machine Learning at Berkeley (MLAB)</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
              </div>
              <div className="mt-8 ml-3">
                  <div className="text-2xl font-semibold font-newsreader">
                    Technical Skills
                  </div>
                  <ul className="ml-5 list-none">
                    <li className="mt-3">
                      Languages
                      <ul className="ml-5 list-none">
                        <li className="text-lg text-muted-foreground">Python, Java, SQL, C/C++</li>
                      </ul>
                    </li>
                    <li className="mt-3">
                      ML Frameworks
                      <ul className="ml-5 list-none">
                        <li className="text-lg text-muted-foreground">PyTorch, FSDP, DeepSpeed, HuggingFace, TensorFlow, WandB</li>
                      </ul>
                    </li>
                    <li className="mt-3">
                      Tools &amp; Systems
                      <ul className="ml-5 list-none">
                        <li className="text-lg text-muted-foreground">Linux/Bash, Docker, SLURM, Git, GCP, AWS</li>
                      </ul>
                    </li>
                    <li className="mt-3">
                      Libraries
                      <ul className="ml-5 list-none">
                        <li className="text-lg text-muted-foreground">NumPy, pandas, Matplotlib, OpenCV, SciPy</li>
                      </ul>
                    </li>
                  </ul>
              </div>
              <div className="mt-8 ml-3 text-lg">
                <Link href="/experience" className="underline underline-offset-2">See my work experience</Link>
                <br/>
                <Link href="/awards" className="underline underline-offset-2">See my awards</Link>
              </div>
            </div>
            </div>

        </div>
      </div>
      <SiteFooter />
    </div>

  );
}
