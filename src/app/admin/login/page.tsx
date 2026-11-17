"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data?.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please check your network connection.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Login</h1>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
