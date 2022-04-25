import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AdminAuth from "./adminStoreAuth";

function AdminRedirect({ children }) {
  const [isLogin, setLogin] = AdminAuth((state) => [
    state.isLogin,
    state.setLogin,
  ]);
  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("token");

    if (login) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    if (!login) {
      router.push("/admin/login");
    }
  }, [isLogin, router, setLogin]);

  if (isLogin) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default AdminRedirect;
