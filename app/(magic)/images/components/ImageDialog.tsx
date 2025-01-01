import { Post } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Download, Trash2, X } from "lucide-react";
import { DeleteImageDialog } from "./DeleteAlert";
import { useState } from "react";

interface ImageDialogProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (url: string) => void;
  onDelete?: () => void;
}

const ImageDialog = ({ post, open, onOpenChange, onDownload, onDelete }: ImageDialogProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  if (!post) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl w-[90vw] h-[50vh] p-0">
          <DialogHeader className="absolute right-4 top-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="relative h-full">
              <Image src={post.url} alt={post.prompt} fill className="object-cover rounded-l-lg" />
            </div>
            <div className="p-6 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Prompt</h2>
              <p className="text-muted-foreground">{post.prompt}</p>
              <div className="mt-4 space-y-2">
                <Button onClick={() => onDownload(post.url)} className="w-full">
                  <Download className="h-4 w-4" />
                  Download Image
                </Button>
                <Button 
                  size="sm" 
                  className="bg-rose-600 hover:bg-red-700 text-white w-full"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Image
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteImageDialog
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => {
          onDelete?.();
          setShowDeleteAlert(false);
        }}
      />
    </>
  );
};

export default ImageDialog;
