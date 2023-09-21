import React from "react";
import Head from "next/head";

const About = () => {
  return (
    <div className="bg-white text-black h-[100vh]">
      <Head>
        <title>About</title>
      </Head>

      <div className="mt-12 pl-12 pr-12 sm:pl-5 sm:pr-5 w-full justify-center">
        <h1 className="text-6xl mb-8 sm:text-4xl font-bold">About Paywall</h1>

        <p className="font-semibold text-xl">
          Paywall is a decentralized online financial service that allows you to
          pay all your employees with crypto currency with one click. you start
          first by connecting your wallet, then proceed to register your company
          by clicking on the create button at the navbar. Input the name of your
          company and create it. After registering your company, you can then
          proceed to your dashboard, refresh the page and click on the Manage
          button at the right-hand side of your company name, that would take
          you to the company-details page where you can add, edit and pay all
          your employees.{" "}
        </p>
      </div>
    </div>
  );
};

export default About;
