import { Outlet, useNavigate } from "react-router-dom";
import { TODO_LIST_URL } from "@/constants/index";
import styled from "@emotion/styled";
import {
  Paper,
  ListItemButton,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useGetTodoList } from "@/hooks/apis";

function List() {
  const navigate = useNavigate();

  const { data: todoListData } = useGetTodoList();

  return (
    <StyledList>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <ThemeProvider
            theme={createTheme({
              palette: {
                mode: "dark",
                primary: { main: "rgb(102, 157, 246)" },
                background: { paper: "rgb(5, 30, 52)" },
              },
            })}
          >
            <Paper
              sx={{
                minHeight: 300,
                maxHeight: 300,
                maxWidth: 400,
                overflow: "auto",
              }}
            >
              {todoListData?.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => navigate(`${TODO_LIST_URL}/${item.id}`)}
                >
                  <h3>{item.title}</h3>
                </ListItemButton>
              ))}
            </Paper>
          </ThemeProvider>
        </Grid>
        <Grid item xs={3}>
          <Outlet />
        </Grid>
      </Grid>
    </StyledList>
  );
}

export default List;

const StyledList = styled.div`
  margin: 20px auto;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
