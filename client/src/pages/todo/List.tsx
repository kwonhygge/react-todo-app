import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QueryString from "qs";
import {
  CONTENT,
  TITLE,
  DATE_FORMAT,
  TOKEN,
  TODOS_API_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from "@/constants/index";
import styled from "@emotion/styled";
import { IconButton, Link, TextField } from "@mui/material";
import {
  ArrowDropDown,
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

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [editingIdState, setEditingId] = useState("");

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { data: todoListData, refetch } = useGetTodoList();
  const { data: todoItemData } = useGetTodoListItem(queryData);
  const { mutate: createTodoItemMutate } = useCreateTodoItem();
  const { mutate: editTodoItemMutate } = useEditTodoItem();
  const { mutate: deleteTodoItemMutate } = useDeleteTodoItem();

  const isEditing = (id: string) => id === editingIdState;

  const onSubmitCreate = (data: FormData) => {
    createTodoItemMutate(
      {
        [TITLE]: data.create[TITLE],
        [CONTENT]: data.create[CONTENT],
      },
      {
        onSuccess: () => {
          refetch();
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
        onSuccess: () => {
          setEditingId("");
          refetch();
          reset();
        },
      }
    );
  };

  const handleClickDelete = (id: string) => {
    deleteTodoItemMutate(`${TODOS_API_URL}/${id}`, {
      onSuccess: () => {
        refetch();
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

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      navigate(LOGIN_URL);
    }
  }, []);

  return (
    <form>
      <StyledList>
        <h2>Todo List</h2>
        <ul>
          {todoListData?.map((item) =>
            isEditing(item.id) ? (
              <li key={item.id}>
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
              </li>
            ) : (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <IconButton
                  onClick={() => navigate(`/todo/list?id=${item.id}`)}
                >
                  <ArrowDropDown />
                </IconButton>
                {queryData.id === item.id && (
                  <>
                    <div>
                      <p>{todoItemData?.content}</p>
                      <span>
                        {dayjs(todoItemData?.createdAt).format(DATE_FORMAT)}
                      </span>
                    </div>
                    <IconButton
                      onClick={() =>
                        handleClickEdit(todoItemData as TodoItemData)
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleClickDelete(todoItemData?.id as string)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
              </li>
            )
          )}
        </ul>
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

export default List;

const StyledList = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
