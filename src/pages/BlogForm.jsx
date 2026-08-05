import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, []);

  const fetchBlog = async () => {
    setPageLoading(true);

    try {
      const snapshot = await getDoc(doc(db, "blogs", id));

      if (snapshot.exists()) {
        const blog = snapshot.data();

        setTitle(blog.title);
        setContent(blog.content);
      }
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (isEdit) {
        await updateDoc(doc(db, "blogs", id), {
          title,
          content,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "blogs"), {
          title,
          content,
          author: user.displayName,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: null,
        });
      }

      navigate("/blogs");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
            padding: 0,
          }}
        >
          ← Back to Blogs
        </button>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#2563eb",
            }}
          >
            {isEdit ? "✏️ Edit Blog" : "📝 Create New Blog"}
          </h2>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Blog Content
          </label>

          <textarea
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              resize: "vertical",
              fontSize: "16px",
              marginBottom: "25px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Publishing..."
              : isEdit
                ? "Update Blog ✨"
                : "Publish Blog 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
