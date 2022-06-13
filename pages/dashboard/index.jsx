import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Redirect from "../../auth/redirect";
import DashboardLayout from "../../components/dashboardLayout";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { point } from "../../regex/point";

function Dashboard() {
  const [user, setUser] = useState("");
  const [borrower, setBorrower] = useState(false);
  const [bank, setBank] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState("");

  const [bill, setBill] = useState("");
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setUser(resp));
    API.getTicket(token).then((resp) => {
      setTimeout(() => {
        setTicket(resp);
        setLoading(false);
      }, 300);
    });

    API.getBill(token).then((resp) => {
      setTimeout(() => {
        setBill(resp);
      }, 200);
    });
    API.getPaidBill(token).then((resp) => {
      setTimeout(() => {
        setPaid(resp);
      }, 200);
    });
    API.getUnpaidBill(token).then((resp) => {
      setTimeout(() => {
        setUnpaid(resp);
      }, 200);
    });
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
            <div>
              <h1 className="text-4xl">
                Hi, {user?.name?.split(" ").slice(0, 1)}!
              </h1>
              <h2 className="text-xl mt-1">Selamat datang di CicilAja</h2>
              {user?.is_ambassador ? (
                <div className="py-5">
                  <div className="w-full bg-purple-100 rounded-xl p-5">
                    <h3 className="text-xl mb-2">
                      Kamu adalah Student Ambassador
                    </h3>
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
                      Cicil Aja. Menjadi ambassador memungkinkanmu untuk
                      mendapatkan penghasilan sendiri hanya dengan me-review
                      pinjaman yang ada. Daftar, tunggu hingga pendaftaran
                      selesai, dan mulai dapatkan uangmu dengan me-review dari
                      gadgetmu.{" "}
                      <Button variant="link" colorScheme="purple">
                        Daftar disini
                      </Button>
                    </p>
                  </div>
                </div>
              )}
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <h3 className="text-xl mb-2">Total Cicilan</h3>
                <div className="flex gap-5">
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Total Cicilan Diajukan</StatLabel>
                    <StatNumber>
                      {`Rp.${point(
                        parseInt(
                          ticket?.loan_tickets?.reduce((a, b) => {
                            return a + b.loan_amount;
                          }, 0)
                        ),
                        10
                      )}`}
                    </StatNumber>
                  </Stat>
                  <div className="rounded-xl p-5 bg-white flex justify-center items-center max-w-xs">
                    <p>Jumlah total cicilanmu</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  colorScheme="purple"
                  mt="3"
                  onClick={() => router.push("/dashboard/cicilan")}
                >
                  Lihat disini
                </Button>
              </div>
              <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
                <h3 className="text-xl mb-2">Total Tagihanmu</h3>
                <div className="flex gap-5">
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Total Tagihan</StatLabel>
                    <StatNumber>
                      {`Rp.${point(
                        parseInt(
                          bill?.loan_bills?.reduce((a, b) => {
                            return a + b.bill_amount;
                          }, 0),
                          10
                        )
                      )}`}
                    </StatNumber>
                  </Stat>
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Sudah Dilunasi</StatLabel>
                    <StatNumber>
                      {`Rp.${point(
                        parseInt(
                          paid?.loan_bills?.reduce((a, b) => {
                            return a + b.bill_amount;
                          }, 0),
                          10
                        )
                      )}`}
                    </StatNumber>
                  </Stat>
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Belum Lunas</StatLabel>
                    <StatNumber textColor="red">
                      {`Rp.${point(
                        parseInt(
                          unpaid?.loan_bills?.reduce((a, b) => {
                            return a + b.bill_amount;
                          }, 0),
                          10
                        )
                      )}`}
                    </StatNumber>
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
          </>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Dashboard;
