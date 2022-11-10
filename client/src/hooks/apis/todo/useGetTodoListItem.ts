import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import QueryString from "qs";
import { TODOS_API_URL } from "@/constants/index";

export const useGetTodoListItem = (queryData: QueryString.ParsedQs) =>
  useQuery<unknown, unknown, TodoItemData>({
    queryKey: ["todoItem"],
    queryFn: async () => {
      if (!queryData) return;

      const data = await instance.get(`${TODOS_API_URL}/${queryData.id}`);
      return data.data;
    },
    enabled: !!queryData?.id,
  });
