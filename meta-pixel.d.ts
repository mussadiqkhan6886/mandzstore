export {};

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom" | "init",
      eventName?: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}