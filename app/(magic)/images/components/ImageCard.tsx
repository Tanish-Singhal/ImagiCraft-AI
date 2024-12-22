import { Post } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImageCardProps {
  post: Post;
  onSelect: (post: Post) => void;
  onDownload: (url: string) => void;
}

const ImageCard = ({ post, onSelect, onDownload }: ImageCardProps) => {
  return (
    <div 
      className="break-inside-avoid mb-4 group relative"
      onClick={() => onSelect(post)}
    >
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
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(post.url);
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
