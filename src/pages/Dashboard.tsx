"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function FilesPage() {
  const { refreshAccessToken } = useAuth();

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    </>
  );
}
