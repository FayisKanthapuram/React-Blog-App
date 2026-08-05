import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            color: "#1f2937",
          }}
        >
          Welcome to <span style={{ color: "#2563eb" }}>InkFlow ✍️</span>
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#6b7280",
            lineHeight: "1.8",
            marginBottom: "35px",
          }}
        >
          Create, edit and manage your blogs effortlessly.
          <br />
          Share your thoughts with the world using a simple and modern blogging
          platform powered by Firebase.
        </p>

        <Link to="/blogs">
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Explore Blogs 🚀
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
