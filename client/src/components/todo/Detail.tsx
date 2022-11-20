import {
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { TODO_LIST_URL } from "@/constants/url";
import { useGetTodoListItem } from "@/hooks/apis";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { DELETE, EDIT } from "@/constants/name";
import styled from "@emotion/styled";

function Detail() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: todoItemData } = useGetTodoListItem(params?.id || "");

  const handleClickEdit = () => {
    navigate(`${TODO_LIST_URL}/${params?.id || ""}/${EDIT}`);
  };

  const handleClickDelete = () => {
    navigate(`${TODO_LIST_URL}/${params?.id || ""}/${DELETE}`);
  };

  return (
    <StyledDetail>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Detail" />
        <CardContent>
          <h3>{todoItemData?.title}</h3>
          <p>{todoItemData?.content}</p>
          <span>{dayjs(todoItemData?.createdAt).format(DATE_FORMAT)}</span>
        </CardContent>
        <CardActions>
          <IconButton aria-label="confirm" onClick={() => handleClickEdit()}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleClickDelete()}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
      <Outlet />
    </StyledDetail>
  );
}

export default Detail;

const StyledDetail = styled.div`
  h3 {
    margin: 0 0 10px;
    font-size: 17px;
    font-weight: 600;
  }

  p {
    margin: 0 0 10px;
  }

  span {
    color: grey;
  }
`;
