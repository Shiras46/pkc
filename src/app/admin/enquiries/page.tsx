"use client";

import { useEffect, useState } from "react";
import styles from "../blog/BlogManagement.module.css"; // Reuse blog styles

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    date: string;
    status: string;
}

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/enquiries")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEnquiries(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className={styles.header}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Enquiries</h1>
                {/* No 'Add New' button for enquiries usually */}
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Service</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <div>{item.email}</div>
                                    <div style={{ fontSize: '0.8em', color: '#666' }}>{item.phone}</div>
                                </td>
                                <td>{item.service}</td>
                                <td title={item.message}>{item.message}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: item.status === 'New' ? '#E3F2FD' : '#eee',
                                        color: item.status === 'New' ? '#1976D2' : '#666',
                                        fontSize: '0.85rem'
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className={styles.loading}>Loading enquiries...</p>}
                {!loading && enquiries.length === 0 && <p className={styles.loading}>No enquiries found.</p>}
            </div>
        </div>
    );
}
