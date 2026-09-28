"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Edit2, Check, X, Image as ImageIcon, Sparkles } from "lucide-react";
import styles from "./GalleryManagement.module.css";

interface GalleryItem {
    _id?: string;
    id?: string;
    src: string;
    category: string;
    alt: string;
    createdAt?: string;
}

const CATEGORIES = ["Catering Setups", "Decorations", "Events & Celebrations"];

export default function AdminGallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [category, setCategory] = useState<string>("Events & Celebrations");
    const [customCategory, setCustomCategory] = useState<string>("");
    const [altTag, setAltTag] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Edit Alt state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editAltText, setEditAltText] = useState<string>("");
    const [savingEdit, setSavingEdit] = useState<boolean>(false);

    const fetchGalleryItems = async () => {
        try {
            const res = await fetch("/api/admin/gallery");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setItems(data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setStatusMessage({ type: "error", text: "Please select an image file to upload." });
            return;
        }

        setUploading(true);
        setStatusMessage(null);

        try {
            // Step 1: Upload image file to server (auto-converts to WebP)
            const formData = new FormData();
            formData.set("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const uploadJson = await uploadRes.json();
            if (!uploadRes.ok) {
                throw new Error(uploadJson.error || "Failed to upload image");
            }

            const webpUrl = uploadJson.url;

            // Step 2: Save gallery item record with src, category, and alt tag
            const finalCategory = category === "Custom" ? customCategory.trim() || "Events & Celebrations" : category;
            
            const saveRes = await fetch("/api/admin/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    src: webpUrl,
                    category: finalCategory,
                    alt: altTag.trim(),
                }),
            });

            if (!saveRes.ok) {
                const saveJson = await saveRes.json();
                throw new Error(saveJson.error || "Failed to save gallery item");
            }

            // Reset form
            setFile(null);
            setPreviewUrl("");
            setAltTag("");
            setStatusMessage({ type: "success", text: "Image successfully converted to WebP format & added to gallery!" });
            fetchGalleryItems();
        } catch (err) {
            console.error("Add image failed:", err);
            setStatusMessage({
                type: "error",
                text: err instanceof Error ? err.message : "An error occurred while uploading.",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gallery image?")) return;

        try {
            const res = await fetch(`/api/admin/gallery/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
            }
        } catch (error) {
            console.error("Failed to delete gallery item:", error);
        }
    };

    const startEditingAlt = (item: GalleryItem) => {
        const itemId = item._id || item.id || "";
        setEditingId(itemId);
        setEditAltText(item.alt || "");
    };

    const cancelEditingAlt = () => {
        setEditingId(null);
        setEditAltText("");
    };

    const handleSaveAlt = async (id: string) => {
        setSavingEdit(true);
        try {
            const res = await fetch(`/api/admin/gallery/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alt: editAltText.trim() }),
            });

            if (res.ok) {
                const updated = await res.json();
                setItems((prev) =>
                    prev.map((item) =>
                        (item._id || item.id) === id ? { ...item, alt: updated.alt } : item
                    )
                );
                setEditingId(null);
            }
        } catch (error) {
            console.error("Failed to update alt tag:", error);
        } finally {
            setSavingEdit(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Gallery Image Management</h1>
                    <p className={styles.subtitle}>
                        Upload new gallery images, automatically convert to WebP format, and manage Alt tags for SEO.
                    </p>
                </div>
            </div>

            {/* Upload Form Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <Upload size={20} /> Add New Gallery Image
                </h2>

                {statusMessage && (
                    <div
                        className={`${styles.alert} ${
                            statusMessage.type === "success" ? styles.alertSuccess : styles.alertError
                        }`}
                    >
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleAddImage} className={styles.form}>
                    <div className={styles.formGrid}>
                        {/* File Upload Area */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select Image File *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className={styles.fileInput}
                            />
                            <p className={styles.hint}>
                                <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} />
                                Supports images of any size or resolution (JPG, PNG, GIF, WebP). Automatically resizes, compresses, and converts to WebP.
                            </p>
                        </div>

                        {/* Category Selector */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Category *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.select}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                                <option value="Custom">+ Custom Category...</option>
                            </select>

                            {category === "Custom" && (
                                <input
                                    type="text"
                                    placeholder="Enter custom category name..."
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                    required
                                    className={styles.input}
                                    style={{ marginTop: "10px" }}
                                />
                            )}
                        </div>

                        {/* Alt Tag Input */}
                        <div className={styles.formGroupFull}>
                            <label className={styles.label}>Alt Tag / Description *</label>
                            <input
                                type="text"
                                placeholder="e.g. Elegant outdoor wedding reception stage setup in Thrissur"
                                value={altTag}
                                onChange={(e) => setAltTag(e.target.value)}
                                required
                                className={styles.input}
                            />
                            <p className={styles.hint}>
                                Provide descriptive alt text for image accessibility and search engine ranking.
                            </p>
                        </div>
                    </div>

                    {/* Image Preview */}
                    {previewUrl && (
                        <div className={styles.previewContainer}>
                            <p className={styles.previewTitle}>Image Preview:</p>
                            <img src={previewUrl} alt="Upload Preview" className={styles.previewImage} />
                        </div>
                    )}

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            disabled={uploading}
                            className={styles.submitBtn}
                        >
                            <Upload size={18} />
                            {uploading ? "Converting to WebP & Uploading..." : "Upload & Save Image"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Images List */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <ImageIcon size={20} /> Current Dynamic Gallery Images ({items.length})
                </h2>

                {loading ? (
                    <p className={styles.emptyText}>Loading gallery images...</p>
                ) : items.length === 0 ? (
                    <p className={styles.emptyText}>
                        No dynamic gallery images uploaded yet. Use the form above to add your first WebP image!
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {items.map((item) => {
                            const itemId = item._id || item.id || "";
                            const isEditing = editingId === itemId;

                            return (
                                <div key={itemId} className={styles.itemCard}>
                                    <div className={styles.imageWrapper}>
                                        <img src={item.src} alt={item.alt || "Gallery image"} className={styles.thumbImage} />
                                        <span className={styles.webpBadge}>WEBP</span>
                                        <span className={styles.categoryBadge}>{item.category}</span>
                                    </div>

                                    <div className={styles.itemContent}>
                                        {isEditing ? (
                                            <div className={styles.editAltBox}>
                                                <input
                                                    type="text"
                                                    value={editAltText}
                                                    onChange={(e) => setEditAltText(e.target.value)}
                                                    className={styles.input}
                                                    placeholder="Enter Alt Tag..."
                                                    autoFocus
                                                />
                                                <div className={styles.editActions}>
                                                    <button
                                                        onClick={() => handleSaveAlt(itemId)}
                                                        disabled={savingEdit}
                                                        className={styles.saveBtn}
                                                        title="Save Alt Tag"
                                                    >
                                                        <Check size={16} /> Save Alt
                                                    </button>
                                                    <button
                                                        onClick={cancelEditingAlt}
                                                        className={styles.cancelBtn}
                                                        title="Cancel"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.altBox}>
                                                <p className={styles.altText}>
                                                    <strong>Alt Tag:</strong> {item.alt || <em>(No alt tag specified)</em>}
                                                </p>
                                                <button
                                                    onClick={() => startEditingAlt(item)}
                                                    className={styles.editIconBtn}
                                                    title="Edit Alt Tag"
                                                >
                                                    <Edit2 size={14} /> Edit Alt
                                                </button>
                                            </div>
                                        )}

                                        <div className={styles.cardFooter}>
                                            <span className={styles.dateText}>
                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(itemId)}
                                                className={styles.deleteBtn}
                                                title="Delete Image"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
