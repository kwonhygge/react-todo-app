import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { useNavigate } from "react-router-dom";
import { MAIN_URL, SIGN_UP_API_URL, TOKEN } from "@/constants/index";

interface SignUpVariable {
  email: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  token: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation<SignUpResponse, unknown, SignUpVariable, unknown>({
    mutationFn: (variables) => {
      return instance.post(SIGN_UP_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
      alert("회원가입에 성공했습니다.");
      navigate(MAIN_URL);
    },
  });
};
