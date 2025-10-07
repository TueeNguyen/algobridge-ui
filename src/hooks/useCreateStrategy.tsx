"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const createStrategy = async (linkOrId: string) => {
  try {
    const response = await axiosInstance.post("/strategies", { linkOrId });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Validation error occurred";
        throw new Error(errorMessage);
      }

      // Handle other HTTP errors
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      throw new Error(message);
    }
    throw error;
  }
};

interface UseCreateStrategyOptions {
  onSuccess?: (data: Strategy) => void;
  onError?: (error: Error) => void;
  redirectOnSuccess?: boolean;
}

export const useCreateStrategy = (
  options: UseCreateStrategyOptions = { redirectOnSuccess: true }
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: createStrategy,
    onSuccess: (data) => {
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      if (options.redirectOnSuccess) {
        router.push(`/strategies/${data.composer_id}`);
      }
    },
    onError: (error) => {
      console.error("Create strategy error:", error.message);
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};
