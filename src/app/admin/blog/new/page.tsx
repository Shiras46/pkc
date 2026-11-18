"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Blog } from "@/lib/types";
import styles from "../BlogForm.module.css";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { convertImageToWebP, uploadFileSafely } from "@/lib/clientImageUpload";

export default function NewBlogPost() {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "Wedding Planning Tips",
        content: "",
        image: "",
        author: "PKC Admin",
        published: true,
        metaTitle: "",
        metaDescription: "",
        showCta: true,
        ctaEyebrow: "START PLANNING YOUR CELEBRATION",
        ctaTitle: "Ready to make your dream event a reality?",
        ctaDescription: "Whether it is an intimate engagement, a grand royal wedding, or an elegant corporate event, our master chefs and planners handle every detail seamlessly.",
        ctaButtonText: "Request Free Consultation",
        ctaButtonLink: "/contact",
        ctaSecondaryText: "Chat on WhatsApp",
        ctaSecondaryLink: "https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20management%20and%20catering.",
        ctaPhone: "+91 81380 02333",
        ctaEmail: "pridekitchencaterers@gmail.com"
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageInfo, setImageInfo] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData({ ...formData, title, slug });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const rawFile = e.target.files[0];
            setImageInfo("Converting to optimized WebP format...");
            try {
                const res = await convertImageToWebP(rawFile);
                setImageFile(res.file);
                setImagePreview(res.previewUrl);
                const originalKb = Math.round(res.originalSize / 1024);
                const webpKb = Math.round(res.webpSize / 1024);
                setImageInfo(`✓ Auto-converted to WebP (${webpKb} KB, saved ${res.savedPercent}% size from ${originalKb} KB)`);
            } catch (convErr) {
                console.warn("Client WebP conversion fallback:", convErr);
                setImageFile(rawFile);
                setImagePreview(URL.createObjectURL(rawFile));
                setImageInfo("Ready for upload");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const uploadResult = await uploadFileSafely(imageFile);
                imageUrl = uploadResult.url;
            } else if (imageUrl && imageUrl.trim()) {
                const trimmed = imageUrl.trim();
                const isValid = trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://');
                if (!isValid) {
                    alert('Please enter a valid Image URL (must start with https://, http://, or /) or upload an image file.');
                    return;
                }
                imageUrl = trimmed;
            }

            const res = await fetch("/api/admin/blogs", {
                method: "POST",
                body: JSON.stringify({ ...formData, image: imageUrl }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (res.ok) {
                router.push("/admin/blog");
            } else {
                const json = await res.json().catch(() => null);
                alert(json?.error || 'Failed to create post');
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Create New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.sectionHeader}>POST DETAILS</div>
                
                <div className={styles.inputGroup}>
                    <label>Post Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label>Author Name</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Enter author name"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Blog["category"] })}
                        >
                            <option>Wedding Planning Tips</option>
                            <option>Catering & Menu Guides</option>
                            <option>Event Trends</option>
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Slug (URL Friendly) *</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. top-wedding-decor-trends"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Cover Image</label>
                    <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                        {(imagePreview || formData.image) && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '10px 14px',
                                background: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}>
                                <img
                                    src={imagePreview || formData.image}
                                    alt="Cover preview"
                                    style={{
                                        width: '80px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                                <div style={{ fontSize: '0.85rem' }}>
                                    <div style={{ fontWeight: '600', color: '#111827' }}>
                                        {imagePreview ? 'Selected Cover Image (Preview)' : 'Image URL'}
                                    </div>
                                    {imageInfo ? (
                                        <div style={{ color: '#059669', marginTop: '2px', fontWeight: '500' }}>
                                            {imageInfo}
                                        </div>
                                    ) : (
                                        <div style={{ color: '#6b7280', wordBreak: 'break-all' }}>
                                            {formData.image}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*,.jpg,.jpeg,.png,.webp,.avif,.heic,.heif,.gif,.svg,.bmp,.tiff,.tif,.jfif,.ico,.raw,.cr2,.nef,.arw,.dng"
                            onChange={handleFileChange}
                        />
                        <input
                            type="text"
                            placeholder="Or enter Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '35px' }}>CONTENT</div>

                <div className={styles.inputGroup}>
                    <label>Content & Links *</label>
                    <RichTextEditor
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                    />
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '35px' }}>SEO & META DETAILS</div>

                <div className={styles.inputGroup}>
                    <label>Meta Title (SEO)</label>
                    <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="Enter SEO meta title for search engines"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Meta Description (SEO)</label>
                    <textarea
                        style={{ height: '100px' }}
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder="Enter SEO meta description (150-160 characters)"
                    />
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '35px' }}>BOTTOM CALL-TO-ACTION (CTA) BANNER</div>

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="showCta"
                        checked={formData.showCta}
                        onChange={(e) => setFormData({ ...formData, showCta: e.target.checked })}
                    />
                    <label htmlFor="showCta">Enable Bottom Call-To-Action Banner</label>
                </div>

                {formData.showCta && (
                    <div style={{ background: '#FAF8F5', padding: '24px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(252, 179, 24, 0.25)' }}>
                        <div className={styles.inputGroup}>
                            <label>CTA Eyebrow Tag</label>
                            <input
                                type="text"
                                value={formData.ctaEyebrow}
                                onChange={(e) => setFormData({ ...formData, ctaEyebrow: e.target.value })}
                                placeholder="e.g. START PLANNING YOUR CELEBRATION"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>CTA Headline</label>
                            <input
                                type="text"
                                value={formData.ctaTitle}
                                onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                                placeholder="e.g. Ready to make your dream event a reality?"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>CTA Description</label>
                            <textarea
                                style={{ height: '90px' }}
                                value={formData.ctaDescription}
                                onChange={(e) => setFormData({ ...formData, ctaDescription: e.target.value })}
                                placeholder="Enter description for the CTA banner"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className={styles.inputGroup}>
                                <label>Primary Button Text</label>
                                <input
                                    type="text"
                                    value={formData.ctaButtonText}
                                    onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
                                    placeholder="e.g. Request Free Consultation"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Primary Button URL / Link</label>
                                <input
                                    type="text"
                                    value={formData.ctaButtonLink}
                                    onChange={(e) => setFormData({ ...formData, ctaButtonLink: e.target.value })}
                                    placeholder="e.g. /contact"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className={styles.inputGroup}>
                                <label>Secondary Button Text</label>
                                <input
                                    type="text"
                                    value={formData.ctaSecondaryText}
                                    onChange={(e) => setFormData({ ...formData, ctaSecondaryText: e.target.value })}
                                    placeholder="e.g. Chat on WhatsApp"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Secondary Button URL / WhatsApp Link</label>
                                <input
                                    type="text"
                                    value={formData.ctaSecondaryLink}
                                    onChange={(e) => setFormData({ ...formData, ctaSecondaryLink: e.target.value })}
                                    placeholder="e.g. https://api.whatsapp.com/send?phone=... or tel: or mailto:"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <div className={styles.inputGroup}>
                                <label>📞 Direct Call Number (Click to Dial)</label>
                                <input
                                    type="text"
                                    value={formData.ctaPhone}
                                    onChange={(e) => setFormData({ ...formData, ctaPhone: e.target.value })}
                                    placeholder="e.g. +91 81380 02333"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>📧 Direct Email Address (Click to Email)</label>
                                <input
                                    type="text"
                                    value={formData.ctaEmail}
                                    onChange={(e) => setFormData({ ...formData, ctaEmail: e.target.value })}
                                    placeholder="e.g. pridekitchencaterers@gmail.com"
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666', background: 'rgba(252, 179, 24, 0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                            💡 <strong>Action Tip:</strong> To turn any button into a direct call, use <code>tel:+918138002333</code> as its URL. To turn any button into a direct email, use <code>mailto:pridekitchencaterers@gmail.com</code> as its URL.
                        </div>
                    </div>
                )}

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <label>Publish immediately</label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save & Publish Post'}
                </button>
            </form>
        </div>
    );
}
