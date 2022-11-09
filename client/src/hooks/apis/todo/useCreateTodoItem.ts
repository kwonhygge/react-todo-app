import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";

interface CreateTodoItemVariables {
  title: string;
  content: string;
}

export const useCreateTodoItem = () => {
  return useMutation<unknown, unknown, CreateTodoItemVariables, unknown>({
    mutationFn: (variables) => {
      return instance.post("/todos", variables);
    },
  });
};
