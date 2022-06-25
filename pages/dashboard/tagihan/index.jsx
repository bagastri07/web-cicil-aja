import { CheckIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
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
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  Spinner,
  toast,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";

import Link from "next/link";
import API from "../../../api";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { point } from "../../../regex/point";

function Tagihan() {
  const router = useRouter();
  const toast = useToast();

  const [item, setItem] = useState("");
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");
  const [filter, setFilter] = useState("1");

  const [loading, setLoading] = useState(true);

  dayjs.extend(relativeTime);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getBill(token).then((resp) => {
      setTimeout(() => {
        setItem(resp);
        setLoading(false);
      }, 300);
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
      <DashboardLayout page="tagihan">
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
              <BreadcrumbLink as={Link} href="/dashboard/tagihan">
                <a>Tagihan</a>
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
            <h1 className="text-4xl">Tagihan</h1>
            <h2 className="text-xl mt-1">
              Jumlah tagihan yang harus kamu lunasi
            </h2>
            <div className="py-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <div className="flex gap-5">
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Total Tagihan</StatLabel>
                    <StatNumber>
                      {`Rp.${point(
                        parseInt(
                          item?.loan_bills?.reduce((a, b) => {
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
                          <Radio value="2">Sudah Dilunasi</Radio>
                          <Radio value="3">Belum Dilunasi</Radio>
                        </div>
                      </RadioGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
                <h3 className="text-xl mb-2">Detail Tagihan</h3>
                <div className="flex flex-col gap-5">
                  {filter == 1 ? (
                    <>
                      {item?.loan_bills?.length != 0 ? (
                        <>
                          {item?.loan_bills?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel></StatLabel>
                                  <StatNumber>
                                    Rp.{point(parseInt(items.bill_amount, 10))}
                                  </StatNumber>
                                  <StatHelpText>
                                    {items.status == "paid" ? (
                                      <Tag size="md" colorScheme="green">
                                        Sudah dilunasi
                                      </Tag>
                                    ) : (
                                      <Tag size="md" colorScheme="red">
                                        Belum dilunasi
                                      </Tag>
                                    )}
                                  </StatHelpText>
                                  <StatHelpText>
                                    {items.status == "paid" ? (
                                      <>
                                        Telah dibayar{" "}
                                        {dayjs(items.paid_at)
                                          .locale("id")
                                          .fromNow()}{" "}
                                        (
                                        {dayjs(items.paid_at)
                                          .locale("id")
                                          .format("DD MMMM YYYY")}
                                        )
                                      </>
                                    ) : (
                                      <>
                                        Harus selesai dibayar sebelum{" "}
                                        {dayjs(items.PaymentDeadline)
                                          .locale("id")
                                          .format("DD MMMM YYYY")}
                                      </>
                                    )}
                                  </StatHelpText>
                                </div>
                                {items.status === "paid" ? (
                                  <></>
                                ) : (
                                  <Tooltip label="Bayar sekarang">
                                    <div>
                                      <Popover>
                                        <PopoverTrigger>
                                          <Button colorScheme={"purple"}>
                                            <CheckIcon />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          <PopoverArrow />
                                          <PopoverHeader>
                                            Bayar Tagihan
                                          </PopoverHeader>
                                          <PopoverBody>
                                            Bayar tagihan ini?
                                          </PopoverBody>
                                          <PopoverFooter>
                                            <Button
                                              colorScheme="purple"
                                              onClick={() => {
                                                const token =
                                                  localStorage.getItem("token");
                                                API.patchBill(
                                                  items.id,
                                                  token
                                                ).then((resp) => {
                                                  resp.message ==
                                                    toast({
                                                      title:
                                                        "Tagihan telah dibayar!",
                                                      description:
                                                        "Selamat! Kamu telah membayar tagihan",
                                                      status: "success",
                                                      isCloseable: true,
                                                    });
                                                  setTimeout(() => {
                                                    router.reload();
                                                  }, 100);
                                                });
                                              }}
                                            >
                                              Bayar Sekarang
                                            </Button>
                                          </PopoverFooter>
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </Tooltip>
                                )}
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
                  ) : filter == 2 ? (
                    <>
                      {paid?.loan_bills?.length != 0 ? (
                        <>
                          {paid?.loan_bills?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel></StatLabel>
                                  <StatNumber>
                                    Rp.{point(parseInt(items.bill_amount, 10))}
                                  </StatNumber>
                                  <StatHelpText>
                                    <Tag size="md" colorScheme="green">
                                      Sudah dilunasi
                                    </Tag>
                                  </StatHelpText>
                                  <StatHelpText>
                                    Telah dibayar{" "}
                                    {dayjs(items.paid_at)
                                      .locale("id")
                                      .fromNow()}{" "}
                                    (
                                    {dayjs(items.paid_at)
                                      .locale("id")
                                      .format("DD MMMM YYYY")}
                                    )
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
                      {unpaid?.loan_bills?.length != 0 ? (
                        <>
                          {unpaid?.loan_bills?.map((items) => (
                            <Stat
                              key={items.id}
                              bg="white"
                              rounded="xl"
                              padding="5"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <StatLabel></StatLabel>
                                  <StatNumber>
                                    Rp.{point(parseInt(items.bill_amount, 10))}
                                  </StatNumber>
                                  <StatHelpText>
                                    <Tag size="md" colorScheme="red">
                                      Belum dilunasi
                                    </Tag>
                                  </StatHelpText>
                                  <StatHelpText>
                                    Harus selesai dibayar sebelum{" "}
                                    {dayjs(items.PaymentDeadline)
                                      .locale("id")
                                      .format("DD MMMM YYYY")}
                                  </StatHelpText>
                                </div>
                                <Tooltip label="Bayar sekarang">
                                  <div>
                                    <Button
                                      colorScheme="purple"
                                      onClick={() => {
                                        const token =
                                          localStorage.getItem("token");
                                        API.patchBill(items.id, token).then(
                                          (resp) => {
                                            resp.message ==
                                              toast({
                                                title: "Tagihan telah dibayar!",
                                                description:
                                                  "Selamat! Kamu telah membayar tagihan",
                                                status: "success",
                                                isCloseable: true,
                                              });
                                            setTimeout(() => {
                                              router.reload();
                                            }, 100);
                                          }
                                        );
                                      }}
                                    >
                                      <CheckIcon />
                                    </Button>
                                  </div>
                                </Tooltip>
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

export default Tagihan;
