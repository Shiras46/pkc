"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Check, X, Youtube, Instagram, CheckCircle, XCircle, Sparkles, Upload, Image as ImageIcon, Film, Video, AlertTriangle } from "lucide-react";

export default function AdminVideos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Add New Video state
    const [title, setTitle] = useState("");
    const [sourceType, setSourceType] = useState<"file" | "url">("file");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string>("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string>("");

    // Edit Video state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editSourceType, setEditSourceType] = useState<"file" | "url">("url");
    const [editVideoFile, setEditVideoFile] = useState<File | null>(null);
    const [editVideoPreview, setEditVideoPreview] = useState<string>("");
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

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setVideoFile(selected);
            setVideoPreview(URL.createObjectURL(selected));
        }
    };

    const handleEditVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setEditVideoFile(selected);
            setEditVideoPreview(URL.createObjectURL(selected));
        }
    };

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
        if (sourceType === "file" && !videoFile) {
            alert("Please select a video file (.mp4, .webm, or .mov)");
            return;
        }
        if (sourceType === "url" && !newVideoUrl.trim()) {
            alert("Please enter a video URL");
            return;
        }

        setSubmitting(true);
        setUploadStatus("Processing upload...");
        let finalVideoUrl = newVideoUrl.trim();
        let uploadedThumbnailUrl = "";

        try {
            // 1. If uploading video file directly (MP4/WebM/MOV)
            if (sourceType === "file" && videoFile) {
                setUploadStatus("Uploading video file to server...");
                const videoFormData = new FormData();
                videoFormData.set("file", videoFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: videoFormData,
                });
                const uploadJson = await uploadRes.json();
                if (!uploadRes.ok) {
                    alert(uploadJson.error || "Failed to upload video file");
                    setSubmitting(false);
                    setUploadStatus("");
                    return;
                }
                finalVideoUrl = uploadJson.url;
            }

            // 2. Upload custom cover thumbnail image if selected (converts to WebP)
            if (thumbnailFile) {
                setUploadStatus("Optimizing cover image to WebP...");
                const thumbFormData = new FormData();
                thumbFormData.set("file", thumbnailFile);

                const thumbRes = await fetch("/api/upload", {
                    method: "POST",
                    body: thumbFormData,
                });
                const thumbJson = await thumbRes.json();
                if (thumbRes.ok) {
                    uploadedThumbnailUrl = thumbJson.url;
                }
            }

            setUploadStatus("Saving to database...");
            const res = await fetch("/api/admin/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    videoUrl: finalVideoUrl,
                    thumbnailUrl: uploadedThumbnailUrl,
                    platform: sourceType === "file" ? "custom" : undefined,
                }),
            });

            if (res.ok) {
                setTitle("");
                setVideoFile(null);
                setVideoPreview("");
                setNewVideoUrl("");
                setThumbnailFile(null);
                setThumbnailPreview("");
                fetchVideos();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to add video");
            }
        } catch (error) {
            console.error("Failed to add video", error);
            alert("Error adding video. Please try again.");
        } finally {
            setSubmitting(false);
            setUploadStatus("");
        }
    };

    const startEditing = (video: any) => {
        const videoId = video._id || video.id;
        setEditingId(videoId);
        setEditTitle(video.title || "");
        setEditVideoUrl(video.videoUrl || "");
        setEditVideoFile(null);
        setEditVideoPreview("");
        setEditThumbnailFile(null);
        setEditThumbnailPreview(video.thumbnailUrl || "");
        setEditSourceType(video.platform === "custom" || video.videoUrl?.includes("/uploads/") ? "file" : "url");
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle("");
        setEditVideoUrl("");
        setEditVideoFile(null);
        setEditVideoPreview("");
        setEditThumbnailFile(null);
        setEditThumbnailPreview("");
    };

    const handleSaveEdit = async (id: string) => {
        setSavingEdit(true);
        let finalVideoUrl = editVideoUrl.trim();
        let uploadedThumbnailUrl = editThumbnailPreview;

        try {
            // Upload new video file if provided
            if (editVideoFile) {
                const videoFormData = new FormData();
                videoFormData.set("file", editVideoFile);
                const vidRes = await fetch("/api/upload", {
                    method: "POST",
                    body: videoFormData,
                });
                const vidJson = await vidRes.json();
                if (vidRes.ok) {
                    finalVideoUrl = vidJson.url;
                }
            }

            // Upload new thumbnail if provided
            if (editThumbnailFile) {
                const thumbFormData = new FormData();
                thumbFormData.set("file", editThumbnailFile);
                const thumbRes = await fetch("/api/upload", {
                    method: "POST",
                    body: thumbFormData,
                });
                const thumbJson = await thumbRes.json();
                if (thumbRes.ok) {
                    uploadedThumbnailUrl = thumbJson.url;
                }
            }

            const res = await fetch(`/api/admin/videos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle.trim(),
                    videoUrl: finalVideoUrl,
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
                Add video reviews and wedding highlights. Upload video files directly (MP4/WebM/MOV) so they play smoothly <strong>right on your website</strong> without redirecting to external apps, or paste YouTube Shorts links.
            </p>

            {/* Add Video Form Card */}
            <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plus size={20} /> Add New Video Review
                </h2>
                
                <form onSubmit={handleAddVideo} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
                            Video Title *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Grand Royal Wedding Reception Highlights"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.95rem" }}
                        />
                    </div>

                    {/* Source Selection Tabs */}
                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>
                            Video Source *
                        </label>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                            <button
                                type="button"
                                onClick={() => setSourceType("file")}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    border: sourceType === "file" ? "2px solid #fcb318" : "1px solid #ddd",
                                    background: sourceType === "file" ? "#fff9e6" : "#fff",
                                    color: sourceType === "file" ? "#b45309" : "#333",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                            >
                                <Upload size={17} /> Upload Video File (.mp4) — Recommended (Plays Directly on Website)
                            </button>
                            <button
                                type="button"
                                onClick={() => setSourceType("url")}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    border: sourceType === "url" ? "2px solid #fcb318" : "1px solid #ddd",
                                    background: sourceType === "url" ? "#fff9e6" : "#fff",
                                    color: sourceType === "url" ? "#b45309" : "#333",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                            >
                                <Film size={17} /> Paste Video Link (YouTube Shorts / URL)
                            </button>
                        </div>

                        {sourceType === "file" ? (
                            <div style={{ background: "#F9FAFB", padding: "18px", borderRadius: "10px", border: "1px dashed #D1D5DB" }}>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
                                    Select Video File from your device (.mp4, .webm, .mov) *
                                </label>
                                <input
                                    type="file"
                                    accept="video/mp4,video/webm,video/quicktime,video/*"
                                    onChange={handleVideoFileChange}
                                    style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd", width: "100%", background: "#fff" }}
                                />
                                {videoPreview && (
                                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "15px" }}>
                                        <video
                                            src={videoPreview}
                                            controls
                                            style={{ maxHeight: "160px", maxWidth: "200px", borderRadius: "8px", border: "1px solid #fcb318" }}
                                        />
                                        <div>
                                            <span style={{ fontSize: "0.85rem", color: "#10B981", fontWeight: "600", display: "block" }}>
                                                ✓ Video File Selected ({videoFile?.name})
                                            </span>
                                            <span style={{ fontSize: "0.75rem", color: "#666" }}>
                                                Size: {videoFile ? (videoFile.size / (1024 * 1024)).toFixed(2) + " MB" : ""}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <p style={{ fontSize: "0.8rem", color: "#059669", marginTop: "8px", marginBottom: "0" }}>
                                    ✨ <strong>Best for Instagram Reels &amp; Wedding Highlights:</strong> Uploading the video file directly ensures high resolution, instant inline playback, and zero redirects to Instagram!
                                </p>
                            </div>
                        ) : (
                            <div style={{ background: "#F9FAFB", padding: "18px", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
                                    Video URL (YouTube Shorts or Direct MP4 link) *
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://www.youtube.com/shorts/... or https://domain.com/video.mp4"
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.95rem", background: "#fff" }}
                                />
                                {newVideoUrl.includes("instagram.com") && (
                                    <div style={{ margin: "10px 0 0", fontSize: "0.82rem", color: "#92400e", background: "#fef3c7", padding: "10px 14px", borderRadius: "6px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                                        <span>
                                            <strong>Why do Instagram links open Instagram?</strong> Meta / Instagram restricts third-party websites from playing Reels inline, forcing visitors to click &quot;Watch on Instagram&quot;. For guaranteed on-site playback without sending visitors away, switch to <strong>&quot;Upload Video File (.mp4)&quot;</strong> above!
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cover Thumbnail */}
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

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "#fcb318", fontWeight: "600" }}>
                            {uploadStatus}
                        </span>
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
                        const isDirectVideo = Boolean(
                            video.videoUrl && (
                                video.platform === "custom" ||
                                video.videoUrl.endsWith(".mp4") ||
                                video.videoUrl.endsWith(".webm") ||
                                video.videoUrl.endsWith(".mov") ||
                                video.videoUrl.includes("/uploads/videos") ||
                                video.videoUrl.includes(".s3.") ||
                                video.videoUrl.includes("amazonaws.com")
                            ) &&
                            !video.videoUrl.includes("youtube.com") &&
                            !video.videoUrl.includes("youtu.be") &&
                            !video.videoUrl.includes("instagram.com")
                        );

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
                                                type="text"
                                                value={editVideoUrl}
                                                onChange={(e) => setEditVideoUrl(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>
                                            Replace with Video File (.mp4, .webm, .mov)
                                        </label>
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm,video/quicktime,video/*"
                                            onChange={handleEditVideoFileChange}
                                            style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "100%", background: "#fff" }}
                                        />
                                        {editVideoPreview && (
                                            <div style={{ marginTop: "8px" }}>
                                                <video src={editVideoPreview} controls style={{ maxHeight: "120px", borderRadius: "6px" }} />
                                            </div>
                                        )}
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
                                            style={{ background: "#fcb318", color: "#000", border: "none", padding: "8px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}
                                        >
                                            <Check size={16} /> {savingEdit ? "Saving..." : "Save Changes"}
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
                                            <span style={{ position: "absolute", bottom: "4px", right: "4px", background: "#fcb318", color: "#000", fontSize: "0.65rem", fontWeight: "bold", padding: "1px 4px", borderRadius: "3px" }}>COVER</span>
                                        </div>
                                    ) : isDirectVideo ? (
                                        <div style={{ background: "linear-gradient(135deg, #10B981, #047857)", color: "white", width: "55px", height: "80px", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                                            <Video size={24} />
                                            <span style={{ fontSize: "0.65rem", fontWeight: "bold" }}>MP4</span>
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
                                        <a href={video.videoUrl} target="_blank" rel="noreferrer" style={{ color: "#333", fontSize: "0.85rem", textDecoration: "underline", wordBreak: "break-all" }}>
                                            {video.videoUrl}
                                        </a>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px", flexWrap: "wrap" }}>
                                            <span style={{ fontSize: "0.8rem", color: "#888" }}>
                                                Added: {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Recent"}
                                            </span>
                                            {isDirectVideo ? (
                                                <span style={{ fontSize: "0.75rem", background: "#D1FAE5", color: "#065F46", padding: "2px 8px", borderRadius: "4px", fontWeight: "600" }}>
                                                    🌐 Direct Video (Plays 100% On-Site)
                                                </span>
                                            ) : isInstagram ? (
                                                <span style={{ fontSize: "0.75rem", background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: "4px", fontWeight: "600" }}>
                                                    📱 Instagram Link (Redirects to App)
                                                </span>
                                            ) : (
                                                <span style={{ fontSize: "0.75rem", background: "#FEE2E2", color: "#991B1B", padding: "2px 8px", borderRadius: "4px", fontWeight: "600" }}>
                                                    ▶️ YouTube Shorts (Plays On-Site)
                                                </span>
                                            )}
                                            {video.thumbnailUrl && (
                                                <span style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: "600" }}>✓ Custom Thumbnail</span>
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
                                        <Edit2 size={16} /> Edit
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
