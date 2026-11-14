"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, MapPin, Phone, Mail, Youtube, Linkedin } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import BrandName from "@/components/ui/BrandName";
import styles from "./Footer.module.css";
import Image from "next/image";
import { trackContactClick, trackEvent } from "@/lib/tracking";

export default function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    if (isAdmin) return null;

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo} aria-label="Go to Homepage">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Image src="/logo.png" alt="PKC Logo" width={50} height={50} style={{ borderRadius: '50%' }} />
                                <BrandName />
                            </div>
                        </Link>
                        <p className={styles.description}>
                            Crafting extraordinary experiences and timeless memories with a touch of elegance and absolute perfection since 2008.
                        </p>
                        <div className={styles.socials}>
                            <a href="https://www.facebook.com/share/1FxXKZkpex/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/pkceventscaterers?igsh=dmd3YW12c2dhOWxv" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="https://youtube.com/@pridekitchencaterersevents?si=P4_8SBE1wVpFPPPk" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
                            <a href="https://pin.it/3KQdAV6sV" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><FaPinterest size={20} /></a>
                            <a href="https://www.linkedin.com/company/pride-kitchen-caterers-events/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.linksCol}>
                        <h3>Our Services</h3>
                        <ul>
                            <li><Link href="/services/cars">Luxury Cars</Link></li>
                            <li><Link href="/services/catering">Premium Catering</Link></li>
                            <li><Link href="/services/decoration">Venue Decoration</Link></li>
                            <li><Link href="/services/entertainment">Entertainment</Link></li>
                            <li><Link href="/services/makeup">Bridal Makeup</Link></li>
                            <li><Link href="/services/photography">Photography</Link></li>
                            <li><Link href="/services/venue">Venue Selection</Link></li>
                            <li><Link href="/services/corporate-event">Corporate Event</Link></li>
                            <li><Link href="/services/destination-wedding">Destination Wedding</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h3>Company</h3>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/sitemap">Sitemap</Link></li>
                        </ul>
                    </div>

                    <div className={styles.contactCol}>
                        <h3>Headquarters</h3>
                        <div className={styles.contactItem}>
                            <MapPin size={20} className="text-gold" aria-hidden="true" />
                            <a 
                                href="https://maps.app.goo.gl/a39cG6zMdG82upn96" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                onClick={() => trackEvent('contact_click', { method: 'map', location: 'footer' })}
                            >
                                <address style={{ fontStyle: 'normal', cursor: 'pointer' }}>
                                    Arammel Arcade, nr. Mannuthy - Madakkathara Road,<br/>
                                    Sree Lakshmi Nagar, Mannuthy,<br/>
                                    Thrissur, Kerala 680651
                                </address>
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={20} className="text-gold" aria-hidden="true" />
                            <a 
                                href="tel:+918138002333" 
                                onClick={() => trackContactClick('phone', 'footer')}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                +91 81380 02333
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={20} className="text-gold" aria-hidden="true" />
                            <a 
                                href="mailto:pridekitchencaterers@gmail.com" 
                                onClick={() => trackContactClick('email', 'footer')}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                pridekitchencaterers@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; {new Date().getFullYear()} <BrandName />. All Rights Reserved.</p>
                    <p className={styles.developerCredit}>
                        Designed and Developed by{" "}
                        <a
                            href="https://qubizon.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.developerLink}
                        >
                            Qubizon.com
                        </a>
                    </p>
                    <div className={styles.bottomLinks}>
                        <Link href="/legal/privacy">Privacy Policy</Link>
                        <Link href="/legal/terms">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
