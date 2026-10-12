declare global {
    interface Window {
        dataLayer: unknown[];
    }
}

export const trackEvent = (eventName: string, eventParams: Record<string, unknown> = {}) => {
    if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...eventParams,
        });
    }
};

export const trackContactClick = (method: 'whatsapp' | 'phone' | 'email' | 'quote', location: string) => {
    trackEvent('contact_click', {
        method,
        location
    });
};
