import React from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { EMAIL, PASSWORD } from "@/constants/name";
import { RegexUtil } from "@/utils/regex";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const defaultValues: FormData = {
    email: "",
    password: "",
  };

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { errors, isValid } = formState;

  const onSubmit = () => {};

  return (
    <form>
      <StyledLogin>
        <h2>Login</h2>
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

        <Button
          disabled={!isValid}
          variant={"contained"}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </StyledLogin>
    </form>
  );
}

export default Login;

const StyledLogin = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const StyledInputContainer = styled.div`
  margin: 0 0 10px;
`;
