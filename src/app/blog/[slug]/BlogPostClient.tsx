"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Check,
    Copy,
    MessageCircle,
    Phone,
    Sparkles,
    BookOpen,
    ChevronRight,
    Award
} from "lucide-react";
import { Blog as BlogType } from "@/lib/types";
import { getValidImageUrl } from "@/lib/image";
import styles from "./BlogPost.module.css";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface BlogPostClientProps {
    post: BlogType;
    relatedPosts?: BlogType[];
}

export default function BlogPostClient({ post, relatedPosts = [] }: BlogPostClientProps) {
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeHeadingId, setActiveHeadingId] = useState<string>("");
    const contentRef = useRef<HTMLDivElement>(null);

    // Calculate estimated reading time
    const readingTime = useMemo(() => {
        if (!post.content) return 2;
        const plainText = post.content.replace(/<[^>]*>/g, " ");
        const words = plainText.trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(words / 200));
    }, [post.content]);

    // Reading progress bar tracking
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Extract headings for Table of Contents & setup intersection observer
    useEffect(() => {
        if (!contentRef.current) return;

        const headingNodes = contentRef.current.querySelectorAll("h2, h3");
        const items: TOCItem[] = [];

        headingNodes.forEach((node, index) => {
            const level = node.tagName.toLowerCase() === "h2" ? 2 : 3;
            const text = node.textContent?.trim() || "";
            if (!text) return;

            // Generate an id if missing
            const id = node.id || `section-${index}-${text.toLowerCase().replace(/[^\w]+/g, "-").slice(0, 30)}`;
            node.id = id;

            items.push({ id, text, level });
        });

        setHeadings(items);

        if (items.length === 0) return;

        // Observe which section is active
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeadingId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -60% 0px" }
        );

        headingNodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, [post.content]);

    // Share link handler
    const shareUrl = typeof window !== "undefined" ? window.location.href : `https://pkcevents.com/blog/${post.slug}`;

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(`${post.title}\n\nRead this guide by PKC Events:\n${shareUrl}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    };

    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        : "Recent Article";

    return (
        <div className={styles.pageWrapper}>
            {/* READING PROGRESS BAR */}
            <div
                className={styles.progressBar}
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            <div className={styles.editorialContainer}>
                {/* TOP BREADCRUMB NAVIGATION */}
                <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
                    <Link href="/blog" className={styles.backBtn}>
                        <ArrowLeft size={16} />
                        <span>All Articles</span>
                    </Link>
                    <span className={styles.breadcrumbDivider}>/</span>
                    <span className={styles.breadcrumbCategory}>{post.category || "Event Planning Tips"}</span>
                </nav>

                {/* ARTICLE HERO HEADER */}
                <header className={styles.articleHeader}>
                    <div className={styles.headerTopRow}>
                        <div className={styles.brandTagline}>“Stories, Celebrations &amp; Culinary Artistry”</div>
                        <div className={styles.categoryBadge}>
                            <Sparkles size={13} className={styles.badgeIcon} />
                            <span>{post.category || "Wedding Planning Tips"}</span>
                        </div>
                    </div>

                    <h1 className={styles.articleTitle}>{post.title}</h1>

                    {/* AUTHOR & METADATA BAR */}
                    <div className={styles.metaRow}>
                        <div className={styles.authorBadge}>
                            <div className={styles.authorAvatar}>
                                <Image
                                    src="/logo.png"
                                    alt="PKC Editorial"
                                    width={40}
                                    height={40}
                                    className={styles.avatarImg}
                                />
                            </div>
                            <div className={styles.authorInfo}>
                                <div className={styles.authorName}>
                                    <span>{post.author || "PKC Editorial Team"}</span>
                                    <span className={styles.verifiedTag}>Verified Specialists</span>
                                </div>
                                <span className={styles.authorRole}>Pride Kitchen Caterers &amp; Events</span>
                            </div>
                        </div>

                        <div className={styles.metaStats}>
                            <div className={styles.metaStatItem}>
                                <Calendar size={15} />
                                <span>{formattedDate}</span>
                            </div>
                            <span className={styles.metaDot}>•</span>
                            <div className={styles.metaStatItem}>
                                <Clock size={15} />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>

                        {/* SOCIAL SHARE BUTTONS */}
                        <div className={styles.shareButtons}>
                            <button
                                type="button"
                                onClick={handleWhatsAppShare}
                                className={`${styles.shareBtn} ${styles.shareWhatsApp}`}
                                title="Share on WhatsApp"
                                aria-label="Share on WhatsApp"
                            >
                                <MessageCircle size={16} />
                                <span className={styles.shareBtnText}>Share</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className={styles.shareBtn}
                                title="Copy Link"
                                aria-label="Copy Link"
                            >
                                {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                                <span className={styles.shareBtnText}>{copied ? "Copied!" : "Copy"}</span>
                            </button>
                        </div>
                    </div>

                    {/* CINEMATIC COVER IMAGE */}
                    <div className={styles.heroImageWrapper}>
                        <Image
                            src={getValidImageUrl(post.image)}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className={styles.heroImage}
                            priority
                        />
                        <div className={styles.imageOverlayGradient} />
                    </div>
                </header>

                {/* MAIN CONTENT + STICKY SIDEBAR GRID */}
                <div className={styles.contentGrid}>
                    {/* ARTICLE BODY */}
                    <article className={styles.mainArticle}>
                        <div
                            ref={contentRef}
                            className={styles.proseContent}
                            dangerouslySetInnerHTML={{ __html: post.content || "<p>Article content coming soon.</p>" }}
                        />

                        {/* AUTHOR BIO & TRUST CARD */}
                        <div className={styles.authorBioCard}>
                            <div className={styles.bioHeader}>
                                <div className={styles.bioAvatarLarge}>
                                    <Image
                                        src="/logo.png"
                                        alt="Pride Kitchen Caterers"
                                        width={56}
                                        height={56}
                                    />
                                </div>
                                <div>
                                    <div className={styles.bioTag}>ABOUT THE AUTHOR</div>
                                    <h4 className={styles.bioName}>{post.author || "Pride Kitchen Caterers & Events"}</h4>
                                    <div className={styles.bioSubtitle}>Kerala’s Premier Wedding &amp; Event Management Experts</div>
                                </div>
                            </div>
                            <p className={styles.bioDescription}>
                                Founded in 2008 in Thrissur, Pride Kitchen Caterers &amp; Events has crafted over 2,500+ luxury weddings, corporate summits, and cultural celebrations across Thrissur, Kochi, and all of Kerala. We combine authentic culinary mastery with end-to-end event production, bespoke stage decor, venue booking, and photography.
                            </p>
                            <div className={styles.bioBadges}>
                                <div className={styles.bioBadgeItem}>
                                    <Award size={15} color="#FCB318" />
                                    <span>FSSAI &amp; ISO 9001:2015 Certified</span>
                                </div>
                                <div className={styles.bioBadgeItem}>
                                    <Sparkles size={15} color="#FCB318" />
                                    <span>16+ Years Experience</span>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM CTA BANNER */}
                        <div className={styles.luxuryCtaBanner}>
                            <div className={styles.ctaGlow} />
                            <div className={styles.ctaContent}>
                                <span className={styles.ctaEyebrow}>START PLANNING YOUR CELEBRATION</span>
                                <h3 className={styles.ctaHeadline}>
                                    Ready to make your dream event a reality?
                                </h3>
                                <p className={styles.ctaParagraph}>
                                    Whether it is an intimate engagement, a grand royal wedding, or an elegant corporate event, our master chefs and planners handle every detail seamlessly.
                                </p>
                                <div className={styles.ctaActions}>
                                    <Link href="/contact" className={styles.ctaPrimaryBtn}>
                                        <span>Request Free Consultation</span>
                                        <ChevronRight size={16} />
                                    </Link>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20management%20and%20catering."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.ctaSecondaryBtn}
                                    >
                                        <MessageCircle size={16} />
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* STICKY SIDEBAR */}
                    <aside className={styles.sidebar}>
                        <div className={styles.stickySidebarInner}>
                            {/* TABLE OF CONTENTS WIDGET */}
                            {headings.length > 1 && (
                                <div className={styles.tocCard}>
                                    <div className={styles.tocHeader}>
                                        <BookOpen size={16} color="#FCB318" />
                                        <span>In This Article</span>
                                    </div>
                                    <ul className={styles.tocList}>
                                        {headings.map((item) => (
                                            <li
                                                key={item.id}
                                                className={`${styles.tocItem} ${item.level === 3 ? styles.tocSubItem : ""} ${activeHeadingId === item.id ? styles.tocItemActive : ""}`}
                                            >
                                                <a
                                                    href={`#${item.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const el = document.getElementById(item.id);
                                                        if (el) {
                                                            const yOffset = -90;
                                                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                            window.scrollTo({ top: y, behavior: "smooth" });
                                                        }
                                                    }}
                                                >
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* QUICK CONSULTATION SIDEBAR CARD */}
                            <div className={styles.sidebarConsultCard}>
                                <div className={styles.sidebarCardBadge}>DIRECT ASSISTANCE</div>
                                <h4 className={styles.sidebarCardTitle}>Planning an Event in Thrissur or Kochi?</h4>
                                <p className={styles.sidebarCardText}>
                                    Speak directly with our senior event coordinator for custom menu tastings, venue options, and transparent pricing.
                                </p>
                                <a
                                    href="tel:+918138002333"
                                    className={styles.sidebarPhoneBtn}
                                >
                                    <Phone size={16} />
                                    <span>+91 81380 02333</span>
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20plan%20an%20event."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.sidebarWhatsAppBtn}
                                >
                                    <MessageCircle size={16} />
                                    <span>WhatsApp Inquiry</span>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* RELATED ARTICLES SECTION */}
                {relatedPosts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <div className={styles.relatedHeader}>
                            <div>
                                <span className={styles.relatedEyebrow}>EXPLORE MORE INSPIRATION</span>
                                <h2 className={styles.relatedTitle}>
                                    <span>“Our thoughts and experiences</span> handcrafted into words”
                                </h2>
                            </div>
                            <Link href="/blog" className={styles.viewAllBtn}>
                                <span>View All Posts</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.id || related._id || related.slug}
                                    href={`/blog/${related.slug}`}
                                    className={styles.relatedCard}
                                >
                                    <div className={styles.relatedImgWrapper}>
                                        <Image
                                            src={getValidImageUrl(related.image)}
                                            alt={related.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className={styles.relatedImg}
                                        />
                                    </div>
                                    <div className={styles.relatedCardContent}>
                                        <div className={styles.relatedCardCategory}>
                                            {related.category || "Wedding Tips"}
                                        </div>
                                        <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                                        <p className={styles.relatedCardExcerpt}>
                                            {related.content
                                                ? related.content.replace(/<[^>]*>/g, "").substring(0, 95) + "..."
                                                : ""}
                                        </p>
                                        <span className={styles.readMoreLink}>
                                            Read Article <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
