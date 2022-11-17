import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { instance } from "@/libs/index";
import { MAIN_URL, TOKEN, LOGIN_API_URL } from "@/constants/index";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";

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
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  return useMutation<LoginResponse, unknown, LoginVariable, unknown>({
    mutationFn: (variables) => {
      return instance.post(LOGIN_API_URL, variables);
    },
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);

      setSnackbarProps((prev) => ({
        ...prev,
        open: true,
        message: "✅ 로그인에 성공하였습니다.",
      }));

      navigate(MAIN_URL);
    },
  });
};
