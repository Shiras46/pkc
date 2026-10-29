"use client";

import { useState, useRef, useEffect } from "react";
import { Link as LinkIcon, Bold, Italic, Underline, List, ListOrdered, Quote, Eye, Code, Image as ImageIcon, Table as TableIcon, HelpCircle } from "lucide-react";
import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
    value: string;
    onChange: (val: string) => void;
}

export interface ParsedTableResult {
    title: string;
    rows: string[][];
}

const COMMON_KEYWORDS = new Set([
    "venue", "location", "setting", "best for", "name", "title", "type",
    "price", "cost", "capacity", "date", "item", "city", "features", "details",
    "status", "no", "sl no", "budget", "amenities", "package", "guests",
    "district", "state", "place", "area", "distance", "guest capacity", "highlights",
    "ideal for", "key features", "services", "options", "address", "rate", "food",
    "pricing", "specifications", "specification", "timings", "timing", "charges",
    "wedding spots", "spots", "property", "ambience", "seating", "parking", "cuisine",
    "rate/plate", "starting price", "rent", "tariff", "fee", "pax", "space", "remarks",
    "summary", "notes", "duration", "hours", "person", "per person", "per head",
    "hall", "rooms", "resort", "hotel", "destination", "villa", "mandapam"
]);

function isKnownHeaderKeyword(str: string): boolean {
    if (!str) return false;
    const s = str.toLowerCase().trim();
    if (COMMON_KEYWORDS.has(s)) return true;
    for (const kw of Array.from(COMMON_KEYWORDS)) {
        if (s === kw || s.startsWith(kw + " ") || s.endsWith(" " + kw) || s.includes(" " + kw + " ")) {
            return true;
        }
    }
    return false;
}

function isLikelyTitleLine(line: string, nextLine?: string): boolean {
    const l = line?.trim() || "";
    if (!l) return false;
    if (/^#{1,4}\s+/.test(l)) return true;
    // Numbered title: e.g. "8 best destination wedding spots in Thrissur" or "1. Top Spots"
    if (/^[0-9]+[\.\)]?\s+[A-Za-z]/.test(l) && l.length < 110 && !l.endsWith(",") && !l.endsWith(".")) {
        return true;
    }
    // If next line is a known table header keyword (e.g. "Venue"), then this line is definitely a title!
    if (nextLine && isKnownHeaderKeyword(nextLine) && !isKnownHeaderKeyword(l) && l.length <= 110 && !l.includes(",")) {
        return true;
    }
    return false;
}

