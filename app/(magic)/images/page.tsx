"use client";

import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageCard from "./components/ImageCard";
import ImageDialog from "./components/ImageDialog";
import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/image");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      await toast.promise(
        (async () => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `image-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })(),
        {
          loading: "Downloading your image...",
          success: "Download completed!",
          error: "Download failed",
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await toast.promise(
        fetch(`/api/image?id=${postId}`, {
          method: "DELETE",
        }),
        {
          loading: "Deleting image...",
          success: "Image deleted successfully!",
          error: "Failed to delete image",
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );

      setDialogOpen(false);
      await fetchPosts();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-[calc(100dvh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {posts.map((post) => (
              <ImageCard
                key={post.id}
                post={post}
                onSelect={(post) => {
                  setSelectedPost(post);
                  setDialogOpen(true);
                }}
                onDownload={handleDownload}
                onDelete={() => handleDelete(post.id)}
              />
            ))}
          </div>
        )}

        <ImageDialog
          post={selectedPost}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onDownload={handleDownload}
          onDelete={() => selectedPost && handleDelete(selectedPost.id)}
        />
      </div>
    </div>
  );
};

export default Page;
