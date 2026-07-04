import { Reveal } from "@/components/ui/Reveal";
import { Code2, Gauge, GraduationCap, Layers, Users } from "lucide-react";

const APPROACH = [
  { icon: Code2, label: "Clean & maintainable code architecture" },
  { icon: Gauge, label: "Performance optimization" },
  { icon: Layers, label: "Scalable solutions" },
  { icon: Users, label: "User-centered design" },
  { icon: GraduationCap, label: "Continuous learning and improvement" },
];

export function About() {
  return (
    <section id="about" className="section border-t border-border-light dark:border-border-dark">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">A bit about how I work.</h2>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-4">
            A passionate web developer with 2+ years of experience building web
            applications and software solutions. My expertise spans across the
            JavaScript ecosystem with a focus on React, Angular, Node.js, Express, and
            MongoDB/PostgreSQL.
          </p>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-4">
            Currently working at <span className="font-medium">BD Assistant Ltd</span> and{" "}
            <span className="font-medium">Premium Fruits Ltd</span>.
          </p>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed">
            Outside of code, you&apos;ll usually find me playing sports or planning the
            next trip.
          </p>

          {/* Contact me */}
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block rounded-md bg-secondary px-6 py-3 text-sm font-medium text-black hover:bg-secondary-dark transition-colors"
            >
              Contact Me
            </a>
          </div>

        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <h3 className="text-lg font-bold col-span-2 uppercase">My Approach</h3>
          {APPROACH.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 0.06} className={i === 4 ? "col-span-2" : undefined}>
              <div className="h-full rounded-xl border dark:bg-[#080C16]  border-border-light dark:border-border-dark p-5 hover:border-primary/50 transition-colors shadow">
                <Icon className="text-primary mb-3" size={22} />
                <p className="text-sm font-medium">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
