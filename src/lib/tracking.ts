declare global {
    interface Window {
        dataLayer: any[];
    }
}

export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
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
