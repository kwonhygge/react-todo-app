import { useMutation } from "@tanstack/react-query";
import { TOKEN } from "@/constants/common";
import { instance } from "@/libs/index";
import { useNavigate } from "react-router-dom";

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
      return instance.post("/users/create", variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    },
  });
};
