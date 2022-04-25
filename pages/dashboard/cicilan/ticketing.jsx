import { AddIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CloseButton,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import API from "../../../api";

function Ticketing() {
  const router = useRouter();
  const toast = useToast();

  return (
    <Redirect>
      <DashboardLayout page="cicilan">
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
              <BreadcrumbLink as={Link} href="/dashboard/cicilan">
                <a>Cicilan</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/cicilan/ticketing">
                <a>Permintaan Baru</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Ajukan Cicilan Baru</h1>
        <h2 className="text-xl mt-1">Mengajukan Cicilan Baru</h2>
        <Formik
          initialValues={{
            loan_amount: "",
            loan_type: "",
            loan_tenure_in_months: "",
            item_url: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setTimeout(() => {
              const token = localStorage.getItem("token");
              API.postTicket(data, token).then((resp) => {
                toast({
                  title: "Permintaan telah dibuat!",
                  description: `Kami berhasil membuat permintaanmu, dan akan di-review secepatnya.`,
                  status: "success",
                  isCloseable: true,
                });
                router.push("/dashboard/cicilan");
              });
              setSubmitting(false);
            }, 500);
          }}
        >
          {({}) => (
            <Form className="w-full bg-purple-100 rounded-xl p-5">
              <ul>
                <li>
                  Jumlah Pinjaman:{" "}
                  <InputGroup colorScheme="purple">
                    <InputLeftAddon>Rp.</InputLeftAddon>
                    <Field
                      variant="outline"
                      type="number"
                      colorScheme="purple"
                      placeholder="Jumlah dalam Rp."
                      name="loan_amount"
                      as={Input}
                    />
                  </InputGroup>
                </li>
                <li>
                  Tipe Pinjaman:{" "}
                  <Field
                    as={Select}
                    name="loan_type"
                    placeholder="Pilih Tipe Pinjaman"
                  >
                    <option value="college-bill">BPP/SPP</option>
                    <option value="shopping">Belanja</option>
                  </Field>
                </li>
                <li>
                  Jangka Waktu Pengembalian (dalam bulan):{" "}
                  <Field
                    name="loan_tenure_in_months"
                    colorScheme="purple"
                    placeholder="Jangka Waktu"
                    as={Select}
                  >
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="12">12 Bulan</option>
                  </Field>
                </li>
                <li>
                  Link Barang Yang Akan Dibeli:{" "}
                  <Field
                    variant="outline"
                    type="url"
                    colorScheme="purple"
                    placeholder="Url"
                    name="item_url"
                    as={Input}
                  />
                </li>
              </ul>
              <div className="flex mt-10 gap-3">
                <Button
                  type="button"
                  colorScheme="red"
                  onClick={() => router.push("/dashboard/cicilan")}
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
      </DashboardLayout>
    </Redirect>
  );
}

export default Ticketing;
