import { api } from "@/lib/axios";
import type { ContactMessage, ApiResponse } from "@/types";

export const contactApi = {
  send: (payload: { name: string; email: string; subject: string; message: string }) =>
    api.post("/contacts", payload),
  list: () => api.get<ApiResponse<ContactMessage[]>>("/contacts").then((r) => r.data.data),
  remove: (id: string) => api.delete(`/contacts/${id}`),
};
