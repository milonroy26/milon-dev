"use client";

import { useEffect, useState } from "react";
import { Folder, Award, Inbox } from "lucide-react";
import { projectApi } from "@/lib/api/projectApi";
import { skillApi } from "@/lib/api/skillApi";
import { contactApi } from "@/lib/api/contactApi";

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, messages: 0 });

  useEffect(() => {
    Promise.all([projectApi.list(), skillApi.list(), contactApi.list()])
      .then(([projects, skills, messages]) =>
        setCounts({ projects: projects.length, skills: skills.length, messages: messages.length })
      )
      .catch(() => {
        /* leave zeros if the API isn't reachable yet */
      });
  }, []);

  const stats = [
    { label: "Projects", value: counts.projects, icon: Folder },
    { label: "Skills", value: counts.skills, icon: Award },
    { label: "Messages", value: counts.messages, icon: Inbox },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-border-light dark:border-border-dark p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-mono uppercase text-muted-light dark:text-muted-dark">{label}</p>
              <Icon size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-display font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
