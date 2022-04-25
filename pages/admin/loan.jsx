import AdminRedirect from "../../auth/admin/adminRedirect";
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
  Tooltip,
  StatHelpText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import AdminDashboardLayout from "../../components/adminDashboardLayout";
import Link from "next/link";
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Loan() {
  const router = useRouter();

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="cicilan">
        <div className="mb-5">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/admin">
                <a>Admin</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/admin/loan">
                <a>Cicilan</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Daftar Cicilan</h1>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5">
            <div className="flex gap-5">
              <Stat bg="white" rounded="xl" padding="5">
                <StatLabel>Estimasi Keseluruhan Total Cicilan</StatLabel>
                <StatNumber>Rp.22.550.000</StatNumber>
                <StatHelpText>Dari 28 transaksi yang ada</StatHelpText>
              </Stat>
            </div>
          </div>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Permintaan Cicilan</h3>
            <Stat bg="white" rounded="xl" padding="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Belanja Sepatu Baru</StatLabel>
                  <StatNumber>Rp.250.000</StatNumber>
                  <StatHelpText>Batas hingga 5 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <div className="flex gap-2">
                  <Tooltip label="Acc Permintaan">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Tolak Permintaan">
                    <Button colorScheme="red" variant="outline">
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Belanja Sepatu Baru</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Batas hingga 5 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <div className="flex gap-2">
                  <Tooltip label="Acc Permintaan">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Tolak Permintaan">
                    <Button colorScheme="red" variant="outline">
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Belanja Sepatu Baru</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Batas hingga 5 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <div className="flex gap-2">
                  <Tooltip label="Acc Permintaan">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Tolak Permintaan">
                    <Button colorScheme="red" variant="outline">
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Belanja Sepatu Baru</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Batas hingga 5 bulan</StatHelpText>
                  <StatHelpText>Belum di terima (masih pending)</StatHelpText>
                </div>
                <div className="flex gap-2">
                  <Tooltip label="Acc Permintaan">
                    <Button colorScheme="purple">
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Tolak Permintaan">
                    <Button colorScheme="red" variant="outline">
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Stat>
          </div>
        </div>
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Loan;
