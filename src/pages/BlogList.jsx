import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const { user } = useAuth();
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    setDeletingId(id);

    await deleteDoc(doc(db, "blogs", id));

    await fetchBlogs();

    setDeletingId(null);
  };


  const fetchBlogs = async () => {
    setLoading(true);

    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    const blogData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBlogs(blogData);

    setLoading(false);
  };

  if (loading) return <Spinner />;

  
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#1f2937",
        }}
      >
        📚 Latest Blogs
      </h1>

      {blogs.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          No blogs available.
        </h3>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "25px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                marginBottom: "15px",
                color: "#2563eb",
              }}
            >
              {blog.title}
            </h2>

            <p
              style={{
                color: "#4b5563",
                lineHeight: "1.7",
                marginBottom: "20px",
              }}
            >
              {blog.content.length > 180
                ? blog.content.substring(0, 180) + "..."
                : blog.content}
            </p>
            {blog.content.length > 180 && (
              <button
                onClick={() => navigate(`/blog/${blog.id}`)}
                style={{
                  marginTop: "15px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Read More →
              </button>
            )}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <small
                  style={{
                    display: "block",
                    color: "#6b7280",
                  }}
                >
                  ✍️ {blog.author}
                </small>

                <small
                  style={{
                    display: "block",
                    color: "#6b7280",
                  }}
                >
                  🕒 Created:{" "}
                  {blog.createdAt?.toDate().toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </small>

                {blog.updatedAt && (
                  <small
                    style={{
                      display: "block",
                      color: "#6b7280",
                    }}
                  >
                    ✏️ Edited:{" "}
                    {blog.updatedAt.toDate().toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </small>
                )}
              </div>

              {user?.uid === blog.userId && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => navigate(`/blog/edit/${blog.id}`)}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    disabled={deletingId === blog.id}
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {deletingId === blog.id ? "Deleting..." : "🗑 Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
