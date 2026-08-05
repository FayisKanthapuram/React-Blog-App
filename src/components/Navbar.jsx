import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

function Navbar() {
  const { user, logout ,loading} = useAuth();
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <Spinner />;


  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
        }}
      >
        <h2>InkFlow ✍️</h2>
      </Link>

      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src={
              user.photoURL ||
              "https://png.pngtree.com/png-clipart/20241125/original/pngtree-cartoon-user-avatar-vector-png-image_17295195.png"
            }
            alt={user.displayName}
            onError={(e) => {
              e.target.src =
                "https://png.pngtree.com/png-clipart/20241125/original/pngtree-cartoon-user-avatar-vector-png-image_17295195.png";
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #e5e7eb",
            }}
          />

          <span
            style={{
              fontWeight: "600",
            }}
          >
            {user.displayName}
          </span>

          <button
            onClick={() => navigate("/blog/new")}
            style={{
              padding: "10px 16px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Blog
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={googleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 18px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            width="20"
            alt="Google"
          />
          Sign in with Google
        </button>
      )}
    </nav>
  );
}

export default Navbar;
