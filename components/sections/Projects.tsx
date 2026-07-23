"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projectApi } from "@/lib/api/projectApi";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const FALLBACK: Project[] = [
  {
    id: "1",
    title: "Premium Fruits — E-commerce & Agro Platform",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783091814/premiumfruitsProject.png",
    description:
      "Complete e-commerce platform and inventory management system with real-time stock tracking, supplier management, and automated reporting.",
    techStack: ["Angular", "Angular Material", "Bootstrap", "Swagger UI"],
    keyFeatures: ["Order tracking and delivery status updates", "Responsive design optimized for all devices", "Seller dashboard for inventory and order management etc."],
    liveLink: "https://premiumfruitbd.com",
    order: 1,
  },
  {
    id: "2",
    title: "Premium Agro — Farm Resort Booking",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783091988/premium-agaro-web.png",
    description: "Grocery delivery enterprise app with an integrated farm resort booking system.",
    techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    keyFeatures: ["User-friendly interface for booking farm stays", "Real-time availability checking", "Integrated payment processing"],
    liveLink: "https://www.premiumagrobd.com",
    order: 2,
  },
  {
    id: "3",
    title: "Max Limited Broadband — Enterprise App",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783090223/budsgbpbrw_2_17_bxcntf.png",
    description: "Customer-facing app for a high-speed internet enterprise provider.",
    techStack: ["Angular", "Angular Material"],
    keyFeatures: ["User-friendly interface for managing broadband services", "Real-time usage monitoring", "Integrated billing and payment processing"],
    liveLink: "https://maxlimited.net/",
    order: 3,
  },
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    projectApi
      .list()
      .then((data) => data.length > 0 && setProjects(data))
      .catch(() => {
        /* keep fallback data */
        setProjects(FALLBACK);
      });
  }, []);

  return (
    <section id="projects" className="section border-t border-border-light dark:border-border-dark">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Selected work.</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-44 w-full bg-surface-light dark:bg-surface-dark">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-1 flex-col">
                    <h3 className="font-display font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-light dark:text-muted-dark mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-auto" onClick={() => setActive(project)}>
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="space-y-5">
            <div className="relative h-52 w-full rounded-lg overflow-hidden">
              <Image src={active.image} alt={active.title} fill className="object-cover" />
            </div>
            <p className="text-sm text-muted-light dark:text-muted-dark">{active.description}</p>

            <div>
              <p className="text-xs font-mono uppercase text-muted-light dark:text-muted-dark mb-2">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {active.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {active.challenges && (
              <div>
                <p className="text-xs font-mono uppercase text-muted-light dark:text-muted-dark mb-2">
                  Challenges Faced
                </p>
                <p className="text-sm">{active.challenges}</p>
              </div>
            )}

            {Array.isArray((active as any).keyFeatures) && (
              <div>
                <p className="text-xs font-mono uppercase text-muted-light dark:text-muted-dark mb-2">
                  Key Features
                </p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {(active as any).keyFeatures.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {active.futurePlans && (
              <div>
                <p className="text-xs font-mono uppercase text-muted-light dark:text-muted-dark mb-2">
                  Future Plans
                </p>
                <p className="text-sm">{active.futurePlans}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {active.liveLink && (
                <a href={active.liveLink} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <ExternalLink size={16} />
                    Live Site
                  </Button>
                </a>
              )}
              {active.githubLink && (
                <Button variant="ghost" onClick={() => window.open(active.githubLink!, "_blank")}>
                  <GithubIcon size={16} /> Code
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
