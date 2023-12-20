import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Input, Dropdown, Drawer, Space, Modal, AutoComplete } from "antd";
import { HeaderArea, CusModelArea } from "./styles";
import desktopLogo from "../../assets/images/logo-desktop.png";
import desktopLogoDark from "../../assets/images/logo-desktop-dark.png";
import mobileLogo from "../../assets/images/logo-mobile.png";
import mobileLogoDark from "../../assets/images/logo-mobile-dark.png";
import BiWallet from "@meronex/icons/bi/BiWallet";
import Meta1 from "../../assets/images/icons/1.svg";
import Meta2 from "../../assets/images/icons/2.svg";
import Meta3 from "../../assets/images/icons/3.svg";
import Meta4 from "../../assets/images/icons/4.svg";
import Meta5 from "../../assets/images/icons/5.svg";
import Meta6 from "../../assets/images/icons/6.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MainModal from "../Shared/MainModal";
import { ConnectWalletForm } from "../Shared/ConnectWalletForm";
import { useAuth } from "../../contexts/AuthContext";
import PopUpIconMenu from "./../Shared/PopUpIconMenu";
import PopUpNotificationItem from "../Shared/PopUpNotificationItem";
import PopUpUserProfileItem from "../Shared/PopUpUserProfileItem";
import UserAvatar from "../Shared/UserAvatar";
import { useCustomWallet } from "../../contexts/WalletContext";
import { useGlobal } from "../../contexts/GlobalContext";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import {
  BellActiveIcon,
  BellInActiveIcon,
  CloseIcon,
  DiscordIcon,
  MenuIcon,
  TelegramIcon,
  TwitterIcon,
  VerifiedIcon,
} from "../Shared/SvgIcons";

const { Search } = Input;

