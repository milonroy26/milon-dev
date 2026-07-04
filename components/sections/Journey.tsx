import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const EXPERIENCE = [
  {
    role: "Junior Web Developer (Frontend)",
    company: "Bd Assistant",
    context: "Grocery & Repairing Service",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783089023/BdAsistant.png",
    detail:
      "Led frontend development of enterprise applications, building scalable UX/UI solutions for multi-vendor operations and real-time order tracking.",
  },
  {
    role: "Web Developer (Frontend)",
    company: "Premium Fruits — Fruit E-commerce & Agro Company",
    context: "Fruit E-commerce & Agro Company",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783086294/premiumfruits.png",
    detail:
      "Designed a complete e-commerce platform and inventory management system with real-time stock tracking, supplier management, and automated reporting.",
  },
  {
    role: "Web Developer (Frontend)",
    company: "Premium Agro",
    context: "Grocery Delivery & Farm Resorts",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783088044/premium-agroo.png",
    detail: "Led frontend for enterprise grocery delivery apps and implemented a farm resort booking system.",
  },
  {
    role: "Web Developer (Frontend)",
    company: "Max Limited Broadband",
    context: "High-Speed Internet Enterprise App",
    image: "https://res.cloudinary.com/do0inbxls/image/upload/v1783088172/maxspeed_btg.png",
    detail: "Led frontend development for high-speed broadband service applications.",
  },
];

export function Journey() {
  return (
    <section id="journey" className="section border-t border-border-light dark:border-border-dark">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">My Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Where the work happened.</h2>
        </Reveal>

        <div className="relative border-l border-border-light dark:border-border-dark pl-8 space-y-10">
          {EXPERIENCE.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.08} className="relative">
              <span className="absolute -left-10.25 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark font-mono text-[12px] text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Company logo img */}
              <div className="w-20 dark:bg-slate-500 bg-slate-400 shadow rounded mb-1 overflow-hidden p-0.5 align-middle flex items-center justify-center ms-4">
                <Image
                  src={item.image}
                  alt={item.company}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="pl-4">
                <h3 className="font-display text-lg font-semibold">{item.role}</h3>
                <p className="text-primary text-sm mb-1">{item.company}</p>
                <p className="text-muted-light dark:text-muted-dark text-sm mb-2">{item.context}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark max-w-2xl">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 rounded-xl border border-border-light dark:border-border-dark p-6">
          <p className="eyebrow mb-2">Education</p>
          <p className="font-medium">Diploma in Computer Science</p>
        </Reveal>
      </div>
    </section>
  );
}
