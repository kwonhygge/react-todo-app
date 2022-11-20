import { LOGOUT_URL, TODO_CREATE_URL } from "@/constants/index";
import styled from "@emotion/styled";
import { IconButton, Link, Grid } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import { List } from "@/components/index";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  content: string;
}

function TodoIndex() {
  const defaultValues: FormData = {
    title: "",
    content: "",
  };

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { reset } = methods;

  const handleClickCreate = () => {
    reset();
    navigate(TODO_CREATE_URL);
  };
  return (
    <FormProvider {...methods}>
      <StyledIndex>
        <header>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h2>Todo List</h2>
            </Grid>
            <Grid item xs={2}>
              <Link href={LOGOUT_URL}>Logout</Link>
            </Grid>
          </Grid>
        </header>
        <IconButton aria-label="create" onClick={handleClickCreate}>
          <AddCircle color="primary" />
        </IconButton>
        <List />
      </StyledIndex>
    </FormProvider>
  );
}

export default TodoIndex;

const StyledIndex = styled.div`
  width: 80%;
  margin: 20px auto;

  header {
    margin: 0 0 50px;

    h2 {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
