import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Auth from "../../auth/storeAuth";

import { Formik, Form, Field } from "formik";
import API from "../../api";

import LoginRedirect from "../../auth/loginRedirect";

import {
  Input,
  InputGroup,
  Button,
  Box,
  Avatar,
  AvatarBadge,
  InputRightElement,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const handlePass = () => setShowPass(!showPass);
  const [modal, setModal] = useState(false);

  return (
    <LoginRedirect>
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
            <h1 className="text-3xl font-semibold text-gray-900 mt-6">
              Selamat Datang!!
            </h1>
            <p className="text-gray-400 text-xs mt-3">
              Silahkan masukkan password dan email anda!
            </p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(data, { setSubmitting }) => {
                setTimeout(() => {
                  API.postLogin(data).then((resp) => {
                    if (resp.data) {
                      setLogin(true);
                      localStorage.setItem("token", resp.data);
                      router.push("/dashboard");
                    } else {
                      setModal(true);
                    }
                  });
                  setSubmitting(false);
                }, 500);
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
                    required
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
                      required
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
                  <Button colorScheme="purple" marginTop="5" type="submit">
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
            <p className="text-gray-400 text-sm mt-5">
              Belum memiliki akun? Buat
              <b
                onClick={() => router.push("/register")}
                className="cursor-pointer hover:text-gray-600 transition duration-300"
              >
                {" "}
                disini
              </b>
              .
            </p>
            <b
              onClick={() => router.push("/")}
              className="text-gray-400 text-sm mt-5 cursor-pointer hover:text-gray-600 transition duration-300"
            >
              Menu Utama
            </b>
          </div>
        </Box>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tidak Dapat Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Ada kesalahan saat kami mencoba mencari akunmu, coba cek email dan
            password. Cek kembali huruf besar, angka, dan karakter.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModal(false)}>Tutup</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LoginRedirect>
  );
};

export default Login;
