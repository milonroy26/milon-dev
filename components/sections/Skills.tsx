"use client";

import { Reveal } from "@/components/ui/Reveal";
import { skillApi } from "@/lib/api/skillApi";
import type { Skill, SkillCategory } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  TOOLS: "Tools",
};

const FALLBACK: Skill[] = [
  { id: "1", name: "React", category: "FRONTEND", percentage: 90 },
  { id: "2", name: "Next.js", category: "FRONTEND", percentage: 85 },
  { id: "3", name: "Angular", category: "FRONTEND", percentage: 70 },
  { id: "4", name: "TypeScript", category: "FRONTEND", percentage: 66 },
  { id: "5", name: "Tailwind CSS", category: "FRONTEND", percentage: 80 },
  { id: "6", name: "Bootstrap", category: "FRONTEND", percentage: 82 },
  { id: "7", name: "Node.js", category: "BACKEND", percentage: 88 },
  { id: "8", name: "MongoDB", category: "BACKEND", percentage: 80 },
  { id: "9", name: "PostgreSQL", category: "BACKEND", percentage: 82 },
  { id: "10", name: "Prisma", category: "BACKEND", percentage: 85 },
  { id: "11", name: "Docker", category: "TOOLS", percentage: 65 },
  { id: "12", name: "Postman", category: "TOOLS", percentage: 85 },
  { id: "13", name: "Figma", category: "TOOLS", percentage: 85 },
  { id: "14", name: "GitHub", category: "TOOLS", percentage: 80 },
];

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>(FALLBACK);

  useEffect(() => {
    skillApi
      .list()
      .then((data) => data.length > 0 && setSkills(data))
      .catch(() => {
        /* keep fallback data */
        setSkills(FALLBACK);
      });
  }, []);

  const grouped = (["FRONTEND", "BACKEND", "TOOLS"] as SkillCategory[]).map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }));

  return (
    <section id="skills" className="section border-t border-border-light dark:border-border-dark">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">What I build with.</h2>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-3">
          {grouped.map(({ category, items }, groupIndex) => (
            <Reveal key={category} delay={groupIndex * 0.1}>
              <h2 className="font-display font-semibold mb-5 text-lg">{CATEGORY_LABELS[category]}</h2>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>{skill.name}</span>
                      <span className="font-mono text-muted-light dark:text-muted-dark">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-3.5 rounded-full bg-surface-light dark:bg-surface-dark overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
