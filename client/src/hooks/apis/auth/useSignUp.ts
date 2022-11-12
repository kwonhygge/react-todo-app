import { useMutation } from "@tanstack/react-query";
import { instance } from "@/libs/index";
import { useNavigate } from "react-router-dom";
import { MAIN_URL, SIGN_UP_API_URL, TOKEN } from "@/constants/index";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";

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
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  return useMutation<SignUpResponse, unknown, SignUpVariable, unknown>({
    mutationFn: (variables) => {
      return instance.post(SIGN_UP_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);

      setSnackbarProps((prev) => ({
        ...prev,
        open: true,
        message: "✅ 회원가입에 성공하였습니다.",
      }));

      navigate(MAIN_URL);
    },
  });
};
