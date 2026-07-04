"use client";

import { useEffect } from "react";
import { authApi } from "@/lib/api/authApi";
import { useAuthStore } from "@/store/authStore";

export function AuthHydrator() {
  const { setSession, setHydrating } = useAuthStore();

  useEffect(() => {
    authApi
      .refresh()
      .then(({ admin, accessToken }) => setSession(admin, accessToken))
      .catch(() => setSession(null, null))
      .finally(() => setHydrating(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
