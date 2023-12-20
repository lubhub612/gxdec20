import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Tabs, Input, Dropdown } from "antd";
import CollImg from "../../assets/images/coll-img.avif";
import { CollectionMain, LoadingScreen } from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ReactLoading from "react-loading";
import useDebounce from "../../hooks/useDebounce";
import WalletModal from "../Shared/MainModal";
import { ConnectWalletForm } from "../Shared/ConnectWalletForm";

const TabTwo = (props) => {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const handleConnectWallet = () => {
    setIsModalOpen(false);
    setShowConnectWallet(true);
  };
  const navigate = useNavigate();
  const auth = useAuth();
  const options = [
    {
      key: "1",
      label: (
        <p
          style={{ color: "white", padding: "10px" }}
          onClick={() => handleSelectedOption("high")}
        >
          high to low
        </p>
      ),
    },

    {
      key: "2",
      label: (
        <p
          style={{ color: "white", padding: "10px" }}
          onClick={() => handleSelectedOption("low")}
        >
          low to high
        </p>
      ),
    },
  ];
  const handleSelectedOption = (value) => {
    const sortCollections = props.collections.sort((a, b) => {
      if (value === "high") {
        return b.tradeVolume - a.tradeVolume;
      } else if (value === "low") {
        return a.tradeVolume - b.tradeVolume;
      }
    });
    props.setCollections([...sortCollections]);
  };
  const handleSearchInput = (e) => {
    console.log("search", e.target.value);
    props.setSearchKeyword(e.target.value);
  };
  //debouncing the search input field
  const debouncedValue = useDebounce(props.searchKeyword, 500);
  const handleSearch = React.useCallback(() => {
    // searchStyleByKeyword(debouncedValue);
    props.getCollections(debouncedValue);
  }, [debouncedValue]);

  //   React.useEffect(() => {
  //     console.log("auth?.isLoggedIn", auth.auth.isLoggedIn);
  //   }, [auth]);
  React.useEffect(() => handleSearch(), [handleSearch]);
  return (
    <div className="collection-area">
      <div className="collection-area-header">
        <button>
          <svg
            viewBox="0 0 32 32"
            focusable="false"
            className="chakra-icon css-1sdtgly"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 28H14C12.8954 28 12 27.1046 12 26V18.41L4.59 11C4.21441 10.6266 4.00223 10.1196 4 9.59V6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V9.59C27.9978 10.1196 27.7856 10.6266 27.41 11L20 18.41V26C20 27.1046 19.1046 28 18 28ZM6 6V9.59L14 17.59V26H18V17.59L26 9.59V6H6Z"
              fill="currentColor"
            ></path>
          </svg>{" "}
          Filter
        </button>
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearchInput(e)}
        />
        <Dropdown
          menu={{
            items: options,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
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
          <li>24h</li>
          <li>7d</li>
          <li>30d</li>
          <li>Max</li>
        </ul>
      </div>
      <div className="collection-area-body">
        <div className="collection-area-body-desktop">
          {auth.auth.isLoggedIn ? (
            <>
              <table>
                <thead>
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
                  {props.loading ? (
                    <LoadingScreen>
                      <ReactLoading type="cylon" color="#AAFF26" width={120} />
                    </LoadingScreen>
                  ) : (
                    props.collections.length > 0 &&
                    props.collections.map((collection, index) => (
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
                        {console.log("collection", collection)}
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
                          <strong className="green">+32.2%</strong>
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
                    ))
                  )}
                </tbody>
              </table>
              {props.collections.length == 0 && (
                <div className="css-120vxwj">
                  <div className="chakra-stack css-1feo50q">
                    <svg
                      class="chakra-icon css-1ce57o2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      //   class="bi bi-bookmark-star"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"
                        fill="currentColor"
                      ></path>{" "}
                      <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        fill="currentColor"
                      ></path>{" "}
                    </svg>
                    <div class="chakra-text css-vir874">No Data Found</div>
                    <div class="chakra-text css-801ndf">
                      Your watchlist collections will display here
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div class="css-120vxwj">
              <div class="chakra-stack css-1feo50q">
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  class="chakra-icon css-1ce57o2"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.5 12.75H18V14.25H16.5V12.75ZM21 6H3V3.75H19.5V2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V19.5C1.5 20.3284 2.17157 21 3 21H21C21.8284 21 22.5 20.3284 22.5 19.5V7.5C22.5 6.67157 21.8284 6 21 6ZM3 19.5V7.5H21V9.75H15C14.1716 9.75 13.5 10.4216 13.5 11.25V15.75C13.5 16.5784 14.1716 17.25 15 17.25H21V19.5H3ZM21 15.75V11.25H15V15.75H21Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div class="chakra-text css-vir874">Connect a Wallet</div>
                <div class="chakra-text css-801ndf">
                  You need to connect your crypto wallet to the site before you
                  can make a watchlist. Let's go
                </div>
                <button
                  type="button"
                  class="chakra-button css-g8ykms"
                  data-id="connect-wallet-button"
                  onClick={() => handleConnectWallet()}
                  style={{ cursor: "pointer" }}
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="collection-area-body-mobile">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Collection</th>
                <th>Floor</th>
                <th>Vol</th>
              </tr>
            </thead>
            <tbody>
              {props.loading ? (
                <LoadingScreen>
                  <ReactLoading type="cylon" color="#AAFF26" width={120} />
                </LoadingScreen>
              ) : (
                <>
                  {props.collections.map((collection, index) => (
                    <tr
                      key={collection._id}
                      onClick={() =>
                        navigate(
                          `/profile/${collection.walletAddress.toLowerCase()}`
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
                        <strong className="green">+32.2%</strong>
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
                          1,254.89
                        </span>
                        <strong className="red">-65.7%</strong>
                      </td>
                      <td>
                        <span>11,186</span>
                        <strong className="ash">57.5% unique</strong>
                      </td>
                      <td>10,000</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
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
    </div>
  );
};
export default TabTwo;
