export interface AspectRatioPreset {
  label: string;
  width: string;
  height: string;
}

export interface ModelOption {
  value: string;
  label: string;
}

export interface StyleOption {
  value: string;
  label: string;
  prompt: string;
  preview: string;
}

export const aspectRatioPresets: AspectRatioPreset[] = [
  { label: "Square (1:1)", width: "1080", height: "1080" },
  { label: "Portrait (2:3)", width: "1080", height: "1620" },
  { label: "Landscape (3:2)", width: "1620", height: "1080" },
  { label: "Mobile (9:16)", width: "1080", height: "1920" },
  { label: "Desktop (16:9)", width: "1920", height: "1080" },
];

export const modelOptions: ModelOption[] = [
  { value: "flux", label: "FLUX Schnell" },
  { value: "flux-realism", label: "FLUX Realism" },
  { value: "flux-cablyai", label: "FLUX CablyAI" },
  { value: "flux-anime", label: "FLUX Anime" },
  { value: "flux-3d", label: "FLUX 3D" },
  { value: "any-dark", label: "Dark Style" },
  { value: "flux-pro", label: "FLUX Pro" },
  { value: "turbo", label: "Turbo" },
];

export const styleOptions: StyleOption[] = [
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
];
