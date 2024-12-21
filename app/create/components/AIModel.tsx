import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { FormValues } from "../types";

interface AIModelProps {
  form: UseFormReturn<FormValues>;
  modelOptions: Array<{ value: string; label: string }>;
}

const AIModel = ({ form, modelOptions }: AIModelProps) => {
  return (
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
  );
};

export default AIModel;
