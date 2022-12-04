import styled from "@emotion/styled";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { IconButton, TextField } from "@mui/material";
import { CONTENT, TITLE } from "@/constants/name";
import { Check, Clear } from "@mui/icons-material";

interface FormProps {
  handleConfirm: (data: FieldValues) => void;
  handleCancel: () => void;
}

function Form(props: FormProps) {
  const { handleConfirm, handleCancel } = props;
  const { control, handleSubmit } = useFormContext();

  return (
    <StyledTodoInputsContainer>
      <Controller
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <TextField
            label={name}
            name={name}
            onChange={onChange}
            placeholder={name}
            value={value}
          />
        )}
        name={TITLE}
      />
      <Controller
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <TextField
            label={name}
            name={name}
            onChange={onChange}
            rows={4}
            placeholder={name}
            value={value}
            multiline
          />
        )}
        name={CONTENT}
      />
      <div>
        <IconButton aria-label="confirm" onClick={handleSubmit(handleConfirm)}>
          <Check />
        </IconButton>
        <IconButton aria-label="cancel" onClick={handleCancel}>
          <Clear />
        </IconButton>
      </div>
    </StyledTodoInputsContainer>
  );
}

export default Form;

const StyledTodoInputsContainer = styled.div`
  margin: 10px auto 0;
  width: fit-content;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    > div {
      margin: 0 0 20px;
    }
  }
`;
