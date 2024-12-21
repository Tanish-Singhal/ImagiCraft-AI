"use client";

import { Post } from "@prisma/client";
import { Loader2, Download } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPost = async () => {
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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="min-h-[calc(100dvh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100dvh-8rem)]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center min-h-[calc(100dvh-8rem)]">
            <p className="text-muted-foreground font-semibold text-lg">No images generated yet</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="break-inside-avoid mb-4 group relative">
                <div className="rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={post.url}
                    alt={post.prompt}
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-sm text-white mb-2 line-clamp-3">{post.prompt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/70">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDownload(post.url)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
