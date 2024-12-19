"use client";

import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, ImageIcon, History } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Header from "./components/Header";

const dimensionPresets = [
  { label: "Square (1:1)", width: "1080", height: "1080" },
  { label: "Portrait (2:3)", width: "1080", height: "1620" },
  { label: "Landscape (3:2)", width: "1620", height: "1080" },
  { label: "Mobile (9:16)", width: "1080", height: "1920" },
  { label: "Desktop (16:9)", width: "1920", height: "1080" },
] as const;

const modelOptions = [
  { value: "flux", label: "FLUX Schnell" },
  { value: "flux-realism", label: "FLUX Realism" },
  { value: "flux-cablyai", label: "FLUX CablyAI" },
  { value: "flux-anime", label: "FLUX Anime" },
  { value: "flux-3d", label: "FLUX 3D" },
  { value: "any-dark", label: "Dark Style" },
  { value: "flux-pro", label: "FLUX Pro" },
  { value: "turbo", label: "Turbo" },
] as const;

const styleOptions = [
  {
    value: "sketch",
    label: "Sketch",
    prompt: ", (pencil sketch style:1.4), (pencil sketch)",
    preview: "/sketch.png",
  },
  {
    value: "anime",
    label: "Anime",
    prompt: ", (anime art style:1.4), (anime)",
    preview: "/anime.png",
  },
  {
    value: "abstract",
    label: "Abstract",
    prompt: ", (abstract art style:1.4), (abstract painting)",
    preview: "/abstract.png",
  },
  {
    value: "cartoon",
    label: "Cartoon",
    prompt: ", (cartoon style:1.4), (cartoon)",
    preview: "/cartoon.png",
  },
  {
    value: "watercolor",
    label: "Watercolor",
    prompt: "(watercolor painting style:1.4), (watercolor)",
    preview: "/watercolor.png",
  },
  {
    value: "realistic Human",
    label: "Realistic",
    prompt: ", (realistic), (masterpiece), (perfect photo)",
    preview: "/realistic.png",
  },
] as const;

const formSchema = z.object({
  imagePrompt: z.string().min(5, { message: "Please provide a longer description." }),
  model: z.string().min(1, { message: "Please select a model" }),
  dimensionPreset: z.string().min(1, { message: "Please select a dimension" }),
  nsfw: z.boolean().default(false),
  style: z.string().optional(),
});

const CreatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [showNSFWDialog, setShowNSFWDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagePrompt: "",
      model: "flux",
      dimensionPreset: "Square (1:1)",
      nsfw: false,
    },
  });

  const handleDimensionPresetChange = (value: string) => {
    form.setValue("dimensionPreset", value);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const preset = dimensionPresets.find((p) => p.label === values.dimensionPreset);
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

          <div className="max-w-7xl mx-auto px-4 mt-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="imagePrompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Describe Your Vision
                          </FormLabel>
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
                                      <Sparkles
                                        className={`h-4 w-4 ${enhancing ? "animate-pulse" : ""}`}
                                      />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem className="bg-background/50 rounded-md pt-1">
                            <FormLabel className="text-base font-medium">AI Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-9">
                                  <SelectValue placeholder="Select a model" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {modelOptions.map((model) => (
                                  <SelectItem
                                    key={model.value}
                                    value={model.value}
                                    className="cursor-pointer hover:bg-accent"
                                  >
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
                        name="dimensionPreset"
                        render={({ field }) => (
                          <FormItem className="bg-background/50 rounded-md pt-1">
                            <FormLabel className="text-base font-medium">Dimensions</FormLabel>
                            <Select
                              onValueChange={handleDimensionPresetChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-9">
                                  <SelectValue placeholder="Choose size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dimensionPresets.map((preset) => (
                                  <SelectItem
                                    key={preset.label}
                                    value={preset.label}
                                    className="cursor-pointer hover:bg-accent"
                                  >
                                    {preset.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                                onClick={() => handleStyleChange(style.value)}
                                className={`group relative aspect-square rounded-md overflow-hidden transition-all hover:ring-2 hover:ring-primary`}
                              >
                                <Image
                                  src={style.preview}
                                  alt={style.label}
                                  fill
                                  className="object-cover"
                                />
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

                    <FormField
                      control={form.control}
                      name="nsfw"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-md border p-3 shadow-sm transition-all hover:bg-accent/50">
                          <div className="space-y-0.5">
                            <FormLabel className="text-sm font-medium">NSFW Content</FormLabel>
                            <FormDescription className="text-xs">
                              Toggle to allow NSFW content generation
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={handleNSFWChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <AlertDialog open={showNSFWDialog} onOpenChange={setShowNSFWDialog}>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>NSFW Content Warning</AlertDialogTitle>
                          <AlertDialogDescription>
                            Enabling NSFW content may generate explicit material not suitable for
                            all audiences. Proceed only if you are 18 or older.
                            <div className="font-semibold mt-3">
                              Are you sure you want to continue?
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setShowNSFWDialog(false)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              form.setValue("nsfw", true);
                              setShowNSFWDialog(false);
                            }}
                          >
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

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
                <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
                  <div className="p-3 border-b bg-muted">
                    <h2 className="text-sm font-semibold flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Preview
                    </h2>
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
              </div>
            </div>
          </div>
          <div className="max-w-7xl flex justify-center px-4">
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
