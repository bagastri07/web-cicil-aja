import { ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  CloseButton,
  Divider,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import * as Yup from "yup";

function Profile() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => {
      setUser(resp);
      console.log(resp);
    });
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="profile">
        <div className="mb-5">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard">
                <a>Dashboard</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/profile">
                <a>Profile</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/profile/edit">
                <a>Edit</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <div className="">
          <h1 className="text-4xl">Edit Profile</h1>
          <h2 className="text-xl mt-1">
            {user?.is_ambassador ? (
              <>Kamu terdaftar sebagai Student Ambassador.</>
            ) : (
              ""
            )}
          </h2>
          <div className="py-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: user?.name,
                phone_number: user?.phone_number,
                birthday: dayjs(user?.birthday).format("DD/MM/YYYY"),
                university: user?.university,
                study_program: user?.study_program,
                student_number: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .required("Nama harus diisi")
                  .max(20, "Nama maksimal 20 karakter"),
                phone_number: Yup.string()
                  .required("Nomor telepon harus diisi")
                  .matches(/^\+[1-9]{10,}$/, "Nomor telepon tidak valid"),
                birthday: Yup.date().required("Tanggal lahir harus diisi"),
                password: Yup.string()
                  .required("Password harus diisi")
                  .min(10, "Password minimal 10 karakter"),
                university: Yup.string()
                  .required("Universitas harus diisi")
                  .max(50, "Universitas maksimal 50 karakter"),
                study_program: Yup.string()
                  .required("Program studi harus diisi")
                  .max(50, "Program studi maksimal 50 karakter"),
                student_number: Yup.number().required("NIM harus diisi"),
              })}
              onSubmit={(values) => {
                const token = localStorage.getItem("token");
                API.putUser(
                  {
                    name: values.name,
                    phone_number: values.phone_number,
                    birthday: dayjs(values.birthday).toISOString(),
                    university: values.university,
                    study_program: values.study_program,
                    student_number: values.student_number,
                  },
                  token
                ).then((resp) => {
                  console.log(resp);
                  router.push("/dashboard/profile");
                });
              }}
            >
              {({ values, touched, errors }) => (
                <Form className="w-full bg-purple-100 rounded-xl p-5">
                  <div>
                    <h2 className="text-xl mb-2">Data Pribadi</h2>
                    <ul>
                      <li>
                        Nama:{" "}
                        <Field
                          value={values.name || ""}
                          isInvalid={touched.name && errors.name}
                          as={Input}
                          name="name"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Nama"
                        />
                        {errors.name && touched.name && (
                          <span className="text-red-500">{errors.name}</span>
                        )}
                      </li>
                      <li>
                        Ulang Tahun:{" "}
                        <Field
                          value={values.birthday || ""}
                          isInvalid={touched.birthday && errors.birthday}
                          as={Input}
                          name="birthday"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Ulang Tahun"
                        />
                        {errors.birthday && touched.birthday && (
                          <span className="text-red-500">
                            {errors.birthday}
                          </span>
                        )}
                      </li>
                      <li>
                        Nomor Telfon:{" "}
                        <Field
                          value={values.phone_number || ""}
                          isInvalid={
                            touched.phone_number && errors.phone_number
                          }
                          as={Input}
                          name="phone_number"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Nomor Telfon"
                        />
                        {errors.phone_number && touched.phone_number && (
                          <span className="text-red-500">
                            {errors.phone_number}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-xl mb-2">Data Universitas</h2>
                    <ul>
                      <li>
                        Universitas:{" "}
                        <Field
                          value={values.university || ""}
                          isInvalid={touched.university && errors.university}
                          as={Input}
                          name="university"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Universitas"
                        />
                        {errors.university && touched.university && (
                          <span className="text-red-500">
                            {errors.university}
                          </span>
                        )}
                      </li>
                      <li>
                        Jurusan:{" "}
                        <Field
                          value={values.study_program || ""}
                          isInvalid={
                            touched.study_program && errors.study_program
                          }
                          as={Input}
                          name="study_program"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Jurusan"
                        />
                        {errors.study_program && touched.study_program && (
                          <span className="text-red-500">
                            {errors.study_program}
                          </span>
                        )}
                      </li>
                      <li>
                        Nomer Induk Mahasiswa:{" "}
                        <Field
                          value={values.student_number || ""}
                          isInvalid={
                            touched.student_number && errors.student_number
                          }
                          as={Input}
                          name="student_number"
                          variant="outline"
                          colorScheme="purple"
                          placeholder="NIM"
                        />
                        {errors.student_number && touched.student_number && (
                          <span className="text-red-500">
                            {errors.student_number}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="flex mt-10 gap-3">
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => router.push("/dashboard/profile")}
                    >
                      Batalkan
                    </Button>
                    <Button type="submit" colorScheme="purple">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Profile;
