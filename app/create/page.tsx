"use client";

import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const modelOptions = [
  { value: "flux", label: "FLUX" },
  { value: "flux-realism", label: "FLUX Realism" },
  { value: "flux-cablyai", label: "FLUX CablyAI" },
  { value: "flux-anime", label: "FLUX Anime" },
  { value: "flux-3d", label: "FLUX 3D" },
  { value: "any-dark", label: "Dark Style" },
  { value: "flux-pro", label: "FLUX Pro" },
  { value: "turbo", label: "Turbo" },
] as const;

const formSchema = z.object({
  imagePrompt: z.string().min(5, { message: "Please provide a longer description." }),
  model: z.string().min(1, { message: "Please select a model" }),
});

const CreatePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagePrompt: "",
      model: "flux",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setOutputImage(data.url);
      } else if (response.status === 400 && data.error) {
        toast.error(data.error, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.error("Create account to generate images", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to generate image", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 min-h-[calc(100dvh-4rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Create Your AI Image</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modelOptions.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imagePrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the image you want to create..."
                        className="h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="bg-muted rounded-lg flex items-center justify-center min-h-[400px] relative">
          {outputImage ? (
            <Image
              src={outputImage}
              alt="Generated Image"
              className="rounded-lg"
              width={400}
              height={400}
            />
          ) : (
            <p className="text-muted-foreground">Your generated image will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
