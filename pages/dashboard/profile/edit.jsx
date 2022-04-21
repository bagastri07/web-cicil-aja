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
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

function Profile() {
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
            <Formik>
              {({}) => (
                <Form className="w-full bg-purple-100 rounded-xl p-5">
                  <div>
                    <h2 className="text-xl mb-2">Data Pribadi</h2>
                    <ul>
                      <li>
                        Nama:{" "}
                        <Input
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Nama"
                        />
                      </li>
                      <li>
                        Ulang Tahun: <DatePicker className="bg-transparent" />
                      </li>
                      <li>
                        Nomor Telfon:{" "}
                        <Input
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Nomor Telfon"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-xl mb-2">Data Universitas</h2>
                    <ul>
                      <li>
                        Universitas:{" "}
                        <Input
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Universitas"
                        />
                      </li>
                      <li>
                        Jurusan:{" "}
                        <Input
                          variant="outline"
                          colorScheme="purple"
                          placeholder="Jurusan"
                        />
                      </li>
                      <li>
                        Nomer Induk Mahasiswa:{" "}
                        <Input
                          variant="outline"
                          colorScheme="purple"
                          placeholder="NIM"
                        />
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
