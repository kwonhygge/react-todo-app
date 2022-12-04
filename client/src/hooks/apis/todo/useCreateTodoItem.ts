import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";
import { AxiosError } from "axios";

interface CreateTodoItemVariables {
  title: string;
  content: string;
}

export const useCreateTodoItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ details: string }>,
    CreateTodoItemVariables
  >({
    mutationFn: (variables) => {
      return instance.post(TODOS_API_URL, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
  });
};
