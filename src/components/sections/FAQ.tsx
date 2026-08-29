"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BrandName from "@/components/ui/BrandName";
import styles from "./FAQ.module.css";

const faqs = [
    {
        question: "Do you provide only catering services?",
        answer: "No. We provide complete catering and event management solutions for weddings, receptions, corporate events, private functions, and festivals."
    },
    {
        question: "Are you FSSAI licensed?",
        answer: "Yes. Pride Kitchen Caterers & Events operates under a valid FSSAI State License and follows all food safety regulations."
    },
    {
        question: "Are your services ISO certified?",
        answer: "Yes. We are certified under ISO 9001:2015 and ISO 22000:2018 standards for quality management and food safety management."
    },
    {
        question: "Do you undertake large-scale events?",
        answer: "Yes. We have extensive experience managing weddings, corporate functions, public events, and large-scale celebrations."
    },
    {
        question: "Can menus and event packages be customized?",
        answer: "Absolutely. Every menu and event package is tailored to suit your preferences, requirements, and budget."
    },
    {
        question: "Why choose Pride Kitchen Caterers & Events?",
        answer: "✔ Established in 2008\n✔ 18+ Years of Industry Experience\n✔ Metro Food Award Winner (2023, 2024 & 2025)\n✔ FSSAI Licensed\n✔ ISO 9001:2015 Certified\n✔ ISO 22000:2018 Certified"
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const renderAnswerLine = (line: string) => {
        const brand = "Pride Kitchen Caterers & Events";
        if (!line.includes(brand)) return line;

        const [before, after] = line.split(brand);
        return <>{before}<BrandName />{after}</>;
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer.replace(/✔ /g, "")
            }
        }))
    };

    return (
        <section className={styles.faqSection}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container">
                <div className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.title}><span style={{ color: '#000000' }}>FREQUENTLY ASKED</span> QUESTIONS</h2>
                        <p className={styles.subtitle}>Everything You Need to Know</p>
                    </motion.div>
                </div>

                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ""}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span>{faq.question === "Why choose Pride Kitchen Caterers & Events?" ? <>Why choose <BrandName />?</> : faq.question}</span>
                                <ChevronDown
                                    aria-hidden="true"
                                    className={`${styles.icon} ${activeIndex === index ? styles.iconActive : ""}`}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className={styles.answer}>
                                            {faq.answer.split('\n').map((line, i) => (
                                                <p key={i}>{renderAnswerLine(line)}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
