"use client";

import { Post } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="w-full min-h-dvh p-3 pt-20 flex justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div>No images found</div>
      ) : (
        <div className="flex gap-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4">
              <Image src={post.url} alt={post.prompt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
