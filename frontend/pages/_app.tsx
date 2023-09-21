import React from "react";
import "../styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import AuthLayout from "../layouts/AuthLayout";
import { ToastContainer } from "@/services/toast";
import { AuthProvider } from "@/context/AuthContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { gnosisChiado } from "wagmi/chains";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ProjectAPIKey;
const walletConnectProjectId = process.env.WALLETCONNECT_PROJECT_ID;

const chains = [gnosisChiado];

const config = createConfig(
  getDefaultConfig({
    appName: "PayWall",
    infuraId,
    walletConnectProjectId,
    chains,
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-black h-full">
      <ChakraProvider>
        <WagmiConfig config={config}>
          <ConnectKitProvider>
            <AuthProvider>
              <CompanyProvider>
                <AuthLayout>
                  <Component {...pageProps} />
                  <ToastContainer />
                </AuthLayout>
              </CompanyProvider>
            </AuthProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
