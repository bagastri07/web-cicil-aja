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
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import Link from "next/link";
import { CheckIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Ambassador() {
  const router = useRouter();
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getAdminAmbassadorAccepted(token).then((resp) => {
      setAccepted(resp);
    });
    API.getAdminAmbassadorPending(token).then((resp) => {
      setPending(resp);
    });
  }, []);

  return (
    <AdminRedirect>
      <AdminDashboardLayout page="ambassador">
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
              <BreadcrumbLink as={Link} href="/admin">
                <a>Ambassador</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Ambassador</h1>
        <div className="py-5">
          <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
            <h3 className="text-xl mb-2">Pendaftar Ambassador</h3>
            {pending.length !== 0 ? (
              <>
                {pending?.map((items) => (
                  <Stat key={items.id} bg="white" rounded="xl" padding="5">
                    <div className="flex justify-between items-center">
                      <div>
                        <StatNumber>{items.name}</StatNumber>
                        <StatLabel>
                          {items.university} | {items.study_program}
                        </StatLabel>
                        <StatHelpText>{items.email}</StatHelpText>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Tooltip hasArrow label="Lihat detail pengguna">
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin/borrowers/${items.borrower_id}`
                              )
                            }
                            variantColor="purple"
                            variant="outline"
                          >
                            <span className="">Detail</span>
                          </Button>
                        </Tooltip>
                        <Popover>
                          <PopoverTrigger>
                            <Button colorScheme={"purple"}>
                              <CheckIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                              Konfirmasi sebagai ambassador
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                colorScheme={"purple"}
                                onClick={() => {
                                  const token = localStorage.getItem("token");
                                  API.patchAdminAmbassador(
                                    items.borrower_id,
                                    token
                                  ).then(() => router.reload());
                                }}
                              >
                                Acc
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger>
                            <Button colorScheme={"red"}>
                              <CloseIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                              Tolak sebagai ambassador
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                colorScheme={"red"}
                                onClick={() => {
                                  const token = localStorage.getItem("token");
                                  API.patchAdminAmbassadorReject(
                                    items.borrower_id,
                                    token
                                  ).then((resp) => {
                                    console.log(resp);
                                    // router.reload();
                                  });
                                }}
                              >
                                Tolak
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </Stat>
                ))}
              </>
            ) : (
              <h4>Maaf Data Tidak Tersedia</h4>
            )}
          </div>
        </div>
        <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
          <h3 className="text-xl mb-2">Ambassador Telah Diterima</h3>
          {accepted.length !== 0 ? (
            <>
              {accepted?.map((items) => (
                <Stat key={items.id} bg="white" rounded="xl" padding="5">
                  <div className="flex justify-between items-center">
                    <div>
                      <StatNumber>{items.name}</StatNumber>
                      <StatLabel>
                        {items.university} | {items.study_program}
                      </StatLabel>
                      <StatHelpText>{items.email}</StatHelpText>
                    </div>
                    <div className="flex gap-5 items-center">
                      <Tooltip hasArrow label="Lihat detail pengguna">
                        <Button
                          onClick={() =>
                            router.push(`/admin/borrowers/${items.borrower_id}`)
                          }
                          variantColor="purple"
                          variant="outline"
                        >
                          <span className="">Detail</span>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </Stat>
              ))}
            </>
          ) : (
            <h4>Maaf Data Tidak Tersedia</h4>
          )}
        </div>
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Ambassador;
