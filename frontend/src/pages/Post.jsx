import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios"; // ✅ your axios instance

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { ArrowLeft } from "lucide-react";

function Post() {
    const navigate = useNavigate();
    const { id } = useParams(); // 👈 get :id

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);

                const res = await api.get(`/posts/${id}`);

                setPost(res.data);
                setError("");
            } catch (err) {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    /* ---------------- LOADING UI ---------------- */
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center px-4 py-8">
                <div className="w-full max-w-3xl space-y-4">

                    <Skeleton className="h-8 w-24" />

                    <Card className="p-6 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-32 w-full" />
                    </Card>

                </div>
            </div>
        );
    }

    /* ---------------- ERROR UI ---------------- */
    if (error) {
        return (
            <div className="min-h-screen flex justify-center px-4 py-8">
                <Alert variant="destructive" className="max-w-md">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 flex justify-center px-4 py-8">

            <div className="w-full max-w-3xl space-y-4">

                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} />
                    Back
                </Button>

                {/* Post Card */}
                <Card>

                    <CardHeader className="space-y-3">

                        {/* Author */}
                        <div className="flex items-center gap-3">

                            <Avatar>
                                <AvatarFallback>
                                    {post?.authorId?.username?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="font-medium">
                                    {post?.authorId?.username || "Unknown"}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Posted on{" "}
                                    {new Date(post?.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        {/* Title */}
                        <CardTitle className="text-2xl leading-tight">
                            {post?.title}
                        </CardTitle>

                    </CardHeader>

                    <Separator />

                    {/* Thumbnail */}
                    {post?.thumbnail && (
                        <div className="px-6 pt-6">
                            <div className="w-full overflow-hidden rounded-lg border">
                                <img
                                    src={post.thumbnail.startsWith("/uploads/") ? `${import.meta.env.VITE_BASE_URL}${post.thumbnail}` : post.thumbnail}
                                    alt={post.title}
                                    className="w-full max-h-[420px] object-contain mx-auto"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <CardContent className="pt-6 text-muted-foreground leading-relaxed space-y-4">

                        {
                            post?.content
                                ? (<div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></div>)
                                :
                                (<p>No content available.</p>)
                        }

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}

export default Post;
