import "../styles/globals.css";
import "../styles/datePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { ChakraProvider } from "@chakra-ui/react";

import { useEffect } from "react";
import Auth from "../auth/storeAuth";

function MyApp({ Component, pageProps }) {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);

  useEffect(() => {
    const login = localStorage.getItem("token");
    login ? setLogin(true) : setLogin(false);
  }, [setLogin]);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
