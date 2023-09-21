//@ts-nocheck

import Web3Modal from "web3modal";
import { CompanyFactoryAddress } from "@/config";
import { ethers, providers } from "ethers";
import cc from "cryptocompare";

import {
  CompanyFactory__factory,
  Company__factory,
} from "@/types/ethers-contracts";

export const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) =>
  CompanyFactory__factory.connect(
    "0x8E2D670Ea8AAE21b02707B63737385A34F6c9E4b",
    signerOrProvider
  );

export const fetchCompanyContract = (
  companyAddress: string,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) => Company__factory.connect(companyAddress, signerOrProvider);

export const getExchangeRate = async () => {
  const exchangeRate = await cc.price("xDai", ["USD"]);
  return exchangeRate["USD"];
};

export const CreateACompany = async (name: string, currentSigner: any) => {
  const provider = new providers.JsonRpcProvider(`https://rpc.chiadochain.net`);

  const contract = fetchContract(provider);

  console.log(currentSigner);

  await contract.connect(currentSigner).createCompany(name);
};

export const fetchCompanies = async () => {
  const provider = new providers.JsonRpcProvider(`https://rpc.chiadochain.net`);

  const contract = fetchContract(provider);

  const data = await contract.companies();

  const exchangeRate = await getExchangeRate();

  const items = await Promise.all(
    data.map(async (item) => {
      const instance = Company__factory.connect(item, provider);
      const name = await instance.name();
      const owner = await instance.companyOwner();
      const result = await instance.id();
      const id = result.toString();

      return {
        name,
        owner,
        id,
        address: item,
      };
    })
  );
  return items;
};

export const RegisterEmployee = async (
  name: string,
  rank: string,
  paymentAddress: string,
  payment: any,
  address: string,
  currentAccount: string,
  signer: any
) => {
  if (!currentAccount) {
    return;
  }

  const instance = fetchCompanyContract(address, signer);
  await instance
    .connect(signer)
    .registerEmployee(name, rank, paymentAddress, payment);
};

export const EditEmployee = async (
  name: string,
  rank: string,
  paymentAddress: string,
  payment: any,
  id: any,
  address: string,
  currentAccount: string,
  signer: any
) => {
  if (!currentAccount) {
    return;
  }

  const instance = fetchCompanyContract(address, signer);
  await instance.editEmployee(name, rank, paymentAddress, payment, id, {
    from: currentAccount,
  });
};

export const QueryEmployees = async (
  address: string,
  currentAccount: string,
  signer: any
) => {
  if (!currentAccount) {
    return;
  }

  const instance = fetchCompanyContract(address, signer);
  const data = await instance.getAllEmployee();

  return data;
};

const tokens = (n: number) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

export const PayEmployees = async (
  amount: number,
  address: string,
  currentAccount: string,
  signer: any
) => {
  if (!currentAccount) {
    return;
  }

  const exchangeRate = await getExchangeRate();

  const exchangeRateToUSD = exchangeRate * 1000000000;

  const tokenAmount = amount / exchangeRate + 0.001;
  const instance = fetchCompanyContract(address, signer);
  await instance.payEmployee(exchangeRateToUSD, { value: tokens(tokenAmount) });
};
