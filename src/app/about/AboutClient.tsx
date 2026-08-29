"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BrandName from "@/components/ui/BrandName";
import styles from "@/styles/AboutPage.module.css";
import teamStyles from "@/components/sections/LeadershipTeam.module.css";

const leaders = [
    {
        name: "Rijo George",
        role: "Managing Director",
        image: "/image/RIJO2.webp",
        imageStyle: { objectFit: 'cover' as const, objectPosition: 'center 10%', transform: 'scale(1.12)', transformOrigin: 'center 10%' },
        description: "Rijo guides the strategic growth and operational excellence of the organisation, ensuring every project reflects the company's standards of quality, reliability, and attentive service.",
    },
    {
        name: "Mukesh E B",
        role: "Founder & CEO",
        image: "/image/MUKHU3.webp",
        imageStyle: { objectFit: 'cover' as const, objectPosition: 'center 10%', transform: 'scale(1.05)', transformOrigin: 'center 10%' },
        description: "The visionary founder of Pride Kitchen Caterers & Events. Since 2008, his commitment to culinary excellence, innovation, and thoughtful hospitality has shaped the brand into a trusted name across Kerala.",
    },
    {
        name: "Minto Vincent",
        role: "General Manager",
        image: "/image/MINTO3.webp",
        imageStyle: { objectFit: 'cover' as const, objectPosition: 'center 10%', transform: 'scale(1.12)', transformOrigin: 'center 10%' },
        description: "Minto leads day-to-day operations, event coordination, and client engagement. His attention to detail helps every celebration unfold with precision, professionalism, and care.",
    },
];

const values = [
    ["01", "Uncompromising Quality", "Commitment to quality is a non-negotiable benchmark for us, from the initial step till the concluding act. Excellence in every detail is our consistent reality rather than a mere aspiration."],
    ["02", "Exceptional Client Experience", "Experience that transcends time is what we envision for our clients. We strive to create an everlasting memory beyond our clients’ expectation, ensuring every moment feels personal, joyful and genuinely memorable."],
    ["03", "Innovation", "We cherish our deep traditional heritage while embracing creativity and modern sensibilities. Crafting a unique blend of thoughtful innovation and aesthetics, we design timeless magic transforming meaningful experiences."],
    ["04", "Collaborative Strength", "Every beautiful moment we create is a reflection of our dedicated team led by purpose and passion. We strongly believe in a culture enriched in collective energy, mutual respect, and shared dedication to create flawless execution and exceptional outcomes."],
];

const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7 },
};

