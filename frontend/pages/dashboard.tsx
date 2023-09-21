import React, { useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { AuthContext } from "@/context/AuthContext";
import { CompanyContext } from "@/context/CompanyContext";
import ButtonGroup from "@components/ButtonGroup";
import { Flex, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import {
  Table,
  Thead,
  Tbody,
  Spinner,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Dashboard = () => {
  const { currentAccount } = useContext(AuthContext);
  const { companies, isLoadingCompany } = useContext(CompanyContext);

  if (!currentAccount) {
    return (
      <div>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="90vh"
          overflowX="hidden"
          overflowY="hidden"
          bgGradient="linear(to-br, purple.400, purple.700)"
        >
          <Text fontSize="5xl" fontWeight="semiBold" color="white">
            Dashboard
          </Text>
          <div className="flex items-center justify-center w-full">
            <ConnectKitButton />
          </div>
        </Flex>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center text-black bg-white align-center justify-center sm:pl-5 sm:pr-5 pl-10 pr-10">
      <div className="w-full max-w-[1200px]">
        <Head>
          <title>Dashboard</title>
        </Head>

        <div className="w-full mt-12 border-2 rounded-xl">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Manage Your Companies</TableCaption>
              {!isLoadingCompany ? (
                companies.length > 0 ? (
                  <Thead>
                    <Tr>
                      <Th>Company name</Th>
                      <Th>Id</Th>
                      <Th isNumeric>Manage</Th>
                    </Tr>
                  </Thead>
                ) : (
                  <Tr>
                    <Th>No Company created by you yet</Th>
                  </Tr>
                )
              ) : (
                <Tr>
                  <Th>Fetching your companies</Th>
                </Tr>
              )}
              <Tbody>
                {!isLoadingCompany ? (
                  companies.length > 0 ? (
                    companies.map((item: any, index: any) => (
                      <Tr key={index}>
                        <Td>{item.name}</Td>
                        <Td>{item.id}</Td>
                        <Td isNumeric>
                          <Link
                            href={{
                              pathname: "/company-details",
                              query: { address: item.address },
                            }}
                          >
                            <ButtonGroup
                              btnName="Manage"
                              handleClick={() => {}}
                              disable={false}
                            />
                          </Link>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td className="text-center text-2xl h-[80vh] w-full">
                        You haven't registered a company yet. Use the create
                        button at the navbar to register a company.
                      </Td>
                    </Tr>
                  )
                ) : (
                  <div className="justify-center mt-16 mb-16 items-center w-full flex">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </div>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
