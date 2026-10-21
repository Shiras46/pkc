"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar,
    ShieldCheck,
    Award,
    Users,
    CheckCircle2,
    ArrowRight,
    ChevronDown,
    MapPin,
    Compass,
    Phone,
    MessageCircle,
    Utensils,
    Building2,
    Palette,
    Camera,
    Sparkles
} from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';
import styles from './KochiPage.module.css';

interface KochiPageClientProps {
    trustItems: Array<{ icon: string; text: string }>;
    whyChoosePoints: Array<{ title: string; desc: string }>;
    planningSteps: Array<{ step: string; title: string; desc: string }>;
    areasServedList: string[];
    faqs: Array<{ q: string; a: string }>;
}

export default function KochiPageClient({
    whyChoosePoints,
    planningSteps,
    areasServedList,
    faqs
}: KochiPageClientProps) {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveFaqIndex(prev => prev === index ? null : index);
    };

    return (
        <div className={styles.pageWrapper}>
            {/* 1. HERO SECTION */}
            <header className={styles.hero}>
                <Image
                    src="/image/hero1.webp"
                    alt="Luxury wedding and corporate event management in Kochi by PKC Events"
                    fill
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.heroOverlay} />
                <div className="container">
                    <div className={styles.heroContent}>
                        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <span className={styles.activeCrumb}>Event Management in Kochi</span>
                        </nav>

                        <span className={styles.heroTag}>
                            Kochi &amp; Ernakulam Event Specialists
                        </span>

                        <h1 className={styles.heroTitle}>
                            Event Management in Kochi
                        </h1>

                        <p className={styles.heroDesc}>
                            PKC Events brings 18 years of event management in Kochi and across Kerala to your wedding, conference or gala. Pride Kitchen Caterers &amp; Events has delivered more than 2,500 events since 2008, built on a certified kitchen and an in-house team for decor, production and coordination.
                        </p>
                        <p className={styles.heroDesc}>
                            Kochi events move fast: tight venue windows, city traffic, guests flying into Cochin International Airport and corporate schedules that cannot slip. We plan for all of it, so your event starts on time and runs to plan.
                        </p>

                        <div className={styles.heroActions}>
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsQuoteOpen(true)}
                            >
                                Request a Proposal
                            </button>
                            <a
                                href="https://wa.me/918138002333"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.85)' }}
                            >
                                <MessageCircle size={18} />
                                Chat With an Event Manager
                            </a>
                            <a
                                href="tel:+918138002333"
                                className="btn btn-outline"
                                style={{ color: '#fcb318', borderColor: '#fcb318' }}
                            >
                                <Phone size={18} />
                                +91 81380 02333
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. FLOATING TRUST STRIP */}
            <div className={`container ${styles.trustContainer}`}>
                <section className={styles.trustStrip} aria-label="Key Trust Indicators">
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <Calendar size={22} />
                        </div>
                        <span className={styles.trustText}>2,500+ events since 2008</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <ShieldCheck size={22} />
                        </div>
                        <span className={styles.trustText}>FSSAI &amp; ISO 22000 certified catering</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <Award size={22} />
                        </div>
                        <span className={styles.trustText}>Metro Food Award 2023, 2024, 2025</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <Users size={22} />
                        </div>
                        <span className={styles.trustText}>Weddings to corporate summits</span>
                    </div>
                </section>
            </div>

            {/* 3. H2 — Event Management Services in Kochi */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>WHAT WE OFFER</span>
                        <h2 className={styles.sectionTitle}>
                            Event Management Services in Kochi
                        </h2>
                    </div>

                    <div className={styles.servicesGrid}>
                        {/* H3 — Wedding Planning in Kochi */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Sparkles size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Wedding Planning in Kochi</h3>
                                <p className={styles.serviceDesc}>
                                    Kochi weddings range from 200-guest church receptions to large Hindu and Muslim weddings with multi-day functions. Our wedding planners in Kochi handle engagement, mehendi and haldi nights, the wedding day and the reception. That includes stage design, catering, guest seating, photography and bridal cars, all under one coordinator.
                                </p>
                            </div>
                            <Link href="/contact" className={styles.serviceLink}>
                                Plan your wedding <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* H3 — Destination & Waterfront Weddings */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Compass size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Destination &amp; Waterfront Weddings</h3>
                                <p className={styles.serviceDesc}>
                                    Couples from the Gulf, Bengaluru and abroad choose Kochi for its backwaters, beaches and heritage. We plan weddings and receptions at waterfront resorts, Fort Kochi heritage properties, Cherai beach venues and backwater locations around Kumbalangi. We also handle guest logistics from airport pickup to the farewell lunch.
                                </p>
                            </div>
                            <Link href="/services/destination-wedding" className={styles.serviceLink}>
                                Destination wedding services &rarr;
                            </Link>
                        </div>

                        {/* H3 — Corporate Event Management in Kochi */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Building2 size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Corporate Event Management in Kochi</h3>
                                <p className={styles.serviceDesc}>
                                    Kochi is Kerala&apos;s business capital, with IT parks in Kakkanad, a port economy and a growing startup scene. We manage conferences, dealer and channel meets, product launches, annual days, award nights, team offsites and gala dinners. Each comes with stage, sound, LED walls, registration desks and catering timed to your agenda.
                                </p>
                            </div>
                            <Link href="/services/corporate-event" className={styles.serviceLink}>
                                Corporate event services &rarr;
                            </Link>
                        </div>

                        {/* H3 — Premium Catering Services in Kochi */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Utensils size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Premium Catering Services in Kochi</h3>
                                <p className={styles.serviceDesc}>
                                    Our FSSAI-licensed, ISO 22000-certified kitchen serves traditional Kerala sadhya, Malabar biryani, Syrian Christian specialities, North Indian, Arabian and Continental menus. Live counters, dessert displays and high-tea service suit both weddings and corporate events.
                                </p>
                            </div>
                            <Link href="/services/catering" className={styles.serviceLink}>
                                Explore premium catering &rarr;
                            </Link>
                        </div>

                        {/* H3 — Decor, Lighting & Production */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Palette size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Decor, Lighting &amp; Production</h3>
                                <p className={styles.serviceDesc}>
                                    We design and build stages, floral installations, LED backdrops and entrance concepts in-house. Sound, cinematic lighting, artist and celebrity coordination, and live entertainment are managed by the same team.
                                </p>
                            </div>
                            <div className={styles.subLinksList}>
                                <Link href="/services/decoration" className={styles.subLinkItem}>Decoration</Link>
                                <Link href="/services/entertainment" className={styles.subLinkItem}>Entertainment</Link>
                                <Link href="/services/venue" className={styles.subLinkItem}>Venue management</Link>
                            </div>
                        </div>

                        {/* H3 — Photography, Make-up & Luxury Cars */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Camera size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Photography, Make-up &amp; Luxury Cars</h3>
                                <p className={styles.serviceDesc}>
                                    Add candid photography and wedding films, bridal make-up and premium wedding cars to the same booking.
                                </p>
                            </div>
                            <div className={styles.subLinksList}>
                                <Link href="/services/photography" className={styles.subLinkItem}>Photography</Link>
                                <Link href="/services/makeup" className={styles.subLinkItem}>Make-up</Link>
                                <Link href="/services/cars" className={styles.subLinkItem}>Premium cars</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. H2 — Why Kochi Clients Choose PKC Events as Their Event Management Company */}
            <section className={styles.whyChooseSection}>
                <div className="container">
                    <div className={styles.whyHeader}>
                        <span className={styles.sectionEyebrow}>THE PKC ADVANTAGE</span>
                        <h2 className={styles.whyTitle}>
                            Why Kochi Clients Choose PKC Events as Their Event Management Company
                        </h2>
                    </div>

                    <div className={styles.whyList}>
                        {whyChoosePoints.map((point, i) => (
                            <div key={i} className={styles.whyItem}>
                                <div className={styles.whyCheckBadge}>
                                    <CheckCircle2 size={18} />
                                </div>
                                <div>
                                    <h3 className={styles.whyItemTitle}>{point.title}</h3>
                                    <p className={styles.whyItemDesc}>{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.whyActions}>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Request a Proposal
                        </button>
                        <a
                            href="https://wa.me/918138002333"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ color: '#fff', borderColor: '#fff' }}
                        >
                            <MessageCircle size={18} />
                            Chat with an Event Manager
                        </a>
                    </div>
                </div>
            </section>

            {/* 5. H2 — How We Plan Your Event in Kochi */}
            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>OUR PROVEN WORKFLOW</span>
                        <h2 className={styles.sectionTitle}>
                            How We Plan Your Event in Kochi
                        </h2>
                    </div>

                    <div className={styles.processGrid}>
                        {planningSteps.map((step) => (
                            <div key={step.step} className={styles.processCard}>
                                <div className={styles.processNumber}>0{step.step}</div>
                                <h3 className={styles.processStepTitle}>{step.title}</h3>
                                <p className={styles.processStepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. TWO COL: Areas We Serve + Destination Event */}
            <section className={styles.twoColSection}>
                <div className="container">
                    <div className={styles.twoColGrid}>
                        {/* H2 — Areas We Serve in Kochi & Ernakulam */}
                        <div className={styles.infoCard}>
                            <div className={styles.infoCardHeader}>
                                <div className={styles.infoCardIconBadge}>
                                    <MapPin size={24} />
                                </div>
                                <h2 className={styles.infoCardTitle}>
                                    Areas We Serve in Kochi &amp; Ernakulam
                                </h2>
                            </div>
                            <p className={styles.infoCardText}>
                                Our event management in Kochi covers the whole of Ernakulam district: Kakkanad, Edappally, Palarivattom, Kaloor, Vyttila, MG Road and Marine Drive, Panampilly Nagar, Fort Kochi and Mattancherry, Tripunithura, Aluva, Angamaly, Nedumbassery, Perumbavoor, Kolenchery and Cherai. We also serve Alappuzha and Kottayam, and our headquarters team in Thrissur supports larger events across central Kerala.
                            </p>
                            <div className={styles.pillsWrap}>
                                {areasServedList.map((area) => (
                                    <span key={area} className={styles.areaPill}>
                                        <MapPin size={12} color="#fcb318" />
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* H2 — Planning a Destination Event in Kochi */}
                        <div className={styles.infoCard}>
                            <div className={styles.infoCardHeader}>
                                <div className={styles.infoCardIconBadge}>
                                    <Compass size={24} />
                                </div>
                                <h2 className={styles.infoCardTitle}>
                                    Planning a Destination Event in Kochi
                                </h2>
                            </div>
                            <p className={styles.infoCardText}>
                                Kochi is the easiest Kerala city for outstation guests to reach, with direct flights into Cochin International Airport at Nedumbassery. The best weather for outdoor and waterfront events runs from October to March; the monsoon (June to September) calls for covered venues and backup plans. Peak wedding and corporate season is November to February, so book three to six months ahead for those dates.
                            </p>
                            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                                <Link href="/services/destination-wedding" className={styles.serviceLink}>
                                    Explore destination wedding &amp; event services &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. H2 — Frequently Asked Questions: Event Management in Kochi */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className={styles.faqHeader}>
                        <h2 className={styles.faqMainTitle}>
                            <span style={{ color: '#000000' }}>FREQUENTLY ASKED</span> QUESTIONS
                        </h2>
                        <p className={styles.faqSubtitle}>Event Management in Kochi</p>
                    </div>

                    <div className={styles.faqAccordion}>
                        {faqs.map((faq, index) => {
                            const isOpen = activeFaqIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}
                                >
                                    <button
                                        className={styles.faqQuestionBtn}
                                        onClick={() => toggleFaq(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            size={20}
                                            className={`${styles.faqIcon} ${isOpen ? styles.active : ''}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className={styles.faqAnswer}>
                                            <p>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 8. H2 (CTA band) — Plan Your Event in Kochi With PKC Events */}
            <section className={styles.finalCtaSection}>
                <Image
                    src="/image/hero2.webp"
                    alt="Luxury event celebration background"
                    fill
                    sizes="100vw"
                    className={styles.ctaBgImage}
                />
                <div className={styles.ctaOverlay} />
                <div className={`container ${styles.ctaContent}`}>
                    <h2 className={styles.ctaTitle}>
                        Plan Your Event in Kochi With PKC Events
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Tell us your date, guest count and venue, and our event manager will send a tailored proposal. Call +91 81380 02333 or WhatsApp us to start.
                    </p>
                    <div className={styles.ctaButtons}>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Request a Proposal &rarr;
                        </button>
                        <a
                            href="https://wa.me/918138002333"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ color: '#fff', borderColor: '#fcb318' }}
                        >
                            <MessageCircle size={18} />
                            Chat With an Event Manager
                        </a>
                        <a
                            href="tel:+918138002333"
                            className="btn btn-outline"
                            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
                        >
                            <Phone size={18} />
                            +91 81380 02333
                        </a>
                    </div>
                </div>
            </section>

            {/* 9. Cross Links Section */}
            <section className={styles.crossLinksSection}>
                <div className="container">
                    <h3 className={styles.crossLinksTitle}>
                        Explore Our Event Services in Kerala
                    </h3>
                    <div className={styles.crossLinksList}>
                        <Link href="/services/catering" className={styles.crossLinkItem}>Premium Catering</Link>
                        <span className={styles.crossLinkDot}>•</span>
                        <Link href="/services/venue" className={styles.crossLinkItem}>Venue Management</Link>
                        <span className={styles.crossLinkDot}>•</span>
                        <Link href="/services/decoration" className={styles.crossLinkItem}>Event Decoration</Link>
                        <span className={styles.crossLinkDot}>•</span>
                        <Link href="/services/photography" className={styles.crossLinkItem}>Photography &amp; Films</Link>
                        <span className={styles.crossLinkDot}>•</span>
                        <Link href="/services/cars" className={styles.crossLinkItem}>Luxury Wedding Cars</Link>
                        <span className={styles.crossLinkDot}>•</span>
                        <Link href="/event-management-thrissur" className={styles.crossLinkItem}>Event Management Thrissur</Link>
                    </div>
                </div>
            </section>

            {/* Lead Modal */}
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </div>
    );
}
