import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Auth from "./storeAuth";

function LoginRedirect({ children }) {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);
  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("token");

    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    if (login) {
      router.push("/dashboard");
    }
  }, [isLogin, router, setLogin]);

  if (isLogin) {
    return <div className="bg-gradient-to-br from-blue-50 to-blue-400"></div>;
  } else {
    return <>{children}</>;
  }
}

export default LoginRedirect;
