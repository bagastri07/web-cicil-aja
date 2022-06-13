import AdminRedirect from "../../../auth/admin/adminRedirect";
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
  Tag,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import Link from "next/link";
import { phoneNum, bankNum } from "../../../regex/point";
import { ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";

function BorrowersId() {
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    id &&
      API.getAdminBorrowerId(id, token).then((resp) => {
        setData(resp.data);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="peminjam">
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
              <BreadcrumbLink as={Link} href="/admin/borrowers">
                <a>Peminjam</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/admin/borrowers/${data.id}`}>
                <a>Peminjam {data.id}</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Peminjam</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="py-5">
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h2 className="text-xl mb-2">{data.name}</h2>
              <div>
                <h2 className="text-xl mb-2">Data Pribadi</h2>
                <ul>
                  <li>Nama: {data?.name}</li>
                  <li>
                    Ulang Tahun:{" "}
                    {dayjs(data?.birthday).locale("id").format("DD MMMM YYYY")}
                  </li>
                  <li>
                    Nomor Telfon:{" "}
                    {showPhone ? (
                      <>{data?.phone_number}</>
                    ) : (
                      <>{phoneNum(data?.phone_number)} </>
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
                  <li>Universitas: {data?.university}</li>
                  <li>Jurusan: {data?.study_program}</li>
                  <li>Nomer Induk Mahasiswa: {data?.student_number}</li>
                </ul>
              </div>
              <div className="mt-5">
                <h2 className="text-xl mb-2">Data Bank</h2>
                {data?.bank_information ? (
                  <ul>
                    <li>Nama Bank: {data?.bank_information?.bank_name}</li>
                    <li>
                      Nomor Rekening:{" "}
                      {showBank
                        ? data?.bank_information?.account_number
                        : bankNum(data?.bank_information?.account_number)}
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
                      Atas Nama: {data?.bank_information?.account_recipient}
                    </li>
                  </ul>
                ) : (
                  <div>
                    <p>Pengguna belum melengkapi informasi bank</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default BorrowersId;
