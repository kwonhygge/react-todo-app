import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "@/pages/auth";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
