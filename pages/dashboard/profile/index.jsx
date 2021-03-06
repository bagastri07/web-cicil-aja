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
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { useRouter } from "next/router";
import { bankNum, phoneNum } from "../../../regex/point";

function Profile() {
  const [user, setUser] = useState("");
  const [borrower, setBorrower] = useState(false);
  const [bank, setBank] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBank, setShowBank] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <div className="w-full mb-7">
              {user.borrower_document || borrower ? (
                ""
              ) : (
                <Alert status="warning" mb={5}>
                  <AlertIcon />
                  <AlertTitle mr={2}>
                    Kamu belum mengisi kelengkapan dokumen
                  </AlertTitle>
                  <AlertDescription>
                    Silahkan mengisi kelengkapan dokumenmu{" "}
                    <Link href="/dashboard/profile/document">
                      <a className="underline hover:opacity-80">disini</a>
                    </Link>
                  </AlertDescription>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setBorrower(true)}
                  />
                </Alert>
              )}
              {user.bank_information || bank ? (
                ""
              ) : (
                <Alert status="warning" mb={5}>
                  <AlertIcon />
                  <AlertTitle mr={2}>Kamu belum mengisi data bank</AlertTitle>
                  <AlertDescription>
                    Silahkan melengkapi data bank{" "}
                    <Link href="/dashboard/profile/bank_account">
                      <a className="underline hover:opacity-80">disini</a>
                    </Link>
                  </AlertDescription>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setBank(true)}
                  />
                </Alert>
              )}
            </div>
            <div className="">
              <h1 className="text-4xl">Profile</h1>
              <h2 className="text-xl mt-1">
                {user?.is_ambassador ? (
                  <>Kamu terdaftar sebagai Student Ambassador.</>
                ) : (
                  ""
                )}
              </h2>
              <div className="py-5">
                <div className="w-full bg-purple-100 rounded-xl p-5">
                  <Avatar size="xl" name={user?.name} marginBottom="5" />
                  <br />
                  <Button
                    colorScheme="purple"
                    marginBottom="5"
                    size="sm"
                    display="flex"
                    alignItems="center"
                    gap="1"
                    onClick={() => router.push("/dashboard/profile/edit")}
                  >
                    <EditIcon />
                    <p>Edit Profile</p>
                  </Button>
                  <div>
                    <h2 className="text-xl mb-2">Data Pribadi</h2>
                    <ul>
                      <li>Nama: {user?.name}</li>
                      <li>
                        Ulang Tahun:{" "}
                        {dayjs(user?.birthday)
                          .locale("id")
                          .format("DD MMMM YYYY")}
                      </li>
                      <li>
                        Nomor Telfon:{" "}
                        {showPhone ? (
                          <>{user?.phone_number}</>
                        ) : (
                          <>{phoneNum(user?.phone_number)} </>
                        )}
                        {"  "}
                        <span
                          className="cursor-pointer hover:opacity-80"
                          onClick={() => setShowPhone(!showPhone)}
                        >
                          <Tooltip label="Perlihatkan nomor telfon">
                            <ViewIcon />
                          </Tooltip>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-xl mb-2">Data Universitas</h2>
                    <ul>
                      <li>Universitas: {user?.university}</li>
                      <li>Jurusan: {user?.study_program}</li>
                      <li>Nomer Induk Mahasiswa: {user?.student_number}</li>
                    </ul>
                  </div>
                  <div className="mt-5">
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
                          Atas Nama: {user?.bank_information?.account_recipient}
                        </li>
                        <li>
                          <Button
                            colorScheme="purple"
                            size="sm"
                            variant="link"
                            onClick={() =>
                              router.push("/dashboard/profile/bank_account")
                            }
                          >
                            Lihat Akun Bank...
                          </Button>
                        </li>
                      </ul>
                    ) : (
                      <div>
                        <p>Kamu belum melengkapi informasi bank</p>
                        <Link href="/dashboard/profile/bank_account">
                          <a className="underline hover:opacity-80">
                            Lengkapi Disini
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <h2 className="text-xl mb-2">KTP dan KTM</h2>
                    <Link href="/dashboard/profile/document">
                      <a className="underline hover:opacity-80">
                        Edit ktp dan ktm
                      </a>
                    </Link>
                  </div>
                  <div className="mt-5">
                    <br />
                    <p className="text-sm">
                      Terakhir di update pada{" "}
                      {dayjs(user?.updated_at)
                        .locale("id")
                        .format("DD MMMM YYYY")}
                      , pukul {dayjs(user?.updated_at).format("HH.mm")}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Profile;
