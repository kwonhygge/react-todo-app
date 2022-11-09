import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";

export const useGetTodoList = () =>
  useQuery<unknown, unknown, TodoItemData[]>({
    queryKey: ["todoList"],
    queryFn: async () => {
      const data = await instance.get(TODOS_API_URL);
      return data.data;
    },
  });
