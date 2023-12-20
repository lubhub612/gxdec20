import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Switch, Input, Dropdown } from "antd";
import CollImg from "../../assets/images/coll-img.avif";
import { CollectionMain, LoadingScreen } from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ReactLoading from "react-loading";
import useDebounce from "../../hooks/useDebounce";

const TabOne = (props) => {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [isClicked, setisClicked] = useState(false);
  const { invokeServer } = useGlobal();

  function handleSwitchChange(e) {
    console.log("event switch", e);

    if (e == true) {
      invokeServer("get", `/api/collection/verified-collections?verified=${e}`)
        .then((res) => {
          if (res.data.result === 1) {
            props.setCollections(res.data.collections);
          }
        })
        .catch((err) => {
          console.log("get-all-coll-err:", err.message);
          // toastError("Fail:", err.message);
        });
    } else {
      props.getCollections();
    }
  }

  const navigate = useNavigate();
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

  React.useEffect(() => handleSearch(), [handleSearch]);
  React.useEffect(() => props.getCollections(), []);
  return (
    <div className="collection-area">
      <div className="collection-area-header">
        <button onClick={() => setisClicked(!isClicked)}>
          {isClicked ? (
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              class="chakra-icon css-1sdtgly"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
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
            </svg>
          )}
          Filter
        </button>
        {/* on hover popup */}
        {isClicked && (
          <div
            className="chakra-popover__popper css-740s06"
            style={{
              visibility: "visible",
              // minWidth: "max-content",
              "--popper-transform-origin": "top center",
              position: "absolute",
              inset: "0 auto auto 0",
              margin: "0",
              transform: "translate3d(23px, 80px, 0px)",

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
                  transform: "translate3d(34px, 0, 0)",
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
                  className="css-vmox5t"
                >
                  Verified Collections only
                  <Switch onChange={(e) => handleSwitchChange(e)} />
                </div>
              </div>
            </section>
          </div>
        )}
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
                <>
                  {props.collections.map((collection, index) => (
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
                  ))}
                </>
              )}
            </tbody>
          </table>
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
    </div>
  );
};
export default TabOne;
