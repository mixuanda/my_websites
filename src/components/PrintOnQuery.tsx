"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

function PrintOnQueryInner() {
  const searchParams = useSearchParams();
  const lastPrintKey = useRef<string | null>(null);

  useEffect(() => {
    if (searchParams.get("print") !== "1") {
      return;
    }

    const printKey = searchParams.toString();
    if (lastPrintKey.current === printKey) {
      return;
    }

    lastPrintKey.current = printKey;
    const shouldClose = searchParams.get("autoclose") === "1";
    const handleAfterPrint = () => {
      if (shouldClose) {
        window.close();
      }
    };

    window.addEventListener("afterprint", handleAfterPrint);
    const timer = window.setTimeout(() => {
      window.print();
    }, 150);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [searchParams]);

  return null;
}

export function PrintOnQuery() {
  return (
    <Suspense fallback={null}>
      <PrintOnQueryInner />
    </Suspense>
  );
}
