"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { newSession } from "@/lib/signs/storage";

/**
 * Mode 1 entry. Creates a session, redirects to step 1.
 */
export default function DiagnoseEntry() {
  const router = useRouter();
  useEffect(() => {
    const session = newSession("diagnose");
    router.replace(`/diagnose/flow/${session.sessionId}/1`);
  }, [router]);
  return (
    <main className="flex-1 flex items-center justify-center">
      <p className="text-[14px] text-muted">Starting your assessment…</p>
    </main>
  );
}
