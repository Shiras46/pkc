"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Trash2, Phone, MessageCircle } from "lucide-react";
import styles from "../blog/BlogManagement.module.css";

interface Enquiry {
    id: string;
    _id?: string;
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
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const loadEnquiries = useCallback(() => {
        setLoading(true);
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

    useEffect(() => {
        loadEnquiries();
    }, [loadEnquiries]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch("/api/admin/enquiries", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus })
            });
            if (res.ok) {
                setEnquiries(prev => prev.map(item => (item.id === id || item._id === id) ? { ...item, status: newStatus } : item));
            }
        } catch (e) {
            console.error("Failed to update status", e);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            const res = await fetch(`/api/admin/enquiries?id=${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setEnquiries(prev => prev.filter(item => (item.id !== id && item._id !== id)));
            }
        } catch (e) {
            console.error("Failed to delete enquiry", e);
        }
    };

    const cleanPhoneNumber = (phone: string) => {
        return phone.replace(/[^0-9]/g, '');
    };

    const getStatusStyle = (status: string) => {
        const s = (status || "").toLowerCase();
        if (s === "new") {
            return { background: "#E3F2FD", color: "#1976D2", border: "1px solid #BBDEFB" };
        }
        if (s === "contacted") {
            return { background: "#FFF3E0", color: "#E65100", border: "1px solid #FFE0B2" };
        }
        if (s === "confirmed") {
            return { background: "#E8F5E9", color: "#2E7D32", border: "1px solid #C8E6C9" };
        }
        if (s === "cancelled") {
            return { background: "#FFEBEE", color: "#C62828", border: "1px solid #FFCDD2" };
        }
        return { background: "#F5F5F5", color: "#616161", border: "1px solid #E0E0E0" };
    };

    return (
        <div>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Enquiries</h1>
                    <span style={{
                        background: '#F3E5F5',
                        color: '#7B1FA2',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                    }}>
                        {enquiries.length} Total
                    </span>
                </div>
                <button
                    onClick={loadEnquiries}
                    className={styles.addBtn}
                    style={{ background: '#f5f5f5', color: '#333', border: '1px solid #ddd', cursor: 'pointer' }}
                    title="Refresh enquiries"
                >
                    <RefreshCw size={16} className={loading ? styles.rotating : ''} />
                    Refresh
                </button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((item) => {
                            const enquiryId = item.id || item._id || '';
                            const digits = cleanPhoneNumber(item.phone || '');
                            const waNumber = digits.length === 10 ? `91${digits}` : digits;

                            return (
                                <tr key={enquiryId}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td>
                                        {item.email && (
                                            <div>
                                                <a href={`mailto:${item.email}`} style={{ color: '#1976D2', textDecoration: 'none' }}>
                                                    {item.email}
                                                </a>
                                            </div>
                                        )}
                                        {item.phone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.9em', color: '#444' }}>
                                                <span>{item.phone}</span>
                                                <a
                                                    href={`tel:${item.phone}`}
                                                    title="Call"
                                                    style={{ color: '#2E7D32', display: 'inline-flex' }}
                                                >
                                                    <Phone size={14} />
                                                </a>
                                                {digits && (
                                                    <a
                                                        href={`https://wa.me/${waNumber}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Chat on WhatsApp"
                                                        style={{ color: '#25D366', display: 'inline-flex' }}
                                                    >
                                                        <MessageCircle size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td>{item.service || 'General Inquiry'}</td>
                                    <td title={item.message} style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.message}
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <select
                                            value={item.status || "New"}
                                            onChange={(e) => handleStatusChange(enquiryId, e.target.value)}
                                            disabled={updatingId === enquiryId}
                                            style={{
                                                ...getStatusStyle(item.status || "New"),
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontWeight: 600,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(enquiryId)}
                                            className={styles.deleteBtn}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
                                            title="Delete Enquiry"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {loading && <p className={styles.loading}>Loading enquiries...</p>}
                {!loading && enquiries.length === 0 && <p className={styles.loading}>No enquiries found.</p>}
            </div>
        </div>
    );
}
