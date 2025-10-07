"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateStrategy } from "@/hooks/useCreateStrategy";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const linkOrIdSchema = z.object({
  linkOrId: z
    .string()
    .min(1, "Link or ID is required")
    .refine(
      (value) => {
        const trimmed = value.trim();

        // Must not be empty
        if (trimmed.length === 0) return false;

        // If it looks like a URL (contains ://), validate it as URL
        if (trimmed.includes("://")) {
          try {
            new URL(trimmed);
            return true;
          } catch {
            return false;
          }
        }

        // Otherwise, treat as ID string (any non-empty string is valid)
        return true;
      },
      {
        message: "Please enter a valid URL or ID string",
      }
    ),
});

type LinkOrIdFormData = z.infer<typeof linkOrIdSchema>;

export type LinkOrIdFormProps = {
  defaultValue?: string;
  onSubmit?: (linkOrId: string) => void | Promise<void>;
  className?: string;
  setDialogOpen?: (open: boolean) => void;
};

export default function LinkOrIdForm({
  defaultValue = "",
  className,
  setDialogOpen,
}: LinkOrIdFormProps) {
  const {
    mutate: createStrategy,
    isPending,
    isError,
    error,
  } = useCreateStrategy({
    onSuccess: () => setDialogOpen?.(false),
    redirectOnSuccess: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkOrIdFormData>({
    resolver: zodResolver(linkOrIdSchema),
    defaultValues: { linkOrId: defaultValue },
  });

  const submit = (data: LinkOrIdFormData) => {
    createStrategy(data.linkOrId);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={className}>
      <label className="sr-only" htmlFor="linkOrId">
        Link or ID
      </label>
      <div className="flex items-center space-x-2">
        <Input
          id="linkOrId"
          type="text"
          placeholder="https://app.composer.trade/symphony/HMtU9wQtOQex2HQZcOMf/details or HMtU9wQtOQex2HQZcOMf"
          aria-invalid={!!errors.linkOrId}
          {...register("linkOrId")}
        />
        <Button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {errors.linkOrId && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {errors.linkOrId.message}
        </p>
      )}
      {isError && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error?.message || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
