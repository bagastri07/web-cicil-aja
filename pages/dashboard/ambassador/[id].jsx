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
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import { phoneNum, point } from "../../../regex/point";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

function Pinjaman() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;
  const toast = useToast();
  dayjs.extend(relativeTime);

  useEffect(() => {
    const token = localStorage.getItem("token");
    id &&
      API.getLoanById(id, token).then((resp) => {
        setData(resp);
        setLoading(false);
      });
  }, [id]);

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
              <BreadcrumbLink
                as={Link}
                href={`/dashboard/ambassador/${data?.loan_ticket?.id}`}
              >
                <a>Pinjaman {data?.loan_ticket?.id}</a>
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
            <h1 className="text-4xl">Informasi Detail Pinjaman</h1>
            <h2 className="text-xl mt-1">
              Detail pinjaman yang dapat kamu acc
            </h2>
            <div className="w-full bg-purple-100 rounded-xl p-5 my-5">
              <h3 className="text-xl mb-2">Informasi Pinjaman</h3>
              <div className="flex gap-5 mb-10">
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Pinjaman</StatLabel>
                  <StatNumber>
                    {point(parseInt(data?.loan_ticket?.loan_amount))}
                  </StatNumber>
                </Stat>
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Total Pinjaman</StatLabel>
                  <StatNumber>
                    {point(parseInt(data?.loan_ticket?.loan_total))}
                  </StatNumber>
                </Stat>
              </div>
              <div>
                <h3 className="text-lg mb-5">Informasi selengkapnya</h3>
                <ul className="flex flex-col gap-1">
                  <li>Peruntukan: {data?.loan_ticket?.loanType}</li>
                  <li>
                    Link Barang:{" "}
                    <a
                      className="underline"
                      href={data?.loan_ticket?.item_url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {data?.loan_ticket?.item_url}
                    </a>
                  </li>
                  <li>Bunga: {data?.loan_ticket?.interest_rate}%</li>
                  <li>
                    Maksimal Pembayaran: Sebelum{" "}
                    {data?.loan_ticket?.loan_tenure_in_months} bulan
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                Status:{" "}
                <Tag
                  colorScheme={
                    data?.loan_ticket?.status == "accepted" ? "green" : "yellow"
                  }
                >
                  {data?.loan_ticket?.status}
                </Tag>
                {data?.loan_ticket?.reviewed_by_ambassador_at ? (
                  <Tag colorScheme="purple">sudah di review</Tag>
                ) : (
                  <Tag colorScheme="red">belum di review</Tag>
                )}
                <br />
                {data?.loan_ticket?.reviewed_by_ambassador_at ? (
                  <>
                    Di review{" "}
                    {dayjs(data?.loan_ticket?.reviewed_by_ambassador_at)
                      .locale("id")
                      .fromNow()}{" "}
                    (
                    {dayjs(data?.loan_ticket?.reviewed_by_ambassador_at)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                    )
                  </>
                ) : (
                  ""
                )}
                <br />
                {data?.loan_ticket?.accepted_at ? (
                  <>
                    Dan permintaan telah di acc{" "}
                    {dayjs(data?.loan_ticket?.accepted_at)
                      .locale("id")
                      .fromNow()}{" "}
                    (
                    {dayjs(data?.loan_ticket?.accepted_at)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                    )
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 my-5">
              <h3 className="text-xl mb-2">Informasi Peminjam</h3>
              <div>
                <h2 className="text-xl mb-2">Data Pribadi</h2>
                <ul>
                  <li>Nama: {data?.borrower?.name}</li>
                  <li>
                    Ulang Tahun:{" "}
                    {dayjs(data?.borrower?.birthday)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                  </li>
                  <li>
                    Nomor Telfon:{" "}
                    {showPhone ? (
                      <>{data?.borrower?.phone_number}</>
                    ) : (
                      <>{phoneNum(data?.borrower?.phone_number)} </>
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
                  <li>Universitas: {data?.borrower?.university}</li>
                  <li>Jurusan: {data?.borrower?.study_program}</li>
                  <li>
                    Nomer Induk Mahasiswa: {data?.borrower?.student_number}
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <h2 className="text-xl mb-2">Data Bank</h2>
                {data?.borrower?.bank_information ? (
                  <ul>
                    <li>
                      Nama Bank: {data?.borrower?.bank_information?.bank_name}
                    </li>
                    <li>
                      Nomor Rekening:{" "}
                      {showBank
                        ? data?.borrower?.bank_information?.account_number
                        : bankNum(
                            data?.borrower?.bank_information?.account_number
                          )}
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
                      Atas Nama:{" "}
                      {data?.borrower?.bank_information?.account_recipient}
                    </li>
                  </ul>
                ) : (
                  <div>
                    <p>Pengguna belum melengkapi informasi bank</p>
                  </div>
                )}
              </div>
            </div>
            {data?.loan_ticket?.reviewed_by_ambassador_at ? (
              <Button colorScheme="purple" disabled>
                Review Permintaan
              </Button>
            ) : (
              <Popover>
                <div>
                  <PopoverTrigger>
                    <Button colorScheme="purple">Review Permintaan</Button>
                  </PopoverTrigger>
                </div>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Konfirmasi!</PopoverHeader>
                    <PopoverBody>
                      Apakah kamu yakin untuk meng-review permintaan ini?
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        colorScheme="purple"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          API.patchLoan(id, token).then((resp) => {
                            // console.log(resp);
                            toast({
                              title: "Permintaan telah di-accept!",
                              description: `Permintaan telah di accept olehmu.`,
                              status: "success",
                              isCloseable: true,
                            });
                            router.push("/dashboard/ambassador");
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
          </div>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Pinjaman;
