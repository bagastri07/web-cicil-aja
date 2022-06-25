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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import Link from "next/link";
import { phoneNum, bankNum } from "../../../regex/point";
import { ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";

function BorrowersId() {
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [ktp, setKtp] = useState(false);
  const [ktm, setKtm] = useState(false);

  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    id &&
      API.getAdminBorrowerId(id, token).then((resp) => {
        console.log(resp);
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

        {/* show ktp modal */}
        <Modal isOpen={ktp} onClose={() => setKtp(false)} size={"full"}>
          <ModalOverlay />
          <ModalContent bg={"rgb(0 0 0 / 0.6)"} rounded={"unset"}>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="w-full h-[85vh] relative">
                <Image
                  src={`https://cicilaja.bagas3.my.id/${data?.borrower_document?.ktp_url}`}
                  alt="Foto KTP"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* show ktm modal */}
        <Modal isOpen={ktm} onClose={() => setKtm(false)} size={"full"}>
          <ModalOverlay />
          <ModalContent bg={"rgb(0 0 0 / 0.6)"} rounded={"unset"}>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="w-full h-[85vh] relative">
                <Image
                  src={`https://cicilaja.bagas3.my.id/${data?.borrower_document?.ktm_url}`}
                  alt="Foto KTM"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

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
              <div className="mt-5">
                <h2 className="text-xl mb-2">Data Dokumen</h2>
                <ul>
                  <li>KTP</li>
                  <li>
                    <div className="w-60 h-40 relative">
                      {data?.borrower_document?.ktp_url ? (
                        <>
                          <button
                            onClick={() => setKtp(true)}
                            className="opacity-0 hover:opacity-100 transition absolute z-10 w-full h-full bg-black/40 flex justify-center items-center text-white font-bold"
                          >
                            Show Fullsize
                          </button>
                          <Image
                            src={`https://cicilaja.bagas3.my.id/${data?.borrower_document?.ktp_url}`}
                            alt="Foto KTP"
                            layout="fill"
                            objectFit="contain"
                          />
                        </>
                      ) : (
                        <p className="w-full h-full flex justify-center items-center">
                          <span className="text-center text-2xl">
                            Belum ada foto KTP
                          </span>
                        </p>
                      )}
                    </div>
                  </li>
                  <li>KTM</li>
                  <li>
                    <div className="w-60 h-40 relative">
                      {data?.borrower_document?.ktm_url ? (
                        <>
                          <button
                            onClick={() => setKtm(true)}
                            className="opacity-0 hover:opacity-100 transition absolute z-10 w-full h-full bg-black/40 flex justify-center items-center text-white font-bold"
                          >
                            Show Fullsize
                          </button>
                          <Image
                            src={`https://cicilaja.bagas3.my.id/${data?.borrower_document?.ktm_url}`}
                            alt="Foto KTM"
                            layout="fill"
                            objectFit="contain"
                          />
                        </>
                      ) : (
                        <p className="w-full h-full flex justify-center items-center">
                          <span className="text-center text-2xl">
                            Belum ada foto KTM
                          </span>
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default BorrowersId;
