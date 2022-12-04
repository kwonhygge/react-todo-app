import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TOKEN, LOGIN_API_URL } from "@/constants/index";
import { AxiosError } from "axios";

interface LoginVariable {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const useLogin = () => {
  return useMutation<
    LoginResponse,
    AxiosError<{ details: string }>,
    LoginVariable
  >({
    mutationFn: (variables) => {
      return instance.post(LOGIN_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
  });
};
