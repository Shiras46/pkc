"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Instagram, Facebook, Phone, ChevronDown, Youtube } from "lucide-react";
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    <button 
                        className={styles.menuToggle} 
                        onClick={() => setIsOpen(true)}
                        aria-label="Open Mobile Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className={styles.mobileMenuHeader}>
                            <Link href="/" className={styles.logoGroup} onClick={() => setIsOpen(false)} aria-label="Go to Homepage">
                                <Image src="/logo.png" alt="Pride Kitchen Logo" width={45} height={45} className={styles.logoImg} />
                                <span className={styles.mobileBrandName}>PRIDE KITCHEN CATERERS & EVENTS</span>
                            </Link>
                            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close Mobile Menu">
                                <X size={30} />
                            </button>
                        </div>
                        <div className={styles.mobileNav}>
                            {navLinks.map((link) => (
                                <div key={link.name} className={styles.mobileNavItem}>
                                    <Link
                                        href={link.href}
                                        className={`${styles.mobileNavLink} ${pathname === link.href ? styles.activeMobileLink : ""}`}
                                        onClick={() => setIsOpen(false)}
                                        aria-label={link.name}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.subLinks && (
                                        <div className={styles.mobileDropdown}>
                                            {link.subLinks.map(sub => (
                                                <Link 
                                                    key={sub.name} 
                                                    href={sub.href} 
                                                    className={styles.mobileDropdownLink} 
                                                    onClick={() => setIsOpen(false)}
                                                    aria-label={sub.name}
                                                >
                                                    - {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={styles.mobileActions}>
                            <button 
                                className={styles.mobileQuoteBtn}
                                onClick={() => {
                                    trackContactClick('quote', 'mobile_menu');
                                    setIsQuoteModalOpen(true);
                                    setIsOpen(false);
                                }}
                                aria-label="Get a Quote"
                            >
                                GET A QUOTE
                            </button>
                            <a 
                                href="tel:+918138002333" 
                                className={styles.mobilePhone}
                                onClick={() => trackContactClick('phone', 'mobile_menu')}
                                aria-label="Call +91 81380 02333"
                            >
                                <Phone size={20} />
                                +91 81380 02333
                            </a>
                            <div className={styles.socials}>
                                <a href="https://www.facebook.com/share/1FxXKZkpex/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={24} /></a>
                                <a href="https://www.instagram.com/pkceventscaterers?igsh=dmd3YW12c2dhOWxv" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={24} /></a>
                                <a href="https://youtube.com/@pridekitchencaterersevents?si=P4_8SBE1wVpFPPPk" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={24} /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </>
    );
}