export default function AboutClient() {
    const [activeLeader, setActiveLeader] = useState<number | null>(null);

    return (
        <main className={styles.wrapper}>
            <header className={styles.hero}>
                <Image
                    src="/image/about.webp"
                    alt="Luxury wedding celebration and premium event experience created by Pride Kitchen Caterers & Events in Kerala"
                    fill
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.heroOverlay} />
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                >
                    <span className={styles.eyebrow}>About Us</span>
                    <h1>Transcending celebrations into <span style={{ color: '#fcb318' }}>timeless treasures.</span></h1>
                    <p>Trusted catering and event experiences from the cultural heart of Kerala.</p>
                </motion.div>
            </header>

            <section className={styles.intro}>
                <motion.div className={styles.narrow} {...reveal}>
                    <BrandName className={styles.eyebrow} />
                    <h2 style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>Welcome to the Premium Choice</span> for meaningful moments</h2>
                    <p>
                        Pride Kitchen Caterers & Events is a synonym for excellence in every step. We never stand solemnly as an event management company, but a prestigious partner who weaves all your needs and desires. Every event we manage is designed as a dreamy affair, narrated through flavour, detail and impeccable execution.
                    </p>
                </motion.div>
            </section>

            <section className={styles.storySection}>
                <div className={styles.container}>
                    <motion.article className={styles.storyRow} {...reveal}>
                        <div className={styles.storyImage}>
                            <Image src="/image/services/catering.webp" alt="Premium Kerala catering service featuring elegant food presentation and hospitality by Pride Kitchen Caterers & Events" fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.coverImage} />
                        </div>
                        <div className={styles.storyCopy}>
                            <span className={styles.eyebrow}>The Story Behind Our Craft</span>
                            <h2 style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>A journey rooted in the symphony of</span> tradition.</h2>
                            <p>
                                Every creation starts as a beautiful aspiration, and our story is no exception. We transformed that initial spark into a living dream, giving it the name Pride Kitchen Caterers & Events. Our journey began in 2008 from the heart of the cultural capital of Kerala, Thrissur, with a passion for exceptional cuisine and refined hospitality. Founded on a guiding belief that every event is a meticulously crafted experience, we embarked with a clear purpose to elevate hospitality through integrity, care and consistent excellence. Our humble vision soon blossomed into an enduring passion for curating events with intentionality, passion, and precision.
                            </p>
                            <div className={styles.statLine}>
                                <strong>18+</strong>
                                <span>Years of creating memorable celebrations</span>
                            </div>
                        </div>
                    </motion.article>

                    <motion.article className={`${styles.storyRow} ${styles.reverse}`} {...reveal}>
                        <div className={styles.storyImage}>
                            <Image src="/image/services/decoration.webp" alt="Luxury event decoration and wedding venue styling designed by Pride Kitchen Caterers & Events in Kerala" fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.coverImage} />
                        </div>
                        <div className={styles.storyCopy}>
                            <span className={styles.eyebrow}>Our Evolution</span>
                            <h2>A Graceful Evolution Anchored by <span style={{ color: '#fcb318' }}>Heritage.</span></h2>
                            <p>
                                Soulful connections are made from the heart and each heartbeat carries a unique rhythm. We have created a symphony of extraordinary honoring the heritage without compromising our client’s satisfaction. This unwavering commitment in our quality has allowed Pride Kitchen Caterers & Events to grow alongside those we serve. Over nearly two decades, we evolved from a boutique catering service into Premium Catering & Event Management in Kerala. Ranging from weddings, receptions, and corporate events to private events and large-scale festivals, we have integrated modern luxury and global standards embracing our cultural roots.
                            </p>
                        </div>
                    </motion.article>
                </div>
            </section>

            <section className={styles.missionVisionSection}>
                <div className={styles.container}>
                    <div className={styles.missionVisionGrid}>
                        <motion.div 
                            className={styles.mvCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0 }}
                        >
                            <span className={styles.eyebrow}>Our Mission</span>
                            <h3>Artfully designing flawless & significant events</h3>
                            <p>
                                To uphold the trust our clients’ bestowed upon us by artfully designing events that are flawless as well as significant. We relentlessly focus on blending the authentic culinary heritage of Kerala with a tailored approach to hospitality. Every moment we strive to create memorable experiences from the first flavour to the final farewell, reflecting each client’s unique style and purpose.
                            </p>
                        </motion.div>
                        <motion.div 
                            className={styles.mvCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <span className={styles.eyebrow}>Our Vision</span>
                            <h3>Redefining the standards of culinary excellence</h3>
                            <p>
                                To redefine the standards of culinary excellence in Kerala and beyond. We aspire for a future where Pride Kitchen Caterers & Events is the benchmark of timeless quality for luxury event management.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className={styles.trustSection}>
                <motion.div className={styles.narrow} {...reveal}>
                    <span className={styles.eyebrow}>Our Promise</span>
                    <h2 style={{ color: '#fcb318' }}><span style={{ color: '#ffffff' }}>A Signature Imprinted with</span> Trust.</h2>
                    <p>
                        Beautiful relationships always have an invisible thread of trust bonding them forever. We hold that principle as our unwavering standard, leading Pride Kitchen Caterers & Events as a distinguished name in Kerala’s catering and event management legacy. Our signature is not in our past achievements, but in the joy we cultivate in every moment. Beyond planning or catering, we elevate your most meaningful moments into timeless memories, transforming visions into experiences beyond a lifetime.
                    </p>
                </motion.div>
            </section>

            <section className={styles.leadership}>
                <div className={styles.leadershipShell}>
                    <motion.div className={styles.leadershipHeader} {...reveal}>
                        <span className={styles.eyebrow}>Faces Behind the Brand</span>
                        <h2>The people who carry every celebration <span style={{ color: '#fcb318' }}>with care.</span></h2>
                    </motion.div>

                    <div className={teamStyles.grid} aria-label="Leadership team">
                        {leaders.map((leader, index) => (
                            <motion.div
                                key={leader.name}
                                className={teamStyles.memberCard}
                                initial={{ opacity: 0, y: 36 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.72, delay: index * 0.12 }}
                            >
                                <div className={teamStyles.imageWrapper}>
                                    <Image src={leader.image} alt={`${leader.name}, ${leader.role} of Pride Kitchen Caterers & Events in Kerala`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={leader.imageStyle} />
                                </div>
                                <span className={teamStyles.role}>{leader.role}</span>
                                <h3>{leader.name}</h3>
                                <p className={teamStyles.description}>{leader.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.philosophy}>
                <motion.div className={styles.narrow} {...reveal}>
                    <span className={styles.eyebrow}>Our Leadership Philosophy</span>
                    <h2>Where passion and teamwork create <span style={{ color: '#fcb318' }}>perfection.</span></h2>
                    <p>
                        Together, we continue to build lasting relationships and create extraordinary experiences
                        for families, businesses, and communities across Kerala.
                    </p>
                </motion.div>
            </section>

            <section className={styles.values}>
                <div className={styles.container}>
                    <motion.div className={styles.sectionHeader} {...reveal}>
                        <span className={styles.eyebrow} style={{ color: '#000' }}>What Guides Us</span>
                        <h2 style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>Our Core</span> Values</h2>
                    </motion.div>
                    <div className={styles.valuesGrid}>
                        {values.map(([number, title, text], index) => (
                            <motion.article 
                                key={number} 
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                            >
                                <span>{number}</span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
