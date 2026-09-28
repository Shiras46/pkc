"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Youtube, Instagram, CheckCircle, XCircle, Sparkles, Video as VideoIcon, Upload } from "lucide-react";

export default function AdminVideos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
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

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setThumbnailFile(selected);
            setThumbnailPreview(URL.createObjectURL(selected));
        }
    };

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideoUrl.trim()) return;

        setSubmitting(true);
        let uploadedThumbnailUrl = "";

        try {
            // Upload custom video cover thumbnail image if selected (converts to WebP)
            if (thumbnailFile) {
                const formData = new FormData();
                formData.set("file", thumbnailFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const uploadJson = await uploadRes.json();
                if (uploadRes.ok) {
                    uploadedThumbnailUrl = uploadJson.url;
                }
            }

            const res = await fetch("/api/admin/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    videoUrl: newVideoUrl.trim(),
                    thumbnailUrl: uploadedThumbnailUrl,
                }),
            });

            if (res.ok) {
                setTitle("");
                setNewVideoUrl("");
                setThumbnailFile(null);
                setThumbnailPreview("");
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
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px", fontFamily: "var(--font-heading)" }}>Manage Video Reviews</h1>
            <p style={{ color: "#666", marginBottom: "30px" }}>
                Add video links, custom titles, and exact cover thumbnail images (auto-converted to WebP format).
            </p>

            <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plus size={20} /> Add New Video &amp; Exact Thumbnail
                </h2>
                <form onSubmit={handleAddVideo} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "5px" }}>
                                Video Title *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Varun & Sanya Reception Setup"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.95rem" }}
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "5px" }}>
                                Video URL (YouTube Shorts or Instagram Reel) *
                            </label>
                            <input
                                type="url"
                                placeholder="https://www.instagram.com/reel/..."
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                required
                                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.95rem" }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "5px" }}>
                            Upload Exact Video Cover Image (Optional - Auto-converts to WebP)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd", width: "100%", background: "#fff" }}
                        />
                        {thumbnailPreview && (
                            <div style={{ marginTop: "10px" }}>
                                <img src={thumbnailPreview} alt="Cover Preview" style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "2px solid #fcb318" }} />
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} />
                        When an image is uploaded, it automatically converts to WebP format and displays as the exact video thumbnail on your site.
                    </p>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                background: "#fcb318",
                                color: "#000",
                                border: "none",
                                padding: "12px 28px",
                                borderRadius: "8px",
                                cursor: submitting ? "not-allowed" : "pointer",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <Plus size={18} />
                            {submitting ? "Processing & Adding..." : "Add Video"}
                        </button>
                    </div>
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
                                {video.thumbnailUrl ? (
                                    <img src={video.thumbnailUrl} alt={video.title} style={{ width: "50px", height: "70px", objectFit: "cover", borderRadius: "6px" }} />
                                ) : video.platform === 'instagram' ? (
                                    <div style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "white", padding: "10px", borderRadius: "8px" }}>
                                        <Instagram size={20} />
                                    </div>
                                ) : (
                                    <div style={{ background: "#FF0000", color: "white", padding: "10px", borderRadius: "8px" }}>
                                        <Youtube size={20} />
                                    </div>
                                )}
                                <div>
                                    <h4 style={{ margin: "0 0 4px 0", fontSize: "1rem" }}>{video.title || "Untitled Video"}</h4>
                                    <a href={video.videoUrl} target="_blank" rel="noreferrer" style={{ color: "#333", fontSize: "0.85rem", textDecoration: "underline" }}>
                                        {video.videoUrl}
                                    </a>
                                    <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}>
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
