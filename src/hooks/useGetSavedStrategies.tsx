import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

const getSavedStrategies = async (composer_ids: string[]) => {
  if (composer_ids.length === 0) {
    return [];
  }
  const response = await axiosInstance.post("/strategies/get-multiple", composer_ids);
  return response.data;
} 

export const useGetSavedStrategies = (composer_ids: string[]) => {
  return useQuery({
    queryKey: ["savedStrategies", composer_ids],
    queryFn: () => getSavedStrategies(composer_ids),
    enabled: composer_ids.length > 0,
  });
}

