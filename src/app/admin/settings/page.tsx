"use client";

import { useState, useEffect } from "react";
import styles from "./Settings.module.css";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteTitle: "Pride Kitchen Caterers & Events",
        contactEmail: "info@pkcevents.com",
        contactPhone: "+91 81380 02333",
        address: "Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy, Thrissur, Kerala 680651",
        facebook: "",
        instagram: ""
    });

    const [loading, setLoading] = useState(false);

    // Mock loading settings
    useEffect(() => {
        // In a real app, fetch from /api/settings
        const saved = localStorage.getItem("pkc_settings");
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock save
        await new Promise(r => setTimeout(r, 1000));
        localStorage.setItem("pkc_settings", JSON.stringify(settings));

        setLoading(false);
        alert("Settings saved successfully!");
    };

    return (
        <div className={styles.settingsPage}>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Site Settings</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>General Information</h2>
                    <div className={styles.inputGroup}>
                        <label>Site Title</label>
                        <input
                            name="siteTitle"
                            value={settings.siteTitle}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Details</h2>
                    <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <input
                            name="contactPhone"
                            value={settings.contactPhone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input
                            name="contactEmail"
                            value={settings.contactEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Address</label>
                        <input
                            name="address"
                            value={settings.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Social Media</h2>
                    <div className={styles.inputGroup}>
                        <label>Instagram URL</label>
                        <input
                            name="instagram"
                            value={settings.instagram}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Facebook URL</label>
                        <input
                            name="facebook"
                            value={settings.facebook}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className={styles.saveBtn} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
