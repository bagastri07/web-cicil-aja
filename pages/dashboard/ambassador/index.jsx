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
  Spinner,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import Link from "next/link";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { point } from "../../../regex/point";

function Ambassador() {
  const [user, setUser] = useState("");
  const [commission, setCommission] = useState("");
  const [loan, setLoan] = useState("");

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user.is_ambassador == false) {
      router.push("/dashboard");
    }

    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => {
      setTimeout(() => {
        setUser(resp);
        setLoading(false);
      }, 300);
    });
    API.getCommission(token).then((resp) => {
      setCommission(resp);
    });
    API.getAllLoan(token).then((resp) => {
      // console.log(resp);
      setLoan(resp);
    });
    API.getLoanById(1, token).then((resp) => console.log(resp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
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
                    <StatNumber>
                      Rp.
                      {point(parseInt(commission.balance, 10))}
                    </StatNumber>
                  </Stat>
                </div>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h3 className="text-xl mb-2">
                Daftar Permintaan Pinjaman Yang Masuk
              </h3>
              <div className="flex flex-col gap-5">
                {loan?.loan_tickets?.map((items) => (
                  <Stat key={items.id} bg="white" rounded="xl" padding="5">
                    <div className="flex justify-between items-center">
                      <div>
                        <StatLabel>{items.loanType}</StatLabel>
                        <StatNumber>
                          Rp.{point(parseInt(items.loan_amount))}
                        </StatNumber>
                        <StatHelpText>
                          Dengan total pinjaman Rp.
                          {point(parseInt(items.loan_total))}
                        </StatHelpText>
                        <StatHelpText>
                          Batas hingga {items.loan_tenure_in_months} bulan
                        </StatHelpText>
                        <StatHelpText>
                          <Tag
                            size="md"
                            colorScheme={
                              items.status === "pending" ? "yellow" : "green"
                            }
                          >
                            {items?.status}
                          </Tag>
                          {items.reviewed_by_ambassador_at ? (
                            <Tag colorScheme="purple">sudah di review</Tag>
                          ) : (
                            <Tag colorScheme="red">belum di review</Tag>
                          )}
                        </StatHelpText>
                      </div>
                      <Tooltip label="Lihat lebih detail pinjaman">
                        <Button
                          colorScheme="purple"
                          onClick={() =>
                            router.push(`/dashboard/ambassador/${items.id}`)
                          }
                        >
                          Detail
                        </Button>
                      </Tooltip>
                    </div>
                  </Stat>
                ))}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Ambassador;
