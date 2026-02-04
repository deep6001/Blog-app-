import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Image, Send } from "lucide-react";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     Quill Setup
  ====================== */
  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your story...",
  });

  /* ======================
     Thumbnail
  ====================== */
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnail(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ======================
     Submit
  ====================== */
  const submit = async (e) => {
    e.preventDefault();

    if (!title || !quill) return;

    const content = quill.root.innerHTML;

    if (!content || content === "<p><br></p>") {
      alert("Write something first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">

      <h1 className="text-3xl font-bold mb-6">
        Create New Post
      </h1>

      <Card>

        <CardContent className="p-6 space-y-6">

          <form
            onSubmit={submit}
            className="space-y-6"
          >

            {/* Title */}
            <div>

              <Label>Title</Label>

              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Post title..."
                className="text-lg"
              />

            </div>

            {/* Thumbnail */}
            <div>

              <Label>Thumbnail</Label>

              <div className="flex gap-3 mt-2">

                <Button
                  type="button"
                  variant="outline"
                  asChild
                >
                  <label className="cursor-pointer flex gap-2">
                    <Image size={16} />
                    Upload
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnail}
                    />
                  </label>
                </Button>

                {thumbnail && (
                  <span className="text-sm text-muted-foreground">
                    {thumbnail.name}
                  </span>
                )}

              </div>

              {preview && (
                <img
                  src={preview}
                  className="mt-3 rounded border max-h-60 object-cover w-full"
                />
              )}

            </div>

            {/* Editor */}
            <div>

              <Label>Content</Label>

              <div
                ref={quillRef}
                className="bg-white rounded border min-h-[250px]"
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
                disabled={loading}
              >
                <Send size={16} className="mr-2" />
                {loading ? "Publishing..." : "Publish"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}
