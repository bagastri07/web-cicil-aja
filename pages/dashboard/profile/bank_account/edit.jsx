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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../../api";
import Redirect from "../../../../auth/redirect";
import DashboardLayout from "../../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";

function Edit() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const toast = useToast();

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
              <BreadcrumbLink as={Link} href="/dashboard/profile/bank_account">
                <a>Akun Bank</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                as={Link}
                href="/dashboard/profile/bank_account/edit"
              >
                <a>Edit</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <div className="">
          <h1 className="text-4xl">Edit Akun Bank</h1>
          <h2 className="text-xl mt-1">
            {user?.bank_information ? (
              <>Edit atau ubah informasi bank</>
            ) : (
              <>Silahkan lengkapi informasi bank-mu</>
            )}
          </h2>
          <div className="py-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                bank_name: user?.bank_information?.bank_name,
                account_number: user?.bank_information?.account_number,
                account_recipient: user?.bank_information?.account_recipient,
              }}
              onSubmit={(data, { setSubmitting }) => {
                setTimeout(() => {
                  const token = localStorage.getItem("token");
                  API.putBank(data, token).then((resp) => {
                    if (resp.message) {
                      toast({
                        title: "Gagal Diperbarui!",
                        description: "Perhatikan kembali informasimu",
                        status: "error",
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "Berhasil Diperbarui!",
                        description:
                          "Informasi mengenai bank mu telah berhasil diperbarui",
                        status: "success",
                        isClosable: true,
                      });
                      router.push("/dashboard/profile/bank_account");
                    }
                  });
                  setSubmitting(false);
                });
              }}
            >
              {({ values }) => (
                <Form className="w-full bg-purple-100 rounded-xl p-5">
                  <h2 className="text-xl mb-2">Data Bank</h2>
                  <ul>
                    <li>
                      Nama Bank:
                      <Field
                        value={values.bank_name}
                        as={Input}
                        type="text"
                        name="bank_name"
                        variant="outline"
                        colorScheme="purple"
                        placeholder="Nama Bank"
                      />
                    </li>
                    <li>
                      Nomor Rekening:
                      <Field
                        value={values.account_number}
                        as={Input}
                        name="account_number"
                        variant="outline"
                        type="text"
                        colorScheme="purple"
                        placeholder="Nomor Rekening"
                      />
                    </li>
                    <li>
                      Pemilik Rekening:
                      <Field
                        value={values.account_recipient}
                        as={Input}
                        name="account_recipient"
                        variant="outline"
                        type="text"
                        colorScheme="purple"
                        placeholder="Nama"
                      />
                    </li>
                  </ul>
                  <div className="flex mt-10 gap-3">
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() =>
                        router.push("/dashboard/profile/bank_account")
                      }
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

export default Edit;
