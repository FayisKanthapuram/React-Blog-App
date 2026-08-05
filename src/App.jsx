import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Welcome />} />

        <Route path="blogs" element={<BlogList />} />
        <Route path="blog/:id" element={<BlogDetails />} />

        <Route
          path="blog/new"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="blog/edit/:id"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
