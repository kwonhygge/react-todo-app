import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QueryString from "qs";
import { DATE_FORMAT, TOKEN } from "@/constants/common";
import styled from "@emotion/styled";
import { IconButton, TextField } from "@mui/material";
import {
  ArrowDropDown,
  AddCircle,
  Check,
  Clear,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { CONTENT, TITLE } from "@/constants/name";
import { useLocation } from "react-router";
import { instance } from "@/libs/index";

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

interface TodoListItem {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateTodoVariables {
  title: string;
  content: string;
}

interface EditTodoVariables {
  url: string;
  title: string;
  content: string;
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

  const { data: todoListData, refetch } = useQuery<
    unknown,
    unknown,
    TodoListItem[]
  >({
    queryKey: ["todoList"],
    queryFn: async () => {
      return instance.get("/todos");
    },
  });

  const { data: todoItemData } = useQuery<unknown, unknown, TodoListItem>({
    queryKey: ["todoItem"],
    queryFn: async () => {
      if (!queryData) return;

      return instance.get(`/todos/${queryData.id}`);
    },
    enabled: false,
  });

  const createMutation = useMutation<
    unknown,
    unknown,
    CreateTodoVariables,
    unknown
  >({
    mutationFn: (variables) => {
      return instance.post("/todos", variables);
    },
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  const deleteMutation = useMutation<unknown, unknown, string, unknown>({
    mutationFn: (url) => {
      return instance.delete(url);
    },
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  const editMutation = useMutation<
    unknown,
    unknown,
    EditTodoVariables,
    unknown
  >({
    mutationFn: (variables) => {
      return instance.put(variables.url, {
        title: variables[TITLE],
        content: variables[CONTENT],
      });
    },
    onSuccess: () => {
      setEditingId("");
      refetch();
      reset();
    },
  });

  const isEditing = (id: string) => id === editingIdState;

  const onSubmitCreate = (data: FormData) => {
    createMutation.mutate({
      [TITLE]: data.create[TITLE],
      [CONTENT]: data.create[CONTENT],
    });
  };

  const onSubmitEdit = (data: FormData) => {
    editMutation.mutate({
      url: `/todos/${editingIdState}`,
      [TITLE]: data.edit[TITLE],
      [CONTENT]: data.edit[CONTENT],
    });
  };

  const handleClickDelete = (id: string) => {
    deleteMutation.mutate(`/todos/${id}`);
  };

  const handleClickEdit = (item: TodoListItem) => {
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
      navigate("/auth/login");
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
                        handleClickEdit(todoItemData as TodoListItem)
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
    </form>
  );
}

export default List;

const StyledList = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
