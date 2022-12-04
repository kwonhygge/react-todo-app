import { FieldValues, useFormContext } from "react-hook-form";
import { CONTENT, TITLE } from "@/constants/name";
import { Form } from "@/components/todo/index";
import { useCreateTodoItem } from "@/hooks/apis";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";
import { useNavigate } from "react-router-dom";
import { TODO_LIST_URL } from "@/constants/url";

function Create() {
  const { reset } = useFormContext();
  const navigate = useNavigate();
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const { mutate: createTodoItemMutate } = useCreateTodoItem();

  const handleCancelCreate = () => {
    reset();
    navigate(TODO_LIST_URL);
  };

  const handleSubmitCreate = (data: FieldValues) => {
    createTodoItemMutate(
      {
        [TITLE]: data[TITLE],
        [CONTENT]: data[CONTENT],
      },
      {
        onSuccess: async () => {
          setSnackbarProps((prev) => ({
            ...prev,
            open: true,
            message: "✅ 새로운 아이템이 추가되었습니다.",
          }));

          reset();
        },
        onError: (error) => {
          if (!!error?.response) {
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

  return (
    <Form
      handleConfirm={handleSubmitCreate}
      handleCancel={handleCancelCreate}
    />
  );
}

export default Create;
