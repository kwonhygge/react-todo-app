import React from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { EMAIL, PASSWORD, PASSWORD_CONFIRM } from "@/constants/name";
import { RegexUtil } from "@/utils/regex";

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
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

  const onSubmit = (data: FormData) => {
    console.log(data);
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
