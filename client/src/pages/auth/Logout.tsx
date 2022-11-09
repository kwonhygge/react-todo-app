import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_URL, TOKEN } from "@/constants/index";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!!token) {
      localStorage.removeItem(TOKEN);
      navigate(MAIN_URL);
    }
  }, []);

  return <></>;
}

export default Logout;
