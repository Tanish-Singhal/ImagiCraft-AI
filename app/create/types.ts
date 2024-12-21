import { z } from "zod";

export const formSchema = z.object({
  imagePrompt: z.string().min(5, { message: "Please provide a longer description." }),
  model: z.string().min(1, { message: "Please select a model" }),
  aspectRatioPreset: z.string().min(1, { message: "Please select a aspectRatio" }),
  nsfw: z.boolean().default(false),
  style: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