export const Header = ({ theme, toggleTheme }) => {
  const DeskLogo = theme === "dark" ? desktopLogo : desktopLogoDark;
  const MobiLogo = theme === "dark" ? mobileLogo : mobileLogoDark;
  const { auth } = useAuth();
  const { wallet, getWalletAddressBySessionKey } = useCustomWallet();
  const { invokeServer } = useGlobal();
  let navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [search, setSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [notItems, setNotItems] = useState([]);

  const {  address, isConnected } = useAccount();

  useEffect(() => {
    if (auth.isLoggedIn !== true) {
      if (
        location.pathname.includes("/settings") ||
        location.pathname.includes("/profile")
      ) {
        navigate("/");
      }
    }
  }, [auth.isLoggedIn]);
  useEffect(() => {
    auth.avatarURI && auth.avatarURI !== "" && setAvatar(auth.avatarURI);
  }, [auth.avatarURI]);

  useEffect(() => {
    let ac = new AbortController();

    const loadNotification = () => {
      invokeServer(
        "get",
        `/api/notification?address=${getWalletAddressBySessionKey()}`
      )
        .then((r) => {
          if (ac.signal.aborted) return;

          if (
            r.data.items !== undefined &&
            JSON.stringify(r.data.items) !== JSON.stringify(notItems)
          ) {
            setNotItems((t) => r.data.items);
          }
          setTimeout(loadNotification, 10000);
        })
        .catch((err) => {
          console.log(`${err.message}`);
          if (ac.signal.aborted) return;
          setTimeout(loadNotification, 3000);
        });
    };

    loadNotification();

    return () => ac.abort();
  }, []);

  const handleConnectWallet = () => {
    setIsMenu(false);
    setShowConnectWallet(true);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModel = () => {
    setIsModalOpen(false);
  };
  const searchModel = () => {
    setSearch(true);
  };
  const hideSearchModel = () => {
    setSearch(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawer2 = () => {
    setOpen2(true);
  };
  const showDrawer3 = () => {
    setOpen3(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
  const onClose3 = () => {
    setOpen3(false);
  };
  const aiItems = [
    {
      key: "1",
      label: <a onClick={() => navigate("/gallery")}>My Images</a>,
    },
    {
      key: "2",
      label: (
        <a onClick={() => navigate("/purchase-credit")}>Purchase Credit</a>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={() => navigate("/transactions")}>Transaction History</a>
      ),
    },
  ];
  const rewardItems = [
    {
      key: "1",
      label: <a onClick={() => navigate("/reward/1")}>Protocol</a>,
    },
    {
      key: "2",
      label: <a onClick={() => navigate("/reward/2")}>Listing & Trading</a>,
    },
  ];
  const items = [
    {
      key: "1",
      label: <a href="#!">العربية</a>,
    },
    {
      key: "2",
      label: <a href="#!">Deutsch</a>,
    },
    {
      key: "3",
      label: <a href="#!"> English (UK)</a>,
    },
    {
      key: "4",
      label: <a href="#!">English (US)</a>,
    },
    {
      key: "5",
      label: <a href="#!">Français</a>,
    },
    {
      key: "6",
      label: <a href="#!">Italiano</a>,
    },
    {
      key: "7",
      label: <a href="#!">русский</a>,
    },
    {
      key: "8",
      label: <a href="#!">Türk</a>,
    },
  ];

  // search field new
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [resData, setresData] = useState({});

  const handleSearch = (e) => {
    // console.log("event", e.target.value);
    setsearchTerm(e.target.value);

    if (e.target.value) {
      invokeServer(
        "get",
        `/api/collection/search-item?searchTerm=${e.target.value}`
      )
        .then((res) => {
          if (res.data.result === 1) {
            // console.log("resonse", res.data);
            setresData(res.data);
            // props.setCollections(res.data.collections);
          }
        })
        .catch((err) => {
          console.log("search-err:", err.message);
          // toastError("Fail:", err.message);
        });
    } else {
      setresData({});
    }
  };

  const handleFocus = () => {
    // console.log("focus");
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // setresData({});
    // setsearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("modal-content-id"); // Replace "dropdown-id" with the actual ID of your dropdown element
      if (dropdown && !dropdown.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleModalContainerClick = (event) => {
    // Check if the click occurred within the modal content
    const modalContent = document.getElementById("modal-content-id"); // Replace "modal-content-id" with the actual ID of your modal content element
    console.log("modalContent", modalContent);
    const isClickWithinModal =
      modalContent && modalContent.contains(event.target);

    // Hide the modal only if the click occurred outside the modal content
    if (!isClickWithinModal) {
      setIsFocused(false);

      // Code to hide the modal
    }
  };
  return (
    <HeaderArea>
      <div className="header-desktop">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={DeskLogo} alt="logo" className="header-logo" />
        </div>
        <div
          id="modal-content-id"
          onClick={handleModalContainerClick}
          className="search"
        >
          <div>
            <section
              class="chakra-modal__content css-t62k45"
              role="dialog"
              id="chakra-modal-:Rdlf676:"
              tabindex="-1"
              aria-modal="true"
              aria-describedby="chakra-modal--body-:Rdlf676:"
            >
              {/* input */}
              <div
                class={` ${isFocused == true ? "focused-bg" : "css-srnkcy"}`}
              >
                <div class="css-13pmxen">
                  <div
                    class={`chakra-input__group css-4302v8 ${
                      isFocused == true ? "css-4302v8-focused" : ""
                    }`}
                  >
                    <div class="chakra-input__left-element css-1i774xg">
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        class="chakra-icon css-bcoo9n"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.75 10.5C18.7508 12.4206 18.0735 14.2799 16.8375 15.75L22.5 21.4425L21.4425 22.5L15.75 16.8375C14.2799 18.0735 12.4206 18.7508 10.5 18.75C5.94365 18.75 2.25 15.0563 2.25 10.5C2.25 5.94365 5.94365 2.25 10.5 2.25C15.0563 2.25 18.75 5.94365 18.75 10.5ZM3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25C14.2279 17.25 17.25 14.2279 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <input
                      placeholder="Collections, Items, Profiles"
                      data-id="search-input-algolia-search"
                      type="search"
                      className={`chakra-input css-zw5jei`}
                      value={searchTerm}
                      onFocus={() => handleFocus()}
                      // onBlur={() => handleBlur()}
                      onChange={handleSearch}
                    />
                  </div>
                  {/* <div class="css-0">
                    <button type="button" class="chakra-button css-14n1r5f">
                      Cancel
                    </button>
                  </div> */}
                </div>
              </div>
              {/* drop down */}
              <div
                class={`chakra-modal__body css-p4firc ${
                  isFocused ? "focused" : ""
                }`}
              >
                <div class="css-j7qwjs">
                  <div class="css-gzn1bh">
                    {/* left side */}
                    {/* <div class="css-1vowvxp">
                      <div
                        id="popover-trigger-:r64:"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="popover-content-:r64:"
                        class="css-70qvj9"
                      >
                        <div class="chakra-text css-1f985zb">Trending</div>
                        <svg
                          viewBox="0 0 32 32"
                          width="18px"
                          focusable="false"
                          class="chakra-icon css-1cgkvx"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 16C2 8.26801 8.26801 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM17.5 23.5C17.5 24.3284 16.8284 25 16 25C15.1716 25 14.5 24.3284 14.5 23.5C14.5 22.6716 15.1716 22 16 22C16.8284 22 17.5 22.6716 17.5 23.5ZM17 8.00001H15.5C14.3057 7.99735 13.1596 8.4706 12.3151 9.31509C11.4706 10.1596 10.9973 11.3057 11 12.5V13H13V12.5C13 11.1193 14.1193 10 15.5 10H17C18.3807 10 19.5 11.1193 19.5 12.5C19.5 13.8807 18.3807 15 17 15H15V19.5H17V17C19.4853 17 21.5 14.9853 21.5 12.5C21.5 10.0147 19.4853 8.00001 17 8.00001ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div class="chakra-popover__popper css-740s06 class-111">
                        <section
                          id="popover-content-:r64:"
                          tabindex="-1"
                          role="tooltip"
                          class="chakra-popover__content css-1nc29x7 class-123"
                        ></section>
                      </div>
                    </div> */}
                  </div>
                  {/* right side */}
                  <div class="chakra-stack css-duli2z">
                    {/* {console.log("res", resData)} */}
                    {resData?.collections?.length == 0 &&
                      resData?.nfts?.length == 0 &&
                      resData?.profiles?.length == 0 && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "350px",
                          }}
                        >
                          <div
                            style={{ textAlign: "center" }}
                            class="chakra-text css-1f985zb"
                          >
                            No Results
                          </div>
                        </div>
                      )}

                    {searchTerm === "" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "350px",
                        }}
                      >
                        <div
                          style={{ textAlign: "center" }}
                          class="chakra-text css-1f985zb"
                        >
                          Trendings
                        </div>
                      </div>
                    )}
                    {/* mapping collections */}
                    {searchTerm && resData?.collections?.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          borderBottom:
                            resData?.nfts?.length || resData?.profiles?.length
                              ? "1px solid #2a3136"
                              : "",
                        }}
                      >
                        {/* left */}
                        <div class="css-1vowvxp">
                          <div
                            id="popover-trigger-:r64:"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r64:"
                            class="css-70qvj9"
                          >
                            <div class="chakra-text css-1f985zb">
                              Collections
                            </div>
                          </div>
                          <div class="chakra-popover__popper css-740s06 class-111">
                            <section
                              id="popover-content-:r64:"
                              tabindex="-1"
                              role="tooltip"
                              class="chakra-popover__content css-1nc29x7 class-123"
                            ></section>
                          </div>
                        </div>
                        <div>
                          {resData?.collections?.length &&
                            resData.collections.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  display="flex"
                                  flexDirection="column"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    // event.stopPropagation(); // Prevent the click event from propagating to the dropdown and triggering handleBlur
                                    navigate(
                                      `/collections-details/${item.contractAddress.toLowerCase()}/${item.walletAddress.toLowerCase()}`,

                                      {
                                        replace: true,
                                        state: {
                                          walletAddress:
                                            item.walletAddress.toLowerCase(),
                                        },
                                      }
                                    );
                                    setIsFocused(false);
                                  }}
                                >
                                  <div
                                    data-id="trending-collection-item-link"
                                    class="css-sz3opf"
                                  >
                                    <a>
                                      <div class="css-m7uh5z">
                                        <img
                                          alt=""
                                          aria-hidden="true"
                                          src={item.logoURI}
                                          class="class-127"
                                        />

                                        <div class="css-1n1ctis">
                                          <div class="css-70qvj9">
                                            <div class="chakra-text css-p1egjx">
                                              {item.name}
                                            </div>
                                            {item?.verified == "1" && (
                                              <svg
                                                viewBox="0 0 32 32"
                                                focusable="false"
                                                class="chakra-icon css-r7tori"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M19.4171 3.24982L16.0007 1.33337L12.5842 3.24982L8.66732 3.29834L6.66684 6.66623L3.29895 8.66671L3.25043 12.5836L1.33398 16L3.25043 19.4165L3.29895 23.3334L6.66684 25.3338L8.66732 28.7017L12.5842 28.7503L16.0007 30.6667L19.4171 28.7503L23.334 28.7017L25.3345 25.3338L28.7024 23.3334L28.7509 19.4165L30.6673 16L28.7509 12.5836L28.7024 8.66671L25.3345 6.66623L23.334 3.29834L19.4171 3.24982ZM9.00065 16.5L14.0007 21.5L23.0007 12.6L21.4007 11L14.0007 18.4L10.6007 15L9.00065 16.5Z"
                                                  fill="currentColor"
                                                ></path>
                                              </svg>
                                            )}
                                            {/* <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon css-1k7xb4v"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 20.9288C13.2795 20.9288 11.0718 18.7233 11.0718 16.0002C11.0718 13.2771 13.2795 11.0716 16.0004 11.0716C18.7212 11.0716 20.9289 13.2771 20.9289 16.0002C20.9289 18.7233 18.7212 20.9288 16.0004 20.9288ZM15.9997 18.1429C14.8167 18.1429 13.8569 17.184 13.8569 16.0001C13.8569 14.8161 14.8167 13.8572 15.9997 13.8572C17.1827 13.8572 18.1426 14.8161 18.1426 16.0001C18.1426 17.184 17.1827 18.1429 15.9997 18.1429Z" fill="url(#paint0_linear_635_161)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 1L28.9908 8.5V23.5L16.0004 31L3.01001 23.5V8.5L16.0004 1ZM23.2541 12.559L26.7147 16L23.2541 19.441C19.248 23.4244 12.7528 23.4244 8.74664 19.441L5.28611 16L8.74663 12.559C12.7528 8.57556 19.248 8.57556 23.2541 12.559Z" fill="url(#paint1_linear_635_161)"></path><defs><linearGradient id="paint0_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient><linearGradient id="paint1_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient></defs></svg> */}
                                          </div>
                                          {/* <div class="css-70qvj9">
                                            <div class="css-70qvj9">
                                              <div class="chakra-text css-1qc5mst">
                                                Total vol:
                                              </div>
                                              <svg
                                                viewBox="0 0 48 96"
                                                focusable="false"
                                                class="chakra-icon css-tnns6f"
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
                                              <div class="chakra-text css-1wsgt1t">
                                                40,564.62
                                              </div>
                                            </div>

                                          </div> */}
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  {index == resData.collections.length - 1 && (
                                    <div class="css-1yhfq38">
                                      <button
                                        type="button"
                                        class="chakra-button css-13k3jxb"
                                        data-id="collection-desktop-search-results-load-more"
                                      >
                                        More
                                        <span class="chakra-button__icon css-1hzyiq5">
                                          <svg
                                            class="bi bi-chevron-down chakra-icon css-flssse"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="10"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                              fill="white"
                                            ></path>{" "}
                                          </svg>
                                          {/* <svg
                                          viewBox="0 0 32 32"
                                          focusable="false"
                                          class="chakra-icon css-flssse"
                                          aria-hidden="true"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z"
                                            fill="currentColor"
                                          ></path>
                                        </svg> */}
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {/* mapping nft */}
                    {searchTerm && resData?.nfts?.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          borderBottom:
                            resData?.profiles?.length && "1px solid #2a3136",
                        }}
                      >
                        {/* left */}
                        <div class="css-1vowvxp">
                          <div
                            id="popover-trigger-:r64:"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r64:"
                            class="css-70qvj9"
                          >
                            <div class="chakra-text css-1f985zb">Nfts</div>
                          </div>
                          <div class="chakra-popover__popper css-740s06 class-111">
                            <section
                              id="popover-content-:r64:"
                              tabindex="-1"
                              role="tooltip"
                              class="chakra-popover__content css-1nc29x7 class-123"
                            ></section>
                          </div>
                        </div>
                        <div>
                          {resData?.nfts?.length &&
                            resData.nfts.map((item, index) => {
                              return (
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                                    )
                                  }
                                  display="flex"
                                  flexDirection="column"
                                >
                                  <div
                                    data-id="trending-collection-item-link"
                                    class="css-sz3opf"
                                  >
                                    <a>
                                      <div class="css-m7uh5z">
                                        <img
                                          alt=""
                                          aria-hidden="true"
                                          src={item.image}
                                          class="class-127"
                                        />

                                        <div class="css-1n1ctis">
                                          <div class="css-70qvj9">
                                            <div class="chakra-text css-p1egjx">
                                              {item.title}
                                            </div>
                                            {/* <svg
                                              viewBox="0 0 32 32"
                                              focusable="false"
                                              class="chakra-icon css-r7tori"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.4171 3.24982L16.0007 1.33337L12.5842 3.24982L8.66732 3.29834L6.66684 6.66623L3.29895 8.66671L3.25043 12.5836L1.33398 16L3.25043 19.4165L3.29895 23.3334L6.66684 25.3338L8.66732 28.7017L12.5842 28.7503L16.0007 30.6667L19.4171 28.7503L23.334 28.7017L25.3345 25.3338L28.7024 23.3334L28.7509 19.4165L30.6673 16L28.7509 12.5836L28.7024 8.66671L25.3345 6.66623L23.334 3.29834L19.4171 3.24982ZM9.00065 16.5L14.0007 21.5L23.0007 12.6L21.4007 11L14.0007 18.4L10.6007 15L9.00065 16.5Z"
                                                fill="currentColor"
                                              ></path>
                                            </svg> */}
                                            {/* <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon css-1k7xb4v"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 20.9288C13.2795 20.9288 11.0718 18.7233 11.0718 16.0002C11.0718 13.2771 13.2795 11.0716 16.0004 11.0716C18.7212 11.0716 20.9289 13.2771 20.9289 16.0002C20.9289 18.7233 18.7212 20.9288 16.0004 20.9288ZM15.9997 18.1429C14.8167 18.1429 13.8569 17.184 13.8569 16.0001C13.8569 14.8161 14.8167 13.8572 15.9997 13.8572C17.1827 13.8572 18.1426 14.8161 18.1426 16.0001C18.1426 17.184 17.1827 18.1429 15.9997 18.1429Z" fill="url(#paint0_linear_635_161)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 1L28.9908 8.5V23.5L16.0004 31L3.01001 23.5V8.5L16.0004 1ZM23.2541 12.559L26.7147 16L23.2541 19.441C19.248 23.4244 12.7528 23.4244 8.74664 19.441L5.28611 16L8.74663 12.559C12.7528 8.57556 19.248 8.57556 23.2541 12.559Z" fill="url(#paint1_linear_635_161)"></path><defs><linearGradient id="paint0_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient><linearGradient id="paint1_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient></defs></svg> */}
                                          </div>
                                          <div class="css-70qvj9">
                                            <div class="css-70qvj9">
                                              <div class="chakra-text css-1qc5mst">
                                                Total vol:
                                              </div>
                                              <svg
                                                viewBox="0 0 48 96"
                                                focusable="false"
                                                class="chakra-icon css-tnns6f"
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
                                              <div class="chakra-text css-1wsgt1t">
                                                40,564.62
                                              </div>
                                            </div>
                                            {/* <div class="css-1xzsyzi"><hr aria-orientation="vertical" class="chakra-divider css-l5iwz0"></div> */}
                                            {/* <div class="css-70qvj9"><div class="chakra-text css-ov6ctj">Items:</div>
                                  <div class="chakra-text css-1wsgt1t">20,000</div>
                                </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  {index == resData.nfts.length - 1 && (
                                    <div class="css-1yhfq38">
                                      <button
                                        type="button"
                                        class="chakra-button css-13k3jxb"
                                        data-id="collection-desktop-search-results-load-more"
                                      >
                                        More
                                        <span class="chakra-button__icon css-1hzyiq5">
                                          <svg
                                            class="bi bi-chevron-down chakra-icon css-flssse"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                              fill="white"
                                            ></path>{" "}
                                          </svg>
                                          {/* <svg
                                          viewBox="0 0 32 32"
                                          focusable="false"
                                          class="chakra-icon css-flssse"
                                          aria-hidden="true"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z"
                                            fill="currentColor"
                                          ></path>
                                        </svg> */}
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {/* mapping profiles */}
                    {searchTerm && resData?.profiles?.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {/* left */}
                        <div class="css-1vowvxp">
                          <div
                            id="popover-trigger-:r64:"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r64:"
                            class="css-70qvj9"
                          >
                            <div class="chakra-text css-1f985zb">Profiles</div>
                          </div>
                          <div class="chakra-popover__popper css-740s06 class-111">
                            <section
                              id="popover-content-:r64:"
                              tabindex="-1"
                              role="tooltip"
                              class="chakra-popover__content css-1nc29x7 class-123"
                            ></section>
                          </div>
                        </div>
                        <div>
                          {resData?.profiles?.length &&
                            resData.profiles.map((item, index) => {
                              return (
                                <div display="flex" flexDirection="column">
                                  <div
                                    data-id="trending-collection-item-link"
                                    class="css-sz3opf"
                                  >
                                    <a href="/collections/0xd774557b647330C91Bf44cfEAB205095f7E6c367">
                                      <div class="css-m7uh5z">
                                        <img
                                          alt=""
                                          aria-hidden="true"
                                          src="https://thumbs.dreamstime.com/b/man-icon-vector-user-person-profile-avatar-flat-color-glyph-pictogram-man-icon-vector-user-person-profile-avatar-flat-color-117610372.jpg"
                                          class="class-127"
                                        />

                                        <div class="css-1n1ctis">
                                          <div class="css-70qvj9">
                                            <div class="chakra-text css-p1egjx">
                                              {item.name}
                                            </div>
                                            <svg
                                              viewBox="0 0 32 32"
                                              focusable="false"
                                              class="chakra-icon css-r7tori"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.4171 3.24982L16.0007 1.33337L12.5842 3.24982L8.66732 3.29834L6.66684 6.66623L3.29895 8.66671L3.25043 12.5836L1.33398 16L3.25043 19.4165L3.29895 23.3334L6.66684 25.3338L8.66732 28.7017L12.5842 28.7503L16.0007 30.6667L19.4171 28.7503L23.334 28.7017L25.3345 25.3338L28.7024 23.3334L28.7509 19.4165L30.6673 16L28.7509 12.5836L28.7024 8.66671L25.3345 6.66623L23.334 3.29834L19.4171 3.24982ZM9.00065 16.5L14.0007 21.5L23.0007 12.6L21.4007 11L14.0007 18.4L10.6007 15L9.00065 16.5Z"
                                                fill="currentColor"
                                              ></path>
                                            </svg>
                                            {/* <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon css-1k7xb4v"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 20.9288C13.2795 20.9288 11.0718 18.7233 11.0718 16.0002C11.0718 13.2771 13.2795 11.0716 16.0004 11.0716C18.7212 11.0716 20.9289 13.2771 20.9289 16.0002C20.9289 18.7233 18.7212 20.9288 16.0004 20.9288ZM15.9997 18.1429C14.8167 18.1429 13.8569 17.184 13.8569 16.0001C13.8569 14.8161 14.8167 13.8572 15.9997 13.8572C17.1827 13.8572 18.1426 14.8161 18.1426 16.0001C18.1426 17.184 17.1827 18.1429 15.9997 18.1429Z" fill="url(#paint0_linear_635_161)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0004 1L28.9908 8.5V23.5L16.0004 31L3.01001 23.5V8.5L16.0004 1ZM23.2541 12.559L26.7147 16L23.2541 19.441C19.248 23.4244 12.7528 23.4244 8.74664 19.441L5.28611 16L8.74663 12.559C12.7528 8.57556 19.248 8.57556 23.2541 12.559Z" fill="url(#paint1_linear_635_161)"></path><defs><linearGradient id="paint0_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient><linearGradient id="paint1_linear_635_161" x1="29" y1="31" x2="3" y2="0.999998" gradientUnits="userSpaceOnUse"><stop stop-color="#EE5396"></stop><stop offset="0.679053" stop-color="#A56EFF"></stop></linearGradient></defs></svg> */}
                                          </div>
                                          <div class="css-70qvj9">
                                            <div class="css-70qvj9">
                                              <div class="chakra-text css-1qc5mst">
                                                {item?.businessName}
                                              </div>
                                              {/* <svg
                                                viewBox="0 0 48 96"
                                                focusable="false"
                                                class="chakra-icon css-tnns6f"
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
                                              <div class="chakra-text css-1wsgt1t">
                                                40,564.62
                                              </div> */}
                                            </div>
                                            {/* <div class="css-1xzsyzi"><hr aria-orientation="vertical" class="chakra-divider css-l5iwz0"></div> */}
                                            {/* <div class="css-70qvj9"><div class="chakra-text css-ov6ctj">Items:</div>
                                  <div class="chakra-text css-1wsgt1t">20,000</div>
                                </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  {index == resData.profiles.length - 1 && (
                                    <div class="css-1yhfq38">
                                      <button
                                        type="button"
                                        class="chakra-button css-13k3jxb"
                                        data-id="collection-desktop-search-results-load-more"
                                      >
                                        More
                                        <span class="chakra-button__icon css-1hzyiq5">
                                          <svg
                                            class="bi bi-chevron-down chakra-icon css-flssse"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                              fill="white"
                                            ></path>{" "}
                                          </svg>
                                          {/* <svg
                                          viewBox="0 0 32 32"
                                          focusable="false"
                                          class="chakra-icon css-flssse"
                                          aria-hidden="true"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z"
                                            fill="currentColor"
                                          ></path>
                                        </svg> */}
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
          /> */}
          {/* <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            className="custom-dropdown"
            // style={{
            //   width: 250,
            // }}
            options={options}
          >
            <Input.Search
              prefix={<SearchOutlined />}
              size="large"
              placeholder="Search"
            />
          </AutoComplete> */}
        </div>
        <div className="menu">
          <ul>
            <li className="image-li">
              <Dropdown
                menu={{
                  items: aiItems,
                }}
                // trigger={["click"]}
              >
                <a onClick={() => navigate("/ai-images")}>AI Image Generator</a>
              </Dropdown>
            </li>
            <li>
              <a onClick={() => navigate("/collections")}>Collections</a>
            </li>

            <li style={{ position: "relative" }}>
              <Dropdown
                menu={{
                  items: rewardItems,
                }}
                // trigger={["click"]}
              >
                <a
                  className="blinking-colors"
                  // onClick={(e) => e.preventDefault()}
                >
                  Rewards
                </a>
              </Dropdown>

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
            </li>
            <li>
              <a onClick={() => navigate("/buy-GX-token")}>Buy GEX</a>
            </li>
          </ul>
        </div>
        <div className="account-icons">
          <ul>
            <li onClick={toggleTheme}>
              <a>
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-sun-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    class="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.2496 2.25H11.0996C6.1039 3.07781 2.55739 7.56949 2.911 12.621C3.2646 17.6725 7.40229 21.6263 12.4646 21.75H12.8321C16.0292 21.7519 19.0266 20.1958 20.8646 17.58C21.0194 17.3511 21.0357 17.0556 20.9072 16.811C20.7786 16.5664 20.5259 16.4123 20.2496 16.41C17.2164 16.1372 14.4818 14.4711 12.8485 11.9007C11.2151 9.3302 10.8682 6.14693 11.9096 3.285C12.0027 3.0591 11.9799 2.80201 11.8486 2.596C11.7172 2.39 11.4937 2.26089 11.2496 2.25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                )}
              </a>
            </li>
            <li>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-globe2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                  </svg>{" "}
                  EN
                </a>
              </Dropdown>
            </li>
            <div className="nav-profile">
              <div className="nav-logged-user-container">
                {auth.isLoggedIn && (
                  <>
                    <div className="nav-logged-user-section">
                      <PopUpIconMenu
                        width={"257px"}
                        right={"-110px"}
                        icon={
                          notItems.length > 0 ? (
                            <BellActiveIcon
                              color={theme === "dark" ? "#fff" : "#000"}
                              size="25px"
                            />
                          ) : (
                            <BellInActiveIcon
                              color={theme === "dark" ? "#fff" : "#000"}
                              size="25px"
                            />
                          )
                        }
                      >
                        <PopUpNotificationItem notificationList={notItems} />
                      </PopUpIconMenu>
                    </div>
                    <div className="nav-logged-user-section">
                      <div className="creator-icon">
                        <VerifiedIcon
                          color={theme === "dark" ? "#fff" : "#000"}
                        />
                      </div>
                      <PopUpIconMenu
                        width={"211px"}
                        icon={
                          avatar !== "" ? (
                            <img
                              src={auth.avatarURI}
                              alt=""
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <UserAvatar
                              color={theme === "dark" ? "#fff" : "#000"}
                              size="25px"
                              isNaked
                            />
                          )
                        }
                      >
                        <PopUpUserProfileItem />
                      </PopUpIconMenu>
                    </div>
                  </>
                )}
              </div>
            </div>
            <li className="wallet-icon">
              {/* {console.log("auth.isLoggedIn", auth.isLoggedIn)}
              {console.log("window.web3", window.web3)} */}
              {auth.isLoggedIn ? (
                <div></div>
              ) : (
                // <div to="/settings">
                //   <a href="#" onClick={handleConnectWallet}>
                //     <svg
                //       viewBox="0 0 24 24"
                //       focusable="false"
                //       className="chakra-icon css-1sdtgly"
                //       aria-hidden="true"
                //     >
                //       <path
                //         fillRule="evenodd"
                //         clipRule="evenodd"
                //         d="M16.5 12.75H18V14.25H16.5V12.75ZM21 6H3V3.75H19.5V2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V19.5C1.5 20.3284 2.17157 21 3 21H21C21.8284 21 22.5 20.3284 22.5 19.5V7.5C22.5 6.67157 21.8284 6 21 6ZM3 19.5V7.5H21V9.75H15C14.1716 9.75 13.5 10.4216 13.5 11.25V15.75C13.5 16.5784 14.1716 17.25 15 17.25H21V19.5H3ZM21 15.75V11.25H15V15.75H21Z"
                //         fill="currentColor"
                //       ></path>
                //     </svg>
                //   </a>
                //   <div className="web3-status"></div>
                // </div>
                <a onClick={handleConnectWallet}>
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    className="chakra-icon css-1sdtgly"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 12.75H18V14.25H16.5V12.75ZM21 6H3V3.75H19.5V2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V19.5C1.5 20.3284 2.17157 21 3 21H21C21.8284 21 22.5 20.3284 22.5 19.5V7.5C22.5 6.67157 21.8284 6 21 6ZM3 19.5V7.5H21V9.75H15C14.1716 9.75 13.5 10.4216 13.5 11.25V15.75C13.5 16.5784 14.1716 17.25 15 17.25H21V19.5H3ZM21 15.75V11.25H15V15.75H21Z"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    ></path>
                  </svg>
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="header-mobile">
        <div className="header-mobile-left">
          <img src={MobiLogo} alt="logo" className="header-logo" />
          <div className="mobile-search-icon" onClick={searchModel}>
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              className="chakra-icon css-1sdtgly"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.75 10.5C18.7508 12.4206 18.0735 14.2799 16.8375 15.75L22.5 21.4425L21.4425 22.5L15.75 16.8375C14.2799 18.0735 12.4206 18.7508 10.5 18.75C5.94365 18.75 2.25 15.0563 2.25 10.5C2.25 5.94365 5.94365 2.25 10.5 2.25C15.0563 2.25 18.75 5.94365 18.75 10.5ZM3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25C14.2279 17.25 17.25 14.2279 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className="header-mobile-right">
          <ul>
            <li onClick={showDrawer}>
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1sdtgly"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 30C11.1046 30 12 29.1045 12 28C12 26.8954 11.1046 26 10 26C8.89543 26 8 26.8954 8 28C8 29.1045 8.89543 30 10 30ZM24 30C25.1046 30 26 29.1045 26 28C26 26.8954 25.1046 26 24 26C22.8954 26 22 26.8954 22 28C22 29.1045 22.8954 30 24 30ZM5.82 6.99996H28C28.3081 6.99239 28.6026 7.12734 28.798 7.36573C28.9934 7.60412 29.0679 7.9193 29 8.21996L27 17.22C26.8952 17.6851 26.4767 18.0116 26 18H8L8.82 22H26V24H8C7.51724 24.0097 7.09647 23.6731 7 23.2L3.18 3.99996H0V1.99996H4C4.48276 1.99023 4.90353 2.32684 5 2.79996L5.82 6.99996ZM7.61969 16H25.1997L26.7497 8.99997H6.21969L7.61969 16Z"
                  fill="currentColor"
                ></path>
              </svg>
            </li>
            <li className="active" >
            <ConnectButton />
           {/* <Web3Button />
            <li className="active" onClick={showDrawer2}>
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                className="chakra-icon css-1sdtgly"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5 12.75H18V14.25H16.5V12.75ZM21 6H3V3.75H19.5V2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V19.5C1.5 20.3284 2.17157 21 3 21H21C21.8284 21 22.5 20.3284 22.5 19.5V7.5C22.5 6.67157 21.8284 6 21 6ZM3 19.5V7.5H21V9.75H15C14.1716 9.75 13.5 10.4216 13.5 11.25V15.75C13.5 16.5784 14.1716 17.25 15 17.25H21V19.5H3ZM21 15.75V11.25H15V15.75H21Z"
                  fill="currentColor"
                ></path>
              </svg> */}
            </li>
            <li className="active" onClick={showDrawer3}>
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1sdtgly"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 20H28V22H4V20ZM4 10H28V12H4V10Z"
                  fill="currentColor"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <Drawer
        title="Cart"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <div onClick={onClose} className="text-white active-cursor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="va-middle bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </Space>
        }
      >
        <CusModelArea>
          <div className="cus-cart-body-content">
            <p>There's nothing here! Add some NFTs to your cart and LFG!</p>
          </div>
        </CusModelArea>
      </Drawer>
      <Modal
        title="Connect a Wallet"
        centered
        open={isModalOpen}
        onCancel={hideModel}
        footer={null}
        width={720}
      >
        <CusModelArea>
          <div className="cus-model-wallet">
            <div className="model-wallet-left">
              <h2>Popular</h2>
              <ul>
                <li>
                  <a href="#">
                    <img src={Meta1} alt="icon" /> Rainbow
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Meta2} alt="icon" /> Coinbase Wallet
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Meta3} alt="icon" /> MetaMask
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Meta4} alt="icon" /> WalletConnect
                  </a>
                </li>
              </ul>
            </div>
            <div className="model-wallet-right">
              <h2>What is a Wallet?</h2>
              <ul>
                <li>
                  <img src={Meta5} alt="icon" />
                  <p>
                    <strong>A Home for your Digital Assets</strong>Wallets are
                    used to send, receive, store, and display digital assets
                    like Ethereum and NFTs.
                  </p>
                </li>
                <li>
                  <img src={Meta6} alt="icon" />
                  <p>
                    <strong>A New Way to Log In</strong>Instead of creating new
                    accounts and passwords on every website, just connect your
                    wallet.
                  </p>
                </li>
              </ul>
              <button>Get a Wallet</button>
              <a href="#">Learn More</a>
            </div>
          </div>
        </CusModelArea>
      </Modal>
      <Modal
        title="Search"
        open={search}
        onCancel={hideSearchModel}
        footer={null}
      >
        <CusModelArea>
          <Search
            placeholder="Collections, items, Profiles"
            allowClear
            enterButton="Search"
            size="large"
          />
        </CusModelArea>
      </Modal>
      <Drawer
        title="Connect a Wallet"
        placement="bottom"
        closable={false}
        onClose={onClose2}
        open={open2}
        extra={
          <Space>
            <div onClick={onClose2} className="text-white active-cursor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="va-middle bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </Space>
        }
      >
        <CusModelArea>
          <div className="mobile-cus-area">
            <ul>
              <li>
                <a href="#">
                  <img src={Meta1} alt="icon" /> Rainbow
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Meta2} alt="icon" /> Coinbase Wallet
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Meta3} alt="icon" /> MetaMask
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Meta4} alt="icon" /> WalletConnect
                </a>
              </li>
            </ul>
            <div className="mobile-cus-info">
              <h2>What is a Wallet?</h2>
              <p>
                A wallet is used to send, receive, store, and display digital
                assets. It’s also a new way to log in, without needing to create
                new accounts and passwords on every website.
              </p>
              <a href="#">Get a Wallet</a>
              <a href="#">Learn More</a>
            </div>
          </div>
        </CusModelArea>
      </Drawer>
      <Drawer
        title="Menus"
        placement="right"
        closable={false}
        onClose={onClose3}
        open={open3}
        extra={
          <Space>
            <div onClick={onClose3} className="text-white active-cursor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="va-middle bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </Space>
        }
      >
        <CusModelArea>
          <div className="mobile-side-menus">
            <ul>
              <li>
                <a href="#">
                  <span>
                    <svg
                      viewBox="0 0 32 32"
                      focusable="false"
                      className="chakra-icon css-t4o1pp"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31 15H29V3H17V1H29C30.1046 1 31 1.89543 31 3V15ZM24 22H26V8C26 6.89543 25.1046 6 24 6H10V8H24V22ZM4 30H18C19.1046 30 20 29.1046 20 28V14C20 12.8954 19.1046 12 18 12H4C2.89543 12 2 12.8954 2 14V28C2 29.1046 2.89543 30 4 30ZM4 28V14H18V28H4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Collections
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <svg
                      viewBox="0 0 32 32"
                      focusable="false"
                      className="chakra-icon css-t4o1pp"
                    >
                      <path
                        d="M26 9.99999H23.2383C23.8892 9.03797 24.1416 7.86102 23.9426 6.71669C23.7435 5.57235 23.1083 4.54982 22.1708 3.86416C21.2332 3.17851 20.0663 2.88317 18.9154 3.04026C17.7646 3.19736 16.7195 3.79464 16 4.70649C15.2789 3.79915 14.2347 3.206 13.0861 3.05125C11.9375 2.89651 10.7736 3.19217 9.83811 3.87632C8.90261 4.56047 8.26809 5.58004 8.06745 6.72151C7.8668 7.86299 8.11558 9.03783 8.7617 9.99999H6C5.46977 10.0007 4.96145 10.2116 4.58652 10.5865C4.21159 10.9614 4.00066 11.4698 4 12V16C4.00066 16.5302 4.21159 17.0385 4.58652 17.4135C4.96145 17.7884 5.46977 17.9993 6 18V28C6.00066 28.5302 6.21159 29.0385 6.58652 29.4135C6.96145 29.7884 7.46977 29.9993 8 30H24C24.5302 29.9993 25.0386 29.7884 25.4135 29.4135C25.7884 29.0385 25.9993 28.5302 26 28V18C26.5302 17.9993 27.0386 17.7884 27.4135 17.4135C27.7884 17.0385 27.9993 16.5302 28 16V12C27.9993 11.4698 27.7884 10.9614 27.4135 10.5865C27.0386 10.2116 26.5302 10.0007 26 9.99999ZM17 7.49999C17 7.00554 17.1466 6.52219 17.4213 6.11107C17.696 5.69994 18.0865 5.37951 18.5433 5.19029C19.0001 5.00107 19.5028 4.95157 19.9877 5.04803C20.4727 5.14449 20.9181 5.38259 21.2678 5.73223C21.6174 6.08186 21.8555 6.52731 21.952 7.01227C22.0484 7.49722 21.9989 7.99989 21.8097 8.4567C21.6205 8.91352 21.3 9.30396 20.8889 9.57867C20.4778 9.85337 19.9945 9.99999 19.5 9.99999H17V7.49999ZM12.5 4.99999C13.1628 5.00079 13.7982 5.26443 14.2669 5.7331C14.7356 6.20177 14.9992 6.83719 15 7.49999V9.99999H12.5C11.837 9.99999 11.2011 9.7366 10.7322 9.26776C10.2634 8.79892 10 8.16303 10 7.49999C10 6.83695 10.2634 6.20107 10.7322 5.73223C11.2011 5.26338 11.837 4.99999 12.5 4.99999ZM6 12H15V16H6V12ZM8 18H15V28H8V18ZM24.0012 28H17V18H24L24.0012 28ZM17 16V12H26L26.0012 16H17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Rewards
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
            <div className="menu-footer-area">
              <div>
                <ul>
                  <li>
                    <a href="#">
                      <span>
                        <svg
                          viewBox="0 0 32 32"
                          focusable="false"
                          className="chakra-icon css-a5bc5l"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM28 15H22C21.8833 11.3171 20.9291 7.70915 19.21 4.45C24.0614 5.77705 27.5705 9.98873 28 15ZM16 28C15.7769 28.015 15.5531 28.015 15.33 28C13.2583 24.6962 12.1085 20.8981 12 17H20C19.9005 20.8953 18.7612 24.6932 16.7 28C16.467 28.0164 16.233 28.0164 16 28ZM12 15C12.0995 11.1047 13.2388 7.30683 15.3 4.00001C15.7453 3.94997 16.1947 3.94997 16.64 4.00001C18.7223 7.3008 19.8825 11.0991 20 15H12ZM12.76 4.45C11.0513 7.71164 10.1075 11.3194 10 15H4C4.42952 9.98873 7.93859 5.77705 12.79 4.45H12.76ZM4.04967 17H10.0497C10.154 20.6798 11.0944 24.2875 12.7997 27.55C7.96399 26.2088 4.4735 22.0003 4.04967 17ZM19.21 27.55C20.9291 24.2908 21.8833 20.6829 22 17H28C27.5705 22.0113 24.0614 26.2229 19.21 27.55Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        English
                      </span>

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
                  </li>
                </ul>
                <div className="menu-footer-social-area">
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-discord"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                  </a>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-twitter"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </a>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-instagram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </a>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CusModelArea>
      </Drawer>
    </HeaderArea>
  );
};
