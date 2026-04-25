"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { newSession } from "@/lib/signs/storage";

/**
 * Mode 3 entry. Creates a session, redirects to the meta question.
 */
export default function SpotPatternEntry() {
  const router = useRouter();
  useEffect(() => {
    const session = newSession("spot_pattern");
    router.replace(`/spot-pattern/flow/${session.sessionId}/meta`);
  }, [router]);
  return (
    <main className="flex-1 flex items-center justify-center">
      <p className="text-[14px] text-muted">Starting your assessment…</p>
    </main>
  );
}
