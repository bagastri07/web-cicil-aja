import { ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  CloseButton,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../../api";
import Redirect from "../../../../auth/redirect";
import DashboardLayout from "../../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import Image from "next/image";

function Document() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [ktp, setKtp] = useState(false);
  const [ktm, setKtm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => {
      setUser(resp);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="profile">
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
              <BreadcrumbLink as={Link} href="/dashboard/profile">
                <a>Profile</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard/profile/document">
                <a>Document</a>
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
                  src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktp_url}`}
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
                  src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktm_url}`}
                  alt="Foto KTM"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        <div className="">
          <h1 className="text-4xl">Edit Dokumen</h1>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Foto KTP</h3>
            <Skeleton isLoaded={!loading}>
              <div className="w-60 h-40 relative">
                {user?.borrower_document?.ktm_url ? (
                  <>
                    <button
                      onClick={() => setKtp(true)}
                      className="opacity-0 hover:opacity-100 transition absolute z-10 w-full h-full bg-black/40 flex justify-center items-center text-white font-bold"
                    >
                      Show Fullsize
                    </button>
                    <Image
                      src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktp_url}`}
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
            </Skeleton>
            <Button
              colorScheme="purple"
              onClick={() =>
                router.push("/dashboard/profile/document/edit_ktp")
              }
              variant={"link"}
            >
              Edit KTP
            </Button>
          </div>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Foto KTM</h3>
            <Skeleton isLoaded={!loading}>
              <div className="w-60 h-40 relative">
                {user?.borrower_document?.ktp_url ? (
                  <>
                    <button
                      onClick={() => setKtm(true)}
                      className="opacity-0 hover:opacity-100 transition absolute z-10 w-full h-full bg-black/40 flex justify-center items-center text-white font-bold"
                    >
                      Show Fullsize
                    </button>
                    <Image
                      src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktm_url}`}
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
            </Skeleton>
            <Button
              onClick={() =>
                router.push("/dashboard/profile/document/edit_ktm")
              }
              colorScheme="purple"
              variant={"link"}
            >
              Edit KTM
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default Document;
