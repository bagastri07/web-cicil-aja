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
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Ambassador() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setUser(resp));
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="ambassador">
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
              <BreadcrumbLink as={Link} href="/dashboard/ambassador">
                <a>Ambassador</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <div>
          <h1 className="text-4xl">Ambassador</h1>
          <h2 className="text-xl mt-1">
            Hi, {user?.name?.split(" ").slice(0, 1)}. Kamu adalah student
            ambassador.
          </h2>
          <div className="my-5">
            <div className="w-full bg-purple-100 rounded-xl p-5">
              <h3 className="text-xl mb-2">Total Commission</h3>
              <div className="flex gap-5">
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Commission</StatLabel>
                  <StatNumber>Rp.400.000</StatNumber>
                </Stat>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Ambassador;
