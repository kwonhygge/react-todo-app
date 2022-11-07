import React from "react";
import { Button, Link, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { EMAIL, PASSWORD, PASSWORD_CONFIRM } from "@/constants/name";
import { RegexUtil } from "@/utils/regex";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "@/constants/common";

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface SignUpVariable {
  email: string;
  password: string;
}

interface SignUpResponse {
  data: {
    message: string;
    token: string;
  };
}

function SignUp() {
  const defaultValues: FormData = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const { control, formState, watch, handleSubmit } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { errors, isValid } = formState;
  const navigate = useNavigate();

  const mutation = useMutation<
    SignUpResponse,
    unknown,
    SignUpVariable,
    unknown
  >({
    mutationFn: (variables) => {
      return axios.post("http://localhost:8080/users/create", variables);
    },
    onSuccess: (response) => {
      console.log(response?.data, "data");
      localStorage.setItem(TOKEN, response?.data?.token);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      [EMAIL]: data[EMAIL],
      [PASSWORD]: data[PASSWORD],
    });
  };

  return (
    <form>
      <StyledSignUp>
        <h2>SignUp</h2>
        <Controller
          control={control}
          render={({ field: { name, onChange, value } }) => (
            <StyledInputContainer>
              <TextField
                label={name}
                name={name}
                onChange={onChange}
                error={!!errors?.[name]}
                value={value}
              />
            </StyledInputContainer>
          )}
          rules={{
            pattern: RegexUtil.REG_EMAIL,
          }}
          name={EMAIL}
        />
        <Controller
          control={control}
          render={({ field: { name, onChange, value } }) => (
            <StyledInputContainer>
              <TextField
                label={name}
                name={name}
                onChange={onChange}
                type={"password"}
                error={!!errors?.[name]}
                value={value}
              />
            </StyledInputContainer>
          )}
          rules={{
            minLength: 8,
          }}
          name={PASSWORD}
        />
        <Controller
          control={control}
          render={({ field: { name, onChange, value } }) => (
            <StyledInputContainer>
              <TextField
                label={name}
                name={name}
                onChange={onChange}
                type={"password"}
                error={!!errors?.[name]}
                value={value}
              />
            </StyledInputContainer>
          )}
          rules={{
            minLength: 8,
            validate: (value) => watch(PASSWORD) === value,
          }}
          name={PASSWORD_CONFIRM}
        />

        <Button
          disabled={!isValid}
          variant={"contained"}
          onClick={handleSubmit(onSubmit)}
        >
          SignUp
        </Button>
        <Link href={"/auth/login"}>Already Have an account?</Link>
      </StyledSignUp>
    </form>
  );
}

export default SignUp;

const StyledSignUp = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const StyledInputContainer = styled.div`
  margin: 0 0 10px;
`;
