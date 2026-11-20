"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Instagram, Facebook, Phone, ChevronDown, ChevronRight, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import Image from "next/image";
import { trackContactClick } from "@/lib/tracking";
import QuoteModal from "@/components/ui/QuoteModal";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
        name: "Services",
        href: "/services",
        subLinks: [
            { name: "Premium Catering", href: "/services/catering" },
            { name: "Menu Selection", href: "/menu" },
            { name: "Venue Management", href: "/services/venue" },
            { name: "Event Decoration", href: "/services/decoration" },
            { name: "Photography & Video", href: "/services/photography" },
            { name: "Make-up Services", href: "/services/makeup" },
            { name: "Entertainment", href: "/services/entertainment" },
            { name: "Premium Cars", href: "/services/cars" },
            { name: "Corporate Event", href: "/services/corporate-event" },
            { name: "Destination Wedding", href: "/services/destination-wedding" }
        ]
    },
    // { name: "Portfolio", href: "/portfolio" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Locations", href: "/locations" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Automatically expand services if user is currently on a services page
    useEffect(() => {
        if (pathname?.startsWith("/services") || pathname === "/menu") {
            setServicesExpanded(true);
        }
    }, [pathname]);

    if (isAdmin) return null;

    const isHome = pathname === "/";
    const headerClass = `${styles.headerWrapper} ${scrolled || !isHome ? styles.scrolled : ""}`;

    return (
        <>
            <header className={headerClass}>
                <div className={`container ${styles.container}`}>
                    <Link href="/" className={styles.logoGroup} aria-label="Go to Homepage">
                        <div className={styles.logoIcon}>
                            <Image src="/logo.png" alt="Pride Kitchen Logo" width={55} height={55} className={styles.logoImg} priority />
                        </div>
                        <span className={styles.mobileBrandName}>PRIDE KITCHEN CATERERS & EVENTS</span>
                    </Link>

                    <nav className={styles.desktopNav} aria-label="Desktop Navigation">
                        {navLinks.map((link) => (
                            <div key={link.name} className={styles.navItem}>
                                <Link
                                    href={link.href}
                                    className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ""}`}
                                    aria-label={link.name}
                                >
                                    {link.name}
                                    {link.subLinks && <ChevronDown size={14} className={styles.chevron} />}
                                </Link>

                                {link.subLinks && (
                                    <div className={styles.dropdown}>
                                        {link.subLinks.map(sub => (
                                            <Link key={sub.name} href={sub.href} className={styles.dropdownLink} aria-label={sub.name}>
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className={styles.actionsGroup}>
                        <a
                            href="tel:+918138002333"
                            className={styles.headerPhone}
                            onClick={() => trackContactClick('phone', 'header')}
                            aria-label="Call +91 81380 02333"
                        >
                            <Phone size={18} />
                            <span>+91 81380 02333</span>
                        </a>
                        <button
                            className={styles.applyBtn}
                            onClick={() => {
                                trackContactClick('quote', 'header');
                                setIsQuoteModalOpen(true);
                            }}
                            aria-label="Get a Quote"
                        >
                            GET A QUOTE
                        </button>

                        {/* Standard-grade tactile mobile menu button */}
                        <motion.button
                            className={styles.menuToggle}
                            onClick={() => setIsOpen(true)}
                            aria-label="Open Mobile Menu"
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Menu size={22} />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Drawer + Backdrop */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Glassmorphic dark backdrop */}
                            <motion.div
                                className={styles.mobileBackdrop}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setIsOpen(false)}
                                aria-hidden="true"
                            />

                            {/* Tactile Mobile Menu Drawer */}
                            <motion.div
                                className={styles.mobileMenu}
                                initial={{ opacity: 0, x: "100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                                aria-modal="true"
                                role="dialog"
                            >
                                <div className={styles.mobileMenuHeader}>
                                    <Link href="/" className={styles.logoGroup} onClick={() => setIsOpen(false)} aria-label="Go to Homepage">
                                        <Image src="/logo.png" alt="Pride Kitchen Logo" width={45} height={45} className={styles.logoImg} />
                                        <span className={styles.mobileBrandName}>PRIDE KITCHEN CATERERS & EVENTS</span>
                                    </Link>
                                    <motion.button
                                        className={styles.closeBtn}
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Close Mobile Menu"
                                        whileTap={{ scale: 0.88, rotate: 90 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <X size={26} />
                                    </motion.button>
                                </div>

                                <div className={styles.mobileNav}>
                                    {navLinks.map((link) => {
                                        const isLinkActive = pathname === link.href;

                                        // Sublinks (e.g. Services) rendered with interactive Accordion
                                        if (link.subLinks) {
                                            const isServicesActive = pathname?.startsWith("/services") || pathname === "/menu";

                                            return (
                                                <div key={link.name} className={styles.mobileNavItem}>
                                                    <div
                                                        className={`${styles.mobileNavLink} ${isServicesActive ? styles.activeMobileLink : ""}`}
                                                        onClick={() => setServicesExpanded(!servicesExpanded)}
                                                        role="button"
                                                        tabIndex={0}
                                                        aria-expanded={servicesExpanded}
                                                    >
                                                        <span>{link.name}</span>
                                                        <ChevronDown
                                                            size={18}
                                                            className={`${styles.accordionChevron} ${servicesExpanded ? styles.accordionChevronOpen : ""}`}
                                                        />
                                                    </div>

                                                    <AnimatePresence>
                                                        {servicesExpanded && (
                                                            <motion.div
                                                                className={styles.mobileDropdown}
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                            >
                                                                {link.subLinks.map((sub) => {
                                                                    const isSubActive = pathname === sub.href;
                                                                    return (
                                                                        <Link
                                                                            key={sub.name}
                                                                            href={sub.href}
                                                                            className={`${styles.mobileDropdownLink} ${isSubActive ? styles.activeSubLink : ""}`}
                                                                            onClick={() => setIsOpen(false)}
                                                                            aria-label={sub.name}
                                                                        >
                                                                            <div className={styles.subLinkContent}>
                                                                                <span className={styles.subLinkDot} />
                                                                                <span>{sub.name}</span>
                                                                            </div>
                                                                            <ChevronRight size={14} className={styles.subLinkChevron} />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        }

                                        // Normal Nav Link
                                        return (
                                            <div key={link.name} className={styles.mobileNavItem}>
                                                <Link
                                                    href={link.href}
                                                    className={`${styles.mobileNavLink} ${isLinkActive ? styles.activeMobileLink : ""}`}
                                                    onClick={() => setIsOpen(false)}
                                                    aria-label={link.name}
                                                >
                                                    <span>{link.name}</span>
                                                    <ChevronRight size={16} className={styles.linkChevron} />
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.mobileActions}>
                                    <motion.button
                                        className={styles.mobileQuoteBtn}
                                        onClick={() => {
                                            trackContactClick('quote', 'mobile_menu');
                                            setIsQuoteModalOpen(true);
                                            setIsOpen(false);
                                        }}
                                        aria-label="Get a Quote"
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        GET A QUOTE
                                    </motion.button>

                                    <motion.a
                                        href="tel:+918138002333"
                                        className={styles.mobilePhoneCard}
                                        onClick={() => trackContactClick('phone', 'mobile_menu')}
                                        aria-label="Call +91 81380 02333"
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <div className={styles.phoneIconWrapper}>
                                            <Phone size={18} />
                                        </div>
                                        <div className={styles.phoneTextGroup}>
                                            <span className={styles.phoneLabel}>Direct Consultation</span>
                                            <span className={styles.phoneNumber}>+91 81380 02333</span>
                                        </div>
                                        <span className={styles.phoneCallBadge}>Call Now</span>
                                    </motion.a>

                                    <div className={styles.socials}>
                                        <motion.a
                                            href="https://www.facebook.com/share/1FxXKZkpex/?mibextid=wwXIfr"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Facebook"
                                            whileTap={{ scale: 0.88 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Facebook size={20} />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.instagram.com/pkceventscaterers?igsh=dmd3YW12c2dhOWxv"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Instagram"
                                            whileTap={{ scale: 0.88 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Instagram size={20} />
                                        </motion.a>
                                        <motion.a
                                            href="https://youtube.com/@pridekitchencaterersevents?si=P4_8SBE1wVpFPPPk"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="YouTube"
                                            whileTap={{ scale: 0.88 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Youtube size={20} />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </>
    );
}
