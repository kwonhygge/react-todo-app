import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "@/pages/auth";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
