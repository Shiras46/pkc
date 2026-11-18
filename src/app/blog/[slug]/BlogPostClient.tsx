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
    Mail,
    BookOpen,
    ChevronRight
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
    const [heroSrc, setHeroSrc] = useState(getValidImageUrl(post.image));
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

        // Query all candidate heading nodes (explicit headings & standalone bold paragraph titles)
        const candidates = Array.from(contentRef.current.querySelectorAll("h2, h3, h4, h5, p, div"));
        const potentialHeadingNodes: HTMLElement[] = [];

        candidates.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const tag = htmlEl.tagName.toLowerCase();

            if (tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5") {
                potentialHeadingNodes.push(htmlEl);
                return;
            }

            // Check if paragraph or div represents a section title (e.g. <p><strong>4. Ask About Customisation</strong></p>)
            const text = htmlEl.textContent?.trim() || "";
            if (text.length < 3 || text.length > 100) return;

            const firstChild = htmlEl.firstElementChild;
            const hasStrongOrB = htmlEl.querySelector("strong, b");
            const isOnlyBold = firstChild && (firstChild.tagName.toLowerCase() === "strong" || firstChild.tagName.toLowerCase() === "b") && htmlEl.children.length === 1;
            const isNumberedHeading = /^[0-9]+[\.\)]\s+/.test(text);
            const isKeywordsHeading = /^(why|how|what|top|tips|best|key|conclusion|checklist|summary|benefits|factors|steps|guide)/i.test(text);

            if (isOnlyBold || (hasStrongOrB && (isNumberedHeading || isKeywordsHeading))) {
                htmlEl.classList.add(styles.promotedHeading);
                potentialHeadingNodes.push(htmlEl);
            }
        });

        const items: TOCItem[] = [];

        potentialHeadingNodes.forEach((node, index) => {
            const tag = node.tagName.toLowerCase();
            const level = tag === "h3" || tag === "h4" ? 3 : 2;
            const text = node.textContent?.trim() || "";
            if (!text) return;

            // Generate an id if missing
            const id = node.id || `section-${index}-${text.toLowerCase().replace(/[^\w]+/g, "-").slice(0, 30)}`;
            node.id = id;

            items.push({ id, text, level });
        });

        setHeadings(items);

        if (potentialHeadingNodes.length === 0) return;

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

        potentialHeadingNodes.forEach((node) => observer.observe(node));
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
                            src={heroSrc}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className={styles.heroImage}
                            priority
                            onError={() => {
                                if (heroSrc !== '/image/services/wedding-catering.webp') {
                                    setHeroSrc('/image/services/wedding-catering.webp');
                                } else {
                                    setHeroSrc('/image/about.webp');
                                }
                            }}
                        />
                        <div className={styles.imageOverlayGradient} />
                    </div>
                </header>

                {/* FULL SCREEN LEVEL ARTICLE CONTAINER */}
                <div className={styles.fullArticleContainer}>
                    {/* ARTICLE BODY */}
                    <article className={styles.mainArticle}>
                        <div
                            ref={contentRef}
                            className={styles.proseContent}
                            dangerouslySetInnerHTML={{ __html: post.content || "<p>Article content coming soon.</p>" }}
                        />

                        {/* BOTTOM CTA BANNER (EDITABLE VIA ADMIN PANEL) */}
                        {post.showCta !== false && (
                            <div className={styles.luxuryCtaBanner}>
                                <div className={styles.ctaGlow} />
                                <div className={styles.ctaContent}>
                                    <span className={styles.ctaEyebrow}>
                                        {post.ctaEyebrow || "START PLANNING YOUR CELEBRATION"}
                                    </span>
                                    <h3 className={styles.ctaHeadline}>
                                        {post.ctaTitle || "Ready to make your dream event a reality?"}
                                    </h3>
                                    <p className={styles.ctaParagraph}>
                                        {post.ctaDescription || "Whether it is an intimate engagement, a grand royal wedding, or an elegant corporate event, our master chefs and planners handle every detail seamlessly."}
                                    </p>
                                    <div className={styles.ctaActions}>
                                        {(() => {
                                            const primaryLink = post.ctaButtonLink || "/contact";
                                            const primaryText = post.ctaButtonText || "Request Free Consultation";
                                            const isPrimaryTel = primaryLink.startsWith("tel:");
                                            const isPrimaryMail = primaryLink.startsWith("mailto:");
                                            const isPrimaryExternal = primaryLink.startsWith("http://") || primaryLink.startsWith("https://");

                                            if (isPrimaryTel || isPrimaryMail) {
                                                return (
                                                    <a href={primaryLink} className={styles.ctaPrimaryBtn}>
                                                        {isPrimaryTel ? <Phone size={16} /> : <Mail size={16} />}
                                                        <span>{primaryText}</span>
                                                    </a>
                                                );
                                            }

                                            if (isPrimaryExternal) {
                                                return (
                                                    <a href={primaryLink} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimaryBtn}>
                                                        <span>{primaryText}</span>
                                                        <ChevronRight size={16} />
                                                    </a>
                                                );
                                            }

                                            return (
                                                <Link href={primaryLink} className={styles.ctaPrimaryBtn}>
                                                    <span>{primaryText}</span>
                                                    <ChevronRight size={16} />
                                                </Link>
                                            );
                                        })()}

                                        {(() => {
                                            const secondaryLink = post.ctaSecondaryLink || "https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20management%20and%20catering.";
                                            const secondaryText = post.ctaSecondaryText || "Chat on WhatsApp";
                                            const isSecTel = secondaryLink.startsWith("tel:");
                                            const isSecMail = secondaryLink.startsWith("mailto:");

                                            if (isSecTel) {
                                                return (
                                                    <a href={secondaryLink} className={styles.ctaSecondaryBtn}>
                                                        <Phone size={16} />
                                                        <span>{secondaryText}</span>
                                                    </a>
                                                );
                                            }

                                            if (isSecMail) {
                                                return (
                                                    <a href={secondaryLink} className={styles.ctaSecondaryBtn}>
                                                        <Mail size={16} />
                                                        <span>{secondaryText}</span>
                                                    </a>
                                                );
                                            }

                                            return (
                                                <a
                                                    href={secondaryLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.ctaSecondaryBtn}
                                                >
                                                    <MessageCircle size={16} />
                                                    <span>{secondaryText}</span>
                                                </a>
                                            );
                                        })()}
                                    </div>

                                    {(post.ctaPhone || post.ctaEmail) && (
                                        <div className={styles.ctaDirectContact}>
                                            {post.ctaPhone && (
                                                <a
                                                    href={`tel:${post.ctaPhone.replace(/[^\d+]/g, '')}`}
                                                    className={styles.ctaDirectItem}
                                                    title={`Call ${post.ctaPhone}`}
                                                >
                                                    <Phone size={14} className={styles.ctaDirectIcon} />
                                                    <span>Call: <strong>{post.ctaPhone}</strong></span>
                                                </a>
                                            )}
                                            {post.ctaPhone && post.ctaEmail && (
                                                <span className={styles.ctaDirectDivider}>•</span>
                                            )}
                                            {post.ctaEmail && (
                                                <a
                                                    href={`mailto:${post.ctaEmail}`}
                                                    className={styles.ctaDirectItem}
                                                    title={`Email ${post.ctaEmail}`}
                                                >
                                                    <Mail size={14} className={styles.ctaDirectIcon} />
                                                    <span>Email: <strong>{post.ctaEmail}</strong></span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
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
