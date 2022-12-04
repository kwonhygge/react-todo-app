import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/endpoint";
import { AxiosError } from "axios";

export const useDeleteTodoItem = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ details: string }>,
    unknown,
    unknown
  >({
    mutationFn: () => {
      return instance.delete(`${TODOS_API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
  });
};
