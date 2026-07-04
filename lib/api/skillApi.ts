import { api } from "@/lib/axios";
import type { Skill, ApiResponse } from "@/types";

export const skillApi = {
  list: () => api.get<ApiResponse<Skill[]>>("/skills").then((r) => r.data.data),
  create: (payload: Partial<Skill>) =>
    api.post<ApiResponse<Skill>>("/skills", payload).then((r) => r.data.data),
  update: (id: string, payload: Partial<Skill>) =>
    api.put<ApiResponse<Skill>>(`/skills/${id}`, payload).then((r) => r.data.data),
  remove: (id: string) => api.delete(`/skills/${id}`),
};
