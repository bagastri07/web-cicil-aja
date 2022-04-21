import Head from "next/head";
import {
  Input,
  Button,
  Box,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";

import { useState } from "react";
import { useRouter } from "next/router";

import { Formik, Form, Field } from "formik";
import API from "../../api";

import LoginRedirect from "../../auth/loginRedirect";

const Register = () => {
  const [regist, setRegist] = useState(true);
  const [form, setForm] = useState({});
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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
          <title>Cicil - Register</title>
        </Head>
        <Box height="550px">
          <div
            className="
          bg-white text-center
          max-w-sm h-full mx-auto rounded-3xl p-14 pt-10"
          >
            <h1 className="text-4xl font-semibold text-gray-900">Buat Akun</h1>
            {regist ? (
              <>
                <p className="text-gray-400 text-xs mt-3">
                  Masukkan email dan passwordmu!
                </p>
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: "",
                    birthday: new Date(),
                    email: "",
                    password: "",
                    university: "",
                    study_program: "",
                    student_number: "",
                    phone_number: "",
                  }}
                  onSubmit={(data, { setSubmitting }) => {
                    setTimeout(() => {
                      const date = data.birthday;
                      const isoDate = date.toISOString();
                      delete data.startDate;

                      data.birthday = isoDate;
                      console.log(data);

                      setForm(data);
                      setRegist(false);
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {({
                    touched,
                    error,
                    handleChange,
                    values,
                    setFieldValue,
                  }) => (
                    <Form className="flex flex-col gap-1 mt-6">
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Nama
                      </label>
                      <Field
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Name"
                        size="md"
                        name="name"
                        as={Input}
                        required
                      />
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Tanggal Lahir
                      </label>
                      <DatePicker
                        selected={values.startDate}
                        name="birthday"
                        onChange={(date) => setFieldValue("startDate", date)}
                        required
                      />
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
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
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Password"
                        size="md"
                        name="password"
                        as={Input}
                        required
                      />
                      <Button colorScheme="purple" marginTop="5" type="submit">
                        Lanjutkan
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-xs mt-3">
                  Masukkan data tambahan
                </p>
                <Formik
                  enableReinitialize
                  initialValues={form}
                  onSubmit={(data, { setSubmitting }) => {
                    setTimeout(() => {
                      console.log(data);
                      API.postRegist(data).then((resp) => {
                        if (resp.data) {
                          console.log(resp.data);
                          setSuccess(true);
                        } else {
                          setModal(true);
                          console.log("err");
                        }
                      });
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {({}) => (
                    <Form className="flex flex-col gap-1 mt-6">
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Universitas
                      </label>
                      <Field
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Universitas"
                        size="md"
                        name="university"
                        as={Input}
                        required
                      />
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Program Studi
                      </label>
                      <Field
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Program Studi"
                        size="md"
                        name="study_program"
                        as={Input}
                        required
                      />
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Nomor Mahasiswa
                      </label>
                      <Field
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Nomor Mahasiswa"
                        size="md"
                        name="student_number"
                        as={Input}
                        required
                      />
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Nomor Telfon{" "}
                        <span className="opacity-70">
                          (format +62, min. 10 digit)
                        </span>
                      </label>
                      <Field
                        type="tel"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Nomor Telfon"
                        size="md"
                        name="phone_number"
                        as={Input}
                        required
                      />
                      <div className="mt-5 flex gap-2">
                        <Button
                          colorScheme="purple"
                          variant="outline"
                          type="button"
                          width="full"
                          onClick={() => {
                            setRegist(true);
                            setForm({});
                          }}
                        >
                          Kembali
                        </Button>
                        <Button colorScheme="purple" type="submit" width="full">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            <p className="text-gray-400 text-sm mt-5">
              Sudah memiliki akun?
              <b
                onClick={() => router.push("/login")}
                className="cursor-pointer hover:text-gray-600 transition duration-300"
              >
                {" "}
                Login
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
      <Modal
        isOpen={modal}
        onClose={() => {
          setModal(false);
          router.reload();
        }}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gagal Membuat Akun</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Ada kesalahan saat kami mencoba membuat akunmu, coba kembali
            perhatikan email, nomon telfon, ataupun password.
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setModal(false);
                router.reload();
              }}
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={success}
        onClose={() => {
          setSuccess(false);
        }}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Akun Berhasil Dibuat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Silahkan login untuk melanjutkan</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LoginRedirect>
  );
};

export default Register;
