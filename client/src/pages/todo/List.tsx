import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _ from "lodash";
import QueryString from "qs";
import {
  CONTENT,
  TITLE,
  DATE_FORMAT,
  TODOS_API_URL,
  LOGOUT_URL,
  TODO_LIST_URL,
} from "@/constants/index";
import styled from "@emotion/styled";
import {
  Collapse,
  IconButton,
  Link,
  TextField,
  List as ListContainer,
  ListItemButton,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  AddCircle,
  Check,
  Clear,
  Delete,
  Edit,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router";
import {
  useCreateTodoItem,
  useDeleteTodoItem,
  useEditTodoItem,
  useGetTodoList,
  useGetTodoListItem,
} from "@/hooks/apis";
import { TodoItemData } from "@/interfaces/common";
import { withProtection } from "@/hocs/index";
import { useSetRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";

interface FormData {
  create: {
    title: string;
    content: string;
  };
  edit: {
    title: string;
    content: string;
  };
}

function List() {
  const defaultValues: FormData = {
    create: {
      title: "",
      content: "",
    },
    edit: {
      title: "",
      content: "",
    },
  };
  const navigate = useNavigate();
  const location = useLocation();
  const setSnackbarProps = useSetRecoilState(snackbarProps);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [openItemIdState, setOpenItemId] = useState("");
  const [editingIdState, setEditingId] = useState("");

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { data: todoListData, refetch: refetchTodoList } = useGetTodoList();

  const { data: todoItemData, refetch: refetchTodoItem } =
    useGetTodoListItem(openItemIdState);

  const { mutate: createTodoItemMutate } = useCreateTodoItem();
  const { mutate: editTodoItemMutate } = useEditTodoItem();
  const { mutate: deleteTodoItemMutate } = useDeleteTodoItem();

  const isEditing = (id: string) => id === editingIdState;
  const isOpen = (id: string) => id === openItemIdState;

  const onSubmitCreate = (data: FormData) => {
    createTodoItemMutate(
      {
        [TITLE]: data.create[TITLE],
        [CONTENT]: data.create[CONTENT],
      },
      {
        onSuccess: async () => {
          await refetchTodoList();

          setSnackbarProps((prev) => ({
            ...prev,
            open: true,
            message: "✅ 새로운 아이템이 추가되었습니다.",
          }));

          reset();
        },
      }
    );
  };

  const onSubmitEdit = (data: FormData) => {
    editTodoItemMutate(
      {
        url: `${TODOS_API_URL}/${editingIdState}`,
        [TITLE]: data.edit[TITLE],
        [CONTENT]: data.edit[CONTENT],
      },
      {
        onSuccess: async () => {
          setEditingId("");
          await refetchTodoList();
          await refetchTodoItem();

          setSnackbarProps((prev) => ({
            ...prev,
            open: true,
            message: "✅ 아이템이 수정되었습니다.",
          }));

          reset();
        },
      }
    );
  };

  const handleClickDelete = (id: string) => {
    deleteTodoItemMutate(`${TODOS_API_URL}/${id}`, {
      onSuccess: async () => {
        window.location.reload();
        await refetchTodoList();

        setSnackbarProps((prev) => ({
          ...prev,
          open: true,
          message: "✅ 아이템이 삭제되었습니다.",
        }));

        reset();
      },
    });
  };

  const handleClickEdit = (item: TodoItemData) => {
    setEditingId(item.id);

    reset(
      {
        edit: {
          [TITLE]: item[TITLE],
          [CONTENT]: item[CONTENT],
        },
      },
      { keepDefaultValues: true }
    );
  };

  const handleToggleListItemButton = async (item: TodoItemData) => {
    if (isOpen(item.id)) {
      navigate(TODO_LIST_URL);
    } else {
      navigate(`${TODO_LIST_URL}?id=${item.id}`);
    }
  };

  const renderEditingTodoInputs = () => (
    <StyledCollapseItem>
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
      <IconButton onClick={handleSubmit(onSubmitEdit)}>
        <Check />
      </IconButton>
      <IconButton onClick={() => setEditingId("")}>
        <Clear />
      </IconButton>
    </StyledCollapseItem>
  );

  const renderTodoDetail = () => (
    <StyledCollapseItem>
      <div>
        <p>{todoItemData?.content}</p>
        <span>{dayjs(todoItemData?.createdAt).format(DATE_FORMAT)}</span>
      </div>
      <IconButton onClick={() => handleClickEdit(todoItemData as TodoItemData)}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => handleClickDelete(todoItemData?.id as string)}>
        <Delete />
      </IconButton>
    </StyledCollapseItem>
  );

  useEffect(() => {
    (async () => {
      if (_.isEmpty(queryData)) {
        setOpenItemId("");
      } else {
        if (!!queryData?.id) {
          setOpenItemId(queryData?.id as string);
          await refetchTodoItem();
        }
      }
    })();
  }, [queryData]);

  return (
    <form>
      <StyledList>
        <h2>Todo List</h2>
        <ListContainer>
          {todoListData?.map((item) => (
            <div key={item.id}>
              <ListItemButton onClick={() => handleToggleListItemButton(item)}>
                <h3>{item.title}</h3>
                {isOpen(item.id) ? <ArrowDropUp /> : <ArrowDropDown />}
              </ListItemButton>
              <Collapse in={isOpen(item.id)} timeout="auto" unmountOnExit>
                {isEditing(item.id)
                  ? renderEditingTodoInputs()
                  : renderTodoDetail()}
              </Collapse>
            </div>
          ))}
        </ListContainer>
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
          name={"create.title"}
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
          name={"create.content"}
        />
        <IconButton onClick={handleSubmit(onSubmitCreate)}>
          <AddCircle color={"primary"} />
        </IconButton>
      </StyledList>
      <Link href={LOGOUT_URL}>Logout</Link>
    </form>
  );
}

export default withProtection(List);

const StyledList = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const StyledCollapseItem = styled.div`
  padding: 1rem;
`;
