import Head from "next/head";
import {
  Banner,
  FirstSection,
  Footer,
  FourthSection,
  FQA,
  SecondSection,
  ThirdSection,
} from "../components";

export default function Home() {
  return (
    <div className="bg-white">
      <Head>
        <title>Paywall - Home</title>
      </Head>
      <div className="w-full bg-white text-black flex items-center align-center justify-center sm:pl-5 sm:pr-5 pl-10 pr-10">
        <div className="w-full max-w-[1200px]">
          <Banner />
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          <FQA />
        </div>
      </div>
      <Footer />
    </div>
  );
}
