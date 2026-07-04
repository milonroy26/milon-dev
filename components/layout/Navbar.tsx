"use client";

import { useAuthStore } from "@/store/authStore";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { admin } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b border-border-light dark:border-border-dark  ${scrolled
        ? "bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur border-b border-border-light dark:border-border-dark"
        : "bg-transparent"
        }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold">
          Milon<span className="text-primary">.</span>dev
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-light hover:text-primary dark:text-muted-dark dark:hover:text-primary-light transition-colors scroll-smooth"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-2 hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {admin && (
            <Link
              href="/admin"
              className="hidden sm:inline-block rounded-md bg-primary px-4 py-1.5 text-sm text-white hover:bg-primary-dark"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-md p-2 hover:bg-surface-light dark:hover:bg-surface-dark md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border-light dark:border-border-dark md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-4">
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
