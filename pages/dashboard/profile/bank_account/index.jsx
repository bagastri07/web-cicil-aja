import { ChevronRightIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  CloseButton,
  Divider,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../../api";
import Redirect from "../../../../auth/redirect";
import DashboardLayout from "../../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { useRouter } from "next/router";
import { bankNum } from "../../../../regex/point";

function BankAccount() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const [showBank, setShowBank] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => {
      setTimeout(() => {
        setUser(resp);
        setLoading(false);
      }, 300);
    });
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="profile">
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
              <BreadcrumbLink as={Link} href="/dashboard/profile">
                <a>Profile</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/profile/bank_account">
                <a>Akun Bank</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div>
            <h1 className="text-4xl">Akun Bank</h1>
            <h2 className="text-xl mt-1">
              {user?.bank_information ? (
                <>Informasi akun bank dan rekening</>
              ) : (
                <>Silahkan lengkapi informasi bank-mu</>
              )}
            </h2>
            <div className="py-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <Button
                  colorScheme="purple"
                  marginBottom="5"
                  size="sm"
                  display="flex"
                  alignItems="center"
                  gap="1"
                  onClick={() =>
                    router.push("/dashboard/profile/bank_account/edit")
                  }
                >
                  <EditIcon />
                  <p>Edit Bank</p>
                </Button>
                <div>
                  <h2 className="text-xl mb-2">Data Bank</h2>
                  {user?.bank_information ? (
                    <ul>
                      <li>Nama Bank: {user?.bank_information?.bank_name}</li>
                      <li>
                        Nomor Rekening:{" "}
                        {showBank
                          ? user?.bank_information?.account_number
                          : bankNum(user?.bank_information?.account_number)}
                        {"  "}
                        <span
                          onClick={() => setShowBank(!showBank)}
                          className="cursor-pointer hover:opacity-80"
                        >
                          <Tooltip label="Perlihatkan Nomor Rekening">
                            <ViewIcon />
                          </Tooltip>
                        </span>
                      </li>
                      <li>
                        Pemilik Rekening:{" "}
                        {user?.bank_information?.account_recipient}
                      </li>
                    </ul>
                  ) : (
                    <>Kamu belum melengkapi data bank</>
                  )}
                </div>
                <div className="mt-5">
                  <br />
                  {user?.bank_information ? (
                    <>
                      Terakhir di update pada{" "}
                      {dayjs(user?.bank_information?.updated_at).format(
                        "DD-MM-YYYY"
                      )}
                      , pukul{" "}
                      {dayjs(user?.bank_information?.updated_at).format(
                        "HH.mm"
                      )}
                      .
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default BankAccount;
