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
  Checkbox,
  CloseButton,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Redirect from "../../auth/redirect";
import DashboardLayout from "../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import Image from "next/image";

function DaftarAmbassador() {
  const [policy, setPolicy] = useState(false);
  const [popOver, setPopOver] = useState(false);

  const toast = useToast();

  const router = useRouter();

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
              <BreadcrumbLink as={Link} href="/dashboard/daftar_ambassador">
                <a>Daftar Jadi Ambassador</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>

        <div className="">
          <h1 className="text-4xl">Daftarkan Dirimu Menjadi Ambassador</h1>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">
              Nikmati banyak sekali benefit yang ada
            </h3>
            <p>
              Dapatkan berbagai benefit menarik menjadi ambassador dari Cicil
              Aja. Menjadi ambassador memungkinkanmu untuk mendapatkan
              penghasilan sendiri hanya dengan me-review pinjaman yang ada.
              Daftar, tunggu hingga pendaftaran selesai, dan mulai dapatkan
              uangmu dengan me-review dari gadgetmu.
            </p>
          </div>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Daftar menjadi Student Ambassador</h3>
            <Popover
              returnFocusOnClose={false}
              isOpen={popOver}
              onClose={() => setPopOver(false)}
            >
              <PopoverTrigger>
                <Checkbox onChange={() => setPolicy(!policy)}>
                  Saya setuju dengan syarat dan ketentuan
                </Checkbox>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  Silahkan setujui syarat dan ketentuan dari kami.
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <div className="mt-5">
              <Button
                colorScheme={"purple"}
                onClick={() => {
                  if (policy) {
                    const token = localStorage.getItem("token");
                    API.postRegisterAsAmbassador(token).then((res) => {
                      if (res == "Error: Request failed with status code 400") {
                        toast({
                          title:
                            "Maaf, anda sudah mendaftar sebagai ambassador, silahkan tunggu admin meng-accept",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                        });
                      } else {
                        router.push("/dashboard");
                      }
                    });
                  } else {
                    setPopOver(true);
                  }
                }}
              >
                Daftar Ambassador
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Redirect>
  );
}

export default DaftarAmbassador;
