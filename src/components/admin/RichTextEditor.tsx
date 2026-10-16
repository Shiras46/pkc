"use client";

import { useState, useRef, useEffect } from "react";
import { Link as LinkIcon, Bold, Italic, Underline, List, ListOrdered, Quote, Eye, Code, Image as ImageIcon } from "lucide-react";
import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
    value: string;
    onChange: (val: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null);
    const [viewMode, setViewMode] = useState<"visual" | "html">("visual");
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkText, setLinkText] = useState("");

    // Initialize content inside visual editor on load
    useEffect(() => {
        if (editorRef.current && viewMode === "visual") {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || "";
            }
        }
    }, [value, viewMode]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, valueArgument: string = "") => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
        document.execCommand(command, false, valueArgument);
        handleInput();
    };

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedRangeRef.current = sel.getRangeAt(0).cloneRange();
        }
    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        if (sel && savedRangeRef.current) {
            sel.removeAllRanges();
            sel.addRange(savedRangeRef.current);
        }
    };

    const handleFormatBlock = (tag: string) => {
        execCommand("formatBlock", `<${tag}>`);
    };

    const handleOpenLinkModal = () => {
        saveSelection();
        const sel = window.getSelection();
        const text = sel ? sel.toString() : "";
        setLinkText(text);
        setLinkUrl("");
        setIsLinkModalOpen(true);
    };

    const handleInsertLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkUrl) return;

        const formattedUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://") || linkUrl.startsWith("/")
            ? linkUrl
            : `https://${linkUrl}`;

        if (editorRef.current) {
            editorRef.current.focus();
        }

        restoreSelection();

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const anchor = document.createElement("a");
            anchor.href = formattedUrl;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.textContent = linkText || range.toString() || formattedUrl;

            range.deleteContents();
            range.insertNode(anchor);
            
            // Move cursor after link
            range.setStartAfter(anchor);
            range.setEndAfter(anchor);
            sel.removeAllRanges();
            sel.addRange(range);
        } else {
            execCommand("createLink", formattedUrl);
        }

        handleInput();
        setIsLinkModalOpen(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.set('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Upload failed');

            const alt = prompt("Enter Image Description (Alt Text):") || "Blog Image";
            if (editorRef.current) {
                editorRef.current.focus();
            }
            const imgHtml = `<p><img src="${json.url}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" /></p>`;
            execCommand("insertHTML", imgHtml);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Image upload failed');
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleInsertImage = () => {
        const choice = confirm("Click OK to upload an image file from your device (auto-converts to WebP & uploads to S3),\nor click Cancel to enter an image URL.");
        if (choice) {
            fileInputRef.current?.click();
        } else {
            const url = prompt("Enter Image URL:");
            if (!url) return;
            const alt = prompt("Enter Image Description (Alt Text):") || "Blog Image";
            
            if (editorRef.current) {
                editorRef.current.focus();
            }
            
            const imgHtml = `<p><img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" /></p>`;
            execCommand("insertHTML", imgHtml);
        }
    };

    return (
        <div className={styles.editorContainer}>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageFileChange}
            />
            {/* TOOLBAR */}
            <div className={styles.toolbar}>
                <select
                    className={styles.formatSelect}
                    defaultValue=""
                    onChange={(e) => {
                        if (e.target.value) {
                            handleFormatBlock(e.target.value);
                            e.target.value = "";
                        }
                    }}
                >
                    <option value="" disabled>Format Text Style...</option>
                    <option value="p">Normal Paragraph</option>
                    <option value="h2">Heading 2 (Large)</option>
                    <option value="h3">Heading 3 (Medium)</option>
                </select>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => execCommand("bold")}
                    title="Bold text"
                >
                    <Bold size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => execCommand("italic")}
                    title="Italic text"
                >
                    <Italic size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => execCommand("underline")}
                    title="Underline text"
                >
                    <Underline size={16} />
                </button>

                <div className={styles.divider} />

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => execCommand("insertUnorderedList")}
                    title="Bullet List"
                >
                    <List size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => execCommand("insertOrderedList")}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>

                <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => handleFormatBlock("blockquote")}
                    title="Quote"
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
                    className={`${styles.toolBtn} ${viewMode === "visual" ? styles.activeTabBtn : ""}`}
                    onClick={() => setViewMode("visual")}
                >
                    <Eye size={14} /> Visual Editor
                </button>

                <button
                    type="button"
                    className={`${styles.toolBtn} ${viewMode === "html" ? styles.activeTabBtn : ""}`}
                    onClick={() => setViewMode("html")}
                >
                    <Code size={14} /> HTML Code
                </button>
            </div>

            {/* VISUAL WYSIWYG OR RAW HTML */}
            {viewMode === "visual" ? (
                <div
                    ref={editorRef}
                    className={styles.visualArea}
                    contentEditable
                    onInput={handleInput}
                    onBlur={handleInput}
                    suppressContentEditableWarning
                />
            ) : (
                <textarea
                    className={styles.textarea}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="HTML Source Code..."
                />
            )}

            {/* LINK INSERTION MODAL */}
            {isLinkModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsLinkModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Insert Hyperlink</h3>
                        <form onSubmit={handleInsertLink}>
                            <div className={styles.modalField}>
                                <label>Link URL (Web Address)*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. https://pkcevents.com/services/catering"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className={styles.modalField}>
                                <label>Link Text (Display Label)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Explore Catering Services"
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
