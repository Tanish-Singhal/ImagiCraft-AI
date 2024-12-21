import React from 'react'
import { Switch } from "@/components/ui/switch";
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
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface NSFWProps {
  form: UseFormReturn<FormValues>;
  showNSFWDialog: boolean;
  setShowNSFWDialog: (show: boolean) => void;
  onNSFWChange: (checked: boolean) => void;
}

const NSFW = ({ form, showNSFWDialog, setShowNSFWDialog, onNSFWChange }: NSFWProps) => (
  <>
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
            <Switch checked={field.value} onCheckedChange={onNSFWChange} />
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
            className="bg-destructive text-white hover:bg-red-700"
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
)

export default NSFW