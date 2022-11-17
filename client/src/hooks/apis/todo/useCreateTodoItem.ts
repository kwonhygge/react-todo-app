import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";

interface CreateTodoItemVariables {
  title: string;
  content: string;
}

export const useCreateTodoItem = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, CreateTodoItemVariables, unknown>({
    mutationFn: (variables) => {
      return instance.post(TODOS_API_URL, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
