"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Check, X, Youtube, Instagram, CheckCircle, XCircle, Sparkles, Upload, Image as ImageIcon } from "lucide-react";

export default function AdminVideos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Add New Video state
    const [title, setTitle] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);

    // Edit Video state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editVideoUrl, setEditVideoUrl] = useState("");
    const [editThumbnailFile, setEditThumbnailFile] = useState<File | null>(null);
    const [editThumbnailPreview, setEditThumbnailPreview] = useState("");
    const [savingEdit, setSavingEdit] = useState(false);

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

    const handleEditThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setEditThumbnailFile(selected);
            setEditThumbnailPreview(URL.createObjectURL(selected));
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

    const startEditing = (video: any) => {
        const videoId = video._id || video.id;
        setEditingId(videoId);
        setEditTitle(video.title || "");
        setEditVideoUrl(video.videoUrl || "");
        setEditThumbnailFile(null);
        setEditThumbnailPreview(video.thumbnailUrl || "");
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle("");
        setEditVideoUrl("");
        setEditThumbnailFile(null);
        setEditThumbnailPreview("");
    };

    const handleSaveEdit = async (id: string) => {
        setSavingEdit(true);
        let uploadedThumbnailUrl = editThumbnailPreview;

        try {
            if (editThumbnailFile) {
                const formData = new FormData();
                formData.set("file", editThumbnailFile);
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const uploadJson = await uploadRes.json();
                if (uploadRes.ok) {
                    uploadedThumbnailUrl = uploadJson.url;
                }
            }

            const res = await fetch(`/api/admin/videos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle.trim(),
                    videoUrl: editVideoUrl.trim(),
                    thumbnailUrl: uploadedThumbnailUrl,
                }),
            });

            if (res.ok) {
                setEditingId(null);
                fetchVideos();
            }
        } catch (error) {
            console.error("Failed to update video", error);
        } finally {
            setSavingEdit(false);
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
            <h1 style={{ fontSize: "2rem", marginBottom: "10px", fontFamily: "var(--font-heading)" }}>
                Manage Video Reviews
            </h1>
            <p style={{ color: "#666", marginBottom: "30px" }}>
                Add and manage YouTube Shorts and Instagram Reels. Upload cover images for Instagram Reels so thumbnails display perfectly on your site (auto-converted to WebP format).
            </p>

            {/* Add Video Form Card */}
            <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plus size={20} /> Add New Video &amp; Cover Thumbnail
                </h2>
                <form onSubmit={handleAddVideo} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "5px" }}>
                                Video Title *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Destination Wedding Highlights"
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
                            Upload Video Cover Image / Thumbnail (Auto-converts to WebP)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd", width: "100%", background: "#fff" }}
                        />
                        {thumbnailPreview && (
                            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={thumbnailPreview} alt="Cover Preview" style={{ width: "80px", height: "120px", objectFit: "cover", borderRadius: "8px", border: "2px solid #fcb318" }} />
                                <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: "600" }}>✓ Thumbnail Selected (WebP output)</span>
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0" }}>
                        <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} />
                        <strong>Note for Instagram Reels:</strong> Uploading a cover image ensures your reel displays a high-resolution thumbnail on the website just like YouTube videos.
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

            {/* Video List */}
            {loading ? (
                <p>Loading videos...</p>
            ) : videos.length === 0 ? (
                <p>No video reviews found. Add some above!</p>
            ) : (
                <div style={{ display: "grid", gap: "15px" }}>
                    {videos.map((video) => {
                        const videoId = video._id || video.id;
                        const isEditing = editingId === videoId;
                        const isInstagram = video.videoUrl?.includes("instagram.com") || video.platform === "instagram";

                        if (isEditing) {
                            return (
                                <div key={videoId} style={{
                                    background: "#fff",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                    border: "2px solid #fcb318",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px"
                                }}>
                                    <h4 style={{ margin: 0, fontSize: "1rem", color: "#333", display: "flex", alignItems: "center", gap: "6px" }}>
                                        <Edit2 size={16} /> Edit Video &amp; Upload Thumbnail
                                    </h4>
                                    
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                        <div>
                                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>Title</label>
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>Video URL</label>
                                            <input
                                                type="url"
                                                value={editVideoUrl}
                                                onChange={(e) => setEditVideoUrl(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>
                                            Cover Thumbnail Image (Upload new image to replace)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditThumbnailChange}
                                            style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
                                        />
                                        {editThumbnailPreview && (
                                            <div style={{ marginTop: "10px" }}>
                                                <img src={editThumbnailPreview} alt="Preview" style={{ width: "60px", height: "90px", objectFit: "cover", borderRadius: "6px" }} />
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                        <button
                                            onClick={cancelEditing}
                                            style={{ background: "#f3f4f6", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                                        >
                                            <X size={16} /> Cancel
                                        </button>
                                        <button
                                            onClick={() => handleSaveEdit(videoId)}
                                            disabled={savingEdit}
                                            style={{ background: "#fcb318", color: "#000", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}
                                        >
                                            <Check size={16} /> {savingEdit ? "Saving..." : "Save Thumbnail & Info"}
                                        </button>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={videoId} style={{ 
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
                                        <div style={{ position: "relative" }}>
                                            <img src={video.thumbnailUrl} alt={video.title} style={{ width: "55px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #eee" }} />
                                            <span style={{ position: "absolute", bottom: "4px", right: "4px", background: "#fcb318", color: "#000", fontSize: "0.65rem", fontWeight: "bold", padding: "1px 4px", borderRadius: "3px" }}>WEBP</span>
                                        </div>
                                    ) : isInstagram ? (
                                        <div style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "white", width: "55px", height: "80px", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                            <Instagram size={24} />
                                            <span style={{ fontSize: "0.65rem" }}>Reel</span>
                                        </div>
                                    ) : (
                                        <div style={{ background: "#FF0000", color: "white", width: "55px", height: "80px", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                            <Youtube size={24} />
                                            <span style={{ fontSize: "0.65rem" }}>Shorts</span>
                                        </div>
                                    )}
                                    <div>
                                        <h4 style={{ margin: "0 0 4px 0", fontSize: "1rem" }}>{video.title || "Untitled Video"}</h4>
                                        <a href={video.videoUrl} target="_blank" rel="noreferrer" style={{ color: "#333", fontSize: "0.85rem", textDecoration: "underline" }}>
                                            {video.videoUrl}
                                        </a>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
                                            <span style={{ fontSize: "0.8rem", color: "#888" }}>
                                                Added: {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Recent"}
                                            </span>
                                            {video.thumbnailUrl ? (
                                                <span style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: "600" }}>✓ Custom Thumbnail Active</span>
                                            ) : isInstagram ? (
                                                <span style={{ fontSize: "0.75rem", color: "#EF4444", fontWeight: "600" }}>⚠️ No Custom Thumbnail (Using Brand Fallback)</span>
                                            ) : (
                                                <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>✓ YouTube Auto Thumbnail</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <button
                                        onClick={() => startEditing(video)}
                                        style={{
                                            background: "#F3F4F6",
                                            color: "#374151",
                                            border: "none",
                                            padding: "8px 14px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            fontSize: "0.85rem",
                                            fontWeight: "500"
                                        }}
                                        title="Edit Video or Cover Image"
                                    >
                                        <Edit2 size={16} /> Edit / Thumbnail
                                    </button>

                                    <button 
                                        onClick={() => toggleStatus(videoId, video.isActive)}
                                        style={{ 
                                            background: "none", 
                                            border: "none", 
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            color: video.isActive ? "#10B981" : "#6B7280",
                                            fontWeight: "500",
                                            fontSize: "0.85rem"
                                        }}
                                    >
                                        {video.isActive ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        {video.isActive ? "Active" : "Hidden"}
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(videoId)}
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}
