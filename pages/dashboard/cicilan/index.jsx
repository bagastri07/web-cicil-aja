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
} from "@chakra-ui/react";
import React from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import { useRouter } from "next/router";

function Cicilan() {
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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Cicilan</h1>
        <h2 className="text-xl mt-1">Berapa cicilan yang telah kamu ajukan</h2>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5">
            <div className="flex gap-5">
              <Stat bg="white" rounded="xl" padding="5">
                <StatLabel>Total Cicilan Diajukan</StatLabel>
                <StatNumber>Rp.2.750.000</StatNumber>
                <StatHelpText>Hingga 20 Januari 2023</StatHelpText>
              </Stat>
              <div className="rounded-xl p-5 bg-white flex justify-center items-center max-w-xs">
                <p>
                  Kamu akan diinfokan ketika pengajuan cicilanmu telah diterima.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Button
                colorScheme="purple"
                leftIcon={<AddIcon />}
                onClick={() => router.push("/dashboard/cicilan/ticketing")}
              >
                Buat Permintaan Baru
              </Button>
            </div>
          </div>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Permintaan Cicilan Pending</h3>
            <Stat bg="white" rounded="xl" padding="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Belanja Sepatu Baru</StatLabel>
                  <StatNumber>Rp.250.000</StatNumber>
                  <StatHelpText>Batas hingga 5 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <Tooltip label="Hapus Permintaan">
                  <Button colorScheme="red">
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Beli Handphone Samsung</StatLabel>
                  <StatNumber>Rp.2.500.000</StatNumber>
                  <StatHelpText>Batas hingga 12 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <Tooltip label="Hapus Permintaan">
                  <Button colorScheme="red">
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </div>
            </Stat>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Cicilan;
