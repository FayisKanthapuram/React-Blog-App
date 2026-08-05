import { Link } from "react-router-dom";

function NotFound() {
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
      <div>
        <h1
          style={{
            fontSize: "6rem",
            margin: 0,
            color: "#2563eb",
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "10px",
            color: "#1f2937",
          }}
        >
          Oops! Page Not Found
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginTop: "15px",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🏠 Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
