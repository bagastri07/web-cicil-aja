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
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import { useRouter } from "next/router";
import API from "../../../api";
import { useState, useEffect } from "react";
import { point } from "../../../regex/point";

function Cicilan() {
  const router = useRouter();
  const toast = useToast();
  const [item, setItem] = useState("");
  const [pending, setPending] = useState("");
  const [accepted, setAccepted] = useState("");
  const [rejected, setRejected] = useState("");

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("1");

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getTicket(token).then((resp) => {
      setTimeout(() => {
        setItem(resp);
        setLoading(false);
      }, 300);
    });
    API.getTicketPending(token).then((resp) => {
      setTimeout(() => {
        setPending(resp);
      }, 200);
    });
    API.getTicketAccepted(token).then((resp) => {
      setTimeout(() => {
        setAccepted(resp);
      }, 200);
    });
    API.getTicketRejected(token).then((resp) => {
      setTimeout(() => {
        setRejected(resp);
      }, 200);
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
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <h1 className="text-4xl">Cicilan</h1>
            <h2 className="text-xl mt-1">
              Berapa cicilan yang telah kamu ajukan
            </h2>
            <div className="py-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <div className="flex gap-5">
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Total Cicilan Diajukan</StatLabel>
                    <StatNumber>
                      {`Rp.${point(
                        parseInt(
                          item?.loan_tickets?.reduce((a, b) => {
                            return a + b.loan_amount;
                          }, 0),
                          10
                        )
                      )}`}
                    </StatNumber>
                    <StatHelpText></StatHelpText>
                  </Stat>
                  <div className="rounded-xl p-5 bg-white flex justify-center items-center max-w-xs">
                    <p>
                      Kamu akan diinfokan ketika pengajuan cicilanmu telah
                      diterima.
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
                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton
                      display="flex"
                      justifyContent="space-between"
                    >
                      <h3 className="text-lg">Filter</h3>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <RadioGroup value={filter} onChange={setFilter}>
                        <div className="flex flex-col gap-3">
                          <Radio value="1">Semua</Radio>
                          <Radio value="2">Pending</Radio>
                          <Radio value="3">Rejected</Radio>
                          <Radio value="4">Accepted</Radio>
                        </div>
                      </RadioGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
                <h3 className="text-xl mb-2">Permintaan Cicilan Pending</h3>
                <div className="flex flex-col gap-5">
                  {filter == "1" ? (
                    <>
                      {item?.loan_tickets?.length != 0 ? (
                        <>
                          {item?.loan_tickets?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel>{items.loanType}</StatLabel>
                                  <StatNumber>{`Rp.${point(
                                    parseInt(items.loan_amount, 10)
                                  )}`}</StatNumber>
                                  <StatHelpText>{`Batas hingga ${items.loan_tenure_in_months} bulan.`}</StatHelpText>
                                  <StatHelpText>
                                    <Tag
                                      size="md"
                                      colorScheme={
                                        items?.status == "accepted"
                                          ? "green"
                                          : items?.status == "rejected"
                                          ? "red"
                                          : "yellow"
                                      }
                                    >
                                      {items?.status}
                                    </Tag>
                                    {items?.reviewed_by_ambassador_at ? (
                                      <Tag colorScheme="purple">
                                        sudah di review
                                      </Tag>
                                    ) : (
                                      <Tag colorScheme="red">
                                        belum di review
                                      </Tag>
                                    )}
                                  </StatHelpText>
                                </div>
                                <div className="flex justify-end items-center gap-5">
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
                                          <PopoverHeader>
                                            Konfirmasi!
                                          </PopoverHeader>
                                          <PopoverBody>
                                            Apakah kamu yakin untuk menghapus
                                            permintaan ini?
                                          </PopoverBody>
                                          <PopoverFooter>
                                            <Button
                                              colorScheme="red"
                                              onClick={() => {
                                                const token =
                                                  localStorage.getItem("token");
                                                API.delTicket(
                                                  items.id,
                                                  token
                                                ).then((resp) => {
                                                  toast({
                                                    title:
                                                      "Permintaan telah dihapus!",
                                                    description: `Kami berhasil menghapus permintaanmu.`,
                                                    status: "warning",
                                                    isCloseable: true,
                                                  });
                                                  router.reload();
                                                });
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
                                  <Button
                                    colorScheme="purple"
                                    onClick={() =>
                                      router.push(
                                        `/dashboard/cicilan/${items.id}`
                                      )
                                    }
                                  >
                                    Detail
                                  </Button>
                                </div>
                              </div>
                            </Stat>
                          ))}
                        </>
                      ) : (
                        <div className="w-full h-40 flex justify-center items-center">
                          <p>Belum ada item disini</p>
                        </div>
                      )}
                    </>
                  ) : filter == "2" ? (
                    <>
                      {item?.loan_tickets?.length != 0 ? (
                        <>
                          {pending?.loan_tickets?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel>{items.loanType}</StatLabel>
                                  <StatNumber>{`Rp.${point(
                                    parseInt(items.loan_amount, 10)
                                  )}`}</StatNumber>
                                  <StatHelpText>{`Batas hingga ${items.loan_tenure_in_months} bulan.`}</StatHelpText>
                                  <StatHelpText>
                                    <Tag size="md" colorScheme="yellow">
                                      pending
                                    </Tag>
                                    {items?.reviewed_by_ambassador_at ? (
                                      <Tag colorScheme="purple">
                                        sudah di review
                                      </Tag>
                                    ) : (
                                      <Tag colorScheme="red">
                                        belum di review
                                      </Tag>
                                    )}
                                  </StatHelpText>
                                </div>
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
                                        Apakah kamu yakin untuk menghapus
                                        permintaan ini?
                                      </PopoverBody>
                                      <PopoverFooter>
                                        <Button
                                          colorScheme="red"
                                          onClick={() => {
                                            const token =
                                              localStorage.getItem("token");
                                            API.delTicket(items.id, token).then(
                                              (resp) => {
                                                toast({
                                                  title:
                                                    "Permintaan telah dihapus!",
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
                              </div>
                            </Stat>
                          ))}
                        </>
                      ) : (
                        <div className="w-full h-40 flex justify-center items-center">
                          <p>Belum ada item disini</p>
                        </div>
                      )}
                    </>
                  ) : filter == "3" ? (
                    <>
                      {item?.loan_tickets?.length != 0 ? (
                        <>
                          {rejected?.loan_tickets?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel>{items.loanType}</StatLabel>
                                  <StatNumber>{`Rp.${point(
                                    parseInt(items.loan_amount, 10)
                                  )}`}</StatNumber>
                                  <StatHelpText>{`Batas hingga ${items.loan_tenure_in_months} bulan.`}</StatHelpText>
                                  <StatHelpText>
                                    <Tag size="md" colorScheme="red">
                                      rejected
                                    </Tag>
                                    {items?.reviewed_by_ambassador_at ? (
                                      <Tag colorScheme="purple">
                                        sudah di review
                                      </Tag>
                                    ) : (
                                      <Tag colorScheme="red">
                                        belum di review
                                      </Tag>
                                    )}
                                  </StatHelpText>
                                </div>
                              </div>
                            </Stat>
                          ))}
                        </>
                      ) : (
                        <div className="w-full h-40 flex justify-center items-center">
                          <p>Belum ada item disini</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.loan_tickets?.length != 0 ? (
                        <>
                          {accepted?.loan_tickets?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel>{items.loanType}</StatLabel>
                                  <StatNumber>{`Rp.${point(
                                    parseInt(items.loan_amount, 10)
                                  )}`}</StatNumber>
                                  <StatHelpText>{`Batas hingga ${items.loan_tenure_in_months} bulan.`}</StatHelpText>
                                  <StatHelpText>
                                    <Tag size="md" colorScheme="green">
                                      accepted
                                    </Tag>
                                    {items?.reviewed_by_ambassador_at ? (
                                      <Tag colorScheme="purple">
                                        sudah di review
                                      </Tag>
                                    ) : (
                                      <Tag colorScheme="red">
                                        belum di review
                                      </Tag>
                                    )}
                                  </StatHelpText>
                                </div>
                              </div>
                            </Stat>
                          ))}
                        </>
                      ) : (
                        <div className="w-full h-40 flex justify-center items-center">
                          <p>Belum ada item disini</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Cicilan;
