import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { CONTENT, TITLE } from "@/constants/name";

interface EditTodoItemVariables {
  url: string;
  title: string;
  content: string;
}

export const useEditTodoItem = () => {
  return useMutation<unknown, unknown, EditTodoItemVariables, unknown>({
    mutationFn: (variables) => {
      return instance.put(variables.url, {
        title: variables[TITLE],
        content: variables[CONTENT],
      });
    },
  });
};
