"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { timeline, aboutFaqs, techStack } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Button } from "@/components/ui/button";

const typeIcon = {
  experience: Briefcase,
  education: GraduationCap,
  achievement: Award,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="The person behind DBM Studio" />

      <section className="border-b border-border pb-24">
        <div className="container-content grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80"
              alt="Portrait of Mehedi Hasan"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-balance text-lg leading-relaxed text-text-primary">
              I'm Mehedi Hasan — a web designer and frontend developer based
              in Dhaka, working with clients everywhere. I started DBM Studio
              after six years building interfaces for agencies and SaaS
              teams, because I wanted to work on projects I actually pick.
            </p>
            <p className="text-balance leading-relaxed text-text-secondary">
              My approach is simple: understand the problem before touching
              Figma, design with restraint, and ship code I'd be comfortable
              handing to another engineer six months from now. I care more
              about a page loading in under a second than it winning a design
              award — ideally, it does both.
            </p>
            <p className="text-balance leading-relaxed text-text-secondary">
              Outside of client work, I write about frontend engineering and
              freelancing, publish tutorials, and maintain a couple of open
              template projects that pay my coffee bill.
            </p>

            <div>
              <p className="eyebrow mb-3">Favorite tools</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <Button href="/cv.pdf" showArrow className="mt-2 w-fit">
              Download CV
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container-content">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Experience & education
          </h2>
          <ol className="mt-12 flex flex-col gap-10 border-l border-border pl-8">
            {timeline.map((item, i) => {
              const Icon = typeIcon[item.type];
              return (
                <motion.li
                  key={item.title + item.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative"
                >
                  <span className="absolute -left-[calc(2rem+7px)] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent" />
                  <div className="flex flex-wrap items-center gap-3">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="font-mono text-xs text-text-secondary">{item.year}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-text-primary">
                    {item.title} · <span className="text-text-secondary">{item.org}</span>
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    {item.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-24">
        <div className="container-content max-w-2xl">
          <h2 className="text-2xl font-semibold text-text-primary">
            Common questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={aboutFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
