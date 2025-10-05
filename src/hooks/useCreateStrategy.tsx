"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const createStrategy = async (linkOrId: string) => {
  const response = await axiosInstance.post("/strategies", { linkOrId });
  return response.data;
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
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};
