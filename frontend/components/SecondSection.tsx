import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionImage from "../assets/Track pic.png";
import ButtonGroup from "./ButtonGroup";
import mark from "../assets/Group 15.png";

const SecondSection = () => {
  return (
    <div className="flex flex-wrap sm:space-y-4 space-y-0 justify-between items-center mt-16">
      <div>
        <Image
          src={SectionImage}
          width={500}
          height={700}
          alt="section-image"
        />
      </div>
      <div className="w-[500px]">
        <h1 className="text-5xl sm:text-4xl font-bold">
          Pay and track the bills with your smartphone
        </h1>
        <div className="flex mt-8">
          <Image src={mark} width={100} height={5} alt="mark" />
          <p className="ml-4 text-xl">
            No more sticky price tag. No more balance due Emails. No more
            carring around multiple credit cards
          </p>
        </div>
        <div className="flex mt-8 mb-8">
          <Image src={mark} width={100} height={2} alt="mark" />
          <p className="ml-4 text-xl">
            No more sticky price tag. No more balance due Emails. No more
            carring around multiple credit cards
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
    </div>
  );
};

export default SecondSection;
