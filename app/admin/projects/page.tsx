"use client";

import { FormEvent, useEffect, useState } from "react";
import { projectApi } from "@/lib/api/projectApi";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/admin/DataTable";

const inputClass =
  "w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-primary";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => projectApi.list().then(setProjects);

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      await projectApi.create({
        title: String(form.get("title")),
        image: String(form.get("image")),
        description: String(form.get("description")),
        techStack: String(form.get("techStack")).split(",").map((s) => s.trim()).filter(Boolean),
        liveLink: String(form.get("liveLink") || "") || undefined,
        githubLink: String(form.get("githubLink") || "") || undefined,
        challenges: String(form.get("challenges") || "") || undefined,
        futurePlans: String(form.get("futurePlans") || "") || undefined,
      });
      setShowForm(false);
      e.currentTarget.reset();
      load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await projectApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Projects</h1>
        <Button onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancel" : "New Project"}</Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 space-y-3 rounded-lg border border-border-light dark:border-border-dark p-5">
          <input name="title" required placeholder="Title" className={inputClass} />
          <input name="image" required placeholder="Image URL" className={inputClass} />
          <textarea name="description" required rows={3} placeholder="Description" className={inputClass} />
          <input name="techStack" required placeholder="Tech stack (comma-separated)" className={inputClass} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="liveLink" placeholder="Live link (optional)" className={inputClass} />
            <input name="githubLink" placeholder="GitHub link (optional)" className={inputClass} />
          </div>
          <textarea name="challenges" rows={2} placeholder="Challenges faced (optional)" className={inputClass} />
          <textarea name="futurePlans" rows={2} placeholder="Future plans (optional)" className={inputClass} />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Create Project"}
          </Button>
        </form>
      )}

      <DataTable
        rows={projects}
        keyField={(p) => p.id}
        emptyLabel="No projects yet."
        columns={[
          { header: "Title", render: (p) => <span className="font-medium">{p.title}</span> },
          { header: "Tech Stack", render: (p) => p.techStack.join(", ") },
          {
            header: "",
            render: (p) => (
              <button onClick={() => remove(p.id)} className="text-red-500 text-xs hover:underline">
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
