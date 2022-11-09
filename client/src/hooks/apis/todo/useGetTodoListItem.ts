import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import QueryString from "qs";

export const useGetTodoListItem = (queryData: QueryString.ParsedQs) =>
  useQuery<unknown, unknown, TodoItemData>({
    queryKey: ["todoItem"],
    queryFn: async () => {
      if (!queryData) return;

      const data = await instance.get(`/todos/${queryData.id}`);
      return data.data;
    },
    enabled: false,
  });
