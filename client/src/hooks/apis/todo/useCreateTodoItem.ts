import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";

interface CreateTodoItemVariables {
  title: string;
  content: string;
}

export const useCreateTodoItem = () => {
  return useMutation<unknown, unknown, CreateTodoItemVariables, unknown>({
    mutationFn: (variables) => {
      return instance.post(TODOS_API_URL, variables);
    },
  });
};
