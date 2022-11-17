import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/endpoint";

export const useDeleteTodoItem = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, unknown, unknown>({
    mutationFn: () => {
      return instance.delete(`${TODOS_API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
