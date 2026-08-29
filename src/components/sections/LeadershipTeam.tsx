import styles from "./LeadershipTeam.module.css";
import Image from "next/image";

export default function LeadershipTeam() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2><span style={{ color: '#000000' }}>Faces Behind the</span> Brand</h2>
                    <p>Meet the visionaries behind Kerala's most trusted luxury event management company.</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.memberCard}>
                        <div className={styles.imageWrapper}>
                            <Image src="/image/RIJO2.webp" alt="Rijo George, Managing Director of Pride Kitchen Caterers & Events in Kerala" fill style={{ objectFit: 'cover', objectPosition: 'center 10%', transform: 'scale(1.12)', transformOrigin: 'center 10%' }} />
                        </div>
                        <span className={styles.role}>Managing Director</span>
                        <h3>Rijo George</h3>
                        <p className={styles.description}>Rijo guides the strategic growth and operational excellence of the organisation, ensuring every project reflects the company's standards of quality, reliability, and attentive service.</p>
                    </div>
                    <div className={styles.memberCard}>
                        <div className={styles.imageWrapper}>
                            <Image src="/image/MUKHU3.webp" alt="Mukesh E B, Founder & CEO of Pride Kitchen Caterers & Events in Kerala" fill style={{ objectFit: 'cover', objectPosition: 'center 10%', transform: 'scale(1.05)', transformOrigin: 'center 10%' }} />
                        </div>
                        <span className={styles.role}>Founder & CEO</span>
                        <h3>Mukesh E B</h3>
                        <p className={styles.description}>The visionary founder of Pride Kitchen Caterers & Events. Since 2008, his commitment to culinary excellence, innovation, and thoughtful hospitality has shaped the brand into a trusted name across Kerala.</p>
                    </div>
                    <div className={styles.memberCard}>
                        <div className={styles.imageWrapper}>
                            <Image src="/image/MINTO3.webp" alt="Minto Vincent, General Manager of Pride Kitchen Caterers & Events in Kerala" fill style={{ objectFit: 'cover', objectPosition: 'center 10%', transform: 'scale(1.12)', transformOrigin: 'center 10%' }} />
                        </div>
                        <span className={styles.role}>General Manager</span>
                        <h3>Minto Vincent</h3>
                        <p className={styles.description}>Minto leads day-to-day operations, event coordination, and client engagement. His attention to detail helps every celebration unfold with precision, professionalism, and care.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
