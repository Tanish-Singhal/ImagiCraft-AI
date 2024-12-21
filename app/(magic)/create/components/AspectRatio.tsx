import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { FormValues } from "../types";

interface AspectRatioProps {
  form: UseFormReturn<FormValues>;
  aspectRatioPresets: Array<{
    label: string;
    width: string;
    height: string;
  }>;
  onAspectRatioChange: (value: string) => void;
}

const AspectRatio = ({ form, aspectRatioPresets, onAspectRatioChange }: AspectRatioProps) => {
  return (
    <FormField
      control={form.control}
      name="aspectRatioPreset"
      render={({ field }) => (
        <FormItem className="bg-background/50 rounded-md pt-1">
          <FormLabel className="text-base font-medium">Aspect Ratio</FormLabel>
          <Select
            onValueChange={onAspectRatioChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {aspectRatioPresets.map((preset) => (
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
  );
};

export default AspectRatio;
