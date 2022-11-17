import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";

export const useGetTodoListItem = (id: string) =>
  useQuery<unknown, unknown, TodoItemData>({
    queryKey: ["todoItem"],
    queryFn: async () => {
      if (!id) return null;

      const data = await instance.get(`${TODOS_API_URL}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
