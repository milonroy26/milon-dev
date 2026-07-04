import { api } from "@/lib/axios";
import type { Project, ApiResponse } from "@/types";

export const projectApi = {
  list: () => api.get<ApiResponse<Project[]>>("/projects").then((r) => r.data.data),
  create: (payload: Partial<Project>) =>
    api.post<ApiResponse<Project>>("/projects", payload).then((r) => r.data.data),
  update: (id: string, payload: Partial<Project>) =>
    api.put<ApiResponse<Project>>(`/projects/${id}`, payload).then((r) => r.data.data),
  remove: (id: string) => api.delete(`/projects/${id}`),
};
