type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: AnalyticsParams,
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function trackPageView(url: string) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, params);
}
