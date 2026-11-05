"use client";

import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import styles from "./MobileContactBar.module.css";
import { trackContactClick } from "@/lib/tracking";

export default function MobileContactBar() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    if (isAdmin) return null;

    const whatsappNumber = "918138002333";
    const message = encodeURIComponent("Hi Pride Kitchen Caterers & Events, I'd like to enquire about your event services.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    const phoneUrl = "tel:+918138002333";
    const emailUrl = "mailto:pridekitchencaterers@gmail.com?subject=Event%20Enquiry%20-%20PKC%20Events";

    return (
        <aside className={styles.bar} aria-label="Quick contact links">
            {/* WhatsApp */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={() => trackContactClick('whatsapp', 'mobile_dock_bar')}
                aria-label="Chat with us on WhatsApp"
                title="Chat on WhatsApp"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.94 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.62 8.56 7.62 9.75C7.62 10.95 8.5 12.1 8.62 12.27C8.75 12.44 10.33 14.88 12.76 15.93C13.34 16.18 13.79 16.33 14.14 16.44C14.73 16.63 15.26 16.6 15.68 16.54C16.16 16.47 17.14 15.94 17.35 15.37C17.56 14.8 17.56 14.31 17.5 14.21C17.43 14.11 17.26 14.05 17 13.92C16.75 13.8 15.53 13.2 15.3 13.12C15.08 13.03 14.91 12.99 14.75 13.24C14.58 13.48 14.11 14.05 13.96 14.21C13.82 14.38 13.68 14.4 13.43 14.27C13.18 14.15 12.38 13.89 11.44 13.05C10.71 12.39 10.21 11.58 10.07 11.33C9.93 11.08 10.05 10.95 10.18 10.82C10.29 10.71 10.43 10.53 10.55 10.39C10.68 10.24 10.72 10.14 10.8 9.97C10.89 9.8 10.84 9.66 10.78 9.53C10.72 9.41 10.21 8.17 10 7.66C9.8 7.16 9.6 7.23 9.44 7.22C9.3 7.22 9.13 7.22 8.96 7.22L9.11 7.44Z"/>
                </svg>
            </a>

            {/* Phone */}
            <a
                href={phoneUrl}
                className={styles.link}
                onClick={() => trackContactClick('phone', 'mobile_dock_bar')}
                aria-label="Call +91 81380 02333"
                title="Call us"
            >
                <Phone size={19} strokeWidth={2} aria-hidden="true" />
            </a>

            {/* Email */}
            <a
                href={emailUrl}
                className={styles.link}
                onClick={() => trackContactClick('email', 'mobile_dock_bar')}
                aria-label="Email pridekitchencaterers@gmail.com"
                title="Email us"
            >
                <Mail size={19} strokeWidth={2} aria-hidden="true" />
            </a>
        </aside>
    );
}
