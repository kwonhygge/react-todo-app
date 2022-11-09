import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";

export const useGetTodoList = () =>
  useQuery<unknown, unknown, TodoItemData[]>({
    queryKey: ["todoList"],
    queryFn: async () => {
      return instance.get("/todos");
    },
  });
