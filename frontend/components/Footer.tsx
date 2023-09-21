import React from "react";
import Image from "next/image";
import Andriod from "../assets/logos_google-play-icon.png";
import Apple from "../assets/bxl_apple.png";
import Facebok from "../assets/facebook-black.png";
import twitter from "../assets/twitter-black.png";
import vinem from "../assets/vimeo-black.png";
import youtube from "../assets/youtube-black.png";
import Icons from "../assets/Social.png";
import Logo from "../assets/Frame 2.png";

const Footer = () => {
  return (
    <div className="w-full justify-center align-middle items-center flex flex-col">
      <div className="flex z-10 bg-gradient-to-r from-[#764ef1] to-[#440BE9] w-[80%] p-10 rounded-xl mt-16 text-white flex-col justify-center align-middle items-center">
        <h1 className="font-bold text-3xl mt-8">
          Download Paywall app for IOS and Android
        </h1>
        <p className="mt-8 text-xl">
          All in one payment from your smartphone! No cash. As easy as a tap
        </p>

        <div className="mt-6 flex flex-wrap space-x-4 sm:space-x-0 sm:space-y-4 space-y-0">
          <div className="flex p-4 bg-black cursor-pointer w-[300px] rounded-lg">
            <Image src={Andriod} height={20} width={70} alt="andriod" />
            <div className="flex flex-col text-white">
              <p className="text-xl"> Get it on</p>
              <p className="font-bold text-2xl">Google Play</p>
            </div>
          </div>
          <div className="flex p-4 cursor-pointer bg-black w-[300px] rounded-lg">
            <Image src={Apple} height={20} width={70} alt="andriod" />
            <div className="flex flex-col text-white">
              <p className="text-xl">Download on</p>
              <p className="font-bold text-2xl">Apple Store</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1F104A] -mt-[200px] text-white w-full p-10">
        <div className="w-full mt-[250px] flex flex-wrap justify-around  sm:space-y-4 space-y-0">
          <Image src={Logo} height={200} width={150} alt="logo" />
          <div className="flex flex-wrap space-x-3">
            <p className="text-xl font-bold">About us</p>
            <p className="text-xl font-bold">Discover</p>
            <p className="text-xl font-bold">Explore</p>
            <p className="text-xl font-bold">Books</p>
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <Image src={Facebok} height={30} width={30} alt="logo" />
            <Image src={twitter} height={30} width={30} alt="logo" />
            <Image src={vinem} height={30} width={30} alt="logo" />
            <Image src={youtube} height={30} width={30} alt="logo" />
          </div>
        </div>

        <div className="bg-white h-[1px] rounded-lg mt-6 w-full" />

        <div className="mt-4 flex flex-wrap justify-between">
          <p>© 2023 PayWall. All rights reserved.</p>
          <div className=" flex flex-wrap space-x-3 justify-around">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
