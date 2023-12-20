import React, { createContext, useCallback, useContext, useState } from "react";
import copyText from "copy-text-to-clipboard";
import { UseWalletProvider } from "use-wallet";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import walletConfig from "../WalletContext/config";

const POLLING_INTERVAL = 12000;
const rpcUrl = walletConfig.rpcUrls[0];
const chainId = parseInt(walletConfig.chainId, 16);

export const GlobalContext = createContext();

const ipfs = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({
    serverURL: "https://api.nft.gx.exchange:2083",
    // serverURL: "http://localhost:2083",
    sessionKey: "logInIdV1",
  });

  const [reloadSaleCounter, setReloadSaleCounter] = useState(0);

  const reloadSales = useCallback(() => {
    setReloadSaleCounter((t) => t + 1);
  }, [reloadSaleCounter]);

  const invokeServer = useCallback(
    async (method, route, data) => {
      if (method === "post") {
        return axios.post(global.serverURL + route, data, {
          headers: {
            "Content-Security-Policy": "upgrade-insecure-requests",
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtY29udHJvbCIsIm5hbWUiOiJjbGllbnQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.QfUhS2loqjFI7x-J1_RXYkZ3UiXl26LpDPkrL862a6A",
          },
        });
      } else if (method === "get") {
        return axios.get(global.serverURL + route, {
          headers: {
            "Content-Security-Policy": "upgrade-insecure-requests",
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtY29udHJvbCIsIm5hbWUiOiJjbGllbnQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.QfUhS2loqjFI7x-J1_RXYkZ3UiXl26LpDPkrL862a6A",
          },
        });
      } else if (method === "put") {
        return axios.put(global.serverURL + route, data, {
          headers: {
            "Content-Security-Policy": "upgrade-insecure-requests",
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtY29udHJvbCIsIm5hbWUiOiJjbGllbnQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.QfUhS2loqjFI7x-J1_RXYkZ3UiXl26LpDPkrL862a6A",
          },
        });
      }
    },
    [global.serverURL]
  );

  const addFileToIPFS = async (file) => {
    const projectId = "2NbRPW51alGGLr1qWYpG460aia5";
    const projectSecret = "e314c5c6a1d93e60db48ec4ee84f1f6b";
    return ipfs.add(file, {
      headers: {
        Authorization: "Basic " + btoa(projectId + ":" + projectSecret),
      },
    });
  };

  const getIPFSUrl = (hash) => {
    return `https://GX.infura-ipfs.io/ipfs/${hash}`;
  };

  const copyToClipboard = (text) => {
    copyText(text);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <React.StrictMode>
      <UseWalletProvider
        chainId={chainId}
        autoConnect={true}
        connectors={{
          injected: {
            chainId: [chainId],
            rpc: {
              [chainId]: rpcUrl,
            },
          },
          walletconnect: {
            rpc: {
              [chainId]: rpcUrl,
            },
            bridge: "https://bridge.walletconnect.org",
            pollingInterval: POLLING_INTERVAL,
          },
        }}
      >
        <GlobalContext.Provider
          value={{
            global,
            invokeServer,
            addFileToIPFS,
            getIPFSUrl,
            reloadSaleCounter,
            reloadSales,
            copyToClipboard,
            refreshPage,
          }}
        >
          {children}
        </GlobalContext.Provider>
      </UseWalletProvider>
    </React.StrictMode>
  );
};

export const useGlobal = () => {
  const globalManager = useContext(GlobalContext);
  return globalManager || [{}, async () => {}];
};
