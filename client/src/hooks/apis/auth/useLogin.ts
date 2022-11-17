import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { TOKEN, LOGIN_API_URL } from "@/constants/index";

interface LoginVariable {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginVariable, unknown>({
    mutationFn: (variables) => {
      return instance.post(LOGIN_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
    },
  });
};
