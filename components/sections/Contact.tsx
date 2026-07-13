"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contactApi } from "@/lib/api/contactApi";
import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass = "w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    try {
      await contactApi.send({
        name: String(form.get("name")),
        email: String(form.get("email")),
        subject: String(form.get("subject")),
        message: String(form.get("message")),
      });
      setStatus("sent");
      e.currentTarget.reset();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setStatus("error");
      setErrorMsg("");
    }
  };

  return (
    <section id="contact" className="section border-t border-border-light dark:border-border-dark">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let&apos;s build something.</h2>
          <p className="text-muted-light dark:text-muted-dark mb-8 max-w-sm">
            Open to new roles and freelance projects. The fastest way to reach me is directly.
          </p>
          <div className="space-y-3">
            <a href="mailto:milonchandro35@gmail.com" className="flex items-center gap-3 text-sm hover:text-primary">
              <Mail size={16} /> milonchandro35@gmail.com
            </a>
            <a href="tel:+8801774138442" className="flex items-center gap-3 text-sm hover:text-primary">
              <Phone size={16} /> 01774-138442 (WhatsApp)
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Name" className={inputClass} />
              <input name="email" type="email" required placeholder="Email" className={inputClass} />
            </div>
            <input name="subject" required placeholder="Subject" className={inputClass} />
            <textarea name="message" required rows={5} placeholder="Message" className={inputClass} />

            <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
              {status === "sending" ? "Sending…" : "Send Message"}
            </Button>

            {status === "sent" && (
              <p className="text-sm text-primary">Message sent — thanks for reaching out!</p>
            )}
            {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
