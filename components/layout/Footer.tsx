import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import Link from "next/link";

const SOCIALS = [
  { href: "https://github.com/milonroy26", icon: GithubIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/milon-chandro-2236a8383/", icon: LinkedinIcon, label: "LinkedIn" },
  // { href: "https://twitter.com", icon: TwitterIcon, label: "Twitter" },
  { href: "https://www.facebook.com/Milon293/", icon: FacebookIcon, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark">
      <div className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted-light dark:text-muted-dark">
          © {new Date().getFullYear()} Milon Chandra. All rights reserved.
        </p>
        <div className="flex gap-4">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              className="text-muted-light hover:text-primary dark:text-muted-dark dark:hover:text-primary-light"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
