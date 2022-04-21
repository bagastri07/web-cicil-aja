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
} from "@chakra-ui/react";
import React from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

function Ticketing() {
  const router = useRouter();

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
        <Formik>
          {({}) => (
            <Form className="w-full bg-purple-100 rounded-xl p-5">
              <ul>
                <li>
                  Jumlah Pinjaman:{" "}
                  <Input
                    variant="outline"
                    type="number"
                    colorScheme="purple"
                    placeholder="Pinjaman"
                  />
                </li>
                <li>
                  Tipe Pinjaman:{" "}
                  <Input
                    variant="outline"
                    type="text"
                    colorScheme="purple"
                    placeholder="Tipe Pinjaman"
                  />
                </li>
                <li>
                  Jangka Waktu Pengembalian (dalam bulan):{" "}
                  <Input
                    variant="outline"
                    type="number"
                    colorScheme="purple"
                    placeholder="Jangka Waktu"
                  />
                </li>
                <li>
                  Link Barang Yang Akan Dibeli:{" "}
                  <Input
                    variant="outline"
                    type="url"
                    colorScheme="purple"
                    placeholder="Url"
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
