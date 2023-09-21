import React from "react";
import Image from "next/image";
import Logo1 from "../assets/vector.png";

const InnerSection = ({ icon, title, text }) => {
  return (
    <div className="drop-shadow-2xl bg-[#eae6e6] p-4 h-[140px] rounded-xl w-[350px]">
      <div className="flex mb-4">
        <Image src={icon} height={20} width={20} alt="section" />
        <h1 className="ml-4 font-bold text-xl">{title}</h1>
      </div>
      <p>{text}</p>
    </div>
  );
};

const FirstSection = () => {
  return (
    <div className="mt-12 justify-center align-middle items-center flex flex-wrap sm:space-y-8 space-x-8 sm:space-x-0 space-y-0">
      <InnerSection
        icon={Logo1}
        title="Easy Transaction"
        text="We have an easy way to understand the application flow for you to use for transaction"
      />
      <InnerSection
        icon={Logo1}
        title="Safe and Reliable"
        text="Paywall is a trustworthy payment system that pays out everytime a wallet is swiped"
      />
      <InnerSection
        icon={Logo1}
        title="Various Method"
        text="You can choose from our various payment methods to seamlessly complete your order"
      />
    </div>
  );
};

export default FirstSection;
