"use client";

import { useEffect, useState } from "react";

export default function Health() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Health Check</h1>
      <p className="mt-4">Status: {status}</p>
    </main>
  );
}