import React from "react";
import Head from "next/head";

const Pricing = () => {
  return (
    <div className="justify-center h-[100vh] bg-white text-black text-center w-full flex flex-col pl-5 pr-5 ">
      <Head>
        <title>Pricing</title>
      </Head>
      <h1 className="text-5xl font-bold sm:text-3xl">
        No pricing for now, everything is totally free!
      </h1>
    </div>
  );
};

export default Pricing;
