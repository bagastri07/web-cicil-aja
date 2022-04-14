import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Auth from "./storeAuth";

function Redirect({ children }) {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);
  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("token");

    if (login) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    if (!login) {
      router.push("/login");
    }
  }, [isLogin, router, setLogin]);

  if (isLogin) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default Redirect;
