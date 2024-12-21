import React from "react";
import Image from "next/image";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface StyleOption {
  value: string;
  label: string;
  prompt: string;
  preview: string;
}

interface ArtStyleProps {
  form: UseFormReturn<FormValues>;
  styleOptions: StyleOption[];
  onStyleChange: (value: string) => void;
}

const ArtStyle = ({ form, styleOptions, onStyleChange }: ArtStyleProps) => {
  return (
    <FormField
      control={form.control}
      name="style"
      render={() => (
        <FormItem className="bg-background/50 rounded-md pt-1">
          <FormLabel className="text-base font-medium">Art Style</FormLabel>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-1">
            {styleOptions.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => onStyleChange(style.value)}
                className="group relative aspect-square rounded-md overflow-hidden transition-all hover:ring-2 hover:ring-primary"
              >
                <Image src={style.preview} alt={style.label} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                  <span className="text-xs text-white font-medium truncate w-full text-center">
                    {style.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ArtStyle;
