"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Youtube, Instagram, CheckCircle, XCircle } from "lucide-react";

export default function AdminVideos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchVideos = async () => {
        try {
            const res = await fetch("/api/admin/videos");
            const data = await res.json();
            if (Array.isArray(data)) {
                setVideos(data);
            }
        } catch (error) {
            console.error("Failed to fetch videos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideoUrl.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl: newVideoUrl }),
            });

            if (res.ok) {
                setNewVideoUrl("");
                fetchVideos();
            }
        } catch (error) {
            console.error("Failed to add video", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        try {
            const res = await fetch(`/api/admin/videos/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchVideos();
            }
        } catch (error) {
            console.error("Failed to delete video", error);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/videos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !currentStatus }),
            });

            if (res.ok) {
                fetchVideos();
            }
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "30px", fontFamily: "var(--font-heading)" }}>Manage Video Reviews</h1>

            <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Add New Video</h2>
                <form onSubmit={handleAddVideo} style={{ display: "flex", gap: "15px" }}>
                    <input
                        type="url"
                        placeholder="Paste YouTube or Instagram link here..."
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        required
                        style={{ flex: 1, padding: "12px 20px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            border: "none",
                            padding: "0 25px",
                            borderRadius: "8px",
                            cursor: submitting ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                    >
                        <Plus size={18} />
                        {submitting ? "Adding..." : "Add Video"}
                    </button>
                </form>
            </div>

            {loading ? (
                <p>Loading videos...</p>
            ) : videos.length === 0 ? (
                <p>No video reviews found. Add some above!</p>
            ) : (
                <div style={{ display: "grid", gap: "15px" }}>
                    {videos.map((video) => (
                        <div key={video._id} style={{ 
                            background: "#fff", 
                            padding: "20px", 
                            borderRadius: "12px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                {video.platform === 'instagram' ? (
                                    <div style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "white", padding: "10px", borderRadius: "8px" }}>
                                        <Instagram size={20} />
                                    </div>
                                ) : (
                                    <div style={{ background: "#FF0000", color: "white", padding: "10px", borderRadius: "8px" }}>
                                        <Youtube size={20} />
                                    </div>
                                )}
                                <div>
                                    <a href={video.videoUrl} target="_blank" rel="noreferrer" style={{ color: "#333", fontWeight: "500", textDecoration: "underline" }}>
                                        {video.videoUrl}
                                    </a>
                                    <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "5px" }}>
                                        Added on {new Date(video.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <button 
                                    onClick={() => toggleStatus(video._id, video.isActive)}
                                    style={{ 
                                        background: "none", 
                                        border: "none", 
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        color: video.isActive ? "#10B981" : "#6B7280",
                                        fontWeight: "500"
                                    }}
                                >
                                    {video.isActive ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                    {video.isActive ? "Active" : "Hidden"}
                                </button>
                                
                                <button 
                                    onClick={() => handleDelete(video._id)}
                                    style={{ 
                                        background: "#FEE2E2", 
                                        color: "#EF4444", 
                                        border: "none", 
                                        padding: "8px", 
                                        borderRadius: "6px", 
                                        cursor: "pointer" 
                                    }}
                                    title="Delete Video"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