export function parseTextToTableResult(rawText: string): ParsedTableResult {
    let lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return { title: "", rows: [] };

    let title = "";

    // 0. Extract title / heading if preceding the table (e.g. "8 best destination wedding spots in Thrissur")
    if (lines.length >= 3 && isLikelyTitleLine(lines[0], lines[1])) {
        title = lines[0].replace(/^#{1,4}\s+/, "").trim();
        lines = lines.slice(1);
    }

    // 1. Pipe markdown table
    if (lines.some(l => l.includes("|"))) {
        const rows = lines
            .filter(l => !/^\s*\|?([\s\-:]+\|)+[\s\-:]*\|?\s*$/.test(l))
            .map(l => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()))
            .filter(r => r.length > 0);
        return { title, rows };
    }

    // 2. Tab-separated lines (Excel / Google Sheets / Web table copy)
    if (lines.some(l => l.includes("\t"))) {
        const rows = lines.map(l => l.split("\t").map(c => c.trim()));
        return { title, rows };
    }

    // 3. Multi-space aligned columns (2 or more spaces)
    if (lines.some(l => /\S\s{2,}\S/.test(l))) {
        const spaceRows = lines.map(l => l.split(/\s{2,}/).map(c => c.trim()));
        if (spaceRows.length > 1 && spaceRows[0].length >= 2) {
            return { title, rows: spaceRows };
        }
    }

    // 4. Sequential single-line table stream (Venue \n Location \n Setting \n Best for \n Thottam...)
    if (lines.length >= 4) {
        let bestK = -1;
        let highestScore = -1;

        // Test column count K from 2 to 8
        for (let K = 2; K <= 8; K++) {
            if (lines.length < K * 2) continue; // At least header row + 1 data row

            const headerSlice = lines.slice(0, K);
            let keywordMatches = 0;
            let allHeadersReasonable = true;

            for (const h of headerSlice) {
                if (h.length > 55 || h.endsWith(".") || h.endsWith("?")) {
                    allHeadersReasonable = false;
                    break;
                }
                if (isKnownHeaderKeyword(h)) {
                    keywordMatches++;
                }
            }

            if (!allHeadersReasonable) continue;

            const rowCount = Math.floor(lines.length / K);
            if (rowCount < 2) continue;

            const isDivisible = lines.length % K === 0;
            const nextItemIsData = lines[K] ? !isKnownHeaderKeyword(lines[K]) : true;

            let score = (keywordMatches / K) * 120 + (rowCount * 8);
            if (keywordMatches === K) score += 250; // Perfect header match!
            if (nextItemIsData) score += 80;        // Clean transition from headers to data row!
            if (isDivisible) score += 90;            // Exactly complete rows!

            if (score > highestScore) {
                highestScore = score;
                bestK = K;
            }
        }

        if (bestK >= 2) {
            const rows: string[][] = [];
            const rowCount = Math.floor(lines.length / bestK);
            for (let r = 0; r < rowCount; r++) {
                rows.push(lines.slice(r * bestK, (r + 1) * bestK));
            }
            return { title, rows };
        }
    }

    // 5. Comma-separated lines
    if (lines.some(l => l.includes(","))) {
        const rows = lines.map(l => l.split(",").map(c => c.trim()));
        return { title, rows };
    }

    // 6. Pairing lines (Item, Description)
    if (lines.length >= 4 && lines.length % 2 === 0) {
        const rows: string[][] = [["Item", "Description"]];
        for (let i = 0; i < lines.length; i += 2) {
            rows.push([lines[i], lines[i + 1]]);
        }
        return { title, rows };
    }

    return { title, rows: lines.map(l => [l]) };
}

