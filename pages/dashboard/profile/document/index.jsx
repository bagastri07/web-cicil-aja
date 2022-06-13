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
        <div className="">
          <h1 className="text-4xl">Edit Dokumen</h1>
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Foto KTP</h3>
            <Skeleton isLoaded={!loading}>
              <div className="w-60 h-40 relative">
                {user?.borrower_document?.ktm_url ? (
                  <Image
                    src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktp_url}`}
                    alt="Foto KTP"
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <p className="w-full h-full flex justify-center items-center">
                    Sorry no image found here
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
                  <Image
                    src={`https://cicilaja.bagas3.my.id/${user?.borrower_document?.ktm_url}`}
                    alt="Foto KTM"
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <p className="w-full h-full flex justify-center items-center">
                    Sorry no image found here
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
