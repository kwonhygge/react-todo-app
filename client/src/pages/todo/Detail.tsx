import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { TODOS_API_URL } from "@/constants/endpoint";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { TODO_LIST_URL } from "@/constants/url";
import { useSetRecoilState } from "recoil";
import { useDeleteTodoItem, useGetTodoListItem } from "@/hooks/apis";
import { snackbarProps } from "@/atoms/snackbar";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const { data: todoItemData } = useGetTodoListItem(params?.id || "");
  const { mutate: deleteTodoItemMutate } = useDeleteTodoItem(params?.id || "");

  const handleClickEdit = () => {
    return navigate(`${TODO_LIST_URL}/${params?.id || ""}/edit`);
  };

  const handleClickDelete = (id: string) => {
    deleteTodoItemMutate(`${TODOS_API_URL}/${id}`, {
      onSuccess: () => {
        navigate(TODO_LIST_URL);

        setSnackbarProps((prev) => ({
          ...prev,
          open: true,
          message: "✅ 아이템이 삭제되었습니다.",
        }));
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
    });
  };

  return (
    <>
      <h3>{todoItemData?.title}</h3>
      <p>{todoItemData?.content}</p>
      <span>{dayjs(todoItemData?.createdAt).format(DATE_FORMAT)}</span>
      <IconButton aria-label={"edit"} onClick={() => handleClickEdit()}>
        <Edit />
      </IconButton>
      <IconButton
        aria-label={"delete"}
        onClick={() => handleClickDelete(todoItemData?.id as string)}
      >
        <Delete />
      </IconButton>
    </>
  );
}

export default Detail;
