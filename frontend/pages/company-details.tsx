import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CompanyContext } from "@/context/CompanyContext";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import Head from "next/head";
import AddSuccess from "../assets/addsuccess.png";
import { MdOutlinePayments } from "react-icons/md";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";

const Details = () => {
  const router = useRouter();
  const toast = useToast();
  const companyAddress = router.query.address as unknown as string;
  const { queryEmployees, payEmployee, editEmployee, registerEmployee } =
    useContext(CompanyContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState("");
  const [isEditingEmployee, setIsEditingEmployee] = useState("");
  const [totalPaymentInFantom, setTotalPaymentInFantom] = useState(null);
  const [totalPaymentInUSD, setTotalPaymentInUSD] = useState(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formInput, updateFormInput] = useState({
    name: "",
    position: "",
    address: "",
    payment: "",
  });
  const [editFormInput, updateEditFormInput] = useState({
    name: "",
    position: "",
    address: "",
    payment: "",
    id: null,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getEmployees = async () => {
      if (companyAddress) {
        setLoading(true);
        const data = await queryEmployees(companyAddress);

        setEmployees(data);

        const items = await Promise.all(
          data.map(async (item) => {
            return parseFloat(item.paymentInFantom);
          })
        );

        const res = await Promise.all(
          data.map(async (item) => {
            return Number(item.paymentInUSD);
          })
        );

        items.length > 0
          ? setTotalPaymentInFantom(items.reduce((a, b) => a + b))
          : null;
        res.length > 0
          ? setTotalPaymentInUSD(res.reduce((a, b) => a + b))
          : null;

        setLoading(false);
      }
    };

    getEmployees();
  }, [companyAddress]);

  const AddEmployee = async () => {
    const { name, position, address, payment } = formInput;
    if (!name && !position && !address && !payment) return;

    setIsAddingEmployee("inProgress");
    setBtnDisable(true);

    try {
      await registerEmployee(
        name,
        position,
        address,
        Number(payment),
        companyAddress
      );
      setIsAddingEmployee("success");
      toast({
        title: "Employee Added",
        position: "top-left",
        description: "You have successfully added a new employee",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setIsAddingEmployee("error");
      toast({
        title: "Account not created.",
        position: "top-left",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const EditEmployee = async () => {
    const { name, position, address, payment, id } = editFormInput;
    if (!name && !position && !address && !payment && !id) return;
    setIsEditingEmployee("inProgress");
    setBtnDisable(true);

    try {
      await editEmployee(
        name,
        position,
        address,
        parseFloat(payment),
        id,
        companyAddress
      );
      setIsEditingEmployee("success");
      toast({
        title: "Employee edited successfully",
        description: "Your employee info has been updated by you.",
        position: "top-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setIsEditingEmployee("error");
      toast({
        title: "Employee not edited",
        description: "An error occurred",
        position: "top-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const payEmployees = async () => {
    if (!employees && !companyAddress) return;

    try {
      await payEmployee(totalPaymentInUSD, companyAddress);
      toast({
        title: "Employees paid successfully",
        description: "Your employees have been paid by you.",
        position: "top-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Employees not paid",
        position: "top-left",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full flex bg-white text-black items-center align-center justify-center sm:pl-5 sm:pr-5 pl-10 pr-10">
      <div className="w-full max-w-[1200px]">
        <Head>
          <title>Company details</title>
        </Head>

        <div className="mt-8 w-full justify-between items-center sm:flex-col sm:justify-center sm:space-y-4 space-y-0 flex flex-wrap">
          <Button onClick={onOpen} colorScheme="purple" rightIcon={<AddIcon />}>
            Add Employee
          </Button>

          <div className=" flex flex-wrap justify-center items-center">
            <p className="mx-4">
              Total : $ {totalPaymentInUSD ? totalPaymentInUSD : 0}
            </p>
            <Button
              onClick={() => payEmployees()}
              colorScheme="red"
              rightIcon={<MdOutlinePayments />}
            >
              Pay Employees
            </Button>
          </div>
        </div>

        <div className="w-full mt-4 border-2 rounded-xl">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Employees</TableCaption>
              <Thead>
                {!loading ? (
                  employees?.length != 0 ? (
                    <Tr>
                      <Th>Name</Th>
                      <Th>Position</Th>
                      <Th>Id</Th>
                      <Th>wallet Address</Th>
                      <Th>Payment</Th>
                      <Th>Edit</Th>
                    </Tr>
                  ) : (
                    <Tr>
                      <Th>No Employee</Th>
                    </Tr>
                  )
                ) : (
                  <Tr>
                    <Th>Fetching Employees</Th>
                  </Tr>
                )}
              </Thead>
              <Tbody>
                {!loading ? (
                  employees?.length != 0 ? (
                    employees?.map((employee, index) => (
                      <Tr key={index}>
                        <Td>{employee.employeeName}</Td>
                        <Td>{employee.employeeRank}</Td>
                        <Td>{employee.id}</Td>
                        <Td>
                          {employee.employeeAddress.slice(0, 4)}...
                          {employee.employeeAddress.slice(38)}
                        </Td>
                        <Td>$ {employee.paymentInUSD}</Td>
                        <Td>
                          <Button
                            onClick={() => {
                              updateEditFormInput({
                                name: employee.employeeName,
                                position: employee.employeeRank,
                                address: employee.employeeAddress,
                                payment: employee.paymentInUSD,
                                id: employee.id,
                              }),
                                setOpenModal(true);
                            }}
                            colorScheme="purple"
                            mr={3}
                          >
                            Edit employee
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td className="text-xl font-semibold mb-4">
                        No Employee data found. Add employee
                      </Td>
                    </Tr>
                  )
                ) : (
                  <Tr>
                    <Td>
                      <div className="justify-center mt-16 mb-16 items-center w-full flex flex-col">
                        <p className="text-xl font-semibold mb-4">
                          Fetching Employees
                        </p>
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      </div>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose(), setIsAddingEmployee(""), setBtnDisable(false);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add an Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {isAddingEmployee === "" ? (
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name of the employee"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, name: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Position</FormLabel>
                    <Input
                      placeholder="Position of the employee"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          position: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Wallet address</FormLabel>
                    <Input
                      placeholder="Wallet address of the employee"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          address: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Payment in USD</FormLabel>
                    <Input
                      placeholder="Payment of the employee in USD"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          payment: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </>
              ) : isAddingEmployee === "inProgress" ? (
                <div className="justify-center mt-16 mb-16 items-center w-full flex flex-col">
                  <p className="text-xl font-semibold mb-4">In Progress</p>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              ) : isAddingEmployee === "success" ? (
                <div className="justify-center mt-16 items-center w-full flex flex-col">
                  <p className="text-xl font-semibold mb-4">
                    Employee added Successfully
                  </p>
                  <Image
                    src={AddSuccess}
                    height={50}
                    width={200}
                    alt="success"
                  />
                </div>
              ) : (
                <div className="justify-center mt-16 items-center w-full flex flex-col">
                  <p className="text-xl font-semibold mb-4">
                    An error Occurred
                  </p>
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={btnDisable}
                onClick={() => AddEmployee()}
                colorScheme="purple"
                mr={3}
              >
                Add employee
              </Button>
              <Button
                onClick={() => {
                  onClose(), setIsAddingEmployee(""), setBtnDisable(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div>
          <Modal
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false),
                setIsEditingEmployee(""),
                setBtnDisable(false);
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit an Employee</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {isEditingEmployee === "" ? (
                  <>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Name of the employee"
                        value={editFormInput.name}
                        onChange={(e) =>
                          updateEditFormInput({
                            ...editFormInput,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Position</FormLabel>
                      <Input
                        placeholder="Position of the employee"
                        value={editFormInput.position}
                        onChange={(e) =>
                          updateEditFormInput({
                            ...editFormInput,
                            position: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Wallet address</FormLabel>
                      <Input
                        placeholder="Wallet address of the employee"
                        value={editFormInput.address}
                        onChange={(e) =>
                          updateEditFormInput({
                            ...editFormInput,
                            address: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Payment in USD</FormLabel>
                      <Input
                        placeholder="Payment of the employee in USD"
                        value={editFormInput.payment}
                        onChange={(e) =>
                          updateEditFormInput({
                            ...editFormInput,
                            payment: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </>
                ) : isEditingEmployee === "inProgress" ? (
                  <div className="justify-center mt-16 mb-16 items-center w-full flex flex-col">
                    <p className="text-xl font-semibold mb-4">In Progress</p>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </div>
                ) : isEditingEmployee === "success" ? (
                  <div className="justify-center mt-16 items-center w-full flex flex-col">
                    <p className="text-xl font-semibold mb-4">
                      Employee Edited Successfully
                    </p>
                    <Image
                      src={AddSuccess}
                      height={50}
                      width={200}
                      alt="success"
                    />
                  </div>
                ) : (
                  <div className="justify-center mt-16 items-center w-full flex flex-col">
                    <p className="text-xl font-semibold mb-4">
                      An error Occurred
                    </p>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={btnDisable}
                  onClick={() => EditEmployee()}
                  colorScheme="purple"
                  mr={3}
                >
                  Edit employee
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(false),
                      setIsEditingEmployee(""),
                      setBtnDisable(false);
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Details;
