"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Clock,
    ShieldCheck,
    Award,
    Users,
    CheckCircle2,
    ArrowRight,
    ChevronDown,
    MapPin,
    Calendar,
    Phone,
    MessageCircle,
    Utensils,
    Building2,
    Palette,
    Camera,
    HeartHandshake,
    Heart
} from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';
import styles from './ThrissurPage.module.css';

interface ThrissurPageClientProps {
    whyFamiliesChoose: Array<{ title: string; desc: string }>;
    planningSteps: Array<{ step: string; title: string; desc: string }>;
    areasCoveredList: string[];
    faqs: Array<{ q: string; a: string }>;
}

export default function ThrissurPageClient({
    whyFamiliesChoose,
    planningSteps,
    areasCoveredList,
    faqs
}: ThrissurPageClientProps) {
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
                    src="/image/hero2.webp"
                    alt="Premier event management and wedding production in Thrissur by PKC Events"
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
                            <span className={styles.activeCrumb}>Event Management in Thrissur</span>
                        </nav>

                        <span className={styles.heroTag}>
                            Thrissur Headquarters &amp; Central Kerala Specialists
                        </span>

                        <h1 className={styles.heroTitle}>
                            Event Management in Thrissur
                        </h1>

                        <p className={styles.heroDesc}>
                            Looking for reliable event management in Thrissur? Pride Kitchen Caterers &amp; Events (PKC Events) has planned, cooked for and produced weddings, receptions and corporate events across Thrissur district since 2008. We are headquartered in Mannuthy, so our kitchen, decor team and coordinators are minutes from your venue, not a day&apos;s drive away.
                        </p>
                        <p className={styles.heroDesc}>
                            One team handles the menu, the stage, the photographers, the bridal car and the guest flow. You get a single point of contact, one quote and one plan, from the first site visit to the last plate served.
                        </p>

                        <div className={styles.heroActions}>
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsQuoteOpen(true)}
                            >
                                Get a Free Quote
                            </button>
                            <a
                                href="https://wa.me/918138002333"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.85)' }}
                            >
                                <MessageCircle size={18} />
                                WhatsApp Us
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
                            <Clock size={22} />
                        </div>
                        <span className={styles.trustText}>18+ years in Thrissur</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <Users size={22} />
                        </div>
                        <span className={styles.trustText}>2,500+ events delivered</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <ShieldCheck size={22} />
                        </div>
                        <span className={styles.trustText}>FSSAI &amp; ISO 22000 certified kitchen</span>
                    </div>
                    <div className={styles.trustItem}>
                        <div className={styles.trustIconBadge}>
                            <Award size={22} />
                        </div>
                        <span className={styles.trustText}>Metro Food Award 2023, 2024, 2025</span>
                    </div>
                </section>
            </div>

            {/* 3. H2 — Our Event Management Services in Thrissur */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>WHAT WE OFFER</span>
                        <h2 className={styles.sectionTitle}>
                            Our Event Management Services in Thrissur
                        </h2>
                    </div>

                    <div className={styles.servicesGrid}>
                        {/* H3 — Wedding Planning in Thrissur */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <HeartHandshake size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Wedding Planning in Thrissur</h3>
                                <p className={styles.serviceDesc}>
                                    Hindu, Christian and Muslim weddings each follow their own rhythm, and Thrissur families expect every ritual to be respected. Our wedding planners in Thrissur manage engagement functions, muhurtham-day logistics, church receptions, nikah dinners and grand evening receptions. We coordinate timing, seating, vendor arrivals and guest movement so the family can stay with the guests.
                                </p>
                            </div>
                            <Link href="/services/destination-wedding" className={styles.serviceLink}>
                                See destination weddings &rarr;
                            </Link>
                        </div>

                        {/* H3 — Traditional Sadhya & Multi-Cuisine Catering */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Utensils size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Traditional Sadhya &amp; Multi-Cuisine Catering</h3>
                                <p className={styles.serviceDesc}>
                                    Catering is where PKC began, and it is still the heart of every event we run. Our Thrissur kitchen serves a full Kerala sadhya on banana leaf, alongside North Indian, Arabian, Chinese and Continental menus and live counters. Every dish comes out of an FSSAI-licensed, ISO 22000-certified kitchen, so 300 guests or 3,000 get the same taste and hygiene.
                                </p>
                            </div>
                            <Link href="/services/catering" className={styles.serviceLink}>
                                Explore premium catering &rarr;
                            </Link>
                        </div>

                        {/* H3 — Stage Decoration & Floral Design */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Palette size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Stage Decoration &amp; Floral Design</h3>
                                <p className={styles.serviceDesc}>
                                    From temple-inspired mandapams with jasmine and marigold to minimal white-and-gold reception stages, we design and build the set in-house. Services include LED backdrops, entrance arches, bridal entry concepts, table styling and lighting.
                                </p>
                            </div>
                            <Link href="/services/decoration" className={styles.serviceLink}>
                                View decoration work &rarr;
                            </Link>
                        </div>

                        {/* H3 — Corporate Events in Thrissur */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Building2 size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Corporate Events in Thrissur</h3>
                                <p className={styles.serviceDesc}>
                                    Thrissur is home to banks, jewellers, hospitals and colleges, and each needs events that run to the minute. We manage dealer meets, annual days, product launches, conferences, award nights and college fests, including stage, sound, AV, catering and guest registration.
                                </p>
                            </div>
                            <Link href="/services/corporate-event" className={styles.serviceLink}>
                                Corporate event services &rarr;
                            </Link>
                        </div>

                        {/* H3 — Family Celebrations */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Heart size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Family Celebrations</h3>
                                <p className={styles.serviceDesc}>
                                    Not every event is a wedding. We plan birthdays, first rice feeding (choroonu), housewarmings, baptisms, Holy Communion parties, anniversaries and retirement functions, scaled to a home courtyard or an auditorium.
                                </p>
                            </div>
                            <Link href="/contact" className={styles.serviceLink}>
                                Plan family celebration <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* H3 — Photography, Make-up, Entertainment & Wedding Cars */}
                        <div className={styles.serviceCard}>
                            <div>
                                <div className={styles.cardIconBadge}>
                                    <Camera size={24} />
                                </div>
                                <h3 className={styles.serviceTitle}>Photography, Make-up, Entertainment &amp; Wedding Cars</h3>
                                <p className={styles.serviceDesc}>
                                    Add candid photography and cinematic films, bridal make-up, live bands, chenda melam or DJ, and premium wedding cars to the same booking. One coordinator manages them all.
                                </p>
                            </div>
                            <div className={styles.subLinksList}>
                                <Link href="/services/photography" className={styles.subLinkItem}>Photography</Link>
                                <Link href="/services/makeup" className={styles.subLinkItem}>Make-up</Link>
                                <Link href="/services/entertainment" className={styles.subLinkItem}>Entertainment</Link>
                                <Link href="/services/cars" className={styles.subLinkItem}>Premium cars</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. H2 — Why Families Choose PKC Events as Their Event Management Company in Thrissur */}
            <section className={styles.whyChooseSection}>
                <div className="container">
                    <div className={styles.whyHeader}>
                        <span className={styles.sectionEyebrow}>THE PKC ADVANTAGE</span>
                        <h2 className={styles.whyTitle}>
                            Why Families Choose PKC Events as Their Event Management Company in Thrissur
                        </h2>
                    </div>

                    <div className={styles.whyList}>
                        {whyFamiliesChoose.map((point, i) => (
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
                            Get a Free Quote
                        </button>
                        <a
                            href="https://wa.me/918138002333"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ color: '#fff', borderColor: '#fff' }}
                        >
                            <MessageCircle size={18} />
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* 5. H2 — How We Plan Your Event in Thrissur */}
            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>OUR PROVEN WORKFLOW</span>
                        <h2 className={styles.sectionTitle}>
                            How We Plan Your Event in Thrissur
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

            {/* 6. TWO COL: Areas We Cover + Calendar */}
            <section className={styles.twoColSection}>
                <div className="container">
                    <div className={styles.twoColGrid}>
                        {/* H2 — Areas We Cover Across Thrissur District */}
                        <div className={styles.infoCard}>
                            <div className={styles.infoCardHeader}>
                                <div className={styles.infoCardIconBadge}>
                                    <MapPin size={24} />
                                </div>
                                <h2 className={styles.infoCardTitle}>
                                    Areas We Cover Across Thrissur District
                                </h2>
                            </div>
                            <p className={styles.infoCardText}>
                                Our event management in Thrissur covers the whole district: Thrissur town and Swaraj Round, Mannuthy, Ollur, Puzhakkal, Guruvayur, Chavakkad, Kunnamkulam, Wadakkanchery, Irinjalakuda, Chalakudy, Kodungallur, Triprayar and Kodakara. We also travel to Palakkad, Malappuram and Kochi for clients who want the same team.
                            </p>
                            <div className={styles.pillsWrap}>
                                {areasCoveredList.map((area) => (
                                    <span key={area} className={styles.areaPill}>
                                        <MapPin size={12} color="#fcb318" />
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* H2 — Planning Around Thrissur's Event Calendar */}
                        <div className={styles.infoCard}>
                            <div className={styles.infoCardHeader}>
                                <div className={styles.infoCardIconBadge}>
                                    <Calendar size={24} />
                                </div>
                                <h2 className={styles.infoCardTitle}>
                                    Planning Around Thrissur&apos;s Event Calendar
                                </h2>
                            </div>
                            <p className={styles.infoCardText}>
                                Thrissur&apos;s best wedding dates fill early. Auspicious muhurtham days, the Onam and Christmas seasons and the weeks around Thrissur Pooram see venues, decorators and caterers booked months ahead. For Guruvayur temple weddings, the ceremony itself is short and slot-based, so most families host the sadhya and reception at a nearby auditorium. We plan transport and timing between the two. Book 3–6 months ahead for peak dates.
                            </p>
                            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                                <Link href="/services/catering" className={styles.serviceLink}>
                                    Explore traditional wedding sadhya catering &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. H2 — Frequently Asked Questions: Event Management in Thrissur */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className={styles.faqHeader}>
                        <h2 className={styles.faqMainTitle}>
                            <span style={{ color: '#000000' }}>FREQUENTLY ASKED</span> QUESTIONS
                        </h2>
                        <p className={styles.faqSubtitle}>Event Management in Thrissur</p>
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

            {/* 8. H2 (CTA band) — Plan Your Event in Thrissur With PKC Events */}
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
                        Plan Your Event in Thrissur With PKC Events
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Tell us your date, guest count and venue, and our Thrissur team will send a tailored plan and quote. Call +91 81380 02333, WhatsApp us, or visit Arammel Arcade, Mannuthy–Madakkathara Road, Thrissur 680651.
                    </p>
                    <div className={styles.ctaButtons}>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Get a Free Quote &rarr;
                        </button>
                        <a
                            href="https://wa.me/918138002333"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ color: '#fff', borderColor: '#fcb318' }}
                        >
                            <MessageCircle size={18} />
                            WhatsApp Us
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
                        <Link href="/event-management-kochi" className={styles.crossLinkItem}>Event Management Kochi</Link>
                    </div>
                </div>
            </section>

            {/* Lead Modal */}
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </div>
    );
}
