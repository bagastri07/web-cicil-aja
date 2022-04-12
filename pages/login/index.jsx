import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Auth from "../../auth/storeAuth";

import axios from "axios";
import { Formik, Form, Field } from "formik";

import {
  Input,
  InputGroup,
  Button,
  Box,
  Avatar,
  AvatarBadge,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const handlePass = () => setShowPass(!showPass);

  return (
    <div
      className="
        transition duration-300
        bg-white
        sm:font-sans sm:bg-gradient-to-br from-blue-50 to-blue-400
        sm:w-screen h-screen sm:py-20
        flex items-center justify-center
      "
    >
      <Head>
        <title>Cicil - Login</title>
      </Head>
      <Box height="550px">
        <div
          className="
          bg-white text-center
          max-w-sm h-full mx-auto rounded-3xl p-14"
        >
          <Avatar />
          <h1 className="text-4xl font-semibold text-gray-900 mt-6">
            Welcome!!
          </h1>
          <p className="text-gray-400 text-xs mt-3">
            Please insert your username & password correctly
          </p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(data, { setSubmitting }) => {
              setTimeout(() => {
                axios
                  .post("https://cicilaja.bagas3.my.id/auth/login", data)
                  .then((res) => {
                    console.log(res.data.data);
                    localStorage.setItem("token", res.data.data);
                    setLogin(true);
                    router.push("/dashboard");
                  });
              });
            }}
          >
            {({ touched, errors }) => (
              <Form className="flex flex-col gap-2 mt-6">
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Email
                </label>
                <Field
                  type="email"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Email"
                  size="md"
                  name="email"
                  as={Input}
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Password
                </label>
                <InputGroup size="md">
                  <Field
                    type={showPass ? "text" : "password"}
                    colorScheme="purple"
                    rounded="md"
                    placeholder="Password"
                    size="md"
                    name="password"
                    as={Input}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="lg"
                      variant="link"
                      onClick={handlePass}
                      _focus={{ boxShadow: "0" }}
                    >
                      {showPass ? (
                        <Icon as={ViewOffIcon} />
                      ) : (
                        <Icon as={ViewIcon} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button
                  // onClick={() => {
                  //   setLogin(true);
                  //   router.push("/dashboard");
                  // }}
                  colorScheme="purple"
                  marginTop="5"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-400 text-sm mt-5">
            Don’t have an account? Make it
            <b
              onClick={() => router.push("/register")}
              className="cursor-pointer hover:text-gray-600 transition duration-300"
            >
              {" "}
              here
            </b>
            .
          </p>
        </div>
      </Box>
    </div>
  );
};

export default Login;
