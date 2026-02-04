import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  FileText,
  Edit,
  Trash2,
  Calendar,
  Plus,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MyPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     Fetch My Posts
  ===================== */
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/posts/myPosts");

      // If paginated
      if (res.data) {
        setPosts(res.data);
      } else {
        setPosts(res.data);
      }

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  /* =====================
     Delete Post
  ===================== */
  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);

      setPosts((prev) =>
        prev.filter((p) => p._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          My Posts
        </h1>

        <Button
          onClick={() => navigate("/create")}
          className="gap-2"
        >
          <Plus size={16} />
          New Post
        </Button>

      </div>

      {/* Empty */}
      {posts.length === 0 && (

        <Alert>

          <AlertDescription>
            You haven’t created any posts yet.
          </AlertDescription>

        </Alert>

      )}

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {posts.map((post) => (

          <Card
            key={post._id}
            className="hover:shadow-md transition py-0 pb-6"
          >

            {/* Thumbnail */}
            {post.thumbnail && (
              <img
                src={post.thumbnail .startsWith("/uploads/") ? `${import.meta.env.VITE_BASE_URL}${post.thumbnail}` : post.thumbnail}
                alt={post.title}
                className="h-40 w-full object-contain rounded-t-md"
              />
            )}

            <CardHeader className="pb-2">

              <CardTitle className="line-clamp-1">
                {post.title}
              </CardTitle>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">

                <Calendar size={12} />

                {new Date(
                  post.createdAt
                ).toLocaleDateString()}

              </div>

            </CardHeader>

            <CardContent className="space-y-3">

              {/* Preview */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content.replace(/<[^>]+>/g, "")}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/edit/${post._id}`)
                  }
                >
                  <Edit size={14} />
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    deletePost(post._id)
                  }
                >
                  <Trash2 size={14} />
                </Button>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}
