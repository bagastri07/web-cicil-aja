import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import { point } from "../../../regex/point";
import relativeTime from "dayjs/plugin/relativeTime";

function Cicilan() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  dayjs.extend(relativeTime);

  useEffect(() => {
    const token = localStorage.getItem("token");
    id &&
      API.getDetailTicket(id, token).then((resp) => {
        setData(resp.data);
        setTimeout(() => {
          setLoading(false);
        }, 300);
        console.log(resp.data);
      });
  }, [id]);

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
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/dashboard/cicilan/${data.id}`}>
                <a>Cicilan {data.id}</a>
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
            <h2 className="text-xl mt-1">Detail pinjamanmu</h2>
            <div className="w-full bg-purple-100 rounded-xl p-5 my-5">
              <h3 className="text-xl mb-2">Informasi Pinjaman</h3>
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
                  <li>Bunga: {data?.interest_rate}%</li>
                  <li>
                    Maksimal Pembayaran: Sebelum {data?.loan_tenure_in_months}{" "}
                    bulan
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                Status:{" "}
                <Tag
                  colorScheme={data?.status == "accepted" ? "green" : "yellow"}
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
            {data?.status != "accepted" ? (
              <Popover>
                <div>
                  <PopoverTrigger>
                    <Button
                      colorScheme="red"
                      display="flex"
                      alignItems="center"
                      gap={3}
                    >
                      <DeleteIcon />
                      Batalkan pinjaman
                    </Button>
                  </PopoverTrigger>
                </div>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Konfirmasi!</PopoverHeader>
                    <PopoverBody>
                      Apakah kamu yakin untuk menghapus dan membatalkan
                      permintaan ini?
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          API.delTicket(data?.id, token).then((resp) => {
                            toast({
                              title: "Permintaan telah dihapus!",
                              description: `Kami berhasil menghapus permintaanmu.`,
                              status: "warning",
                              isCloseable: true,
                            });
                            router.push("/dashboard/cicilan");
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
          </div>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Cicilan;
