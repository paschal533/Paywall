import * as API from "@/services/api";
import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useWalletClient } from "wagmi";
import Web3Modal from "web3modal";

export const useCompanies = () => {
  const { currentAccount } = useContext(AuthContext);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [companies, setCompanies] = useState<any[]>([]);
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const [currentSigner, setCurrentSigner] = useState<any>();

  useEffect(() => {
    let isMounted = true;

    const fetchCompanies = async () => {
      setIsLoadingCompany(true);
      const items = await API.fetchCompanies();

      const data = items.filter((res) => res.owner === currentAccount);

      if (!isMounted) return;
      setCompanies(data);
      setIsLoadingCompany(false);

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      setCurrentSigner(signer);
    };

    fetchCompanies();

    return () => {
      isMounted = false;
    };
  }, [currentAccount, isLoading, isError, walletClient]);

  const createCompany = async (name: string) => {
    try {
      if (!currentAccount) return;

      await API.CreateACompany(name, currentSigner);
    } catch (error) {
      console.log(error);
    }
  };

  const registerEmployee = async (
    name: string,
    rank: string,
    paymentAddress: string,
    payment: number,
    address: string
  ) => {
    if (!currentAccount) return;

    await API.RegisterEmployee(
      name,
      rank,
      paymentAddress,
      payment,
      address,
      currentAccount,
      currentSigner
    );
  };

  const editEmployee = async (
    name: string,
    rank: string,
    paymentAddress: string,
    payment: number,
    id: number,
    address: string
  ) => {
    if (!currentAccount) return;

    await API.EditEmployee(
      name,
      rank,
      paymentAddress,
      payment,
      id,
      address,
      currentAccount,
      currentSigner
    );
  };

  const queryEmployees = async (address: string) => {
    if (!currentAccount) return;

    const data = await API.QueryEmployees(
      address,
      currentAccount,
      currentSigner
    );

    const totalEmployee = data.employeeNames.length;

    const employeeList = [];

    for (let i = 0; i < totalEmployee; i++) {
      const employeeName = data.employeeNames[i];
      const employeeAddress = data.employeeAddresses[i];
      const employeeRank = data.employeeRanks[i];
      const payment = data.payments[i];
      const id = data.ids[i].toString();
      const paymentInFantom = ethers.utils.formatEther(payment.toString());
      const paymentInUSD = payment.toString();
      //(await API.getExchangeRate()) * Number(paymentInFantom);

      employeeList.push({
        employeeName,
        employeeAddress,
        employeeRank,
        paymentInUSD,
        paymentInFantom,
        id,
      });
    }

    return employeeList;
  };

  const payEmployee = async (amount: number, address: string) => {
    if (!currentAccount) return;

    await API.PayEmployees(amount, address, currentAccount, currentSigner);
  };

  return {
    companies,
    isLoadingCompany,
    currentSigner,
    createCompany,
    registerEmployee,
    editEmployee,
    queryEmployees,
    payEmployee,
  };
};
