import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Collapse, Dropdown, Popover, Modal } from "antd";
import { SingleProduct, PopUpContentArea, ConnectWalletModel } from "./styles";
import CollImgItem from "../../assets/images/sample-item.avif";
import CollImg from "../../assets/images/coll-img.avif";
import { useGlobal } from "../../contexts/GlobalContext";
import useToast from "../../hooks/useToast";
import { LoadingScreen } from "./styles";
import ReactLoading from "react-loading";
import { useData } from "../../contexts/DataContext";
import { useOfferInfo } from "../../contexts/OfferContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import { useAuth } from "../../contexts/AuthContext";
import MainModal from "../Shared/MainModal";
import { ConnectWalletForm } from "../Shared/ConnectWalletForm";
import GradientButton from "../Shared/GradientButton";
import { SaleNowIcon } from "../Shared/SvgIcons";
import MakeOfferModal from "../Shared/MakeOfferModal";

import { OutlineBox } from "./styles";

import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const popUpContent = (
  <PopUpContentArea>
    <img src={CollImg} alt="coll" />
    <h2>ce841F</h2>
    <p>0xce841F783Dc6D9Df256aF36B1CF6B3A52aA57Cdc</p>
  </PopUpContentArea>
);

export default function SingleProductArea() {
  const { contractAddress, tokenId } = useParams();
  const { invokeServer } = useGlobal();
  const { increaseVisitCount } = useData();
  const { t } = useTranslation();

  const {
    itemLoaded,
    favorite,
    comments,
    creatorInfo,
    unlistedInfo,
    reloadSaleInfoToOffer,
    nftSalesOnPurchase,
  } = useOfferInfo();
  const offerTypes = ["Comments", "Offer", "Stats", "Properties", "Details"];
  const { toastSuccess, toastError, toastInfo, showLoading, hideLoading } =
    useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showMakeOffer, setShowMakeOffer] = useState(false);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { auth } = useAuth();
  const { wallet } = useCustomWallet();

  const [collection, setCollection] = useState({
    id: 1,
    title: "On1 Force",
    description:
      "0N1 Force are 7,777 unique collectibles Hand Illustrated by @TRUEIMCMPLX #NFTs",
    artist: "a dummy description about this page",
    priceLabel: "test, dummy, data",
    priceValue: "500",
    photo: "/images/on1force.png",
    logo: "/images/on1force-logo.png",
    site: "www.on1force.com",
  });
  const [nftDetail, setNftDetail] = useState({});
  const [properties, setProperties] = useState();

  const [offerLoaded, setOfferLoaded] = useState([]);
  const [isImage, setIsImage] = useState(true);
  const [offerInfo, setOfferInfo] = useState();
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  // handle meta mask login modal

  const handleConnectWallet = () => {
    setIsModalOpen(false);
    setShowConnectWallet(true);
  };

  //---------------Starting All about nft attributes
  // Setting visit count
  useEffect(() => {
    increaseVisitCount(contractAddress, parseInt(tokenId));
  }, [contractAddress, tokenId]);

  // Item loaded
  useEffect(() => {
    nftDetail.collectionAddress &&
      setIsImage(nftDetail?.video === true ? false : true);
    nftDetail.collectionAddress && refreshOfferList();
  }, [nftDetail]);

  // get offers
  const refreshOfferList = () => {
    invokeServer(
      "get",
      `/api/offer?collectionAddress=${nftDetail?.collectionAddress.toLowerCase()}&tokenId=${
        nftDetail?.tokenId
      }`
    )
      .then((r) => {
        setOfferLoaded((t) => r.data.offers);
        console.log(" offers data", r.data.offers);
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };

  //---------------End All about nft attributes
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    unlistedInfo && setOfferInfo(unlistedInfo[0]);
  }, [unlistedInfo]);

  // properties of nft
  useEffect(() => {
    nftDetail?.attributes &&
      setProperties((t) => {
        return {
          items: JSON.parse(nftDetail.attributes),
          creator: nftDetail.creator.toLowerCase(),
        };
      });
  }, [nftDetail]);

  const copyUrlToClipboard = () => {
    const url = window.location.href;

    // Create a temporary input element
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();

    // Copy the URL to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(input);

    // Optionally, provide user feedback
    toastInfo("Info", "Share link copied to clipboard!");
  };

  // Getting collection details
  useEffect(() => {
    invokeServer(
      "get",
      `/api/collection?owner=&extra=one&address=${contractAddress}`
    )
      .then((res) => {
        if (res.data.result == 0) {
          toastInfo("Warning", res.data.msg);
        } else if (res.data.result == 1) {
          let t = res.data.collections[0];
          setCollection((prev) => {
            return {
              id: t._id,
              title: t.name == "" ? "Anonymous" : t.name,
              description:
                t.description == "" ? "No description" : t.description,
              artist: t.user,
              priceLabel: "test, dummy, data",
              priceValue: "500",
              photo: t.bannerURI == "" ? "/images/on1force.png" : t.bannerURI,
              logo: t.logoURI == "" ? "/images/on1force-logo.png" : t.logoURI,
              site: "www.on1force.com",
              contractAddress: t.contractAddress,
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toastError("Fail", err.message);
      });
  }, []);

  // Getting nft details
  useEffect(() => {
    setisLoading(true);
    let ac = new AbortController();
    if (contractAddress) {
      invokeServer("get", `/api/nft/${contractAddress}/${tokenId}`)
        .then((res) => {
          if (ac.signal.aborted === false) {
            if (res.data.msg === "found") {
              let j;
              let rr = res.data.item;
              console.log("nft detail", rr);
              setNftDetail(rr);
              setisLoading(false);
            }
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }

    return () => ac.abort();
  }, []);

  // Setting percentages for properties
  const [marketPercentages, setMarketPercentages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      try {
        const updatedMarketPercentages = await Promise.all(
          (properties?.items ?? []).map((item) =>
            getMarketPercentage(item, properties?.creator)
          )
        );

        if (isMounted) {
          setMarketPercentages(updatedMarketPercentages);
        }
      } catch (err) {
        console.log(`${err.message}`);
      }
    };

    fetchMarketData();

    return () => {
      isMounted = false;
    };
  }, [properties?.items, properties?.creator]);

  const getMarketPercentage = async (data, creator) => {
    try {
      const response = await invokeServer(
        "get",
        `/api/nft/property?type=${data?.type}&name=${data?.name}&creator=${creator}`
      );
      if (response.data.result === 1) {
        return response.data.percentage.marketplace.toFixed(2);
      }
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedPercentages = await Promise.all(
        (properties?.items ?? []).map((item) =>
          getCreatorPercentage(item, properties?.creator)
        )
      );
      setPercentages(updatedPercentages);
    };

    fetchData();
  }, [properties?.items, properties?.creator]);

  const getCreatorPercentage = async (data, creator) => {
    try {
      const response = await invokeServer(
        "get",
        `/api/nft/property?type=${data?.type}&name=${data?.name}&creator=${creator}`
      );
      if (response.data.result === 1) {
        return response.data.percentage.creator.toFixed(2);
      }
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  const [offerList, setOfferList] = useState([]);

  // Run offers when offerLoad setted
  useEffect(() => {
    let nowTick = new Date().getTime();

    offerLoaded &&
      setOfferList((oldlist) =>
        offerLoaded.map((t, id) => {
          let tLeft =
            (new Date(t.start).getTime() + t.duration * 1000 - nowTick) / 1000;
          let days = parseInt(tLeft / (3600 * 24));
          let hours = parseInt((tLeft - days * 24 * 3600) / 3600);
          let minutes = parseInt(
            (tLeft - days * 24 * 3600 - hours * 3600) / 60
          );
          let exp_date =
            (days > 0 ? `${days} days / ` : "") +
            (hours > 0 ? `${hours} h / ` : "") +
            (minutes > 0 ? `${minutes} m` : "");
          if (exp_date === "") exp_date = "already expired";

          return {
            id: id,
            price: t.price,
            paymentName: t.paymentName,
            usd_price: t.priceUSD,
            expire_date: exp_date,
            from: t.name,
          };
        })
      );
  }, [offerLoaded]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModel = () => {
    setIsModalOpen(false);
  };

  const options = [
    {
      key: "11",
      label: <a href="#">Price Low to High</a>,
    },
    {
      key: "22",
      label: <a href="#">Price High to Low</a>,
    },
    {
      key: "33",
      label: <a href="#">Rank: Rare to Common</a>,
    },
    {
      key: "44",
      label: <a href="#">Rank: Common to Rare</a>,
    },
    {
      key: "55",
      label: <a href="#">Recent Activity</a>,
    },
  ];
  return (
    <SingleProduct>
      <div className="single-product-inner">
        <div className="single-product-left">
          <div className="show-mobile">
            <div className="single-product-right-title">
              <h2>
                <span>
                  {collection?.title}
                  {/* Bored Ape Yacht Club{" "} */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-patch-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                  </svg>
                </span>
                <span>Global Floor: 49.49</span>
              </h2>
              <ul>
                <li>
                  <svg
                    viewBox="0 0 32 32"
                    focusable="false"
                    className="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25 18C25 23.5228 20.5228 28 15 28C9.47715 28 5 23.5228 5 18C5 12.4772 9.47715 8 15 8H21.18L17.6 11.59L19 13L25 7L19 1L17.6 2.41L21.19 6H15C8.37258 6 3 11.3726 3 18C3 24.6274 8.37258 30 15 30C21.6274 30 27 24.6274 27 18H25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    viewBox="0 0 32 32"
                    focusable="false"
                    className="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26 23V27H6V23H4V27C4 28.1046 4.89543 29 6 29H26C27.1046 29 28 28.1046 28 27V23H26ZM8 10L9.41 11.4L15 5.83V24H17V5.83L22.59 11.4L24 10L16 2L8 10ZM4 17C4 15.8954 4.89543 15 6 15H11V17H6V23H4V17ZM28 17C28 15.8954 27.1046 15 26 15H21V17H26V23H28V17Z"
                      fill="currentColor"
                    ></path>
                  </svg>{" "}
                  Share
                </li>
              </ul>
            </div>
          </div>
          <div className="show-mobile">
            <div className="single-product-right-body">
              <h3>
                {nftDetail?.description}#{nftDetail?.tokenId}
              </h3>
              <div className="single-product-accordion-tab">
                <ul>
                  <li>
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        className="chakra-icon css-1gpu3vi"
                      >
                        <svg
                          viewBox="0 0 32 32"
                          focusable="false"
                          className="chakra-icon css-y9nrr9"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </svg>{" "}
                      8,780
                    </span>{" "}
                    <strong>Common</strong> <strong>Top 87.8%</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isLoading ? (
            <LoadingScreen>
              <ReactLoading type="cylon" color="#AAFF26" width={120} />
            </LoadingScreen>
          ) : (
            <img src={nftDetail?.image && nftDetail?.image} alt="pro" />
          )}
          <div className="show-mobile">
            <div className="single-product-right-offer-tab">
              <h2>
                Not listed{" "}
                <span>
                  Top Offer{" "}
                  <strong>
                    <svg
                      viewBox="0 0 48 96"
                      focusable="false"
                      className="chakra-icon css-14yq6wh"
                    >
                      <path
                        d="M23.9913 8.91397L23.4668 10.6955V62.3857L23.9913 62.909L47.9848 48.7262L23.9913 8.91397Z"
                        fill="#DF5960"
                      ></path>
                      <path
                        d="M23.9942 8.91397L0 48.7262L23.9942 62.909V37.82V8.91397Z"
                        fill="#EE9398"
                      ></path>
                      <path
                        d="M23.9909 67.4524L23.6953 67.8128V86.2252L23.9909 87.0881L47.9985 53.2773L23.9909 67.4524Z"
                        fill="#DF5960"
                      ></path>
                      <path
                        d="M23.9935 87.0879V67.4522L0 53.2772L23.9935 87.0879Z"
                        fill="#EE9398"
                      ></path>
                      <path
                        d="M23.9941 62.9063L47.987 48.7239L23.9941 37.818V62.9063Z"
                        fill="#CF373E"
                      ></path>
                      <path
                        d="M0 48.7242L23.9935 62.9066V37.8183L0 48.7242Z"
                        fill="#DF5960"
                      ></path>
                    </svg>
                    42
                  </strong>
                </span>
              </h2>
              {auth?.isLoggedIn && (
                <>
                  <GradientButton
                    label={"Make Offer"}
                    height={"42px"}
                    width={"144px"}
                    fontSize={"18px"}
                    isNoPadding
                    handleClick={() => setShowMakeOffer(true)}
                  />
                </>
              )}
              {/* {auth?.isLoggedIn === true && (
                <OutlineBox>{`${offerInfo?.copy}`}</OutlineBox>
              )} */}
              {auth?.isLoggedIn !== true && (
                <button onClick={showModal}>Make Offer</button>
              )}
            </div>
          </div>
          <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
            <Panel header="Properties" key="1">
              <div className="single-product-accordion-tab">
                <ul>
                  <li>
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        className="chakra-icon css-1gpu3vi"
                      >
                        <svg
                          viewBox="0 0 32 32"
                          focusable="false"
                          className="chakra-icon css-y9nrr9"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </svg>{" "}
                      8,780
                    </span>{" "}
                    <strong>Common</strong> <strong>Top 87.8%</strong>
                  </li>
                  <li>Guide</li>
                </ul>
                <div className="single-product-acc-list">
                  {properties?.items.map((item, index) => (
                    <div className="single-product-acc-list-item">
                      <div className="single-product-acc-list-item-head">
                        <strong>{item?.type}</strong>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li className="active"></li>
                          <li className="active"></li>
                          <li className="active"></li>
                        </ul>
                      </div>
                      <h4>{item?.name}</h4>
                      <p>
                        <strong>
                          {marketPercentages[index]}%{" "}
                          {/* {getMarketPercentage(item, properties?.creator)}%{" "} */}
                          <span>
                            <span>{percentages[index]}%</span>
                            {/* {getCreatorPercentage(item, properties?.creator)}%{" "} */}
                          </span>
                        </strong>{" "}
                        <strong>
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
                          </svg>
                          59
                        </strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
            <Panel header="Token Details" key="2">
              <div className="single-pro-token">
                <ul>
                  <li>
                    Token ID <strong>{tokenId}</strong>
                  </li>
                  <li>
                    Blockchain <strong>BSC</strong>
                  </li>
                  <li>
                    Token Standard <strong>ERC-1155</strong>
                  </li>
                </ul>
                <hr />
                <ul>
                  <li>
                    Contract{" "}
                    <a href="#">
                      {contractAddress}
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-qs2qk5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    Royalty <strong>0%</strong>
                  </li>
                </ul>
              </div>
            </Panel>
            <Panel header="Collection Details" key="3">
              <div className="collection-details-info">
                <div className="collection-details-info-head">
                  <img src={collection?.logo && collection.logo} alt="coll" />
                  <div className="collection-details-social">
                    <a href="#">
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-xjky65"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M28 4H4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4ZM28 6V8H4V6H28ZM4 10V26H28V10H4ZM8 14H19V16H8V14ZM21 19H8V21H21V19Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-xjky65"
                        aria-hidden="true"
                      >
                        <path
                          d="M25.2405 6.65646C23.5408 5.87659 21.7182 5.30202 19.8126 4.97294C19.7779 4.96659 19.7432 4.98246 19.7253 5.0142C19.4909 5.43111 19.2313 5.975 19.0495 6.40249C16.9998 6.09563 14.9607 6.09563 12.953 6.40249C12.7712 5.96549 12.5021 5.43111 12.2667 5.0142C12.2488 4.98352 12.2141 4.96765 12.1794 4.97294C10.2748 5.30097 8.45219 5.87554 6.7515 6.65646C6.73678 6.66281 6.72416 6.6734 6.71578 6.68715C3.25867 11.852 2.31163 16.8899 2.77622 21.8653C2.77832 21.8897 2.79198 21.913 2.8109 21.9277C5.0918 23.6028 7.30125 24.6197 9.46966 25.2937C9.50436 25.3043 9.54113 25.2916 9.56322 25.263C10.0762 24.5626 10.5334 23.824 10.9254 23.0473C10.9486 23.0018 10.9265 22.9478 10.8792 22.9298C10.1539 22.6547 9.46335 22.3193 8.79905 21.9383C8.7465 21.9077 8.7423 21.8325 8.79064 21.7965C8.93043 21.6918 9.07026 21.5828 9.20374 21.4727C9.22789 21.4526 9.26155 21.4484 9.28994 21.4611C13.6541 23.4536 18.3788 23.4536 22.6915 21.4611C22.7199 21.4473 22.7536 21.4516 22.7788 21.4717C22.9123 21.5817 23.0521 21.6918 23.1929 21.7965C23.2413 21.8325 23.2381 21.9077 23.1856 21.9383C22.5213 22.3267 21.8307 22.6547 21.1044 22.9288C21.0571 22.9468 21.036 23.0018 21.0592 23.0473C21.4596 23.8229 21.9169 24.5615 22.4203 25.262C22.4414 25.2916 22.4792 25.3043 22.5139 25.2937C24.6928 24.6197 26.9023 23.6028 29.1832 21.9277C29.2031 21.913 29.2158 21.8907 29.2179 21.8664C29.7739 16.1142 28.2866 11.1176 25.2751 6.6882C25.2678 6.6734 25.2552 6.66281 25.2405 6.65646ZM11.5772 18.8358C10.2632 18.8358 9.18061 17.6295 9.18061 16.1481C9.18061 14.6667 10.2422 13.4604 11.5772 13.4604C12.9225 13.4604 13.9947 14.6773 13.9737 16.1481C13.9737 17.6295 12.912 18.8358 11.5772 18.8358ZM20.438 18.8358C19.1241 18.8358 18.0415 17.6295 18.0415 16.1481C18.0415 14.6667 19.103 13.4604 20.438 13.4604C21.7834 13.4604 22.8555 14.6773 22.8345 16.1481C22.8345 17.6295 21.7834 18.8358 20.438 18.8358Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-xjky65"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.5491 25.7525C15.2712 25.7759 18.8476 24.3077 21.4796 21.6757C24.1115 19.0438 25.5798 15.4673 25.5564 11.7453V11.1016C26.5116 10.4018 27.3383 9.54181 28 8.5598C27.1006 8.95318 26.1488 9.21407 25.1745 9.33435C26.2075 8.71884 26.9826 7.74999 27.3564 6.60708C26.3937 7.18465 25.338 7.59068 24.2364 7.80708C22.7111 6.18187 20.2853 5.7819 18.319 6.83143C16.3527 7.88095 15.335 10.119 15.8364 12.2907C11.8783 12.0964 8.18962 10.2283 5.69091 7.15253C4.39814 9.39629 5.06589 12.2581 7.21818 13.698C6.45303 13.6685 5.70558 13.4592 5.03636 13.0871V13.1416C5.02235 15.4701 6.63569 17.4925 8.90909 17.9962C8.19742 18.1876 7.45196 18.2174 6.72727 18.0834C7.38175 20.0581 9.20747 21.4078 11.2873 21.4543C9.55187 22.8513 7.39501 23.6202 5.16727 23.6362C4.77668 23.6249 4.387 23.5921 4 23.538C6.25486 24.9746 8.8755 25.732 11.5491 25.7198"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-xjky65"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 6.163C19.204 6.163 19.584 6.175 20.85 6.233C24.102 6.381 25.621 7.924 25.769 11.152C25.827 12.417 25.838 12.797 25.838 16.001C25.838 19.206 25.826 19.585 25.769 20.85C25.62 24.075 24.105 25.621 20.85 25.769C19.584 25.827 19.206 25.839 16 25.839C12.796 25.839 12.416 25.827 11.151 25.769C7.891 25.62 6.38 24.07 6.232 20.849C6.174 19.584 6.162 19.205 6.162 16C6.162 12.796 6.175 12.417 6.232 11.151C6.381 7.924 7.896 6.38 11.151 6.232C12.417 6.175 12.796 6.163 16 6.163ZM16 4C12.741 4 12.333 4.014 11.053 4.072C6.695 4.272 4.273 6.69 4.073 11.052C4.014 12.333 4 12.741 4 16C4 19.259 4.014 19.668 4.072 20.948C4.272 25.306 6.69 27.728 11.052 27.928C12.333 27.986 12.741 28 16 28C19.259 28 19.668 27.986 20.948 27.928C25.302 27.728 27.73 25.31 27.927 20.948C27.986 19.668 28 19.259 28 16C28 12.741 27.986 12.333 27.928 11.053C27.732 6.699 25.311 4.273 20.949 4.073C19.668 4.014 19.259 4 16 4V4ZM16 9.838C12.597 9.838 9.838 12.597 9.838 16C9.838 19.403 12.597 22.163 16 22.163C19.403 22.163 22.162 19.404 22.162 16C22.162 12.597 19.403 9.838 16 9.838ZM16 20C13.791 20 12 18.21 12 16C12 13.791 13.791 12 16 12C18.209 12 20 13.791 20 16C20 18.21 18.209 20 16 20ZM22.406 8.155C21.61 8.155 20.965 8.8 20.965 9.595C20.965 10.39 21.61 11.035 22.406 11.035C23.201 11.035 23.845 10.39 23.845 9.595C23.845 8.8 23.201 8.155 22.406 8.155Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-1sdtgly"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.29427 14.9202C8.23713 15.0578 8.2077 15.2053 8.20767 15.3542H8.20745V22.4261C8.20724 22.6575 8.12207 22.8808 7.96813 23.0534C7.8142 23.226 7.60224 23.336 7.37256 23.3625C6.84438 23.4245 6.40013 23.4689 6.04332 23.5004C5.72393 23.529 5.40302 23.4657 5.11829 23.3181C4.83356 23.1704 4.59684 22.9445 4.43594 22.6669C3.5124 21.0575 2.93471 19.2729 2.73981 17.4272C2.54491 15.5815 2.73711 13.7154 3.3041 11.9483C3.87109 10.1812 4.80039 8.55204 6.03253 7.16507C7.26467 5.7781 8.77252 4.66385 10.4596 3.89362C12.1466 3.1234 13.9758 2.71416 15.8299 2.6921C17.6841 2.67004 19.5224 3.03565 21.2273 3.76552C22.9322 4.49539 24.466 5.57345 25.7308 6.93071C26.9955 8.28798 27.9632 9.89456 28.572 11.6477C28.6739 11.9444 28.7009 12.2619 28.6504 12.5716C28.6 12.8813 28.4737 13.1738 28.2829 13.4228C26.9677 15.1383 25.3104 16.5651 23.6752 17.7513V9.69882C23.6752 9.39858 23.5561 9.11063 23.3441 8.89823C23.1321 8.68583 22.8445 8.56635 22.5445 8.56606H20.6583C20.3582 8.56612 20.0704 8.68549 19.8582 8.89792C19.646 9.11034 19.5268 9.39843 19.5268 9.69882V19.4773C19.5267 19.663 19.4719 19.8446 19.3694 19.9993C19.2668 20.1541 19.121 20.2752 18.9501 20.3475C18.4902 20.5419 18.0179 20.7332 18.0179 20.7332V12.5306C18.0178 12.2302 17.8986 11.9421 17.6863 11.7297C17.4741 11.5173 17.1863 11.3979 16.8862 11.3978H14.998C14.6978 11.3979 14.41 11.5173 14.1977 11.7298C13.9855 11.9422 13.8663 12.2304 13.8663 12.5308V21.3683C13.8662 21.581 13.7944 21.7875 13.6624 21.9542C13.5305 22.121 13.3461 22.2382 13.1392 22.2869C12.8407 22.3573 12.5693 22.4243 12.3573 22.4872V15.3622C12.3573 15.0617 12.2381 14.7736 12.0258 14.5612C11.8136 14.3487 11.5257 14.2294 11.2256 14.2294L9.34313 14.2232C9.19429 14.2225 9.04677 14.2513 8.90906 14.3078C8.77134 14.3643 8.64614 14.4475 8.54064 14.5526C8.43513 14.6577 8.35141 14.7826 8.29427 14.9202ZM14.9547 29.2918C12.5037 29.0977 10.1541 28.2287 8.16595 26.781C15.4374 25.7463 24.4283 22.3481 29.2977 15.0789C29.3182 15.3811 29.3325 15.6841 29.3325 15.992C29.3329 18.4529 28.6532 20.866 27.3685 22.9642C26.0839 25.0624 24.2443 26.7641 22.0534 27.8808C19.8625 28.9976 17.4057 29.4859 14.9547 29.2918Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <h2>
                  {collection?.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-patch-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                  </svg>{" "}
                  <svg
                    viewBox="0 0 32 32"
                    focusable="false"
                    className="chakra-icon css-9aq5xt"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.0002 6.52L18.7602 12.1L19.2202 13.1L20.2202 13.25L26.3802 14.14L22.0002 18.44L21.2502 19.17L21.4302 20.17L22.4802 26.3L16.9702 23.41L16.0002 23L15.0702 23.49L9.56017 26.34L10.5602 20.21L10.7402 19.21L10.0002 18.44L5.58017 14.09L11.7402 13.2L12.7402 13.05L13.2002 12.05L16.0002 6.52ZM16.0003 2L11.4503 11.22L1.2803 12.69L8.64031 19.87L6.9003 30L16.0003 25.22L25.1003 30L23.3603 19.87L30.7203 12.7L20.5503 11.22L16.0003 2Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </h2>
                <h3>
                  <a href="#">
                    {contractAddress}
                    <svg
                      viewBox="0 0 32 32"
                      focusable="false"
                      className="chakra-icon css-qs2qk5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </h3>
                <div className="collection-avatar-list">
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                  <div className="collection-avatar-item">
                    <strong>
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
                    </strong>
                    <span>Floor 0%</span>
                  </div>
                </div>
                <button>Make a Collection Offer</button>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className="single-product-right">
          <div className="show-desktop">
            <div className="single-product-right-title">
              <h2>
                <span>
                  {collection?.title}
                  {/* Bored Ape Yacht Club{" "} */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-patch-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                  </svg>
                </span>
                <span>Global Floor: 49.49</span>
              </h2>
              <ul>
                <li>
                  <svg
                    viewBox="0 0 32 32"
                    focusable="false"
                    className="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25 18C25 23.5228 20.5228 28 15 28C9.47715 28 5 23.5228 5 18C5 12.4772 9.47715 8 15 8H21.18L17.6 11.59L19 13L25 7L19 1L17.6 2.41L21.19 6H15C8.37258 6 3 11.3726 3 18C3 24.6274 8.37258 30 15 30C21.6274 30 27 24.6274 27 18H25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    viewBox="0 0 32 32"
                    focusable="false"
                    className="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                    onClick={() => copyUrlToClipboard()}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26 23V27H6V23H4V27C4 28.1046 4.89543 29 6 29H26C27.1046 29 28 28.1046 28 27V23H26ZM8 10L9.41 11.4L15 5.83V24H17V5.83L22.59 11.4L24 10L16 2L8 10ZM4 17C4 15.8954 4.89543 15 6 15H11V17H6V23H4V17ZM28 17C28 15.8954 27.1046 15 26 15H21V17H26V23H28V17Z"
                      fill="currentColor"
                    ></path>
                  </svg>{" "}
                  Share
                </li>
              </ul>
            </div>
          </div>
          <div className="single-product-right-body">
            <div className="show-desktop">
              <h3>
                {nftDetail?.description} #{nftDetail?.tokenId}
              </h3>
              <div className="single-product-accordion-tab">
                <ul>
                  <li>
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        className="chakra-icon css-1gpu3vi"
                      >
                        <svg
                          viewBox="0 0 32 32"
                          focusable="false"
                          className="chakra-icon css-y9nrr9"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </svg>{" "}
                      8,780
                    </span>{" "}
                    <strong>Common</strong> <strong>Top 87.8%</strong>
                  </li>
                </ul>
              </div>
              <div className="single-product-right-offer-tab">
                <h2>
                  Not listed{" "}
                  <span>
                    Top Offer{" "}
                    <strong>
                      <svg
                        viewBox="0 0 48 96"
                        focusable="false"
                        className="chakra-icon css-14yq6wh"
                      >
                        <path
                          d="M23.9913 8.91397L23.4668 10.6955V62.3857L23.9913 62.909L47.9848 48.7262L23.9913 8.91397Z"
                          fill="#DF5960"
                        ></path>
                        <path
                          d="M23.9942 8.91397L0 48.7262L23.9942 62.909V37.82V8.91397Z"
                          fill="#EE9398"
                        ></path>
                        <path
                          d="M23.9909 67.4524L23.6953 67.8128V86.2252L23.9909 87.0881L47.9985 53.2773L23.9909 67.4524Z"
                          fill="#DF5960"
                        ></path>
                        <path
                          d="M23.9935 87.0879V67.4522L0 53.2772L23.9935 87.0879Z"
                          fill="#EE9398"
                        ></path>
                        <path
                          d="M23.9941 62.9063L47.987 48.7239L23.9941 37.818V62.9063Z"
                          fill="#CF373E"
                        ></path>
                        <path
                          d="M0 48.7242L23.9935 62.9066V37.8183L0 48.7242Z"
                          fill="#DF5960"
                        ></path>
                      </svg>
                      42
                    </strong>
                  </span>
                </h2>
                {auth?.isLoggedIn && (
                  <>
                    <GradientButton
                      label={"Make Offer"}
                      height={"42px"}
                      width={"144px"}
                      fontSize={"18px"}
                      isNoPadding
                      handleClick={() => setShowMakeOffer(true)}
                    />
                  </>
                )}
                {/* {auth?.isLoggedIn === true && (
                  <OutlineBox>{`${offerInfo?.copy}`}</OutlineBox>
                )} */}
                {auth?.isLoggedIn !== true && (
                  <button onClick={showModal}>Make Offer</button>
                )}
              </div>
            </div>

            <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
              <Panel header="Offers" key="1">
                <div className="collection-right-offer-list">
                  <Dropdown
                    menu={{
                      items: options,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      Price Low to High
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
                    </a>
                  </Dropdown>
                  <ul>
                    {offerList?.length > 0 ? (
                      offerList.map((offer) => (
                        <li key={offer.id}>
                          <span>
                            <svg
                              viewBox="0 0 48 96"
                              focusable="false"
                              className="chakra-icon css-14yq6wh"
                            >
                              <path
                                d="M23.9913 8.91397L23.4668 10.6955V62.3857L23.9913 62.909L47.9848 48.7262L23.9913 8.91397Z"
                                fill="#DF5960"
                              ></path>
                              <path
                                d="M23.9942 8.91397L0 48.7262L23.9942 62.909V37.82V8.91397Z"
                                fill="#EE9398"
                              ></path>
                              <path
                                d="M23.9909 67.4524L23.6953 67.8128V86.2252L23.9909 87.0881L47.9985 53.2773L23.9909 67.4524Z"
                                fill="#DF5960"
                              ></path>
                              <path
                                d="M23.9935 87.0879V67.4522L0 53.2772L23.9935 87.0879Z"
                                fill="#EE9398"
                              ></path>
                              <path
                                d="M23.9941 62.9063L47.987 48.7239L23.9941 37.818V62.9063Z"
                                fill="#CF373E"
                              ></path>
                              <path
                                d="M0 48.7242L23.9935 62.9066V37.8183L0 48.7242Z"
                                fill="#DF5960"
                              ></path>
                            </svg>{" "}
                            <strong>{offer.price.toFixed(2)}</strong> $
                            {offer.usd_price}
                            {/* 20% below floor */}
                          </span>
                          <span>
                            By
                            <a href="#">
                              <Popover content={popUpContent}>
                                {offer.from}
                              </Popover>
                            </a>
                            Expiry: in {offer.expire_date} days
                          </span>
                        </li>
                      ))
                    ) : (
                      <table>
                        <tbody>
                          <tr>
                            <td
                              colSpan={8}
                              style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <div className="no-result">
                                <div
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    width: "500px",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {t("There Are No Offers Yet")}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </ul>
                </div>
              </Panel>
              <Panel header="Activity" key="2">
                <div className="collection-right-activity-list">
                  <div className="collection-right-activity-head">
                    <ul>
                      <li>
                        <a href="#">Listings</a>
                      </li>
                      <li>
                        <a href="#">Mints</a>
                      </li>
                      <li>
                        <a href="#">Transfers</a>
                      </li>
                      <li>
                        <a href="#">Sales</a>
                      </li>
                      <li>
                        <a href="#">Offers</a>
                      </li>
                      <li>
                        <a href="#">Canceled Listings</a>
                      </li>
                      <li>
                        <a href="#">Canceled Offers</a>
                      </li>
                    </ul>
                  </div>
                  <div className="collection-right-activity-body">
                    <div className="collection-right-activity-body-item">
                      <div className="collection-right-activity-body-item-left">
                        <button>
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon chakra-icon css-ocdm8a"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                              fill="currentColor"
                            ></path>
                          </svg>{" "}
                          Transfer
                        </button>
                        <ul>
                          <li>
                            From{" "}
                            <a href="#">
                              <Popover content={popUpContent}>
                                pokeee.eth
                              </Popover>
                            </a>
                          </li>
                          <li>
                            To{" "}
                            <a href="#">
                              {" "}
                              <Popover content={popUpContent}>db5485</Popover>
                            </a>
                          </li>
                          <li>4 days ago</li>
                        </ul>
                      </div>
                      <div className="collection-right-activity-body-item-right">
                        <a href="#">
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-xjky65"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="collection-right-activity-body-item">
                      <div className="collection-right-activity-body-item-left">
                        <button>
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon chakra-icon css-ocdm8a"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                              fill="currentColor"
                            ></path>
                          </svg>{" "}
                          Transfer
                        </button>
                        <ul>
                          <li>
                            From{" "}
                            <a href="#">
                              <Popover content={popUpContent}>
                                pokeee.eth
                              </Popover>
                            </a>
                          </li>
                          <li>
                            To{" "}
                            <a href="#">
                              {" "}
                              <Popover content={popUpContent}>db5485</Popover>
                            </a>
                          </li>
                          <li>4 days ago</li>
                        </ul>
                      </div>
                      <div className="collection-right-activity-body-item-right">
                        <a href="#">
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-xjky65"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="collection-right-activity-body-item">
                      <div className="collection-right-activity-body-item-left">
                        <button>
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon chakra-icon css-ocdm8a"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                              fill="currentColor"
                            ></path>
                          </svg>{" "}
                          Transfer
                        </button>
                        <ul>
                          <li>
                            From{" "}
                            <a href="#">
                              <Popover content={popUpContent}>
                                pokeee.eth
                              </Popover>
                            </a>
                          </li>
                          <li>
                            To{" "}
                            <a href="#">
                              {" "}
                              <Popover content={popUpContent}>db5485</Popover>
                            </a>
                          </li>
                          <li>4 days ago</li>
                        </ul>
                      </div>
                      <div className="collection-right-activity-body-item-right">
                        <a href="#">
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-xjky65"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="collection-right-activity-body-item">
                      <div className="collection-right-activity-body-item-left">
                        <button>
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon chakra-icon css-ocdm8a"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                              fill="currentColor"
                            ></path>
                          </svg>{" "}
                          Transfer
                        </button>
                        <ul>
                          <li>
                            From{" "}
                            <a href="#">
                              <Popover content={popUpContent}>
                                pokeee.eth
                              </Popover>
                            </a>
                          </li>
                          <li>
                            To{" "}
                            <a href="#">
                              {" "}
                              <Popover content={popUpContent}>db5485</Popover>
                            </a>
                          </li>
                          <li>4 days ago</li>
                        </ul>
                      </div>
                      <div className="collection-right-activity-body-item-right">
                        <a href="#">
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-xjky65"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="collection-right-activity-body-item">
                      <div className="collection-right-activity-body-item-left">
                        <button>
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon chakra-icon css-ocdm8a"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                              fill="currentColor"
                            ></path>
                          </svg>{" "}
                          Transfer
                        </button>
                        <ul>
                          <li>
                            From{" "}
                            <a href="#">
                              <Popover content={popUpContent}>
                                pokeee.eth
                              </Popover>
                            </a>
                          </li>
                          <li>
                            To{" "}
                            <a href="#">
                              {" "}
                              <Popover content={popUpContent}>db5485</Popover>
                            </a>
                          </li>
                          <li>4 days ago</li>
                        </ul>
                      </div>
                      <div className="collection-right-activity-body-item-right">
                        <a href="#">
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-xjky65"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M26 28H6C4.89543 28 4 27.1046 4 26V6C4 4.89543 4.89543 4 6 4H15V6H6V26H26V17H28V26C28 27.1046 27.1046 28 26 28ZM21 2V4H26.59L18 12.59L19.41 14L28 5.41V11H30V2H21Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
      {/* connect wallet form */}
      {showConnectWallet && (
        <MainModal
          title={"My Wallet"}
          handleClose={() => setShowConnectWallet(false)}
        >
          <ConnectWalletForm
            goToSignIn={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            handleClose={() => setShowConnectWallet(false)}
          />
        </MainModal>
      )}
      {/* make an offer modal */}
      {showMakeOffer && (
        <MakeOfferModal
          title={"Make an Offer"}
          icon={<SaleNowIcon />}
          width={"556px"}
          height={"644px"}
          offerInfo={offerInfo}
          nftItem={nftDetail}
          refresh={refreshOfferList}
          handleClose={() => setShowMakeOffer(false)}
        ></MakeOfferModal>
      )}
      <Modal
        title="Make Offer"
        open={isModalOpen}
        centered
        onCancel={hideModel}
        footer={null}
      >
        <ConnectWalletModel>
          <h2>Connect a Wallet</h2>
          <p>
            GEX works great with Metamask, Coinbase Wallet, and most other
            Ethereum wallets.
          </p>
          <button onClick={handleConnectWallet}>Connect</button>
        </ConnectWalletModel>
      </Modal>
    </SingleProduct>
  );
}
