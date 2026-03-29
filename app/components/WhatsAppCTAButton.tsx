"use client";

import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Olá!%20Quero%20ajuda%20para%20escolher%20meu%20protocolo%20NeuroDrive.";

export default function WhatsAppCTAButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackEvent("contact_click", {
          contact_type: "whatsapp",
          destination: WHATSAPP_URL,
          page_name: "home",
        })
      }
      aria-label="Falar no WhatsApp"
      className="fixed bottom-24 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#6dffd4]/65 bg-[#0c1f25]/95 text-[#7fffe2] shadow-[0_0_20px_rgba(67,255,202,0.28)] transition hover:scale-105 hover:brightness-110 md:bottom-6 md:right-6"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M19.1 17.7c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.7-1.8-1-2.4-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.2 1.3 3.4.1.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.6.8.2 1.6.2 2.2.1.7-.1 1.7-.7 2-1.3.2-.6.2-1.1.2-1.2-.1 0-.3-.1-.6-.2z" />
        <path d="M16.1 3.2c-7 0-12.7 5.7-12.7 12.7 0 2.2.6 4.4 1.7 6.3L3 29l7-2.2c1.8 1 3.9 1.5 6.1 1.5 7 0 12.7-5.7 12.7-12.7S23.1 3.2 16.1 3.2zm0 22.8c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7 0-5.8 4.8-10.6 10.6-10.6s10.6 4.8 10.6 10.6-4.8 10.5-10.6 10.5z" />
      </svg>
    </a>
  );
}
