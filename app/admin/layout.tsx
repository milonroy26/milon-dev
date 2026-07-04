"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Folder, Award, Inbox } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Folder },
  { href: "/admin/skills", label: "Skills", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, isHydrating } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrating && !admin) {
      router.replace("/login");
    }
  }, [admin, isHydrating, router]);

  if (isHydrating) {
    return (
      <div className="pt-32 text-center text-sm text-muted-light dark:text-muted-dark">
        Checking session…
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="container-page pt-28 pb-20 grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            <Icon size={16} /> {label}
          </Link>
        ))}
      </aside>
      <div>{children}</div>
    </div>
  );
}
