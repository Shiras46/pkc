"use client";

import { useState, useRef } from "react";
import { Link as LinkIcon, Bold, Italic, List, ListOrdered, Quote, Eye, Edit3, Image as ImageIcon } from "lucide-react";
import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
    value: string;
    onChange: (val: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkText, setLinkText] = useState("");

    const getSelection = () => {
        const el = textareaRef.current;
        if (!el) return { start: 0, end: 0, selected: "" };
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const selected = value.substring(start, end);
        return { start, end, selected };
    };

    const wrapSelection = (prefix: string, suffix: string, defaultText = "text") => {
        const { start, end, selected } = getSelection();
        const textToWrap = selected || defaultText;
        const newValue = value.substring(0, start) + prefix + textToWrap + suffix + value.substring(end);
        onChange(newValue);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(
                    start + prefix.length,
                    start + prefix.length + textToWrap.length
                );
            }
        }, 0);
    };

    const handleFormatChange = (format: string) => {
        if (format === "p") {
            wrapSelection("<p>", "</p>", "Paragraph text");
        } else if (format === "h2") {
            wrapSelection("<h2>", "</h2>", "Heading Title");
        } else if (format === "h3") {
            wrapSelection("<h3>", "</h3>", "Subheading Title");
        }
    };

    const handleOpenLinkModal = () => {
        const { selected } = getSelection();
        setLinkText(selected || "");
        setLinkUrl("");
        setIsLinkModalOpen(true);
    };

    const handleInsertLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkUrl) return;

        const formattedUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://") || linkUrl.startsWith("/")
            ? linkUrl
            : `https://${linkUrl}`;

        const textToDisplay = linkText || formattedUrl;
        const linkHtml = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${textToDisplay}</a>`;

        const { start, end } = getSelection();
        const newValue = value.substring(0, start) + linkHtml + value.substring(end);
        onChange(newValue);
        setIsLinkModalOpen(false);
    };

    const handleInsertImage = () => {
        const url = prompt("Enter Image URL:");
        if (!url) return;
        const alt = prompt("Enter Image Alt Text (Description):") || "Blog Image";
        const imgHtml = `<p><img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px;" /></p>`;
        const { start, end } = getSelection();
        const newValue = value.substring(0, start) + imgHtml + value.substring(end);
        onChange(newValue);
    };

    return (
        <div className={styles.editorContainer}>
            {/* TOOLBAR */}
            <div className={styles.toolbar}>
                <select
                    className={styles.formatSelect}
                    defaultValue=""
                    onChange={(e) => {
                        if (e.target.value) {
                            handleFormatChange(e.target.value);
                            e.target.value = "";
                        }
                    }}
                >
                    <option value="" disabled>Format Paragraph...</option>
                    <option value="p">Paragraph (&lt;p&gt;)</option>
                    <option value="h2">Heading 2 (&lt;h2&gt;)</option>
                    <option value="h3">Heading 3 (&lt;h3&gt;)</option>
                </select>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => wrapSelection("<strong>", "</strong>", "Bold text")}
                    title="Bold"
                >
                    <Bold size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => wrapSelection("<em>", "</em>", "Italic text")}
                    title="Italic"
                >
                    <Italic size={16} />
                </button>

                <div className={styles.divider} />

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => wrapSelection("<ul>\n  <li>", "</li>\n</ul>", "List item")}
                    title="Bullet List"
                >
                    <List size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => wrapSelection("<ol>\n  <li>", "</li>\n</ol>", "Numbered item")}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => wrapSelection("<blockquote>", "</blockquote>", "Quote text")}
                    title="Blockquote"
                >
                    <Quote size={16} />
                </button>

                <div className={styles.divider} />

                {/* LINK INSERTION BUTTON */}
                <button
                    type="button"
                    className={`${styles.toolBtn} ${styles.linkBtn}`}
                    onClick={handleOpenLinkModal}
                    title="Insert Hyperlink"
                >
                    <LinkIcon size={16} />
                    <span>Add Link</span>
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={handleInsertImage}
                    title="Insert Image"
                >
                    <ImageIcon size={16} />
                </button>

                <div className={styles.divider} style={{ marginLeft: "auto" }} />

                <button
                    type="button"
                    className={`${styles.toolBtn} ${viewMode === "edit" ? styles.activeTabBtn : ""}`}
                    onClick={() => setViewMode("edit")}
                >
                    <Edit3 size={14} /> Edit
                </button>

                <button
                    type="button"
                    className={`${styles.toolBtn} ${viewMode === "preview" ? styles.activeTabBtn : ""}`}
                    onClick={() => setViewMode("preview")}
                >
                    <Eye size={14} /> Preview
                </button>
            </div>

            {/* EDITOR OR PREVIEW */}
            {viewMode === "edit" ? (
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write your blog post content here... You can use the formatting tools above or write HTML tags."
                    required
                />
            ) : (
                <div
                    className={styles.previewBox}
                    dangerouslySetInnerHTML={{ __html: value || "<p style='color: #888;'>Nothing to preview yet.</p>" }}
                />
            )}

            {/* LINK INSERTION MODAL */}
            {isLinkModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsLinkModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Insert Link</h3>
                        <form onSubmit={handleInsertLink}>
                            <div className={styles.modalField}>
                                <label>Link URL (Address)*</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com or /services/catering"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className={styles.modalField}>
                                <label>Link Text to Display</label>
                                <input
                                    type="text"
                                    placeholder="Click here to learn more"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => setIsLinkModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={styles.insertBtn}>
                                    Insert Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
