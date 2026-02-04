import { useEffect, useState } from "react";
import api from "../api/axios";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  /* ======================
     Fetch Posts
  ====================== */
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPosts();
    }, 400);

    return () => clearTimeout(delay);
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/posts?page=${page}&limit=5&search=${search}`
      );

      setPosts(res.data.posts);
      setPagination(res.data.pagination);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  /* ======================
     Skeleton
  ====================== */
  const SkeletonPost = () => (
    <div className="py-6 border-b space-y-3 space-x-3">

      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <Skeleton className="h-6 w-3/4" />

      <Skeleton className="h-48 w-full rounded" />

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 ">

      {/* Sticky Header */}
      <div className="sticky top-0  z-10  border-b p-2">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">

          <h1 className="text-3xl font-bold">
            All Blogs
          </h1>

          <Input
            placeholder="Search by author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />

        </div>

      </div>

      {/* Feed */}
      <div>

        {/* Loading */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonPost key={i} />
          ))}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <p className="text-muted-foreground py-6">
            No posts found.
          </p>
        )}

        {/* Posts */}
        {!loading &&
          posts.map((post) => (
            <div
              key={post._id}
              className="py-6 border-b last:border-b-0 space-y-3"
            >

              {/* Header */}
              <div className="flex items-center gap-3 w-full">
                {/* Left Side: Avatar */}
                <Avatar>
                  <AvatarFallback>
                    {post.authorId?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Middle: Author Info */}
                <div className="flex-1">
                  <p className="font-medium leading-none">
                    {post.authorId?.username}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Right Side: Eye Action Button */}
                <Link to={`/post/${post._id}`} className="ml-auto">
                  <div className="flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-secondary/80 hover:text-accent-foreground transition-colors shadow-sm">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="sr-only">View Post</span>
                  </div>
                </Link>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold">
                {post.title}
              </h2>

              {/* Image */}
              {post.thumbnail && (
                <div className="w-full overflow-hidden rounded-lg border bg-muted">

                  <img
                    src={post.thumbnail.startsWith("/uploads/") ? `${import.meta.env.VITE_BASE_URL}${post.thumbnail}` : post.thumbnail}
                    alt={post.title}
                    className="w-full max-h-[420px] object-contain mx-auto"
                  />

                </div>
              )}

              {/* Content */}
              <div
                className="text-sm leading-relaxed line-clamp-4 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />

            </div>
          ))}

      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (

        <Pagination className="py-6">

          <PaginationContent>

            <PaginationItem>

              <PaginationPrevious
                onClick={() =>
                  setPage((p) => Math.max(p - 1, 1))
                }
                disabled={!pagination.hasPrev}
              />

            </PaginationItem>

            {[...Array(pagination.totalPages)].map(
              (_, i) => {
                const num = i + 1;

                return (
                  <PaginationItem key={num}>

                    <PaginationLink
                      isActive={num === page}
                      onClick={() => setPage(num)}
                    >
                      {num}
                    </PaginationLink>

                  </PaginationItem>
                );
              }
            )}

            <PaginationItem>

              <PaginationNext
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      p + 1,
                      pagination.totalPages
                    )
                  )
                }
                disabled={!pagination.hasNext}
              />

            </PaginationItem>

          </PaginationContent>

        </Pagination>

      )}

    </div>
  );
}
