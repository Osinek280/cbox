"use client";

import { filesApi } from "@/api/files";
import { useEffect } from "react";

export default function FilesPage() {
  useEffect(() => {
    filesApi();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    </>
  );
}
