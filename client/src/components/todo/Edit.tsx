import { FieldValues, useFormContext } from "react-hook-form";
import { CONTENT, TITLE } from "@/constants/name";
import { useEditTodoItem, useGetTodoListItem } from "@/hooks/apis";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TODO_LIST_URL } from "@/constants/url";
import { Form } from "@/components/todo/index";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const { reset } = useFormContext();

  const { data: todoItemData } = useGetTodoListItem(params?.id || "");
  const { mutate: editTodoItemMutate } = useEditTodoItem(params?.id || "");

  const handleSubmitEdit = (data: FieldValues) => {
    editTodoItemMutate(
      {
        [TITLE]: data[TITLE],
        [CONTENT]: data[CONTENT],
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

  const handleCancelEdit = () => {
    reset();
    navigate(`${TODO_LIST_URL}/${params?.id}`);
  };

  useEffect(() => {
    if (!!todoItemData) {
      reset(
        {
          [TITLE]: todoItemData[TITLE],
          [CONTENT]: todoItemData[CONTENT],
        },
        { keepDefaultValues: true }
      );
    }
  }, [todoItemData]);

  return (
    <Form handleConfirm={handleSubmitEdit} handleCancel={handleCancelEdit} />
  );
}

export default Edit;
