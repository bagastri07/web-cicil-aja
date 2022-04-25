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
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import AdminDashboardLayout from "../../components/adminDashboardLayout";
import Link from "next/link";
import { CheckIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Ambassador() {
  const router = useRouter();

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="ambassador">
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
              <BreadcrumbLink as={Link} href="/admin">
                <a>Ambassador</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Ambassador</h1>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Pendaftar Ambassador</h3>
            <Stat bg="white" rounded="xl" padding="5">
              <div className="flex justify-between items-center">
                <div>
                  <StatNumber>Ditya Athallah</StatNumber>
                  <StatLabel>Telkom University</StatLabel>
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
        <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
          <h3 className="text-xl mb-2">Ambassador Telah Diterima</h3>
          <Stat bg="white" rounded="xl" padding="5">
            <div className="flex justify-between items-center">
              <div>
                <StatNumber>Bagas Tri</StatNumber>
                <StatLabel>Telkom University</StatLabel>
              </div>
            </div>
          </Stat>
        </div>
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Ambassador;
