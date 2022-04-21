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
import Redirect from "../../auth/redirect";
import DashboardLayout from "../../components/dashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Dashboard() {
  const [user, setUser] = useState("");
  const [borrower, setBorrower] = useState(false);
  const [bank, setBank] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setUser(resp));
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="menu">
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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
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
        <div>
          <h1 className="text-4xl">
            Hi, {user?.name?.split(" ").slice(0, 1)}!
          </h1>
          <h2 className="text-xl mt-1">Selamat datang di CicilAja</h2>
          {user?.is_ambassador ? (
            <div className="py-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <h3 className="text-xl mb-2">Kamu adalah Student Ambassador</h3>
                <p>
                  <Button
                    variant="link"
                    colorScheme="purple"
                    onClick={() => router.push("/dashboard/ambassador")}
                  >
                    Masuk Ke Laman Ambassador
                  </Button>
                </p>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <h3 className="text-xl mb-2">
                  Daftarkan dirimu menjadi ambassador
                </h3>
                <p>
                  Dapatkan berbagai benefit menarik menjadi ambassador dari
                  Cicil Aja. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Perspiciatis similique eum perferendis! Itaque labore
                  laborum nihil facilis, ex eos aliquam autem adipisci ad
                  debitis molestiae? Earum fugit veritatis explicabo corrupti.{" "}
                  <Button variant="link" colorScheme="purple">
                    Daftar disini
                  </Button>
                </p>
              </div>
            </div>
          )}
          <div className="w-full bg-purple-100 rounded-xl p-5">
            <h3 className="text-xl mb-2">Total Tagihan</h3>
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
            <Button
              variant="link"
              colorScheme="purple"
              mt="3"
              onClick={() => router.push("/dashboard/tagihan")}
            >
              Lihat disini
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Dashboard;
