import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";

import PrivateRoute from "./routes/PrivateRoute";
import EditPost from "./pages/Editpost";
import Post from "./pages/Post";

export default function App() {
  return (
    <DashboardLayout>

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Auth User */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/myposts"
          element={
            <PrivateRoute>
              <MyPosts />
            </PrivateRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h1>Page Not Found</h1>}
        />

      </Routes>

    </DashboardLayout>
  );
}
