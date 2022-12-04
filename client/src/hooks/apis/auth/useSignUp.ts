import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { SIGN_UP_API_URL, TOKEN } from "@/constants/index";
import { AxiosError } from "axios";

interface SignUpVariable {
  email: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  token: string;
}

export const useSignUp = () => {
  return useMutation<
    SignUpResponse,
    AxiosError<{ details: string }>,
    SignUpVariable
  >({
    mutationFn: (variables) => {
      return instance.post(SIGN_UP_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
    },
    useErrorBoundary: (error) =>
      !!error.response ? error.response?.status >= 500 : false,
  });
};
