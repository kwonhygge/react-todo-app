import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { instance } from "@/libs/index";
import { TOKEN } from "@/constants/common";

interface LoginVariable {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, LoginVariable, unknown>({
    mutationFn: (variables) => {
      return instance.post("/users/login", variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
      alert("로그인에 성공했습니다.");
      navigate("/");
    },
  });
};
