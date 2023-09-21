import React from "react";
import ButtonGroup from "./ButtonGroup";
import Image from "next/image";
import Mobile from "../assets/Banner Image.png";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="flex mt-12 flex-wrap justify-between space-y-0 sm:space-y-12">
      <div className="w-[600px] justify-center align-middle items-center">
        <h1 className="font-bold text-7xl sm:text-5xl">
          Make Your Payment <span className="text-[#440BE9]">Easier</span> and{" "}
          <span className="text-[#440BE9]">Faster</span>{" "}
        </h1>
        <p className="mt-4 mb-4 text-xl">
          Paywall is a free, secure and easy way to pay your employees. No fees!
        </p>
        <Link href="/create">
          <ButtonGroup
            handleClick={() => {}}
            disable={false}
            btnName="Get Started"
          />
        </Link>
      </div>
      <div>
        <Image src={Mobile} width={500} height={700} alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
