import AdminRedirect from "../../../auth/admin/adminRedirect";
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
  Tag,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Borrowers() {
  const router = useRouter();
  const [dataBorrowers, setDataBorrowers] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getAdminBorrower(token).then((resp) => {
      setDataBorrowers(resp);
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="py-5">
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h3 className="text-xl mb-2">Daftar</h3>
              {dataBorrowers?.borrowers?.map((items) => (
                <Stat
                  key={items.id}
                  bg="white"
                  rounded="xl"
                  padding="5"
                  mt="5"
                  cursor="pointer"
                  _hover={{ opacity: "0.75" }}
                  onClick={() => router.push(`/admin/borrowers/${items.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <StatLabel>{items.name}</StatLabel>
                      <StatHelpText>{items.email}</StatHelpText>
                      {items.is_ambassador ? (
                        <StatHelpText>
                          <Tag size="sm" colorScheme="red">
                            Ambassador
                          </Tag>
                        </StatHelpText>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Stat>
              ))}
            </div>
          </div>
        )}
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Borrowers;