export function parseTextToTableRows(rawText: string): string[][] {
    const result = parseTextToTableResult(rawText);
    return result.rows;
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function buildLuxuryTableHtml(rows: string[][], title?: string): string {
    if (!rows || rows.length === 0) {
        rows = [
            ["Venue", "Location", "Setting", "Best for"],
            ["Thottam – Venture by Chiriankandath", "Alpara, Kannara", "Nutmeg farm, tiled-roof mandapam", "Large traditional weddings"],
            ["Anjanam", "Paravattani", "Heritage nalukettu", "Intimate rituals, photoshoots"],
            ["Neelambari Ecotourism", "Arattupuzha", "Riverside boutique resort", "Multi-day weddings with stay"]
        ];
    }

    const headerRow = rows[0] || ["Venue", "Location", "Setting", "Best for"];
    const bodyRows = rows.slice(1);

    const ths = headerRow
        .map(
            (c, idx) =>
                `<th style="padding: 14px 18px; font-weight: 700; border-bottom: 2px solid #FCB318; border-right: ${idx < headerRow.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'}; text-align: left; font-size: 0.95rem; background: #1A1916; color: #FCB318;">${escapeHtml(c || `Header ${idx + 1}`)}</th>`
        )
        .join("");

    const trs = (bodyRows.length > 0 ? bodyRows : [headerRow.map((_, i) => `Data ${i + 1}`)])
        .map((row, rIdx) => {
            const bg = rIdx % 2 === 1 ? '#FAF8F5' : '#FFFFFF';
            const tds = headerRow
                .map((_, cIdx) => {
                    const cellVal = row[cIdx] !== undefined ? row[cIdx] : "";
                    const borderRight = cIdx < headerRow.length - 1 ? '1px solid #EAE7DF' : 'none';
                    // Bold styling for first column (Venue name)
                    const isFirstCol = cIdx === 0;
                    const fontStyle = isFirstCol ? 'font-weight: 600; color: #111111;' : 'color: #333333;';
                    return `<td style="padding: 13px 18px; border-bottom: 1px solid #EAE7DF; border-right: ${borderRight}; ${fontStyle} font-size: 0.92rem; vertical-align: top;">${escapeHtml(cellVal)}</td>`;
                })
                .join("");
            return `<tr style="background: ${bg};">${tds}</tr>`;
        })
        .join("");

    const titleHtml = title
        ? `<h2 style="font-size: 1.55rem; font-weight: 700; margin: 30px 0 14px; color: #111111; letter-spacing: -0.3px;">${escapeHtml(title)}</h2>`
        : "";

    return `
${titleHtml}
<div class="prose-table-wrapper" style="overflow-x: auto; margin: 20px 0 28px;">
    <table class="prose-table" style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; border: 1.5px solid #FCB318; box-shadow: 0 4px 20px rgba(0,0,0,0.05); background: #FFFFFF;">
        <thead><tr>${ths}</tr></thead>
        <tbody>${trs}</tbody>
    </table>
</div><p><br/></p>`.trim();
}

export function buildLuxuryFaqHtml(rawText: string): string {
    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const pairs: { question: string; answer: string }[] = [];

    if (lines.length === 0) {
        pairs.push({
            question: "How far in advance should we book services?",
            answer: "We recommend confirming your date 3 to 6 months in advance, especially during the peak wedding season in Kerala."
        });
    } else {
        let currentQ = "";
        let currentA = "";

        for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            if (/^(Q|Question)\s*[:\.]\s*/i.test(l)) {
                if (currentQ) pairs.push({ question: currentQ, answer: currentA || "Details provided upon request." });
                currentQ = l.replace(/^(Q|Question)\s*[:\.]\s*/i, "").trim();
                currentA = "";
            } else if (/^(A|Answer)\s*[:\.]\s*/i.test(l)) {
                currentA = l.replace(/^(A|Answer)\s*[:\.]\s*/i, "").trim();
            } else if (l.endsWith("?")) {
                if (currentQ) pairs.push({ question: currentQ, answer: currentA || "Details provided upon request." });
                currentQ = l;
                currentA = "";
            } else {
                if (currentQ) {
                    currentA = currentA ? `${currentA} ${l}` : l;
                } else {
                    currentQ = l;
                }
            }
        }
        if (currentQ) pairs.push({ question: currentQ, answer: currentA || "Details provided upon request." });
    }

    const cardsHtml = pairs
        .map(
            (p) => `
<div class="faq-card" style="margin: 18px 0; padding: 20px 24px; background: linear-gradient(135deg, #FFFDF9 0%, #FAF6EE 100%); border-radius: 14px; border: 1.5px solid #FCB318; box-shadow: 0 4px 15px rgba(252, 179, 24, 0.08);">
    <h4 style="margin: 0 0 10px 0; font-size: 1.15rem; font-weight: 700; color: #1A1916; display: flex; align-items: center; gap: 8px;">
        <span style="color: #FCB318; font-size: 1.25rem;">❓</span> ${p.question}
    </h4>
    <p style="margin: 0; color: #444444; font-size: 0.96rem; line-height: 1.7;">
        ${p.answer}
    </p>
</div>`
        )
        .join("");

    return `<div class="faq-section" style="margin: 24px 0;">${cardsHtml}</div><p><br/></p>`.trim();
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null);
    const [viewMode, setViewMode] = useState<"visual" | "html">("visual");
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkText, setLinkText] = useState("");

    // Active table & cell state for row/column operations
    const [activeTable, setActiveTable] = useState<HTMLTableElement | null>(null);
    const [activeCell, setActiveCell] = useState<HTMLTableCellElement | null>(null);
    const [tableBubblePos, setTableBubblePos] = useState<{ top: number; left: number } | null>(null);

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

    const updateActiveTableState = () => {
        saveSelection();
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            setActiveCell(null);
            setActiveTable(null);
            setTableBubblePos(null);
            return;
        }

        const node = sel.anchorNode;
        if (!node) {
            setActiveCell(null);
            setActiveTable(null);
            setTableBubblePos(null);
            return;
        }

        const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
        const cell = el?.closest("th, td") as HTMLTableCellElement | null;
        const table = el?.closest("table") as HTMLTableElement | null;

        if (cell && table && editorRef.current?.contains(table)) {
            setActiveCell(cell);
            setActiveTable(table);

            const tableRect = table.getBoundingClientRect();
            const editorRect = editorRef.current.getBoundingClientRect();
            setTableBubblePos({
                top: Math.max(0, tableRect.top - editorRect.top + editorRef.current.scrollTop - 38),
                left: Math.max(10, tableRect.left - editorRect.left),
            });
        } else {
            setActiveCell(null);
            setActiveTable(null);
            setTableBubblePos(null);
        }
    };

    // Table Row & Column Manipulation
    const addRow = (position: "below" | "end" = "below", focusFirstCell = false) => {
        if (!activeTable) return;
        const currentRow = activeCell?.closest("tr");
        const tbody = activeTable.querySelector("tbody") || activeTable;
        const firstRow = activeTable.querySelector("tr");
        const colCount = firstRow?.children.length || 3;

        const newRow = document.createElement("tr");
        const totalRows = activeTable.querySelectorAll("tr").length;
        newRow.style.background = totalRows % 2 === 1 ? "#FAF8F5" : "#FFFFFF";

        let firstTd: HTMLElement | null = null;
        for (let i = 0; i < colCount; i++) {
            const td = document.createElement("td");
            td.style.padding = "12px 18px";
            td.style.borderBottom = "1px solid #EAE7DF";
            td.style.borderRight = i < colCount - 1 ? "1px solid #EAE7DF" : "none";
            td.style.color = "#222222";
            td.style.fontSize = "0.92rem";
            td.innerHTML = "<br/>";
            if (i === 0) firstTd = td;
            newRow.appendChild(td);
        }

        if (position === "below" && currentRow && currentRow.parentNode) {
            currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
        } else {
            tbody.appendChild(newRow);
        }

        handleInput();

        if (focusFirstCell && firstTd) {
            firstTd.focus();
            const range = document.createRange();
            range.selectNodeContents(firstTd);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            updateActiveTableState();
        }
    };

    const deleteRow = () => {
        if (!activeTable) return;
        const currentRow = activeCell?.closest("tr");
        if (!currentRow) return;

        const allRows = activeTable.querySelectorAll("tr");
        if (allRows.length <= 1) {
            deleteTable();
            return;
        }

        currentRow.remove();
        setActiveCell(null);
        handleInput();
        updateActiveTableState();
    };

    const addColumn = (position: "right" | "end" = "right") => {
        if (!activeTable) return;
        const currentCell = activeCell;
        const colIndex = currentCell && currentCell.parentElement ? Array.from(currentCell.parentElement.children).indexOf(currentCell) : -1;
        const rows = Array.from(activeTable.querySelectorAll("tr"));

        rows.forEach((r, rIdx) => {
            const isHeader = r.querySelector("th") !== null || rIdx === 0;
            const cell = document.createElement(isHeader ? "th" : "td");

            if (isHeader) {
                cell.style.padding = "14px 18px";
                cell.style.fontWeight = "700";
                cell.style.borderBottom = "2px solid #FCB318";
                cell.style.borderRight = "1px solid rgba(255,255,255,0.1)";
                cell.style.textAlign = "left";
                cell.style.fontSize = "0.95rem";
                cell.style.background = "#1A1916";
                cell.style.color = "#FCB318";
                cell.textContent = "New Col";
            } else {
                cell.style.padding = "12px 18px";
                cell.style.borderBottom = "1px solid #EAE7DF";
                cell.style.borderRight = "1px solid #EAE7DF";
                cell.style.color = "#222222";
                cell.style.fontSize = "0.92rem";
                cell.innerHTML = "<br/>";
            }

            if (position === "right" && colIndex >= 0 && colIndex < r.children.length) {
                r.insertBefore(cell, r.children[colIndex].nextSibling);
            } else {
                r.appendChild(cell);
            }
        });

        rows.forEach((r) => {
            const lastCell = r.lastElementChild as HTMLElement;
            if (lastCell) lastCell.style.borderRight = "none";
        });

        handleInput();
        updateActiveTableState();
    };

    const deleteColumn = () => {
        if (!activeCell || !activeTable) return;
        const colIndex = activeCell.parentElement ? Array.from(activeCell.parentElement.children).indexOf(activeCell) : -1;
        if (colIndex < 0) return;

        const rows = Array.from(activeTable.querySelectorAll("tr"));
        const totalCols = rows[0]?.children.length || 0;

        if (totalCols <= 1) {
            deleteTable();
            return;
        }

        rows.forEach((r) => {
            if (r.children[colIndex]) {
                r.children[colIndex].remove();
            }
            const lastCell = r.lastElementChild as HTMLElement;
            if (lastCell) lastCell.style.borderRight = "none";
        });

        setActiveCell(null);
        handleInput();
        updateActiveTableState();
    };

    const deleteTable = () => {
        if (!activeTable) return;
        if (confirm("Delete this table?")) {
            const wrapper = activeTable.closest(".prose-table-wrapper");
            if (wrapper) wrapper.remove();
            else activeTable.remove();
            setActiveTable(null);
            setActiveCell(null);
            setTableBubblePos(null);
            handleInput();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab" && activeCell && activeTable) {
            e.preventDefault();
            const rows = Array.from(activeTable.querySelectorAll("tr"));
            const lastRow = rows[rows.length - 1];
            const isLastCellOfLastRow = lastRow && lastRow.lastElementChild === activeCell;

            if (isLastCellOfLastRow && !e.shiftKey) {
                addRow("end", true);
            } else {
                const allCells = Array.from(activeTable.querySelectorAll("th, td"));
                const currentIndex = allCells.indexOf(activeCell);
                const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
                if (nextIndex >= 0 && nextIndex < allCells.length) {
                    const targetCell = allCells[nextIndex] as HTMLElement;
                    targetCell.focus();
                    const range = document.createRange();
                    range.selectNodeContents(targetCell);
                    range.collapse(false);
                    const sel = window.getSelection();
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                    updateActiveTableState();
                }
            }
        }
    };

    const insertHtmlAtCursor = (html: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
        restoreSelection();

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            range.deleteContents();

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const frag = document.createDocumentFragment();
            let node: Node | null;
            let lastNode: Node | null = null;
            while ((node = tempDiv.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            if (lastNode) {
                range.setStartAfter(lastNode);
                range.setEndAfter(lastNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else {
            execCommand("insertHTML", html);
        }
        handleInput();
    };

    const handleFormatOrInsertTable = () => {
        saveSelection();
        const sel = window.getSelection();
        const text = sel ? sel.toString().trim() : "";

        let tableHtml = "";
        if (text) {
            const { title, rows } = parseTextToTableResult(text);
            tableHtml = buildLuxuryTableHtml(rows, title);
        } else {
            tableHtml = buildLuxuryTableHtml([]);
        }
        insertHtmlAtCursor(tableHtml);
    };

    const handleFormatOrInsertFaq = () => {
        saveSelection();
        const sel = window.getSelection();
        const text = sel ? sel.toString().trim() : "";

        const faqHtml = buildLuxuryFaqHtml(text);
        insertHtmlAtCursor(faqHtml);
    };

    const handleFormatBlock = (tag: string) => {
        if (tag === "table") {
            handleFormatOrInsertTable();
            return;
        }
        if (tag === "faq") {
            handleFormatOrInsertFaq();
            return;
        }
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
                    <option value="table">📊 Table Format (Convert / Insert)</option>
                    <option value="faq">❓ FAQ Format (Convert / Insert)</option>
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

                {/* TABLE FORMAT BUTTON */}
                <button
                    type="button"
                    className={`${styles.toolBtn} ${styles.tableBtn}`}
                    onMouseDown={() => saveSelection()}
                    onClick={handleFormatOrInsertTable}
                    title="Format selected text into a luxury Table, or insert new Table"
                >
                    <TableIcon size={15} />
                    <span>Table</span>
                </button>

                {/* FAQ FORMAT BUTTON */}
                <button
                    type="button"
                    className={`${styles.toolBtn} ${styles.faqBtn}`}
                    onMouseDown={() => saveSelection()}
                    onClick={handleFormatOrInsertFaq}
                    title="Format selected text into design-level FAQ cards, or insert FAQ"
                >
                    <HelpCircle size={15} />
                    <span>FAQ</span>
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

            {/* ACTIVE TABLE ROW/COLUMN CONTROLS TOOLBAR */}
            {viewMode === "visual" && activeTable && (
                <div className={styles.tableActiveToolbar}>
                    <div className={styles.tableToolbarLabel}>
                        <TableIcon size={14} />
                        <span>Table Controls:</span>
                    </div>
                    <button
                        type="button"
                        className={styles.tableControlBtn}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addRow("below")}
                        title="Add a new row below the selected cell"
                    >
                        ➕ Add Row
                    </button>
                    <button
                        type="button"
                        className={styles.tableControlBtn}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={deleteRow}
                        title="Delete the currently selected row"
                    >
                        ➖ Delete Row
                    </button>
                    <button
                        type="button"
                        className={styles.tableControlBtn}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addColumn("right")}
                        title="Add a new column to the right of the selected cell"
                    >
                        ➕ Add Column
                    </button>
                    <button
                        type="button"
                        className={styles.tableControlBtn}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={deleteColumn}
                        title="Delete the currently selected column"
                    >
                        ➖ Delete Column
                    </button>
                    <button
                        type="button"
                        className={`${styles.tableControlBtn} ${styles.tableDeleteBtn}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={deleteTable}
                        title="Delete this entire table"
                    >
                        🗑️ Remove Table
                    </button>
                </div>
            )}

            {/* VISUAL WYSIWYG OR RAW HTML */}
            {viewMode === "visual" ? (
                <div className={styles.visualWrapper}>
                    {/* Floating Table Action Bubble right on the table */}
                    {activeTable && tableBubblePos && (
                        <div
                            className={styles.floatingTableBubble}
                            style={{ top: `${tableBubblePos.top}px`, left: `${tableBubblePos.left}px` }}
                        >
                            <span className={styles.bubbleTitle}>Table:</span>
                            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => addRow("below")} title="Add Row Below">
                                + Row
                            </button>
                            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={deleteRow} title="Delete Current Row">
                                − Row
                            </button>
                            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => addColumn("right")} title="Add Column Right">
                                + Col
                            </button>
                            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={deleteColumn} title="Delete Current Column">
                                − Col
                            </button>
                            <button
                                type="button"
                                className={styles.bubbleDelete}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={deleteTable}
                                title="Delete Entire Table"
                            >
                                🗑️
                            </button>
                        </div>
                    )}

                    <div
                        ref={editorRef}
                        className={styles.visualArea}
                        contentEditable
                        onInput={handleInput}
                        onBlur={handleInput}
                        onKeyDown={handleKeyDown}
                        onClick={updateActiveTableState}
                        onSelect={updateActiveTableState}
                        onKeyUp={updateActiveTableState}
                        onMouseUp={updateActiveTableState}
                        suppressContentEditableWarning
                    />
                </div>
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
