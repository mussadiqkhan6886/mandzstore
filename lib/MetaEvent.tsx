export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  window.fbq?.("track", eventName, parameters);
};