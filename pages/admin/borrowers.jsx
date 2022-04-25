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
  StatHelpText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import AdminDashboardLayout from "../../components/adminDashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Borrowers() {
  const router = useRouter();

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="peminjam">
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
              <BreadcrumbLink as={Link} href="/admin/borrowers">
                <a>Peminjam</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Daftar Peminjam</h1>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Daftar</h3>
            <Stat bg="white" rounded="xl" padding="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Ditya Athallah</StatLabel>
                  <StatNumber>Rp.650.000</StatNumber>
                  <StatHelpText>Dengan total 3 tiket pinjaman</StatHelpText>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Bagas Tri</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Dengan total 2 tiket pinjaman</StatHelpText>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Bagas Tri</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Dengan total 2 tiket pinjaman</StatHelpText>
                </div>
              </div>
            </Stat>
            <Stat bg="white" rounded="xl" padding="5" mt="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatLabel>Bagas Tri</StatLabel>
                  <StatNumber>Rp.1.040.000</StatNumber>
                  <StatHelpText>Dengan total 2 tiket pinjaman</StatHelpText>
                </div>
              </div>
            </Stat>
          </div>
        </div>
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Borrowers;
