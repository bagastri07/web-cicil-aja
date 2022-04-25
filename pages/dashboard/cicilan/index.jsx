import { AddIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import { useRouter } from "next/router";
import API from "../../../api";
import { useState, useEffect } from "react";

function Cicilan() {
  const router = useRouter();
  const toast = useToast();
  const [item, setItem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getTicket(token).then((resp) => {
      console.log(resp.loan_tickets);
      setItem(resp);
    });
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="cicilan">
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
              <BreadcrumbLink as={Link} href="/dashboard/cicilan">
                <a>Cicilan</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Cicilan</h1>
        <h2 className="text-xl mt-1">Berapa cicilan yang telah kamu ajukan</h2>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5">
            <div className="flex gap-5">
              <Stat bg="white" rounded="xl" padding="5">
                <StatLabel>Total Cicilan Diajukan</StatLabel>
                <StatNumber>
                  {`Rp.${item?.loan_tickets?.reduce((a, b) => {
                    return a + b.loan_amount;
                  }, 0)}`}
                </StatNumber>
                <StatHelpText></StatHelpText>
              </Stat>
              <div className="rounded-xl p-5 bg-white flex justify-center items-center max-w-xs">
                <p>
                  Kamu akan diinfokan ketika pengajuan cicilanmu telah diterima.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Button
                colorScheme="purple"
                leftIcon={<AddIcon />}
                onClick={() => router.push("/dashboard/cicilan/ticketing")}
              >
                Buat Permintaan Baru
              </Button>
            </div>
          </div>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Permintaan Cicilan Pending</h3>
            <div className="flex flex-col gap-5">
              {item?.loan_tickets?.map((items) => (
                <Stat key={items.id} bg="white" rounded="xl" padding="5">
                  <div className="flex justify-between items-center">
                    <div>
                      <StatLabel>{items.loanType}</StatLabel>
                      <StatNumber>{`Rp.${items.loan_amount}`}</StatNumber>
                      <StatHelpText>{`Batas hingga ${items.loan_tenure_in_months} bulan.`}</StatHelpText>
                      <StatHelpText>
                        <Tag
                          size="md"
                          colorScheme={
                            items.status === "pending" ? "yellow" : "green"
                          }
                        >
                          {items?.status}
                        </Tag>
                      </StatHelpText>
                    </div>
                    {items.status === "pending" ? (
                      <Popover>
                        <Tooltip label="Batalkan Permintaan">
                          <div>
                            <PopoverTrigger>
                              <Button colorScheme="red">
                                <DeleteIcon />
                              </Button>
                            </PopoverTrigger>
                          </div>
                        </Tooltip>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Konfirmasi!</PopoverHeader>
                            <PopoverBody>
                              Apakah kamu yakin untuk menghapus permintaan ini?
                            </PopoverBody>
                            <PopoverFooter>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  const token = localStorage.getItem("token");
                                  API.delTicket(items.id, token).then(
                                    (resp) => {
                                      toast({
                                        title: "Permintaan telah dihapus!",
                                        description: `Kami berhasil menghapus permintaanmu.`,
                                        status: "warning",
                                        isCloseable: true,
                                      });
                                      router.reload();
                                    }
                                  );
                                }}
                              >
                                Hapus
                              </Button>
                            </PopoverFooter>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    ) : (
                      ""
                    )}
                  </div>
                </Stat>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Cicilan;
