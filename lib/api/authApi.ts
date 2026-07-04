import { api } from "@/lib/axios";
import type { SafeAdmin } from "@/types";

interface AuthResponse {
  admin: SafeAdmin;
  accessToken: string;
}

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post<{ data: AuthResponse }>("/auth/login", payload).then((r) => r.data.data),

  me: () => api.get<{ data: SafeAdmin }>("/auth/me").then((r) => r.data.data),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post<{ data: AuthResponse }>("/auth/refresh-token").then((r) => r.data.data),
};
