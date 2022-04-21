import { CheckIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
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
import Redirect from "../../auth/redirect";
import DashboardLayout from "../../components/dashboardLayout";

import Link from "next/link";

function Tagihan() {
  return (
    <Redirect>
      <DashboardLayout page="tagihan">
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
              <BreadcrumbLink as={Link} href="/dashboard/tagihan">
                <a>Tagihan</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <div>
          <h1 className="text-4xl">Tagihan</h1>
          <h2 className="text-xl mt-1">
            Jumlah tagihan yang harus kamu lunasi
          </h2>
          <div className="py-5">
            <div className="w-full bg-purple-100 rounded-xl p-5">
              <div className="flex gap-5">
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Total Tagihan</StatLabel>
                  <StatNumber>Rp.1.400.000</StatNumber>
                  <StatHelpText>Hingga 20 Januari 2023</StatHelpText>
                </Stat>
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Sudah Dilunasi</StatLabel>
                  <StatNumber>Rp.1.000.000</StatNumber>
                  <StatHelpText>Pada 14 April 2022</StatHelpText>
                </Stat>
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Belum Lunas</StatLabel>
                  <StatNumber textColor="red">Rp.400.000</StatNumber>
                  <StatHelpText>Hingga 20 Januari 2023</StatHelpText>
                </Stat>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h3 className="text-xl mb-2">Detail Tagihan</h3>
              <Stat bg="white" rounded="xl" padding="5">
                <div className="flex justify-between items-center">
                  <div>
                    <StatLabel>Bayar BPP</StatLabel>
                    <StatNumber textColor="green">Rp.1.000.000</StatNumber>
                    <StatHelpText>Sudah Lunas</StatHelpText>
                  </div>
                </div>
              </Stat>
              <Stat bg="white" rounded="xl" padding="5" mt="5">
                <div className="flex justify-between items-center">
                  <div>
                    <StatLabel>Beli Cermin</StatLabel>
                    <StatNumber>Rp.200.000</StatNumber>
                    <StatHelpText>Batas hingga 20 Januari 2023</StatHelpText>
                  </div>
                  <Tooltip label="Tagihan Telah Dilunasi">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Stat>
              <Stat bg="white" rounded="xl" padding="5" mt="5">
                <div className="flex justify-between items-center">
                  <div>
                    <StatLabel>Beli Casing Handphone</StatLabel>
                    <StatNumber>Rp.200.000</StatNumber>
                    <StatHelpText>Batas hingga 20 Januari 2023</StatHelpText>
                  </div>
                  <Tooltip label="Tagihan Telah Dilunasi">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Stat>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Tagihan;
