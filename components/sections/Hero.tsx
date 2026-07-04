"use client";

import { Button } from "@/components/ui/Button";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

const SOCIALS = [
  { href: "https://github.com/milonroy26", icon: GithubIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/milon-chandro-2236a8383/", icon: LinkedinIcon, label: "LinkedIn" },
  // { href: "https://twitter.com", icon: TwitterIcon, label: "Twitter" },
  { href: "https://www.facebook.com/Milon293/", icon: FacebookIcon, label: "Facebook" },
];

export function Hero() {
  return (
    <section className="section pt-28 sm:pt-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="eyebrow mb-4">Web Developer / Frontend Specialist</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Hi, I&apos;m <span className="text-primary">Milon Chandra</span>.
          </h1>
          <p className="text-muted-light dark:text-muted-dark text-lg max-w-lg mb-8">
            A passionate web developer with 2+ years of experience building web
            applications across the JavaScript ecosystem — React, Angular, Node.js, and
            PostgreSQL.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={() => window.open("/resume.pdf", "_blank")}>
              <Download size={16} /> Download Resume
            </Button>
            <Button
              variant="ghost"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
          </div>
          <div className="flex gap-4">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="rounded-full border border-border-light dark:border-border-dark p-2.5 text-muted-light hover:border-primary hover:text-primary dark:text-muted-dark transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center"
        >
          {/* Professional photo */}
          <div className="relative h-72 w-72 rounded-2xl border-2 border-dashed border-primary/40 bg-linear-to-br from-primary/10 to-secondary/10 sm:h-80 sm:w-80 overflow-hidden">
            <Image
              src="https://res.cloudinary.com/do0inbxls/image/upload/v1783079349/Formal_milon.png"
              alt="Milon Chandra"
              fill
              sizes="(max-width: 640px) 288px, 320px"
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
