import React, { useState } from "react";
import { HomePageArea } from "./styles";
import { Link } from "react-router-dom";
import CollImg from "../../assets/images/coll-img.avif";
import RoxImg from "../../assets/images/GX.svg";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import AllCollectionsTab from "../CollectionV2/Tabs";
import useToast from "../../hooks/useToast";
import { LoadingScreen } from "./styles";
import { useEffect } from "react";
import ReactLoading from "react-loading";

export default function Home() {
  const [collectionDetails, setCollectionDetails] = useState(false);
  const [collections, setCollections] = React.useState([]);
  const { invokeServer } = useGlobal();
  const { wallet } = useCustomWallet();
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const { toastError, toastInfo } = useToast();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const toggleCollectionDetails = () => {
    setCollectionDetails(!collectionDetails);
  };

  const getCollections = () => {
    setLoading(true);
    invokeServer(
      "get",
      `/api/collection?owner=${wallet.address}&extra=all&keyword=${searchKeyword}`
    )
      .then((res) => {
        if (res.data.result === 0) {
          toastInfo("warning", res.data.message);
        } else if (res.data.result === 1) {
          setCollections(res.data.collections);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("get-all-coll-err:", err.message);
        toastError("Fail:", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <HomePageArea>
      <div className="hero-area">
        <div className="hero-area-bg">
          <img src={CollImg} alt="img" />
        </div>
        <div className="hero-area-inner">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-left">
                <h2>Buy & Sell NFTs, Get Rewards</h2>
                <p>
                  GX is the web3 NFT Marketplace where traders and collectors
                  have
                  <Link to="#">earned over $1.3 Billion in rewards.</Link>
                </p>
                <div className="hero-button">
                  <Link to="/my-collections/create">Sell</Link>
                  <Link to="/collections">Explore</Link>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                {loading ? (
                  <LoadingScreen>
                    <ReactLoading type="spin" color="#AAFF26" width={80} />
                  </LoadingScreen>
                ) : (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/collections-details/${collections[0].contractAddress.toLowerCase()}/${collections[0].walletAddress.toLowerCase()}`,
                        {
                          state: {
                            walletAddress:
                              collections[0].walletAddress.toLowerCase(),
                          },
                        }
                      )
                    }
                    className="hero-right"
                  >
                    <div className="hero-img">
                      <Link to="#">
                        <img
                          style={{ minHeight: "220px" }}
                          src={collections.length && collections[0].logoURI}
                          alt="trending collection"
                        />
                      </Link>
                      <h3>
                        <svg
                          viewBox="0 0 32 32"
                          focusable="false"
                          className="chakra-icon css-1cga0x3"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.5001 4H8.50007L1.71606 13.045L16.0001 29.527L30.2841 13.045L23.5001 4ZM27.0002 12H21.5542L17.8042 6H22.5002L27.0002 12ZM10.3021 14L14.0561 24.23L5.19005 14H10.3021ZM12.4321 14H19.5681L15.9991 23.721L12.4321 14ZM12.8049 12L15.9999 6.88699L19.1959 12H12.8049ZM21.698 14H26.81L17.943 24.231L21.698 14ZM9.50003 6H14.196L10.446 12H5.00003L9.50003 6Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        Trending Collection
                      </h3>
                      <h2>
                        {collections[0]?.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-patch-check-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                        </svg>
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-top-collection-today">
        <div className="container">
          <h2>Top Collections Today</h2>
          <div>
            <table>
              <thead>
                {/* <tr>
                  <th>Collection</th>
                  <th>Floor</th>
                  <th>24h Vol</th>
                  <th>Total Vol</th>
                  <th>Owners</th>
                  <th>Items</th>
                </tr> */}

                <tr>
                  <th>#</th>
                  <th>Collection</th>
                  <th>Floor</th>
                  <th>Vol</th>
                  <th>Owners</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <LoadingScreen>
                    <ReactLoading type="cylon" color="#AAFF26" width={120} />
                  </LoadingScreen>
                ) : (
                  collections.map((collection, index) => (
                    <tr
                      key={collection._id}
                      onClick={() =>
                        navigate(
                          `/collections-details/${collection.contractAddress.toLowerCase()}/${collection.walletAddress.toLowerCase()}`,
                          {
                            state: {
                              walletAddress:
                                collection.walletAddress.toLowerCase(),
                            },
                          }
                        )
                      }
                    >
                      <td>{index + 1}</td>
                      <td>
                        <span>
                          <img src={collection.logoURI} alt="collection" />
                          {collection.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-patch-check-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                          </svg>
                        </span>
                      </td>
                      {/* <td>
                        <span>
                          <svg
                            viewBox="0 0 48 96"
                            focusable="false"
                            className="chakra-icon css-anc12x"
                          >
                            <path
                              d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                              fill="#767676"
                            ></path>
                            <path
                              d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                              fill="#767676"
                            ></path>
                          </svg>{" "}
                          50.45
                        </span>
                      </td> */}
                      <td>
                        <span>
                          <svg
                            viewBox="0 0 48 96"
                            focusable="false"
                            className="chakra-icon css-anc12x"
                          >
                            <path
                              d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                              fill="#767676"
                            ></path>
                            <path
                              d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                              fill="#767676"
                            ></path>
                          </svg>{" "}
                          10,73
                        </span>
                        <strong className="green">-19.94%</strong>
                      </td>
                      <td>
                        <span>
                          <svg
                            viewBox="0 0 48 96"
                            focusable="false"
                            className="chakra-icon css-anc12x"
                          >
                            <path
                              d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                              fill="#767676"
                            ></path>
                            <path
                              d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                              fill="#8E8E8E"
                            ></path>
                            <path
                              d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                              fill="#5F5F5F"
                            ></path>
                            <path
                              d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                              fill="#767676"
                            ></path>
                          </svg>{" "}
                          {collection.tradeVolume}
                        </span>
                        <strong className="red">-65.7%</strong>
                      </td>
                      <td>
                        <span>{collection.tokenCount}</span>
                        <strong className="ash">57.5% unique</strong>
                      </td>
                      <td>10,000</td>
                    </tr>

                    // <tr
                    //   key={collection._id}
                    //   onClick={() =>
                    //     navigate(
                    //       `/collections-details/${collection.contractAddress.toLowerCase()}/${collection.walletAddress.toLowerCase()}`,
                    //       {
                    //         state: {
                    //           walletAddress:
                    //             collection.walletAddress.toLowerCase(),
                    //         },
                    //       }
                    //     )
                    //   }
                    // >
                    //   <td>{index + 1}</td>
                    //   <td>
                    //     <span>
                    //       <img src={collection.logoURI} alt="collection" />
                    //       {collection.name}
                    //       <svg
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         width="16"
                    //         height="16"
                    //         fill="currentColor"
                    //         className="bi bi-patch-check-fill"
                    //         viewBox="0 0 16 16"
                    //       >
                    //         <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    //       </svg>
                    //     </span>
                    //   </td>
                    //   <td>
                    //     <span>
                    //       <svg
                    //         viewBox="0 0 48 96"
                    //         focusable="false"
                    //         className="chakra-icon css-anc12x"
                    //       >
                    //         <path
                    //           d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                    //           fill="#767676"
                    //         ></path>
                    //         <path
                    //           d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                    //           fill="#8E8E8E"
                    //         ></path>
                    //         <path
                    //           d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                    //           fill="#5F5F5F"
                    //         ></path>
                    //         <path
                    //           d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                    //           fill="#8E8E8E"
                    //         ></path>
                    //         <path
                    //           d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                    //           fill="#5F5F5F"
                    //         ></path>
                    //         <path
                    //           d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                    //           fill="#767676"
                    //         ></path>
                    //       </svg>{" "}
                    //       10,73
                    //     </span>
                    //     <strong className="green">+32.2%</strong>
                    //   </td>
                    //   <td>
                    //     <span>
                    //       <svg
                    //         viewBox="0 0 48 96"
                    //         focusable="false"
                    //         className="chakra-icon css-anc12x"
                    //       >
                    //         <path
                    //           d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                    //           fill="#767676"
                    //         ></path>
                    //         <path
                    //           d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                    //           fill="#8E8E8E"
                    //         ></path>
                    //         <path
                    //           d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                    //           fill="#5F5F5F"
                    //         ></path>
                    //         <path
                    //           d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                    //           fill="#8E8E8E"
                    //         ></path>
                    //         <path
                    //           d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                    //           fill="#5F5F5F"
                    //         ></path>
                    //         <path
                    //           d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                    //           fill="#767676"
                    //         ></path>
                    //       </svg>{" "}
                    //       {collection.tradeVolume}
                    //     </span>
                    //     <strong className="red">-65.7%</strong>
                    //   </td>
                    //   <td>
                    //     <span>{collection.tokenCount}</span>
                    //     <strong className="ash">57.5% unique</strong>
                    //   </td>
                    //   <td>10,000</td>
                    // </tr>
                  ))
                )}
                {/* <tr>
                  <td>
                    <span>
                      1
                      <img src={CollImg} alt="collection" />
                      Bored Ape Yacht Club
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-patch-check-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </span>
                  </td>
                  <td>
                    <span>
                      <svg
                        viewBox="0 0 48 96"
                        focusable="false"
                        className="chakra-icon css-anc12x"
                      >
                        <path
                          d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                          fill="#767676"
                        ></path>
                        <path
                          d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                          fill="#767676"
                        ></path>
                      </svg>{" "}
                      50.45
                    </span>
                  </td>
                  <td>
                    <span>
                      <svg
                        viewBox="0 0 48 96"
                        focusable="false"
                        className="chakra-icon css-anc12x"
                      >
                        <path
                          d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                          fill="#767676"
                        ></path>
                        <path
                          d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                          fill="#767676"
                        ></path>
                      </svg>{" "}
                      3,499.98
                    </span>
                    <strong>-19.94%</strong>
                  </td>
                  <td>
                    <span>
                      <svg
                        viewBox="0 0 48 96"
                        focusable="false"
                        className="chakra-icon css-anc12x"
                      >
                        <path
                          d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                          fill="#767676"
                        ></path>
                        <path
                          d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                          fill="#8E8E8E"
                        ></path>
                        <path
                          d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                          fill="#5F5F5F"
                        ></path>
                        <path
                          d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                          fill="#767676"
                        ></path>
                      </svg>{" "}
                      1,027,694
                    </span>
                  </td>
                  <td>5,658</td>
                  <td>10,000</td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="home-collection-mobile">
            <div className="home-collection-list-item">
              <div className="home-collection-mobile-left">1</div>
              <div className="home-collection-mobile-center">
                <div className="home-collection-mobile-img">
                  <img src={CollImg} alt="collection" />
                </div>
                <div className="home-collection-mobile-content">
                  <h2>
                    Bored Ape Yacht Club
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-patch-check-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                  </h2>
                  <ul>
                    <li>
                      <strong>Floor</strong>{" "}
                      <span>
                        <svg
                          viewBox="0 0 48 96"
                          focusable="false"
                          className="chakra-icon css-anc12x"
                        >
                          <path
                            d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                            fill="#767676"
                          ></path>
                          <path
                            d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                            fill="#8E8E8E"
                          ></path>
                          <path
                            d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                            fill="#5F5F5F"
                          ></path>
                          <path
                            d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                            fill="#8E8E8E"
                          ></path>
                          <path
                            d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                            fill="#5F5F5F"
                          ></path>
                          <path
                            d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                            fill="#767676"
                          ></path>
                        </svg>{" "}
                        10.7999
                      </span>
                    </li>
                    <li>
                      <strong>24h Vol</strong>{" "}
                      <span>
                        <svg
                          viewBox="0 0 48 96"
                          focusable="false"
                          className="chakra-icon css-anc12x"
                        >
                          <path
                            d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                            fill="#767676"
                          ></path>
                          <path
                            d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                            fill="#8E8E8E"
                          ></path>
                          <path
                            d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                            fill="#5F5F5F"
                          ></path>
                          <path
                            d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                            fill="#8E8E8E"
                          ></path>
                          <path
                            d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                            fill="#5F5F5F"
                          ></path>
                          <path
                            d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                            fill="#767676"
                          ></path>
                        </svg>{" "}
                        2,371.61
                        <span className="h-c-changes">-25.14%</span>
                      </span>
                    </li>
                    {collectionDetails && (
                      <>
                        <li>
                          <strong>Total Vol</strong>{" "}
                          <span>
                            <svg
                              viewBox="0 0 48 96"
                              focusable="false"
                              className="chakra-icon css-anc12x"
                            >
                              <path
                                d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
                                fill="#767676"
                              ></path>
                              <path
                                d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
                                fill="#8E8E8E"
                              ></path>
                              <path
                                d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
                                fill="#5F5F5F"
                              ></path>
                              <path
                                d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
                                fill="#8E8E8E"
                              ></path>
                              <path
                                d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
                                fill="#5F5F5F"
                              ></path>
                              <path
                                d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
                                fill="#767676"
                              ></path>
                            </svg>{" "}
                            824,814
                          </span>
                        </li>
                        <li>
                          <strong>Owners</strong> <span>11,187</span>
                        </li>
                        <li>
                          <strong>Items</strong> <span>19,469</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="home-collection-mobile-right">
                <button onClick={toggleCollectionDetails}>
                  {collectionDetails ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button onClick={() => navigate("/collections")}>
            See all collections
          </button>
        </div>
      </div>
      <div className="home-apy-section">
        <div className="container">
          <div className="home-apy-section-inner">
            <div className="home-apy-content">
              <h2>Earn up to 37.56% APY with GX</h2>
              <p>
                Commit GX tokens to{" "}
                <strong>earn a share of daily trading fees</strong> in WETH, in
                addition to even more GX.
              </p>
              <button onClick={() => navigate("/reward/1")}>
                Start Earning
              </button>
            </div>
            <div className="home-apy-img">
              <img src={RoxImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </HomePageArea>
  );
}
