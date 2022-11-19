import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useDeleteTodoItem } from "@/hooks/apis";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";
import { useNavigate, useParams } from "react-router-dom";
import { TODO_LIST_URL } from "@/constants/url";

function Delete() {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate: deleteTodoItemMutate } = useDeleteTodoItem(params?.id || "");

  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const handleClose = () => {
    navigate(`${TODO_LIST_URL}/${params?.id || ""}`);
  };

  const handleConfirmDelete = () => {
    deleteTodoItemMutate(
      {},
      {
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
      }
    );
  };

  return (
    <Dialog open={true}>
      <DialogContent>이 항목을 삭제하시겠습니까?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleConfirmDelete}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Delete;
