import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { CONTENT, TITLE } from "@/constants/name";
import { TODOS_API_URL } from "@/constants/endpoint";
import { AxiosError } from "axios";

interface EditTodoItemVariables {
  title: string;
  content: string;
}

export const useEditTodoItem = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ details: string }>,
    EditTodoItemVariables
  >({
    mutationFn: (variables) => {
      return instance.put(`${TODOS_API_URL}/${id}`, {
        title: variables[TITLE],
        content: variables[CONTENT],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", id]);
      queryClient.invalidateQueries(["todos"]);
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
  });
};
