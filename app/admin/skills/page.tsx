"use client";

import { FormEvent, useEffect, useState } from "react";
import { skillApi } from "@/lib/api/skillApi";
import type { Skill, SkillCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";

const inputClass =
  "w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-primary";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => skillApi.list().then(setSkills);

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      await skillApi.create({
        name: String(form.get("name")),
        category: form.get("category") as SkillCategory,
        percentage: Number(form.get("percentage")),
      });
      setShowForm(false);
      e.currentTarget.reset();
      load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await skillApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Skills</h1>
        <Button onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancel" : "New Skill"}</Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 space-y-3 rounded-lg border border-border-light dark:border-border-dark p-5">
          <input name="name" required placeholder="Skill name" className={inputClass} />
          <select name="category" required className={inputClass}>
            <option value="FRONTEND">Frontend</option>
            <option value="BACKEND">Backend</option>
            <option value="TOOLS">Tools</option>
          </select>
          <input
            name="percentage"
            type="number"
            min={0}
            max={100}
            required
            placeholder="Proficiency (0-100)"
            className={inputClass}
          />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Add Skill"}
          </Button>
        </form>
      )}

      <DataTable
        rows={skills}
        keyField={(s) => s.id}
        emptyLabel="No skills yet."
        columns={[
          { header: "Name", render: (s) => <span className="font-medium">{s.name}</span> },
          { header: "Category", render: (s) => <Badge>{s.category}</Badge> },
          { header: "Proficiency", render: (s) => `${s.percentage}%` },
          {
            header: "",
            render: (s) => (
              <button onClick={() => remove(s.id)} className="text-red-500 text-xs hover:underline">
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
