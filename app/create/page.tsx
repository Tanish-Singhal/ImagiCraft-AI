"use client";

import { Loader2, Sparkles, History } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import ImagePrompt from "./components/ImagePrompt";
import AIModel from "./components/AIModel";
import AspectRatio from "./components/AspectRatio";
import ArtStyle from "./components/ArtStyle";
import NSFW from "./components/NSFW";
import ImagePreview from "./components/ImagePreview";
import { aspectRatioPresets, modelOptions, styleOptions } from "./constants";
import { FormValues, formSchema } from "./types";

const CreatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [showNSFWDialog, setShowNSFWDialog] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagePrompt: "",
      model: "flux",
      aspectRatioPreset: "Square (1:1)",
      nsfw: false,
    },
  });

  const handleAspectRatioPresetChange = (value: string) => {
    form.setValue("aspectRatioPreset", value);
  };

  const handleStyleChange = (value: string) => {
    const selectedStyle = styleOptions.find((style) => style.value === value);
    const currentPrompt = form.getValues("imagePrompt");

    if (selectedStyle) {
      form.setValue("imagePrompt", `${currentPrompt}${selectedStyle.prompt}`);
      form.setValue("style", value);
    }
  };

  const handleEnhancePrompt = async () => {
    const currentPrompt = form.getValues("imagePrompt");
    if (!currentPrompt) {
      toast.error("Please write a prompt first", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    try {
      setEnhancing(true);
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data = await response.json();

      if (response.status === 200) {
        form.setValue("imagePrompt", data.enhancedPrompt);
        toast.success("Prompt enhanced!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else if (response.status === 401) {
        toast.error("Create account to enhance prompt", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        throw new Error(data.error || "Failed to enhance prompt");
      }
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
      toast.error("Failed to enhance prompt", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setEnhancing(false);
    }
  };

  const handleNSFWChange = (checked: boolean) => {
    if (checked) {
      setShowNSFWDialog(true);
    } else {
      form.setValue("nsfw", false);
    }
  };

  const handleDownload = async () => {
    if (!outputImage) return;

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(outputImage);
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `imagicraft-${Date.now()}.png`;
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
      console.error("Download failed:", error);
    }
  };

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      const preset = aspectRatioPresets.find((p) => p.label === values.aspectRatioPreset);
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          width: preset?.width,
          height: preset?.height,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setOutputImage(data.url);
      } else if (response.status === 401) {
        toast.error("Create account to generate images", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else if (data.error) {
        toast.error(data.error, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error generating image:", error);
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
    <div>
      <Header />

      <div className="min-h-[calc(100dvh-4rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

        <div className="relative">
          <div className="text-center pt-6 pb-8 space-y-3">
            <h1 className="text-4xl md:text-5xl tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent font-semibold">
              Create Your AI Masterpiece
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <ImagePrompt
                      form={form}
                      enhancing={enhancing}
                      handleEnhancePrompt={handleEnhancePrompt}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AIModel form={form} modelOptions={modelOptions} />

                      <AspectRatio
                        form={form}
                        aspectRatioPresets={aspectRatioPresets}
                        onAspectRatioChange={handleAspectRatioPresetChange}
                      />
                    </div>

                    <ArtStyle
                      form={form}
                      styleOptions={styleOptions}
                      onStyleChange={handleStyleChange}
                    />

                    <NSFW
                      form={form}
                      showNSFWDialog={showNSFWDialog}
                      setShowNSFWDialog={setShowNSFWDialog}
                      onNSFWChange={handleNSFWChange}
                    />

                    <Button
                      type="submit"
                      className="w-full h-10 text-sm font-medium transition-all"
                      disabled={loading || enhancing}
                      size="default"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating Magic...
                        </>
                      ) : enhancing ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-pulse" />
                          Enhancing Prompt...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="md:sticky md:top-4">
                <ImagePreview
                  loading={loading}
                  outputImage={outputImage}
                  onDownload={handleDownload}
                />
              </div>
            </div>
          </div>
          <div className="max-w-7xl flex justify-center px-4 mb-2">
            <Button
              onClick={() => router.push("/images")}
              variant="outline"
              className="w-full md:w-auto flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              View Generation History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
