"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../BlogForm.module.css";
import { Blog } from "@/lib/types";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditBlogPost() {
    const params = useParams();
    const id = params?.id;
    const [formData, setFormData] = useState<Partial<Blog>>({
        title: "",
        slug: "",
        category: "Wedding Planning Tips",
        content: "",
        image: "",
        author: "PKC Admin",
        published: true,
        metaTitle: "",
        metaDescription: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        fetch("/api/admin/blogs")
            .then(res => res.json())
            .then(data => {
                const found = data.find((b: Blog) => b.id === id || (b as any)._id === id);
                if (found) setFormData(found);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = formData.image;

        if (imageFile) {
            const data = new FormData();
            data.set('file', imageFile);
            try {
                const res = await fetch('/api/upload', { method: 'POST', body: data });
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Image upload failed');
                imageUrl = json.url;
            } catch (error) {
                alert(error instanceof Error ? error.message : 'Image upload failed');
                setUploading(false);
                return;
            }
        }

        const res = await fetch(`/api/admin/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ ...formData, image: imageUrl }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            router.push("/admin/blog");
        } else {
            const json = await res.json().catch(() => null);
            alert(json?.error || 'Failed to update post');
        }
        setUploading(false);
    };

    if (loading) return <div className="p-40">Loading blog data...</div>;

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Edit Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.sectionHeader}>POST DETAILS</div>

                <div className={styles.inputGroup}>
                    <label>Post Title *</label>
                    <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label>Author Name</label>
                        <input
                            type="text"
                            value={formData.author || ""}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Enter author name"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select
                            value={formData.category || "Wedding Planning Tips"}
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
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. top-wedding-decor-trends"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Featured Image</label>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                        {formData.image && (
                            <div style={{ marginBottom: '5px', fontSize: '0.8rem', color: '#666' }}>
                                Current: {formData.image}
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <input
                            type="text"
                            placeholder="Or enter Image URL"
                            value={formData.image || ""}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '35px' }}>CONTENT</div>

                <div className={styles.inputGroup}>
                    <label>Content & Links *</label>
                    <RichTextEditor
                        value={formData.content || ""}
                        onChange={(content) => setFormData({ ...formData, content })}
                    />
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '35px' }}>SEO & META DETAILS</div>

                <div className={styles.inputGroup}>
                    <label>Meta Title (SEO)</label>
                    <input
                        type="text"
                        value={formData.metaTitle || ""}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="Enter SEO meta title for search engines"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Meta Description (SEO)</label>
                    <textarea
                        style={{ height: '100px' }}
                        value={formData.metaDescription || ""}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder="Enter SEO meta description (150-160 characters)"
                    />
                </div>

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        checked={formData.published ?? true}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <label>Keep published</label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={uploading}>
                    {uploading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
}
