import { useQuery } from "@tanstack/react-query";
import { TodoItemData } from "@/interfaces/common";
import { instance } from "@/libs/index";
import { TODOS_API_URL } from "@/constants/index";
import { AxiosError } from "axios";
import { snackbarProps } from "@/atoms/snackbar";
import { useSetRecoilState } from "recoil";

export const useGetTodoList = () => {
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  return useQuery<unknown, AxiosError<{ details: string }>, TodoItemData[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await instance.get(TODOS_API_URL);
      return data.data;
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
  });
};
