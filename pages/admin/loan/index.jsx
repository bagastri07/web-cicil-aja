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
  Tooltip,
  StatHelpText,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  RadioGroup,
  Radio,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import AdminDashboardLayout from "../../../components/adminDashboardLayout";
import Link from "next/link";
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { point } from "../../../regex/point";

function Loan() {
  const router = useRouter();
  const [filter, setFilter] = useState("1");
  const [loan, setLoan] = useState("");
  const [accepted, setAccepted] = useState("");
  const [pending, setPending] = useState("");
  const [rejected, setRejected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getAdminLoanTicket(token).then((resp) => {
      setLoan(resp);
    });

    API.getAdminLoanTicketPending(token).then((resp) => {
      setPending(resp);
    });

    API.getAdminLoanTicketAccepted(token).then((resp) => {
      setAccepted(resp);
    });

    API.getAdminLoanTicketRejected(token).then((resp) => {
      setRejected(resp);
      setLoading(false);
    });
  }, []);

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
          </Breadcrumb>
          <Divider marginTop="5" />
        </div>
        <h1 className="text-4xl">Daftar Cicilan</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="py-5">
            <div className="w-full bg-purple-100 rounded-xl p-5">
              <div className="flex gap-5">
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Estimasi Keseluruhan Total Cicilan</StatLabel>
                  <StatNumber>
                    {`Rp.${point(
                      parseInt(
                        loan?.loan_tickets?.reduce((a, b) => {
                          return a + b.loan_amount;
                        }, 0),
                        10
                      )
                    )}`}
                  </StatNumber>
                  <StatHelpText>
                    Dari {loan?.loan_tickets?.length} transaksi yang ada
                  </StatHelpText>
                </Stat>
                <Stat bg="white" rounded="xl" padding="5">
                  <StatLabel>Cicilan Diterima (accepted)</StatLabel>
                  <StatNumber>{`Rp.${point(
                    parseInt(
                      accepted?.loan_tickets?.reduce((a, b) => {
                        return a + b.loan_amount;
                      }, 0),
                      10
                    )
                  )}`}</StatNumber>
                  <StatHelpText>
                    Dari {accepted?.loan_tickets?.length} transaksi yang ada
                  </StatHelpText>
                </Stat>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton
                    display="flex"
                    justifyContent="space-between"
                  >
                    <h3 className="text-lg">Filter</h3>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <RadioGroup value={filter} onChange={setFilter}>
                      <div className="flex flex-col gap-3">
                        <Radio value="1">Semua</Radio>
                        <Radio value="2">Pending</Radio>
                        <Radio value="3">Rejected</Radio>
                        <Radio value="4">Accepted</Radio>
                      </div>
                    </RadioGroup>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-full bg-purple-100 rounded-xl p-5 mt-5">
              <h3 className="text-xl mb-2">Permintaan Cicilan</h3>
              <div className="flex flex-col gap-5">
                {filter == "1" ? (
                  <>
                    {loan?.loan_tickets?.map((items) => (
                      <Stat
                        key={items.id}
                        bg="white"
                        rounded="xl"
                        padding="5"
                        cursor="pointer"
                        _hover={{ opacity: "75%" }}
                        onClick={() => router.push(`/admin/loan/${items.id}`)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <StatLabel>{items.loanType}</StatLabel>
                            <StatNumber>
                              Rp.{point(items.loan_amount)}
                            </StatNumber>
                            <StatHelpText>
                              Batas hingga {items.loan_tenure_in_months} bulan
                            </StatHelpText>
                            <StatHelpText>
                              {items.status == "accepted" ? (
                                <Tag size="sm" colorScheme="green">
                                  Accepted
                                </Tag>
                              ) : items.status == "rejected" ? (
                                <Tag size="sm" colorScheme="red">
                                  Rejected
                                </Tag>
                              ) : (
                                <Tag size="sm" colorScheme="yellow">
                                  Pending
                                </Tag>
                              )}
                            </StatHelpText>
                          </div>
                        </div>
                      </Stat>
                    ))}
                  </>
                ) : filter == "2" ? (
                  <>
                    {pending?.loan_tickets?.map((items) => (
                      <Stat
                        key={items.id}
                        bg="white"
                        rounded="xl"
                        padding="5"
                        cursor="pointer"
                        _hover={{ opacity: "75%" }}
                        onClick={() => router.push(`/admin/loan/${items.id}`)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <StatLabel>{items.loanType}</StatLabel>
                            <StatNumber>
                              Rp.{point(items.loan_amount)}
                            </StatNumber>
                            <StatHelpText>
                              Batas hingga {items.loan_tenure_in_months} bulan
                            </StatHelpText>
                            <StatHelpText>
                              <Tag size="sm" colorScheme="yellow">
                                Pending
                              </Tag>
                            </StatHelpText>
                          </div>
                        </div>
                      </Stat>
                    ))}
                  </>
                ) : filter == "3" ? (
                  <>
                    {rejected?.loan_tickets?.map((items) => (
                      <Stat
                        key={items.id}
                        bg="white"
                        rounded="xl"
                        padding="5"
                        cursor="pointer"
                        _hover={{ opacity: "75%" }}
                        onClick={() => router.push(`/admin/loan/${items.id}`)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <StatLabel>{items.loanType}</StatLabel>
                            <StatNumber>
                              Rp.{point(items.loan_amount)}
                            </StatNumber>
                            <StatHelpText>
                              Batas hingga {items.loan_tenure_in_months} bulan
                            </StatHelpText>
                            <StatHelpText>
                              <Tag size="sm" colorScheme="red">
                                Rejected
                              </Tag>
                            </StatHelpText>
                          </div>
                        </div>
                      </Stat>
                    ))}
                  </>
                ) : (
                  <>
                    {accepted?.loan_tickets?.map((items) => (
                      <Stat
                        key={items.id}
                        bg="white"
                        rounded="xl"
                        padding="5"
                        cursor="pointer"
                        _hover={{ opacity: "75%" }}
                        onClick={() => router.push(`/admin/loan/${items.id}`)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <StatLabel>{items.loanType}</StatLabel>
                            <StatNumber>
                              Rp.{point(items.loan_amount)}
                            </StatNumber>
                            <StatHelpText>
                              Batas hingga {items.loan_tenure_in_months} bulan
                            </StatHelpText>
                            <StatHelpText>
                              <Tag size="sm" colorScheme="green">
                                Accepted
                              </Tag>
                            </StatHelpText>
                          </div>
                        </div>
                      </Stat>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </AdminDashboardLayout>
    </AdminRedirect>
  );
}

export default Loan;
