// components/NProgress.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Don't forget this import

NProgress.configure({ showSpinner: false });

export default function NProgressLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 400); // simulate load time
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
