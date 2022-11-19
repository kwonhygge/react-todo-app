import { Outlet, useNavigate } from "react-router-dom";
import { CONTENT, TITLE, LOGOUT_URL, TODO_LIST_URL } from "@/constants/index";
import styled from "@emotion/styled";
import {
  IconButton,
  Link,
  TextField,
  List as ListContainer,
  ListItemButton,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  Controller,
  useForm,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useCreateTodoItem, useGetTodoList } from "@/hooks/apis";
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

  const setSnackbarProps = useSetRecoilState(snackbarProps);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, reset } = methods;

  const { data: todoListData } = useGetTodoList();
  const { mutate: createTodoItemMutate } = useCreateTodoItem();

  const onSubmitCreate = (data: FieldValues) => {
    createTodoItemMutate(
      {
        [TITLE]: data.create[TITLE],
        [CONTENT]: data.create[CONTENT],
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
    <FormProvider {...methods}>
      <StyledList>
        <h2>Todo List</h2>
        <ListContainer>
          {todoListData?.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => navigate(`${TODO_LIST_URL}/${item.id}`)}
            >
              <h3>{item.title}</h3>
            </ListItemButton>
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
        <IconButton aria-label="create" onClick={handleSubmit(onSubmitCreate)}>
          <AddCircle color="primary" />
        </IconButton>
      </StyledList>
      <Outlet />
      <Link href={LOGOUT_URL}>Logout</Link>
    </FormProvider>
  );
}

export default List;

const StyledList = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
