import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { FormValues } from "../types";

interface ImagePromptProps {
  form: UseFormReturn<FormValues>;
  enhancing: boolean;
  handleEnhancePrompt: () => void;
}

const ImagePrompt = ({ form, enhancing, handleEnhancePrompt }: ImagePromptProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="imagePrompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Describe Your Vision</FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  placeholder="A serene landscape with mountains reflecting in a crystal-clear lake..."
                  className="h-32 resize-none pr-12 text-sm"
                  {...field}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute bottom-2 right-3 h-7 w-7 hover:bg-accent"
                        onClick={handleEnhancePrompt}
                        disabled={enhancing}
                      >
                        <Sparkles className={`h-4 w-4 ${enhancing ? "animate-pulse" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Prompt Enhancer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImagePrompt;
