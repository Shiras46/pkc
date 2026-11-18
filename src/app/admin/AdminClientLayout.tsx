"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut, ChevronLeft, ChevronRight, MessageSquare, Video, Image as ImageIcon } from "lucide-react";
import styles from "./AdminLayout.module.css";

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!pathname) return null;
    if (pathname === "/admin/login") return <>{children}</>;

    const handleLogout = async () => {
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/admin/login");
    };

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Blog Posts", href: "/admin/blog", icon: <FileText size={20} /> },
        { name: "Gallery", href: "/admin/gallery", icon: <ImageIcon size={20} /> },
        { name: "Enquiries", href: "/admin/enquiries", icon: <MessageSquare size={20} /> },
        { name: "Video Reviews", href: "/admin/videos", icon: <Video size={20} /> },
        { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
                <button
                    className={styles.toggleBtn}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <div className={styles.logo}>
                    {isCollapsed ? "PKC" : <>PKC <span>Admin</span></>}
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname.startsWith(item.href) ? styles.active : ""}`}
                            title={isCollapsed ? item.name : ""}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <button className={styles.logout} onClick={handleLogout} title={isCollapsed ? "Logout" : ""}>
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </aside>
            <main className={`${styles.main} ${isCollapsed ? styles.mainCollapsed : ""}`}>
                {children}
            </main>
        </div>
    );
}
