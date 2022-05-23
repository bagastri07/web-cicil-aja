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

function Document() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setUser(resp));
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
              <BreadcrumbLink as={Link} href="/dashboard/profile/document">
                <a>Document</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <div className="">
          <h1 className="text-4xl">Edit Dokumen</h1>
          <h2 className="text-xl mt-1"></h2>
          <div className="py-5">
            <Formik
              initialValues={{
                img_ktm: null,
              }}
              onSubmit={(data, { setSubmitting }) => {
                setTimeout(() => {
                  const token = localStorage.getItem("token");
                  let dataImg = new FormData();
                  dataImg.append("img_ktm", data.img_ktm);
                  API.postKtp(dataImg, token).then((resp) => {
                    console.log(resp);
                  });
                  setSubmitting(false);
                }, 500);
              }}
            >
              {({}) => (
                <Form className="w-full bg-purple-100 rounded-xl p-5">
                  <ul>
                    <li>
                      Foto Kartu Tanda Penduduk:{" "}
                      <Field
                        as={Input}
                        name="img_ktm"
                        variant="outline"
                        type="file"
                        colorScheme="purple"
                      />
                    </li>
                  </ul>
                  <div className="flex mt-10 gap-3">
                    <Button type="submit" colorScheme="purple">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <Formik
            initialValues={{
              img_ktm: null,
            }}
          >
            {({}) => (
              <Form className="w-full bg-purple-100 rounded-xl p-5">
                <ul>
                  <li>
                    Foto Kartu Tanda Mahasiswa:{" "}
                    <Field
                      as={Input}
                      name="img_ktm"
                      variant="outline"
                      type="file"
                      colorScheme="purple"
                    />
                  </li>
                </ul>
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
      </DashboardLayout>
    </Redirect>
  );
}

export default Document;
