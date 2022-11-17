import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";

export const useDeleteTodoItem = () =>
  useMutation<unknown, unknown, string, unknown>({
    mutationFn: (url) => {
      return instance.delete(url);
    },
  });
