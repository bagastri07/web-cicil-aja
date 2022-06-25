import { useRouter } from "next/router";
import { Image } from "next/image";
import Link from "next/link";
import Head from "next/head";
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
  Popover,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminRedirect from "../../../auth/admin/adminRedirect";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import { phoneNum, point } from "../../../regex/point";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

function BorrowersId() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = router.query;
  dayjs.extend(relativeTime);

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    id &&
      API.getAdminLoanId(id, token).then((resp) => {
        setData(resp);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="cicilan">
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
              <BreadcrumbLink as={Link} href="/admin/loan">
                <a>Cicilan</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/admin/loan/${data.id}`}>
                <a>Detail Cicilan {data.id}</a>
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
            <h1 className="text-4xl">Informasi Detail Cicilan</h1>
            <h2 className="text-xl mt-1">Detail cicilan yang dapat kamu acc</h2>
            <div className="w-full bg-purple-100 rounded-xl p-5 my-5">
              <h3 className="text-xl mb-2">Informasi Cicilan</h3>
              <div className="flex gap-5 mb-10">
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Pinjaman</StatLabel>
                  <StatNumber>{point(parseInt(data?.loan_amount))}</StatNumber>
                </Stat>
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Total Pinjaman</StatLabel>
                  <StatNumber>{point(parseInt(data?.loan_total))}</StatNumber>
                </Stat>
              </div>
              <div>
                <h3 className="text-lg mb-5">Informasi selengkapnya</h3>
                <ul className="flex flex-col gap-1">
                  <li>Peruntukan: {data?.loanType}</li>
                  <li>
                    Link Barang:{" "}
                    <a
                      className="underline"
                      href={data?.item_url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {data?.item_url}
                    </a>
                  </li>
                  <li>Bunga: {data?.interest_rate * 100}%</li>
                  <li>
                    Maksimal Pembayaran: Sebelum {data?.loan_tenure_in_months}{" "}
                    bulan
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                Status:{" "}
                <Tag
                  colorScheme={
                    data?.status == "accepted"
                      ? "green"
                      : data?.status == "rejected"
                      ? "red"
                      : "yellow"
                  }
                >
                  {data?.status}
                </Tag>
                {data?.reviewed_by_ambassador_at ? (
                  <Tag colorScheme="purple">sudah di review</Tag>
                ) : (
                  <Tag colorScheme="red">belum di review</Tag>
                )}
                <br />
                {data?.reviewed_by_ambassador_at ? (
                  <>
                    Di review{" "}
                    {dayjs(data?.reviewed_by_ambassador_at)
                      .locale("id")
                      .fromNow()}{" "}
                    (
                    {dayjs(data?.reviewed_by_ambassador_at)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                    )
                  </>
                ) : (
                  ""
                )}
                <br />
                {data?.accepted_at ? (
                  <>
                    Dan permintaan telah di acc{" "}
                    {dayjs(data?.accepted_at).locale("id").fromNow()} (
                    {dayjs(data?.accepted_at)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                    )
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex gap-5">
              {data?.status == "accepted" || data?.status == "rejected" ? (
                <Button colorScheme="purple" disabled>
                  Accept Permintaan
                </Button>
              ) : (
                <Popover>
                  <div>
                    <PopoverTrigger>
                      <Button colorScheme="purple">Accept Permintaan</Button>
                    </PopoverTrigger>
                  </div>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Konfirmasi!</PopoverHeader>
                      <PopoverBody>
                        Apakah kamu yakin untuk meng-acc permintaan ini?
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          colorScheme="purple"
                          onClick={() => {
                            const token = localStorage.getItem("token");
                            API.patchAdminLoan(id, token).then((resp) => {
                              console.log(resp);
                              if (data?.accepted_at) {
                                toast({
                                  title: "Permintaan telah di-accept!",
                                  description: `Permintaan telah di accept.`,
                                  status: "success",
                                  isCloseable: true,
                                });
                                router.reload();
                              } else {
                                toast({
                                  title: "Gagal",
                                  description: `Ambassador perlu me-review permintaan`,
                                  status: "error",
                                  isCloseable: true,
                                });
                              }
                            });
                          }}
                        >
                          Review
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </Popover>
              )}
              {data?.status == "accepted" || data?.status == "rejected" ? (
                <Button colorScheme="red" disabled>
                  Reject Permintaan
                </Button>
              ) : (
                <Popover>
                  <div>
                    <PopoverTrigger>
                      <Button colorScheme="red">Reject Permintaan</Button>
                    </PopoverTrigger>
                  </div>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Konfirmasi!</PopoverHeader>
                      <PopoverBody>
                        Apakah kamu yakin untuk meng-reject permintaan ini?
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            const token = localStorage.getItem("token");
                            API.patchAdminLoanReject(id, token).then((resp) => {
                              toast({
                                title: "Permintaan telah di-reject!",
                                description: `Permintaan telah di reject.`,
                                status: "warning",
                                isCloseable: true,
                              });
                              router.reload();
                            });
                          }}
                        >
                          Reject
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </Popover>
              )}
              <Button onClick={() => router.push(`/admin/borrowers/${id}`)}>
                Lihat Detail
              </Button>
            </div>
          </div>
        )}
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default BorrowersId;
