import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";

export const useGetTodoListItem = (id: string) => {
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  return useQuery<unknown, AxiosError<{ details: string }>, TodoItemData>({
    queryKey: ["todos", id],
    queryFn: async () => {
      try {
        const data = await instance.get(`${TODOS_API_URL}/${id}`);

        return data.data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      if (!!error?.response) {
        setSnackbarProps((prev) => ({
          ...prev,
          open: true,
          message: `🚫 ${error?.response?.data?.details}`,
        }));
      }
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
    enabled: !!id,
  });
};
