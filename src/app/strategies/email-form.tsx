"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emailSchema = z.object({
  email: z.email().min(1, "Email is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export type EmailFormProps = {
  defaultValue?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
};

export default function EmailForm({
  defaultValue = "",
  onSubmit,
  className,
}: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: defaultValue },
  });

  const submit = async (data: EmailFormData) => {
    if (onSubmit) await onSubmit(data.email);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={className}>
      <label className="sr-only" htmlFor="email">
        Email
      </label>
      <div className="flex items-center space-x-2">
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {errors.email && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
