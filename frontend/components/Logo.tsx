import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Group 2.png";

const Logo = () => {
  return (
    <div className="flex flex-row justify-start flex-1">
      <Link href="/">
        <div className="flex justify-center align-center">
          <Image
            src={logo}
            objectFit="contain"
            width={32}
            height={32}
            alt="logo"
          />
          <p
            className={`ml-1 text-xl mt-1 minlg:mt-4 font-bold dark:text-white text-nft-black-1`}
          >
            Paywall
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
