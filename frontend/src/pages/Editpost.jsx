import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Save, ArrowLeft } from "lucide-react";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =====================
     States
  ===================== */
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  const API_URL =
    import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  /* =====================
     Editor
  ===================== */
  const { quill, quillRef } = useQuill({
    theme: "snow",
  });

  /* =====================
     Fetch Post
  ===================== */
  useEffect(() => {

    fetchPost();
  }, [id, quill]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);

      const post = res.data;

      setTitle(post.title || "");

      // Set editor content
      if (post.content) {
        quill.root.innerHTML = post.content;
      }

      // Set existing thumbnail
      if (post.thumbnail) {
        if(post.thumbnail.startsWith("/uploads/")){
          setPreview(`${API_URL}${post.thumbnail}`);
          return;
        }
        setPreview(post.thumbnail);
      }

    } catch (err) {
      console.log("Fetch error:", err);

    } finally {
      setLoading(false);
    }
  };

  /* =====================
     Handle Thumbnail
  ===================== */
  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    // Preview image
    setPreview(URL.createObjectURL(file));
  };

  /* =====================
     Update
  ===================== */
  const submit = async (e) => {
    e.preventDefault();

    if (!quill) return;

    const content = quill.root.innerHTML;

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await api.put(`/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/myposts");

    } catch (err) {
      console.log("Update error:", err);
    }
  };

  /* =====================
     Loading
  ===================== */
  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
        </Button>

        <h1 className="text-2xl font-bold">
          Edit Post
        </h1>

      </div>

      <Card>

        <CardContent className="p-6 space-y-6">

          <form
            onSubmit={submit}
            className="space-y-6"
          >

            {/* Title */}
            <div className="space-y-1">

              <Label>Title</Label>

              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>

            {/* Editor */}
            <div className="space-y-1">

              <Label>Content</Label>

              <div
                ref={quillRef}
                className="border rounded min-h-[200px] bg-white"
              />

            </div>

            {/* Thumbnail */}
            <div className="space-y-3">

              <Label>Thumbnail</Label>

              {/* Preview */}
              {preview && (
                <img
                  src={preview}
                  alt="Thumbnail Preview"
                  className="w-full max-h-60 object-cover rounded border"
                />
              )}

              {/* File */}
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
              />

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="gap-2"
              >
                <Save size={16} />
                Save Changes
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}
