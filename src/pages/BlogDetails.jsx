import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import Spinner from "../components/Spinner";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const snapshot = await getDoc(doc(db, "blogs", id));

      if (snapshot.exists()) {
        setBlog({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (!blog)
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Blog not found.
      </h2>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <Link
        to="/blogs"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ← Back to Blogs
      </Link>

      <h1
        style={{
          marginTop: "20px",
          color: "#2563eb",
        }}
      >
        {blog.title}
      </h1>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          color: "#6b7280",
        }}
      >
        <p>✍️ {blog.author}</p>

        <p>
          🕒 Created:{" "}
          {blog.createdAt?.toDate().toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {blog.updatedAt && (
          <p>
            ✏️ Updated:{" "}
            {blog.updatedAt.toDate().toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        )}
      </div>

      <hr />

      <p
        style={{
          marginTop: "25px",
          lineHeight: "2",
          color: "#374151",
          whiteSpace: "pre-wrap",
        }}
      >
        {blog.content}
      </p>
    </div>
  );
}

export default BlogDetails;
