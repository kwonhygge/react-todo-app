import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { IconButton, TextField } from "@mui/material";
import { CONTENT, TITLE } from "@/constants/name";
import { useEditTodoItem, useGetTodoListItem } from "@/hooks/apis";
import { Check, Clear } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TODO_LIST_URL } from "@/constants/url";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const { control, handleSubmit, reset } = useFormContext();

  const { data: todoItemData } = useGetTodoListItem(params?.id || "");
  const { mutate: editTodoItemMutate } = useEditTodoItem(params?.id || "");

  const onSubmitEdit = (data: FieldValues) => {
    editTodoItemMutate(
      {
        [TITLE]: data.edit[TITLE],
        [CONTENT]: data.edit[CONTENT],
      },
      {
        onSuccess: () => {
          setSnackbarProps((prev) => ({
            ...prev,
            open: true,
            message: "✅ 아이템이 수정되었습니다.",
          }));

          navigate(`${TODO_LIST_URL}/${params?.id}`);
        },
        onError: (error) => {
          if (!!error.response) {
            setSnackbarProps((prev) => ({
              ...prev,
              open: true,
              message: `🚫 ${error?.response?.data?.details}`,
            }));
          }
        },
      }
    );
  };

  useEffect(() => {
    if (!!todoItemData) {
      reset(
        {
          edit: {
            [TITLE]: todoItemData[TITLE],
            [CONTENT]: todoItemData[CONTENT],
          },
        },
        { keepDefaultValues: true }
      );
    }
  }, [todoItemData]);

  return (
    <form>
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
        name={"edit.title"}
      />
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
        name={"edit.content"}
      />

      <IconButton aria-label={"confirm"} onClick={handleSubmit(onSubmitEdit)}>
        <Check />
      </IconButton>
      <IconButton
        aria-label={"cancel"}
        onClick={() => navigate(`${TODO_LIST_URL}/${params?.id}`)}
      >
        <Clear />
      </IconButton>
    </form>
  );
}

export default Edit;
