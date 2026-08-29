"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { Blog } from "@/lib/types";
import styles from "./BlogManagement.module.css";

export default function BlogManagement() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/blogs")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBlogs(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setDeleteConfirm(id);
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    const confirmDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setBlogs(blogs.filter(b => b.id !== id));
                setDeleteConfirm(null);
            } else {
                if (res.status === 401) {
                    alert("Session expired. Please login again.");
                    window.location.href = "/admin/login";
                } else {
                    alert("Failed to delete post.");
                }
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Blog Management</h1>
                <Link href="/admin/blog/new" className={styles.addBtn}>
                    <Plus size={20} />
                    <span>Create New Post</span>
                </Link>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                                <td>{blog.category}</td>
                                <td>{blog.date}</td>
                                <td>
                                    <span className={`${styles.badge} ${blog.published ? styles.published : styles.draft}`}>
                                        {blog.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        {deleteConfirm === blog.id ? (
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button
                                                    onClick={() => confirmDelete(blog.id)}
                                                    className={styles.deleteBtn}
                                                    style={{ color: 'green', fontWeight: 'bold', fontSize: '0.8rem' }}
                                                    title="Confirm Delete"
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={cancelDelete}
                                                    className={styles.viewBtn}
                                                    style={{ fontSize: '0.8rem' }}
                                                    title="Cancel"
                                                >
                                                    No
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Link href={`/blog/${blog.slug}`} target="_blank" className={styles.viewBtn}>
                                                    <Eye size={18} />
                                                </Link>
                                                <Link href={`/admin/blog/edit/${blog.id}`} className={styles.editBtn}>
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button onClick={(e) => handleDeleteClick(e, blog.id)} className={styles.deleteBtn}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className={styles.loading}>Loading blogs...</p>}
                {!loading && blogs.length === 0 && <p className={styles.loading}>No blog posts found.</p>}
            </div>
        </div>
    );
}
