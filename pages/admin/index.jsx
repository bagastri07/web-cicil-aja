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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import AdminDashboardLayout from "../../components/adminDashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="menu">
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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Admin Cicil Aja</h1>
        <div className="py-5">
          <UnorderedList>
            <ListItem>
              <Link href="/admin/borrowers">
                <a>Page Peminjam</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/loan">
                <a>Page Cicilan</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/loan">
                <a>Page Ambassador</a>
              </Link>
            </ListItem>
          </UnorderedList>
        </div>
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Admin;
