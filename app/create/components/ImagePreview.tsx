import React from 'react'
import { Button } from "@/components/ui/button";
import { Download, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  loading: boolean;
  outputImage: string | null;
  onDownload: () => void;
}

const ImagePreview = ({ loading, outputImage, onDownload }: ImagePreviewProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
      <div className="p-3 border-b bg-muted flex justify-between items-center">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Preview
        </h2>
        {outputImage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={onDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="aspect-square relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="space-y-4 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">
                Generating your masterpiece...
              </p>
            </div>
          </div>
        ) : outputImage ? (
          <Image
            src={outputImage}
            alt="Generated Image"
            className="object-contain"
            fill
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center space-y-4 p-6 max-w-md">
              <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-md font-medium">Your Canvas Awaits</p>
              <p className="text-sm text-muted-foreground">
                Write the prompt to bring your imagination to life
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;