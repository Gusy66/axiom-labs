"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL_Y = 400;

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#020913]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/questionario"
        className="flex w-full items-center justify-center rounded-full bg-[#00d6ff] px-5 py-3 text-sm font-semibold text-[#04111c]"
      >
        Inicializar Protocolo
      </Link>
    </div>
  );
}
