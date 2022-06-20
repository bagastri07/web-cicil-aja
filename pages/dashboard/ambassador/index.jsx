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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import Redirect from "../../../auth/redirect";
import DashboardLayout from "../../../components/dashboardLayout";
import Link from "next/link";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { point } from "../../../regex/point";

function Ambassador() {
  const [user, setUser] = useState("");
  const [commission, setCommission] = useState("");
  const [loan, setLoan] = useState("");
  const [modal, setModal] = useState(false);
  const [getValue, setGetValue] = useState(0);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (user.is_ambassador == false) {
      router.push("/dashboard");
    }

    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => {
      setTimeout(() => {
        setUser(resp);
        setLoading(false);
      }, 300);
    });
    API.getCommission(token).then((resp) => {
      setCommission(resp);
    });
    API.getAllLoan(token).then((resp) => {
      setLoan(resp);
    });
    API.getLoanById(1, token).then((resp) => console.log(resp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="ambassador">
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ambil Uang Commission</ModalHeader>
            <ModalCloseButton />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log({ ammount: getValue });
                const token = localStorage.getItem("token");
                API.postWithdrawComission(
                  { ammount: parseFloat(getValue) },
                  token
                ).then((resp) => {
                  if (resp.messages == "OK") {
                    router.reload();
                  } else {
                    toast({
                      title: "Error",
                      description:
                        "Maaf ada kesalahan yang terjadi, silahkan coba kembali.",
                      status: "error",
                      isClosable: true,
                    });
                  }
                });
              }}
            >
              <ModalBody>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    Rp.
                  </InputLeftElement>
                  <Input
                    type={"number"}
                    placeholder="Jumlah Uang"
                    onChange={(e) => setGetValue(e.target.value)}
                    required
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter display={"flex"} gap="2">
                <Button colorScheme={"purple"} type="submit">
                  Ambil Uang
                </Button>
                <Button type={"button"} onClick={() => setModal(false)}>
                  Batalkan
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div>
            <h1 className="text-4xl">Ambassador</h1>
            <h2 className="text-xl mt-1">
              Hi, {user?.name?.split(" ").slice(0, 1)}. Kamu adalah student
              ambassador.
            </h2>
            <div className="my-5">
              <div className="w-full bg-purple-100 rounded-xl p-5">
                <h3 className="text-xl mb-2">Total Commission</h3>
                <div className="flex gap-5">
                  <Stat bg="white" rounded="xl" padding="5">
                    <StatLabel>Commission</StatLabel>
                    <StatNumber>
                      Rp.
                      {point(parseInt(commission.balance, 10))}
                    </StatNumber>
                    <div className="flex items-center gap-5">
                      <Button
                        mt={"5"}
                        variant={"link"}
                        colorScheme="purple"
                        onClick={() =>
                          router.push("/dashboard/ambassador/commission")
                        }
                      >
                        Lihat History Commission
                      </Button>
                      <Button
                        mt={"5"}
                        colorScheme="purple"
                        onClick={() => setModal(true)}
                      >
                        Ambil Uang Commission
                      </Button>
                    </div>
                  </Stat>
                </div>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h3 className="text-xl mb-2">
                Daftar Permintaan Pinjaman Yang Masuk
              </h3>
              <div className="flex flex-col gap-5">
                {loan?.loan_tickets?.map((items) => (
                  <Stat key={items.id} bg="white" rounded="xl" padding="5">
                    <div className="flex justify-between items-center">
                      <div>
                        <StatLabel>{items.loanType}</StatLabel>
                        <StatNumber>
                          Rp.{point(parseInt(items.loan_amount))}
                        </StatNumber>
                        <StatHelpText>
                          Dengan total pinjaman Rp.
                          {point(parseInt(items.loan_total))}
                        </StatHelpText>
                        <StatHelpText>
                          Batas hingga {items.loan_tenure_in_months} bulan
                        </StatHelpText>
                        <StatHelpText>
                          <Tag
                            size="md"
                            colorScheme={
                              items.status === "pending" ? "yellow" : "green"
                            }
                          >
                            {items?.status}
                          </Tag>
                          {items.reviewed_by_ambassador_at ? (
                            <Tag colorScheme="purple">sudah di review</Tag>
                          ) : (
                            <Tag colorScheme="red">belum di review</Tag>
                          )}
                        </StatHelpText>
                      </div>
                      <Tooltip label="Lihat lebih detail pinjaman">
                        <Button
                          colorScheme="purple"
                          onClick={() =>
                            router.push(`/dashboard/ambassador/${items.id}`)
                          }
                        >
                          Detail
                        </Button>
                      </Tooltip>
                    </div>
                  </Stat>
                ))}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </Redirect>
  );
}

export default Ambassador;
