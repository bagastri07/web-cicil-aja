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

import * as Yup from "yup";

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
          max-w-sm h-full mx-auto rounded-3xl p-14 pt-10 overflow-y-scroll"
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
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .required("Nama harus diisi")
                      .max(20, "Nama maksimal 20 karakter"),
                    birthday: Yup.date()
                      .required("Tanggal lahir harus diisi")
                      .max(new Date(), "Tanggal lahir tidak valid"),
                    email: Yup.string()
                      .required("Email harus diisi")
                      .email("Email tidak valid"),
                    password: Yup.string()
                      .required("Password harus diisi")
                      .min(10, "Password minimal 10 karakter"),
                  })}
                  onSubmit={(data, { setSubmitting }) => {
                    setTimeout(() => {
                      const date = data.birthday;
                      const isoDate = date.toISOString();
                      delete data.startDate;

                      data.birthday = isoDate;

                      setForm(data);
                      setRegist(false);
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {({
                    touched,
                    errors,
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
                        isInvalid={touched.name && errors.name}
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Name"
                        size="md"
                        name="name"
                        as={Input}
                      />
                      {errors.name && touched.name ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.name}
                        </div>
                      ) : null}
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
                      {errors.birthday && touched.birthday ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.birthday}
                        </div>
                      ) : null}
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Email
                      </label>
                      <Field
                        isInvalid={touched.email && errors.email}
                        type="email"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Email"
                        size="md"
                        name="email"
                        as={Input}
                        required
                      />
                      {errors.email && touched.email ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.email}
                        </div>
                      ) : null}
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Password
                      </label>
                      <Field
                        isInvalid={touched.password && errors.password}
                        type="password"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Password"
                        size="md"
                        name="password"
                        as={Input}
                        required
                      />
                      {errors.password && touched.password ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.password}
                        </div>
                      ) : null}
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
                  validationSchema={Yup.object({
                    university: Yup.string()
                      .required("Universitas harus diisi")
                      .max(50, "Universitas maksimal 50 karakter"),
                    study_program: Yup.string()
                      .required("Program studi harus diisi")
                      .max(50, "Program studi maksimal 50 karakter"),
                    student_number: Yup.number().required("NIM harus diisi"),
                    phone_number: Yup.string()
                      .required("Nomor telepon harus diisi")
                      .matches(/^\+[1-9]{10,}$/, "Nomor telepon tidak valid"),
                  })}
                  onSubmit={(data, { setSubmitting }) => {
                    setTimeout(() => {
                      API.postRegist(data).then((resp) => {
                        if (resp.data) {
                          setSuccess(true);
                        } else {
                          setModal(true);
                        }
                      });
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {({ touched, errors }) => (
                    <Form className="flex flex-col gap-1 mt-6">
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Universitas
                      </label>
                      <Field
                        isInvalid={touched.university && errors.university}
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Universitas"
                        size="md"
                        name="university"
                        as={Input}
                      />
                      {errors.university && touched.university ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.university}
                        </div>
                      ) : null}
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Program Studi
                      </label>
                      <Field
                        isInvalid={
                          touched.study_program && errors.study_program
                        }
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Program Studi"
                        size="md"
                        name="study_program"
                        as={Input}
                      />
                      {errors.study_program && touched.study_program ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.study_program}
                        </div>
                      ) : null}
                      <label
                        htmlFor=""
                        className="text-left opacity-60 text-sm"
                      >
                        Nomor Mahasiswa
                      </label>
                      <Field
                        isInvalid={
                          touched.student_number && errors.student_number
                        }
                        type="text"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Nomor Mahasiswa"
                        size="md"
                        name="student_number"
                        as={Input}
                      />
                      {errors.student_number && touched.student_number ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.student_number}
                        </div>
                      ) : null}
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
                        isInvalid={touched.phone_number && errors.phone_number}
                        type="tel"
                        colorScheme="purple"
                        rounded="md"
                        placeholder="Nomor Telfon"
                        size="md"
                        name="phone_number"
                        as={Input}
                      />
                      {errors.phone_number && touched.phone_number ? (
                        <div className="text-left text-red-400 text-xs">
                          {errors.phone_number}
                        </div>
                      ) : null}
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
