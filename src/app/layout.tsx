import type { Metadata, Viewport } from "next";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileContactBar from "@/components/ui/MobileContactBar";
import QuotePopup from "@/components/ui/QuotePopup";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Script from "next/script";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
    display: "swap",
    preload: true,
});
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins-font",
    display: "swap",
    preload: true,
});
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

const veggieBurger = localFont({
    src: [
        {
            path: "../../public/fonts/VeggiLig.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/VeggiMed.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/VeggiBol.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-veggieburger",
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pkcevents.com';

export const viewport: Viewport = {
    themeColor: "#1C1B19",
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Best Event Management in Thrissur, Kerala | Pride Kitchen Caters & Events",
        template: "%s"
    },
    description: "Luxury wedding & event management in Thrissur and Kochi since 2008. Premium catering, decoration, venues, photography & more — FSSAI & ISO certified.",
    keywords: "Wedding planner Kerala, Luxury events Thrissur, Premium catering Kochi, Event management Kerala",
    icons: {
        icon: [
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon.ico", sizes: "any" }
        ],
        shortcut: "/favicon.ico",
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
        ]
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Pride Kitchen Caterers & Events",
        description: "Luxury Wedding & Event Management in Kerala.",
        url: siteUrl,
        siteName: "Pride Kitchen Caterers",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "Pride Kitchen Logo",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pride Kitchen Caterers & Events",
        description: "Luxury Wedding & Event Management in Kerala.",
        images: ["/logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "txfdkJKoc7DP069rHZmErWVNzW0dhyvXLy5PkELZpfE",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Structured Data for LocalBusiness / Catering
    const cateringSchema = {
        "@context": "https://schema.org",
        "@type": "Catering",
        "@id": "https://pkcevents.com/#organization",
        "name": "Pride Kitchen Caterers & Events",
        "url": "https://pkcevents.com/",
        "logo": "https://pkcevents.com/_next/image?url=%2Flogo.png&w=128&q=75",
        "image": "https://pkcevents.com/_next/image?url=%2Flogo.png&w=128&q=75",
        "telephone": "+91 81380 02333",
        "email": "hello@pkcevents.com",
        "alternateName": "PKC Events",
        "description": "Pride Kitchen Caterers & Events provides professional catering and event management services across Kerala, specializing in weddings, corporate events, engagements, birthdays, venue booking, decoration, photography, makeup, and luxury car rentals.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy",
            "addressLocality": "Thrissur",
            "addressRegion": "Kerala",
            "postalCode": "680651",
            "addressCountry": "IN"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Thrissur"
            },
            {
                "@type": "City",
                "name": "Kochi"
            },
            {
                "@type": "State",
                "name": "Kerala"
            }
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "description": "By Appointment"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61579925427896",
            "https://www.instagram.com/pkceventscaterers",
            "https://www.youtube.com/@pridekitchencaterersevents"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 81380 02333",
            "contactType": "customer service",
            "email": "hello@pkcevents.com",
            "availableLanguage": [
                "English",
                "Malayalam"
            ]
        },
        "serviceType": [
            "Catering",
            "Wedding Catering",
            "Corporate Catering",
            "Event Planning",
            "Venue Booking",
            "Decoration",
            "Photography",
            "Makeup",
            "Luxury Cars"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Event Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Catering"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Wedding Catering"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Corporate Catering"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Event Planning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Venue Booking"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Decoration"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Photography"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Makeup"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Luxury Cars"
                    }
                }
            ]
        }
    };

    // Structured Data for Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://pkcevents.com/#organization",
        "name": "Pride Kitchen Caterers & Events",
        "alternateName": "PKC Events",
        "url": "https://pkcevents.com/",
        "logo": "https://pkcevents.com/_next/image?url=%2Flogo.png&w=128&q=75",
        "image": "https://pkcevents.com/_next/image?url=%2Flogo.png&w=128&q=75",
        "description": "Pride Kitchen Caterers & Events is a leading catering and event management company based in Thrissur, Kerala, offering catering, wedding planning, corporate event management, venue booking, decoration, photography, makeup, and luxury car services across Kerala.",
        "foundingDate": "2008-04-11",
        "founder": {
            "@type": "Person",
            "name": "Mukesh E B"
        },
        "email": "hello@pkcevents.com",
        "telephone": "+91-81380-02333",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy",
            "addressLocality": "Thrissur",
            "addressRegion": "Kerala",
            "postalCode": "680651",
            "addressCountry": "IN"
        },
        "location": {
            "@type": "Place",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 10.530011189090093,
                "longitude": 76.2517505
            }
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Thrissur"
            },
            {
                "@type": "City",
                "name": "Kochi"
            },
            {
                "@type": "State",
                "name": "Kerala"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61579925427896",
            "https://www.instagram.com/pkceventscaterers",
            "https://www.youtube.com/@pridekitchencaterersevents"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-81380-02333",
            "email": "hello@pkcevents.com",
            "contactType": "Customer Support",
            "availableLanguage": [
                "English",
                "Malayalam"
            ]
        },
        "knowsAbout": [
            "Catering Services",
            "Wedding Catering",
            "Corporate Catering",
            "Event Planning",
            "Venue Booking",
            "Event Decoration",
            "Photography",
            "Bridal Makeup",
            "Luxury Car Rental"
        ]
    };

    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NHGJG7MJ';
    const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-ZRG45NV821';
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    return (
        <html lang="en" className={`${playfair.variable} ${poppins.variable} ${inter.variable} ${veggieBurger.variable}`}>
            <head>


                {/* JSON-LD Catering / LocalBusiness Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(cateringSchema) }}
                />

                {/* JSON-LD Organization Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className={inter.className}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/* Deferred Tracking in body: Loads on user interaction or idle to achieve 0ms TBT */}
                <Script
                    id="deferred-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}

                            (function() {
                                var loaded = false;
                                function initAnalytics() {
                                    if (loaded) return;
                                    loaded = true;

                                    ['scroll', 'touchstart', 'click', 'keydown'].forEach(function(e) {
                                        window.removeEventListener(e, initAnalytics, { passive: true });
                                    });

                                    // Google Tag Manager
                                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','${gtmId}');

                                    ${clarityId && clarityId !== "CLARITY_ID" ? `
                                    // Microsoft Clarity
                                    (function(c,l,a,r,i,t,y){
                                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                    })(window, document, "clarity", "script", "${clarityId}");
                                    ` : ''}
                                }

                                ['scroll', 'touchstart', 'click', 'keydown'].forEach(function(e) {
                                    window.addEventListener(e, initAnalytics, { passive: true, once: true });
                                });

                                if ('requestIdleCallback' in window) {
                                    window.requestIdleCallback(function() { setTimeout(initAnalytics, 6000); });
                                } else {
                                    setTimeout(initAnalytics, 6000);
                                }
                            })();
                        `,
                    }}
                />
                
                <SmoothScroll>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppButton />
                    <MobileContactBar />
                    <QuotePopup />
                </SmoothScroll>
            </body>
        </html>
    );
}
