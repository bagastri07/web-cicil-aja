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
  StatArrow,
  useToken,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../../api";
import Redirect from "../../../../auth/redirect";
import DashboardLayout from "../../../../components/dashboardLayout";
import Link from "next/link";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { point } from "../../../../regex/point";
import dayjs from "dayjs";
import id from "dayjs/locale/id";

function Commission() {
  const [user, setUser] = useState("");
  const [commission, setCommission] = useState("");
  const [commissionDetail, setCommissionDetail] = useState("");

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
    API.getCommissionHistory(token).then((resp) => {
      console.log(resp);
      setCommissionDetail(resp);
    });
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
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/ambassador/comission">
                <a>Ambassador Commission</a>
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
            <h1 className="text-4xl">Ambassador Commission</h1>
            <h2 className="text-xl mt-1"></h2>
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
              <h3 className="text-xl mb-2">Daftar Comission</h3>
              <div className="flex flex-col gap-5">
                {commissionDetail?.data?.reverse().map((items) => (
                  <Stat key={items.id} bg="white" rounded="xl" padding="5">
                    <StatLabel>
                      {items.type === "in" ? (
                        <>
                          Review id pinjaman {items.ambassador_id}
                          {items.id}
                        </>
                      ) : (
                        "Penarikan"
                      )}
                    </StatLabel>
                    <StatNumber>
                      Rp.{point(parseInt(items.amount, 10))}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow
                        type={items.type === "in" ? "increase" : "decrease"}
                      />
                      {items.type}, pada tanggal{" "}
                      {dayjs(items?.created_at)
                        .locale("id")
                        .format("DD MMMM YYYY")}
                    </StatHelpText>
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

export default Commission;
