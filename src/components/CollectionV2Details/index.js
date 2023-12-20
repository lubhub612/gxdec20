import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "./styles";
import ReactLoading from "react-loading";
import { useGlobal } from "../../contexts/GlobalContext";
import useToast from "../../hooks/useToast";
import WalletModal from "../Shared/MainModal";
import { ConnectWalletForm } from "../Shared/ConnectWalletForm";
import ActivitySection from "../Shared/ActivitySection";
import TabOne from "./TabOne";
import { SearchOutlined } from "@ant-design/icons";
import {
  Tabs,
  Input,
  Dropdown,
  Collapse,
  Switch,
  InputNumber,
  Checkbox,
} from "antd";
import CollImg from "../../assets/images/coll-img.avif";
import CollImgItem from "../../assets/images/sample-item.avif";
import { CollectionMain } from "./styles";
import { useAuth } from "../../contexts/AuthContext";

const { Panel } = Collapse;
export default function CollectionV2Details() {
  const { contractAddress, walletAddress } = useParams();
  const location = useLocation();
  // const { walletAddress } = location?.state;
  const { invokeServer } = useGlobal();
  const { toastInfo, toastError } = useToast();
  const navigate = useNavigate();
  const { auth } = useAuth();

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
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [nftFound, setNFTFound] = useState([]);
  const [myNft, setmyNft] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedView, setselectedView] = useState(2);
  const [isWatching, setIsWatching] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [ownerInfo, setOwnerInfo] = useState({
    items: 0,
    holders: 0,
    floorPrice: 0.0,
    volumeTrade: 0.0,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleConnectWallet = () => {
    setIsModalOpen(false);
    setShowConnectWallet(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let address = walletAddress;

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
  const shareItems = [
    {
      key: "1",
      label: (
        <div
          onClick={() => copyUrlToClipboard()}
          style={{ position: "relative", padding: "0px 0px 0px 14px" }}
        >
          <svg
            style={{
              position: "absolute",
              top: 19,
              left: 10,
            }}
            class="w-5 h-5 -ml-0.5"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.389 2.171A2.25 2.25 0 0 1 6.25 2h9a2.25 2.25 0 0 1 2.25 2.25v13a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 4 17.25v-13a2.25 2.25 0 0 1 1.389-2.079ZM15.25 3.5h-9a.75.75 0 0 0-.75.75v13a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75Zm3.247 1.127L18.5 6.75v10.504a3.25 3.25 0 0 1-3.25 3.25H6.634a2.25 2.25 0 0 0 2.122 1.5h6.494a4.75 4.75 0 0 0 4.75-4.75V6.75a2.25 2.25 0 0 0-1.503-2.123Z"
              fill="currentColor"
            ></path>
          </svg>
          <a className="share-link">Copy Link</a>
        </div>
      ),
    },
  ];
  // Getting NFTs
  useEffect(() => {
    setisLoading(true);
    let ac = new AbortController();
    invokeServer("get", `/api/nft/owner?address=${address}&validBalance=`)
      .then((res) => {
        if (ac.signal.aborted === false) {
          if (res.data.result === 1) {
            let j;
            let rr = res.data.items;
            // console.log("log 1", rr);
            // simulated too many items...
            // for (j = 0; j < 1000; j++) {
            //   let t = JSON.parse(JSON.stringify(res.data.items[0]));
            //   rr[j] = t;
            // }

            setOwnedNFTs((t) => rr);
            setNFTFound((t) => []);
          } else {
            setOwnedNFTs((t) => []);
          }
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });

    invokeServer("get", `/api/user?address=${address}`)
      .then((res) => {
        if (ac.signal.aborted === false) {
          if (res.data.result === 1) {
            let j;
            let rr = res.data.user;
            setOwnerInfo((t) => {
              return { ...t, ...rr };
            });
          }
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });

    return () => ac.abort();
  }, [address]);

  const CheckIsFvrt = () => {
    let ac = new AbortController();
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user && auth?.isLoggedIn) {
      invokeServer(
        "get",
        `/api/collection/search-watch-list?user_id=${user.id}&collection_id=${collection.id}`
      )
        .then((res) => {
          if (ac.signal.aborted === false) {
            if (res.data.status) {
              setIsWatching(true);
            } else {
              setIsWatching(false);
            }
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    } else {
      setIsWatching(false);
    }
  };

  const AddRemoveWatchList = () => {
    setisLoading(true);
    let ac = new AbortController();
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (auth?.isLoggedIn && user) {
      invokeServer(
        "get",
        `/api/collection/add-remove-watch-list?user_id=${user.id}&collection_id=${collection.id}`
      )
        .then((res) => {
          if (ac.signal.aborted === false) {
            if (res.data.result === 1) {
              setisLoading(false);
              CheckIsFvrt();
            }
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    } else {
      handleConnectWallet();
      setIsWatching(false);
    }
  };
  useEffect(() => {
    CheckIsFvrt();
  }, [collection, auth]);

  useEffect(() => {
    let ac = new AbortController();

    let i,
      maxCount = 100;
    if (maxCount > ownedNFTs.length) maxCount = ownedNFTs.length;

    if (maxCount > 0) {
      let filters = ownedNFTs.slice(0, maxCount).map((item) => {
        return {
          collectionAddress: item.collectionAddress,
          tokenId: item.tokenId,
        };
      });
      // console.log("log 2", filters);

      invokeServer(
        "post",
        "/api/nft/lump",
        filters.map((t) => {
          return {
            collectionAddress: t.collectionAddress.toLowerCase(),
            tokenId: t.tokenId,
          };
        })
      )
        .then((res) => {
          if (res.data.result === 1) {
            if (ac.signal.aborted === false) {
              setNFTFound((t) => [...t, ...res.data.items]);
              // console.log("log 3", (t) => [...t, ...res.data.items]);
              if (ownedNFTs.length > maxCount) {
                setOwnedNFTs((t) => t.slice(maxCount, t.length));
              } else {
                setOwnedNFTs((t) => []);
              }
            }
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    } else {
      if (address !== "") {
        invokeServer("get", `/api/user/statistics?address=${address}`)
          .then((res) => {
            if (ac.signal.aborted === false) {
              if (res.data.result === 1) {
                setOwnerInfo((t) => {
                  return { ...t, ...res.data.info };
                });
              }
            }
          })
          .catch((err) => {
            console.log(`${err.message}`);
          });
      }
    }

    return () => ac.abort();
  }, [ownedNFTs]);

  // MY NFTs
  useEffect(() => {
    if (nftFound.length > 0) {
      const filteredObjects = nftFound.filter(
        (obj) => obj.collectionAddress === contractAddress
      );
      // console.log("filteredObjects", filteredObjects);
      setmyNft(filteredObjects);
      setisLoading(false);
    }
  }, [nftFound]);

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

  const [minPrice1, setMinPrice1] = useState(null);
  const [maxPrice1, setMaxPrice1] = useState(null);

  const items = [
    {
      key: "1",
      label: `NFTs`,
      children: (
        <TabOne
          setmyNft={setmyNft}
          collection={collection}
          myNft={myNft}
          setselectedView={setselectedView}
          isLoading={isLoading}
          selectedView={selectedView}
        />
      ),
    },
    // {
    //   key: "2",
    //   label: `Analytics`,
    //   children: <TabOne />,
    // },
    {
      key: "2",
      label: `Activity`,
      children: <ActivitySection />,
    },
  ];
  return (
    <CollectionMain>
      <div className="collection-details-area">
        <div className="collection-area-bg">
          <img
            src={collection?.photo ? collection.photo : CollImg}
            alt="banner"
          />
        </div>
        <div className="collection-details-area-inner">
          <div className="collection-details-left">
            <div className="collection-details-avatar">
              <img
                src={collection?.logo ? collection.logo : CollImg}
                alt="logo"
              />
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
                <div style={{ position: "relative", display: "inline-block" }}>
                  {isWatching ? (
                    <svg
                      // style={{ }}
                      class="star-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      // fill="currentColor"
                      // class="bi bi-star-fill"
                      viewBox="0 0 16 16"
                      onClick={() => AddRemoveWatchList()}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {" "}
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        fill="var(--text-color)"
                      ></path>{" "}
                    </svg>
                  ) : (
                    <svg
                      focusable="false"
                      viewBox="0 0 32 32"
                      className="chakra-icon css-9aq5xt"
                      aria-hidden="true"
                      onClick={() => AddRemoveWatchList()}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0002 6.52L18.7602 12.1L19.2202 13.1L20.2202 13.25L26.3802 14.14L22.0002 18.44L21.2502 19.17L21.4302 20.17L22.4802 26.3L16.9702 23.41L16.0002 23L15.0702 23.49L9.56017 26.34L10.5602 20.21L10.7402 19.21L10.0002 18.44L5.58017 14.09L11.7402 13.2L12.7402 13.05L13.2002 12.05L16.0002 6.52ZM16.0003 2L11.4503 11.22L1.2803 12.69L8.64031 19.87L6.9003 30L16.0003 25.22L25.1003 30L23.3603 19.87L30.7203 12.7L20.5503 11.22L16.0003 2Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                  {/* on hover popup */}
                  {isHovered && (
                    <div
                      className="chakra-popover__popper css-740s06"
                      style={{
                        visibility: "visible",
                        minWidth: "max-content",
                        "--popper-transform-origin": "top center",
                        position: "absolute",
                        inset: "0 auto auto 0",
                        margin: "0",
                        transform: "translate3d(-83px, 70px, 0px)",
                        // opacity: "0.5", // Set initial opacity to 0
                        // transition: "opacity 2s", // Add a transition property for opacity
                      }}
                    >
                      <section
                        style={{
                          transformOrigin: "var(--popper-transform-origin)",
                          "--popper-arrow-size": "16px",
                          opacity: "1",
                          visibility: "visible",
                          transform: "none",
                        }}
                        id="popover-content-:Red8rkulalf676H1:"
                        tabIndex="-1"
                        role="tooltip"
                        className="chakra-popover__content css-ndx8mv"
                        aria-describedby="popover-body-:Red8rkulalf676H1:"
                      >
                        <div
                          data-popper-arrow=""
                          className="chakra-popover__arrow-positioner css-0"
                          style={{
                            width: "16px",
                            height: "16px",
                            zIndex: "-1",
                            "--popper-arrow-size-half": "calc(16px / 2)",
                            "--popper-arrow-offset": "calc(16px * -1)",
                            position: "absolute",
                            left: "0",
                            transform: "translate3d(76.8px, 0, 0)",
                            top: "-6px",
                          }}
                        >
                          <div
                            className="chakra-popover__arrow css-looygl"
                            data-popper-arrow-inner=""
                            style={{
                              transform: "rotate(45deg)",
                              background: "#ffffff",
                              top: "0",
                              left: "20px",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              zIndex: "inherit",
                              boxShadow:
                                "-1px -1px 1px 0 var(--popper-arrow-shadow-color)",
                            }}
                          ></div>
                        </div>
                        <div
                          id="popover-body-:Red8rkulalf676H1:"
                          className="chakra-popover__body css-12g7zl4"
                        >
                          <div
                            style={{
                              color: "#000",
                              fontSize: "14px",
                              fontWeight: 700,
                            }}
                            className="chakra-text css-vmox5t"
                          >
                            {isWatching
                              ? "Remove from Main Watchlist"
                              : "  Add to Main Watchlist"}
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </div>
                <strong>
                  {myNft?.length}{" "}
                  <span> {myNft?.length <= 1 ? "NFT" : "NFTs"} </span>
                </strong>
              </h2>
            </div>
            <p>
              {collection?.description
                ? collection.description
                : " The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereumblockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits."}
            </p>
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
                  36.6
                </strong>
                <span>
                  Floor
                  <span>0%</span>
                </span>
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
                  4.69K
                </strong>
                <span>
                  24h Vol
                  <span>0%</span>
                </span>
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
                  33.4K
                </strong>
                <span>7d Vol 0%</span>
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
                  1.46M
                </strong>
                <span>Total Vol 0%</span>
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
                  30
                </strong>
                <span>Best Offer</span>
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
                  5.5K
                </strong>
                <span>Owners 0%</span>
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
                  405.4K
                </strong>
                <span>M. Cap</span>
              </div>
            </div>
          </div>
          <div className="collection-details-right">
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
            <a
              onClick={() => copyUrlToClipboard()}
              style={{ cursor: "pointer" }}
            >
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1sdtgly"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26 23V27H6V23H4V27C4 28.1046 4.89543 29 6 29H26C27.1046 29 28 28.1046 28 27V23H26ZM8 10L9.41 11.4L15 5.83V24H17V5.83L22.59 11.4L24 10L16 2L8 10ZM4 17C4 15.8954 4.89543 15 6 15H11V17H6V23H4V17ZM28 17C28 15.8954 27.1046 15 26 15H21V17H26V23H28V17Z"
                  fill="currentColor"
                ></path>
              </svg>{" "}
              Share
            </a>
            {/* <Dropdown
              menu={{
                items: shareItems,
              }}
              // trigger={["click"]}
            >
            </Dropdown> */}
          </div>
        </div>
      </div>
      <div className="tab-content">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
      {showConnectWallet && (
        <WalletModal
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
        </WalletModal>
      )}
    </CollectionMain>
  );
}
