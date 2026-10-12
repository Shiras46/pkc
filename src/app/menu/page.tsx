import Image from "next/image";

export default function MenuPage() {
  const pdfUrl =
    "https://pkcevents-storage.s3.us-east-1.amazonaws.com/menucard/wedding-menu.pdf";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #ffffff 0%, #fff8e7 50%, #ffffff 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          background: "#fff",
          borderRadius: "30px",
          padding: "60px 40px",
          boxShadow: "0 25px 80px rgba(0,0,0,.08)",
        }}
      >
        <Image
          src="/logo.png"
          alt="PKC Events"
          width={110}
          height={110}
          style={{
            objectFit: "contain",
            margin: "0 auto 25px",
          }}
        />

        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px",
          }}
        >
          🍽️
        </div>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#111",
            marginBottom: "15px",
          }}
        >
           Wedding Checklist
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          Explore our complete wedding checklist with premium services crafted for unforgettable weddings and celebrations.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "16px 34px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg,#d4af37,#f6d365)",
              color: "#111",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 12px 30px rgba(212,175,55,.35)",
              transition: "0.3s",
            }}
          >
            👁 View checklist
          </a>

          <a
            href={pdfUrl}
            download
            style={{
              padding: "16px 34px",
              borderRadius: "999px",
              border: "2px solid #d4af37",
              color: "#d4af37",
              fontWeight: 700,
              textDecoration: "none",
              background: "#fff",
              transition: "0.3s",
            }}
          >
            ⬇ Download PDF
          </a>
        </div>

        <div
          style={{
            marginTop: "35px",
            color: "#999",
            fontSize: "14px",
          }}
        >
          Powered by PKC Events
        </div>
      </div>
    </main>
  );
}