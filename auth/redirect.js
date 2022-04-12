import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Auth from "./storeAuth";

function Redirect({ children }) {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default Redirect;
