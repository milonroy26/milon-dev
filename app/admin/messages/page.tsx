"use client";

import { useEffect, useState } from "react";
import { contactApi } from "@/lib/api/contactApi";
import type { ContactMessage } from "@/types";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const load = () => contactApi.list().then(setMessages);

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await contactApi.remove(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Messages</h1>
      <DataTable
        rows={messages}
        keyField={(m) => m.id}
        emptyLabel="No messages yet."
        columns={[
          {
            header: "From",
            render: (m) => (
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-light dark:text-muted-dark">{m.email}</p>
              </div>
            ),
          },
          { header: "Subject", render: (m) => m.subject },
          { header: "Message", render: (m) => <span className="line-clamp-2 max-w-xs block">{m.message}</span> },
          { header: "Date", render: (m) => formatDate(m.createdAt) },
          {
            header: "",
            render: (m) => (
              <button onClick={() => remove(m.id)} className="text-red-500 text-xs hover:underline">
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
