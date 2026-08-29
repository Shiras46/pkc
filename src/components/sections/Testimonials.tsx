"use client";

import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Testimonials.module.css";

const testimonials = [
    {
        text: "We recently hired Pride Kitchen Caterers (PKC) for our church feast of 40+ people, and we are truly impressed with their service. The food was delicious and appreciated by everyone. The arrangements were excellent—the tables, plates, and food name boards were set up neatly and professionally, which added a very organized touch to our event. They arrived right on time, and the two staff members serving the food were extremely polite, attentive, and professional throughout the function. Their service really helped everything run smoothly. We also ordered food from them yesterday for a small family get-together, and once again, the experience was wonderful. The food was delicious, and the delivery was perfectly on time. A special thanks to Mr. Dinish, the manager, for coordinating everything so well. He provided a clear and fair quote, offered a flexible menu, and maintained a highly professional approach from start to finish. His support and commitment truly made all our events hassle-free and enjoyable. I just want to say—please keep this amazing quality always, PKC! Thank you, Mr. Dinish, for all your help and your exceptional service!",
        name: "Church Feast & Family Gathering Client",
        role: "Verified Google Review"
    },
    {
        text: "We had an amazing experience with the PKC team for our wedding sadhya. The food was authentic, delicious, and served with great care. Every dish had the perfect traditional taste, and our guests truly enjoyed the entire meal. The service, presentation, and hospitality were excellent. A special mention to Gopika, who coordinated with me throughout the process. She was extremely helpful, responsive, and made everything smooth and stress-free for us. Thank you for making our special day even more memorable!",
        name: "Wedding Sadhya Client",
        role: "Verified Google Review"
    },
    {
        text: "We had ordered catering for our marriage function, and the entire experience was excellent. The food was extremely tasty, well-prepared, and appreciated by all our guests. The team was very professional and dealt with us in a friendly and supportive manner throughout the event. A special thanks to Vineetha, who was assigned to coordinate with us. She was very helpful, patient, and made sure everything was arranged exactly according to our needs and preferences. Highly satisfied with their service and would definitely recommend them for wedding and special event catering.",
        name: "Wedding Catering Client",
        role: "Verified Google Review"
    },
    {
        text: "We are extremely happy with the catering service provided on our daughter's first birthday celebration. The food was absolutely delicious, well-presented, and prepared with great hygiene. Every dish was flavorful and received compliments from all our guests. The staff was professional, punctual, and very courteous, ensuring smooth service throughout the event. Portions were generous, and the menu variety was impressive. They were also flexible with our requirements and handled everything perfectly. Highly recommended for any function or celebration! Special mention for Ms.Soorya and Mr. Ajith who coordinated the arrangements extremely well",
        name: "Birthday Celebration Client",
        role: "Verified Google Review"
    },
    {
        text: "I approached pkc for my sisters wedding and we were Happy that we chose pkc. It was amazing the decor wedding and the food.. They made it memorable for all of us and those who attended the wedding.. Thankyou pkc for making this happen.. Everything was well planned and arranged 🥰",
        name: "Sister's Wedding Client",
        role: "Verified Google Review"
    },
    {
        text: "We had a wonderful experience with PKC Caterers at our wedding reception! The food was delicious, beautifully presented, and loved by all our guests. A big thanks to Gopika for the perfect coordination and to Ajith for managing everything so smoothly. You made our day truly special and stress-free! Highly recommended 😊 Once Again Thanks To AJITH & GOPIKA",
        name: "Wedding Reception Client",
        role: "Verified Google Review"
    },
    {
        text: "I recently had my wedding, and we chose PKC Event Management for our reception. I must say, they did an outstanding job! As the groom, I was especially impressed with how beautifully everything was arranged on my side of the event. The decorations were elegant, the food was delicious, and the entire setup was managed so smoothly. Our guests were all praises, and everything went off without a hitch. Thank you PKC for making our special day even more memorable. Highly recommended!",
        name: "Wedding Groom & Reception Client",
        role: "Verified Google Review"
    }
];

function TextTruncator({ text, maxLength = 160 }: { text: string; maxLength?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (text.length <= maxLength) {
        return <p className={styles.text}>{text}</p>;
    }
    
    return (
        <p className={styles.text}>
            {isExpanded ? text : `${text.slice(0, maxLength)}... `}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }} 
                className={styles.readMoreBtn}
            >
                {isExpanded ? "Show Less" : "Read More"}
            </button>
        </p>
    );
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleSlides(1);
            } else if (window.innerWidth < 1024) {
                setVisibleSlides(2);
            } else {
                setVisibleSlides(3);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Adjust slide index if layout shrinks
    useEffect(() => {
        const maxIndex = testimonials.length - visibleSlides;
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [visibleSlides, currentIndex]);

    // Auto sliding effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = testimonials.length - visibleSlides;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [visibleSlides]);

    const maxIndex = testimonials.length - visibleSlides;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    return (
        <section className="section-padding" style={{ background: 'var(--accent)', overflow: 'hidden' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '40px' }}>
                    <span style={{ color: '#000', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>Testimonials</span>
                    <h2 className="heading-lg" style={{ color: '#fcb318', marginTop: '10px' }}><span style={{ color: '#000000' }}>“Words from those who lived those</span> magical experiences”</h2>
                </div>
                
                <div className={styles.sliderContainer}>
                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Previous review">
                        <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    
                    <div className={styles.viewport}>
                        <div 
                            className={styles.track}
                            style={{ 
                                transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` 
                            }}
                        >
                            {testimonials.map((item, index) => (
                                <div key={index} className={styles.slide}>
                                    <div className={styles.card}>
                                        <div>
                                            <Quote className={styles.quoteIcon} size={32} aria-hidden="true" />
                                            <div className={styles.stars}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} fill="#FFC107" color="#FFC107" aria-hidden="true" />
                                                ))}
                                            </div>
                                            <TextTruncator text={item.text} />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Next review">
                        <ChevronRight size={24} aria-hidden="true" />
                    </button>
                </div>
                
                <div className={styles.dotsContainer}>
                    {[...Array(testimonials.length - visibleSlides + 1)].map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
