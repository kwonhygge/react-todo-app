import { ComponentType, useEffect } from "react";
import { TOKEN } from "@/constants/common";
import { LOGIN_URL } from "@/constants/index";
import { useNavigate } from "react-router-dom";

const withProtection = (Component: ComponentType<object>) => () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    if (!token) {
      navigate(LOGIN_URL);
    }
  }, []);

  return !!token ? <Component /> : <></>;
};

export default withProtection;
