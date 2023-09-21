import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionImage from "../assets/Analysis.png";
import ButtonGroup from "./ButtonGroup";

const ThirdSection = () => {
  return (
    <div className="flex flex-wrap sm:space-y-4 space-y-0 justify-between items-center mt-16">
      <div className="w-[500px]">
        <h1 className="text-5xl sm:text-4xl font-bold">
          Analyze your sending habits and find ways to save your money
        </h1>
        <div className="flex mt-8 mb-8">
          <p className="text-xl">
            Paywall helps you analyze your sending so you know where you stand
            and can make smarter decisions.
          </p>
        </div>
        <Link href="/about">
          <ButtonGroup
            handleClick={() => {}}
            disable={false}
            btnName="Learn more"
          />
        </Link>
      </div>
      <div>
        <Image
          src={SectionImage}
          width={500}
          height={700}
          alt="section-image"
        />
      </div>
    </div>
  );
};

export default ThirdSection;
