import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "./styles";
import ReactLoading from "react-loading";
import { SearchOutlined } from "@ant-design/icons";
import CollImgItem from "../../assets/images/sample-item.avif";
import { useGlobal } from "../../contexts/GlobalContext";
import { CollectionMain } from "./styles";

import {
  Tabs,
  Input,
  Dropdown,
  Collapse,
  Switch,
  InputNumber,
  Checkbox,
} from "antd";
const { Panel } = Collapse;

const TabOne = (props) => {
  const navigate = useNavigate();
  const { invokeServer } = useGlobal();

  // min max filter
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const {
    setmyNft,
    collection,
    myNft,
    setselectedView,
    isLoading,
    selectedView,
  } = props;
  const [validationError, setValidationError] = useState(false);
  const [isMineChecked, setisMineChecked] = useState(false);
  const [showMineNFTs, setshowMineNFTs] = useState([]);
  // useEffect(() => {
  //   console.log("min", minPrice, minPrice1);
  //   console.log("max", maxPrice, maxPrice1);
  // }, [myNft]);

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    console.log("min value", value);
    validateInput(value, maxPrice);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    console.log("max value", value);

    validateInput(minPrice, value);
  };

  const validateInput = (minValue, maxValue) => {
    if (minValue >= maxValue && maxPrice != null) {
      console.log("error error");
      setValidationError(true);
    } else {
      setValidationError(false);
      callApiWithFilter(minValue, maxValue);
    }
  };

  const callApiWithFilter = (minValue, maxValue) => {
    let ac = new AbortController();
    invokeServer(
      "get",
      `/api/collection/min-max-nfts?minPrice=${minValue}&maxPrice=${maxValue}&collectionAddress=${collection.contractAddress}`
    )
      .then((res) => {
        if (ac.signal.aborted === false) {
          if (res.data.result == 1) {
            setmyNft(res.data.filteredNFTs);
          } else {
            console.log("error:", res.data.err);
          }
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };

  const searchByTitle = (searchTerm) => {
    let ac = new AbortController();
    invokeServer(
      "get",
      `/api/collection/search-by-title?searchTerm=${searchTerm.target.value}&collectionAddress=${collection.contractAddress}`
    )
      .then((res) => {
        if (ac.signal.aborted === false) {
          if (res.data.result == 1) {
            console.log("api res", minPrice);
            setmyNft(res.data.filteredNFTs);
          } else {
            console.log("error:", res.data.err);
          }
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
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
    // {
    //   key: "33",
    //   label: <a href="#">Rank: Rare to Common</a>,
    // },
    // {
    //   key: "44",
    //   label: <a href="#">Rank: Common to Rare</a>,
    // },
    {
      key: "55",
      label: <a href="#">Recent Activity</a>,
    },
  ];
  const handleMineNFTs = (event) => {
    setisMineChecked(event);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));

    if (user && event) {
      const filteredObjects = myNft.filter(
        (obj) => obj.creator == user.address
      );
      setshowMineNFTs(filteredObjects);
    }
  };
  return (
    <CollectionMain>
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
          </button>

          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchByTitle}
          />
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
            <li
              onClick={() => setselectedView(1)}
              className={
                selectedView == 1 ? "active-view-l" : "inactive-view-l"
              }
            >
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1sdtgly"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 6H28V8H10V6ZM10 24H28V26H10V24ZM10 15H28V17H10V15ZM4 15H6V17H4V15ZM4 6H6V8H4V6ZM4 24H6V26H4V24Z"
                  fill="currentColor"
                ></path>
              </svg>
            </li>
            <li
              onClick={() => setselectedView(2)}
              className={
                selectedView == 2 ? "active-view-r" : "inactive-view-r"
              }
            >
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1sdtgly"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5C3 3.89543 3.89543 3 5 3H27C28.1046 3 29 3.89543 29 5V27C29 28.1046 28.1046 29 27 29H5C3.89543 29 3 28.1046 3 27V5ZM27 5L17 5V15H27V5ZM27 17H17V27H27V17ZM15 15V5L5 5V15H15ZM5 17H15V27H5V17Z"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
        <div className="collection-area-body">
          <div className="collection-details-filter">
            <div className="collection-details-filter-inner">
              <div className="collection-filter-buy-now">
                <h2>Buy Now</h2>
                <Switch />
              </div>
              <div
                style={{ marginTop: "15px" }}
                className="collection-filter-buy-now"
              >
                <h2>Only Show Mine</h2>
                <Switch value={isMineChecked} onChange={handleMineNFTs} />
              </div>
              <div className="collection-filter-price-range">
                <h3>Price Range (ETH)</h3>
                <div className="collection-filter-price-range-input">
                  <InputNumber
                    placeholder="Min"
                    onChange={handleMinPriceChange}
                    value={minPrice}
                    style={{
                      border: validationError
                        ? "1px solid red !important"
                        : null,
                    }}
                  />
                  <InputNumber
                    placeholder="Max"
                    onChange={handleMaxPriceChange}
                    value={maxPrice}
                    style={{
                      border: validationError
                        ? "1px solid red !important"
                        : null,
                    }}
                  />
                </div>
              </div>
              <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
                <Panel header="Rarity Rank" key="1">
                  <Input
                    size="large"
                    placeholder="Filter properties"
                    prefix={<SearchOutlined />}
                  />
                </Panel>
                <Panel header="Background" key="2">
                  <Input
                    size="large"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                  />
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                </Panel>
                <Panel header="Clothes" key="3">
                  <Input
                    size="large"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                  />
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                </Panel>
                <Panel header="Earring" key="4">
                  <Input
                    size="large"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                  />
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                </Panel>
                <Panel header="Eyes" key="5">
                  <Input
                    size="large"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                  />
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                  <div className="collection-panel-list">
                    <div className="collection-panel-list-left">
                      <Checkbox />
                      <strong>
                        Purple <span>51.49 floor</span>
                      </strong>
                    </div>
                    <div className="collection-panel-list-right">
                      <strong>
                        1,291 <span>(12.91%)</span>
                      </strong>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
          {selectedView == 1 &&
            (isMineChecked ? showMineNFTs.length > 0 : myNft?.length > 0) && (
              <table>
                {isLoading && (
                  <LoadingScreen>
                    <ReactLoading type="cylon" color="#AAFF26" width={120} />
                  </LoadingScreen>
                )}
                <thead>
                  <tr className="css-1ts85xd">
                    <th className="css-7gz4p9"></th>
                    <th className="css-7gz4p9">NFT</th>
                    <th className="css-7gz4p9">Rarity</th>
                    <th className="css-7gz4p9">Current Price</th>
                    <th className="css-bwzk3j">Top Offer</th>
                    <th className="css-bwzk3j">Last Sale</th>
                    {/* <th className="css-bwzk3j">Owner</th> */}
                    <th className="css-xijxvx">Listed</th>
                    <th className="css-3ifijw"></th>
                  </tr>
                </thead>
                <tbody>
                  {isMineChecked
                    ? showMineNFTs?.map((item) => {
                        return (
                          <>
                            {/* {console.log("item collection", item)} */}
                            <tr
                              onClick={() =>
                                navigate(
                                  `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                                )
                              }
                              className="css-1q6zaao"
                            >
                              <td
                                className="css-150cn8k"
                                style={{ paddingRight: "0px" }}
                              >
                                <div class="checkbox-wrapper-23">
                                  {" "}
                                  <input type="checkbox" id="check-23" />{" "}
                                  <label
                                    for="check-23"
                                    style={{ size: "20px" }}
                                  >
                                    {" "}
                                    <svg viewBox="0,0,50,50">
                                      {" "}
                                      <path d="M5 30 L 20 45 L 45 5">
                                        {" "}
                                      </path>{" "}
                                    </svg>{" "}
                                  </label>{" "}
                                </div>
                                {/* <button
                              type="button"
                              className="chakra-button css-1yiidbn"
                              aria-label="Card select checkbox"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                focusable="false"
                                className="chakra-icon css-1626ime"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M26 4H6C4.89543 4 4 4.89543 4 6V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V6C28 4.89543 27.1046 4 26 4ZM6 26V6H26V26H6Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </button> */}
                              </td>
                              <td className="css-3g3mnc">
                                <div class="chakra-stack css-84zodg">
                                  <div class="css-1n9alrw">
                                    <span className="table-span">
                                      <img
                                        alt="BoredApeYachtClub #8660"
                                        sizes="100vw"
                                        src={
                                          item?.image ? item.image : CollImgItem
                                        }
                                        decoding="async"
                                        data-nimg="fill"
                                        className="table-image"
                                      />
                                    </span>
                                  </div>
                                  <a
                                    onClick={() =>
                                      navigate(
                                        `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                                      )
                                    }
                                  >
                                    <a className="chakra-link css-ugz51x">
                                      <div className="css-0">
                                        <div className="chakra-text css-p1egjx">
                                          {item?.title} #{item?.tokenId}
                                        </div>
                                      </div>
                                    </a>
                                  </a>
                                </div>
                              </td>
                              <td className="css-m4e05x">
                                <span
                                  id="popover-trigger-:r4mt:"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r4mt:"
                                  className="css-1m0h5h6"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    className="chakra-icon css-1gpu3vi"
                                  >
                                    <svg
                                      viewBox="0 0 32 32"
                                      focusable="false"
                                      className="chakra-icon css-brr9t8"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </svg>
                                  <span className="css-1f36937">2,573</span>
                                </span>
                              </td>
                              {/* price */}
                              <td className="css-150cn8k">
                                <div className="chakra-stack css-84zodg">
                                  <svg
                                    viewBox="0 0 48 48"
                                    focusable="false"
                                    className="chakra-icon css-1rs56qv"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="24"
                                      fill="#0CE466"
                                    ></circle>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M24 26.5946C21.2546 26.5946 19.027 24.3693 19.027 21.6217C19.027 18.874 21.2546 16.6487 24 16.6487C26.7453 16.6487 28.9729 18.874 28.9729 21.6217C28.9729 24.3693 26.7453 26.5946 24 26.5946ZM21.8378 21.6217C21.8378 22.8163 22.8063 23.7838 24 23.7838C25.1936 23.7838 26.1621 22.8163 26.1621 21.6217C26.1621 20.427 25.1936 19.4595 24 19.4595C22.8063 19.4595 21.8378 20.427 21.8378 21.6217Z"
                                      fill="black"
                                    ></path>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8 21.6282L17.5135 12.1082H30.4864L40 21.6282L24 37.6216L8 21.6282ZM31.3513 18.1622C27.3091 14.1022 20.6909 14.1022 16.6486 18.1622L13.1892 21.6217L16.6486 25.0812C20.6909 29.1411 27.3091 29.1411 31.3513 25.0811L34.8108 21.6217L31.3513 18.1622Z"
                                      fill="black"
                                    ></path>
                                  </svg>
                                  <button
                                    type="button"
                                    className="chakra-button chakra-button css-1vy5fhu"
                                    data-test-id="buy-now-button"
                                    data-id="collection-row-buy-now-button"
                                  >
                                    <div className="css-b527o0">
                                      <svg
                                        viewBox="0 0 48 96"
                                        focusable="false"
                                        className="chakra-icon css-14yq6wh"
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
                                      <div class="chakra-text css-dzui3e">
                                        {item?.priceUSD?.toFixed(2)}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </td>
                              <td className="css-lcxwm8">
                                <div className="css-70qvj9">
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
                                  <div className="chakra-text css-n17w0h">
                                    38
                                  </div>
                                </div>
                              </td>
                              <td className="css-lcxwm8">
                                <div className="css-70qvj9">
                                  <svg
                                    viewBox="0 0 48 96"
                                    focusable="false"
                                    className="chakra-icon css-14yq6wh"
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
                                  <div className="chakra-text css-n17w0h">
                                    40.34
                                  </div>
                                </div>
                              </td>
                              {/* <td className="css-lcxwm8">
                              <a
                                className="chakra-link css-182pcal"
                                href="/accounts/0x24783027F070019A562E2e2BeBC1478C78e6d45e"
                              >
                                <div
                                  className="chakra-text css-p1egjx"
                                  title="0x24783027F070019A562E2e2BeBC1478C78e6d45e"
                                >
                                  willnotdmfirst.eth
                                </div>
                              </a>
                            </td> */}
                              <td className="css-110hi9e">
                                <div
                                  className="chakra-text css-1psr8q8"
                                  id="popover-trigger-:r4n2:"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r4n2:"
                                >
                                  4h
                                </div>
                              </td>
                              <td className="css-150cn8k">
                                <div className="css-0">
                                  <button
                                    type="button"
                                    className="chakra-button chakra-menu__menu-button css-15xd263"
                                    aria-label="share"
                                    id="menu-button-:r4n4:"
                                    aria-expanded="false"
                                    aria-haspopup="menu"
                                    aria-controls="menu-list-:r4n4:"
                                  >
                                    <span
                                      aria-hidden="true"
                                      focusable="false"
                                      className="css-xl71ch"
                                    >
                                      <svg
                                        viewBox="0 0 32 32"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M16 8C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6C14 7.10457 14.8954 8 16 8ZM16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18ZM16 28C17.1046 28 18 27.1046 18 26C18 24.8954 17.1046 24 16 24C14.8954 24 14 24.8954 14 26C14 27.1046 14.8954 28 16 28Z"
                                          fill="currentColor"
                                        ></path>
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : myNft?.map((item) => {
                        return (
                          <>
                            {/* {console.log("item collection", item)} */}
                            <tr
                              onClick={() =>
                                navigate(
                                  `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                                )
                              }
                              className="css-1q6zaao"
                            >
                              <td
                                className="css-150cn8k"
                                style={{ paddingRight: "0px" }}
                              >
                                <div class="checkbox-wrapper-23">
                                  {" "}
                                  <input type="checkbox" id="check-23" />{" "}
                                  <label
                                    for="check-23"
                                    style={{ size: "20px" }}
                                  >
                                    {" "}
                                    <svg viewBox="0,0,50,50">
                                      {" "}
                                      <path d="M5 30 L 20 45 L 45 5">
                                        {" "}
                                      </path>{" "}
                                    </svg>{" "}
                                  </label>{" "}
                                </div>
                                {/* <button
                            type="button"
                            className="chakra-button css-1yiidbn"
                            aria-label="Card select checkbox"
                          >
                            <svg
                              viewBox="0 0 32 32"
                              focusable="false"
                              className="chakra-icon css-1626ime"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M26 4H6C4.89543 4 4 4.89543 4 6V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V6C28 4.89543 27.1046 4 26 4ZM6 26V6H26V26H6Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button> */}
                              </td>
                              <td className="css-3g3mnc">
                                <div class="chakra-stack css-84zodg">
                                  <div class="css-1n9alrw">
                                    <span className="table-span">
                                      <img
                                        alt="BoredApeYachtClub #8660"
                                        sizes="100vw"
                                        src={
                                          item?.image ? item.image : CollImgItem
                                        }
                                        decoding="async"
                                        data-nimg="fill"
                                        className="table-image"
                                      />
                                    </span>
                                  </div>
                                  <a
                                    onClick={() =>
                                      navigate(
                                        `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                                      )
                                    }
                                  >
                                    <a className="chakra-link css-ugz51x">
                                      <div className="css-0">
                                        <div className="chakra-text css-p1egjx">
                                          {item?.title} #{item?.tokenId}
                                        </div>
                                      </div>
                                    </a>
                                  </a>
                                </div>
                              </td>
                              <td className="css-m4e05x">
                                <span
                                  id="popover-trigger-:r4mt:"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r4mt:"
                                  className="css-1m0h5h6"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    className="chakra-icon css-1gpu3vi"
                                  >
                                    <svg
                                      viewBox="0 0 32 32"
                                      focusable="false"
                                      className="chakra-icon css-brr9t8"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </svg>
                                  <span className="css-1f36937">2,573</span>
                                </span>
                              </td>
                              {/* price */}
                              <td className="css-150cn8k">
                                <div className="chakra-stack css-84zodg">
                                  <svg
                                    viewBox="0 0 48 48"
                                    focusable="false"
                                    className="chakra-icon css-1rs56qv"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="24"
                                      fill="#0CE466"
                                    ></circle>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M24 26.5946C21.2546 26.5946 19.027 24.3693 19.027 21.6217C19.027 18.874 21.2546 16.6487 24 16.6487C26.7453 16.6487 28.9729 18.874 28.9729 21.6217C28.9729 24.3693 26.7453 26.5946 24 26.5946ZM21.8378 21.6217C21.8378 22.8163 22.8063 23.7838 24 23.7838C25.1936 23.7838 26.1621 22.8163 26.1621 21.6217C26.1621 20.427 25.1936 19.4595 24 19.4595C22.8063 19.4595 21.8378 20.427 21.8378 21.6217Z"
                                      fill="black"
                                    ></path>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8 21.6282L17.5135 12.1082H30.4864L40 21.6282L24 37.6216L8 21.6282ZM31.3513 18.1622C27.3091 14.1022 20.6909 14.1022 16.6486 18.1622L13.1892 21.6217L16.6486 25.0812C20.6909 29.1411 27.3091 29.1411 31.3513 25.0811L34.8108 21.6217L31.3513 18.1622Z"
                                      fill="black"
                                    ></path>
                                  </svg>
                                  <button
                                    type="button"
                                    className="chakra-button chakra-button css-1vy5fhu"
                                    data-test-id="buy-now-button"
                                    data-id="collection-row-buy-now-button"
                                  >
                                    <div className="css-b527o0">
                                      <svg
                                        viewBox="0 0 48 96"
                                        focusable="false"
                                        className="chakra-icon css-14yq6wh"
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
                                      <div class="chakra-text css-dzui3e">
                                        {item?.priceUSD?.toFixed(2)}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </td>
                              <td className="css-lcxwm8">
                                <div className="css-70qvj9">
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
                                  <div className="chakra-text css-n17w0h">
                                    38
                                  </div>
                                </div>
                              </td>
                              <td className="css-lcxwm8">
                                <div className="css-70qvj9">
                                  <svg
                                    viewBox="0 0 48 96"
                                    focusable="false"
                                    className="chakra-icon css-14yq6wh"
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
                                  <div className="chakra-text css-n17w0h">
                                    40.34
                                  </div>
                                </div>
                              </td>
                              {/* <td className="css-lcxwm8">
                            <a
                              className="chakra-link css-182pcal"
                              href="/accounts/0x24783027F070019A562E2e2BeBC1478C78e6d45e"
                            >
                              <div
                                className="chakra-text css-p1egjx"
                                title="0x24783027F070019A562E2e2BeBC1478C78e6d45e"
                              >
                                willnotdmfirst.eth
                              </div>
                            </a>
                          </td> */}
                              <td className="css-110hi9e">
                                <div
                                  className="chakra-text css-1psr8q8"
                                  id="popover-trigger-:r4n2:"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r4n2:"
                                >
                                  4h
                                </div>
                              </td>
                              <td className="css-150cn8k">
                                <div className="css-0">
                                  <button
                                    type="button"
                                    className="chakra-button chakra-menu__menu-button css-15xd263"
                                    aria-label="share"
                                    id="menu-button-:r4n4:"
                                    aria-expanded="false"
                                    aria-haspopup="menu"
                                    aria-controls="menu-list-:r4n4:"
                                  >
                                    <span
                                      aria-hidden="true"
                                      focusable="false"
                                      className="css-xl71ch"
                                    >
                                      <svg
                                        viewBox="0 0 32 32"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M16 8C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6C14 7.10457 14.8954 8 16 8ZM16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18ZM16 28C17.1046 28 18 27.1046 18 26C18 24.8954 17.1046 24 16 24C14.8954 24 14 24.8954 14 26C14 27.1046 14.8954 28 16 28Z"
                                          fill="currentColor"
                                        ></path>
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                </tbody>
              </table>
            )}
          {selectedView == 2 && myNft?.length > 0 && (
            <div
              style={{
                gap: showMineNFTs.length < 1 ? "0px !important" : "20px",
              }}
              className="collection-details-items-list"
            >
              {isLoading && (
                <LoadingScreen>
                  <ReactLoading type="cylon" color="#AAFF26" width={120} />
                </LoadingScreen>
              )}
              {isMineChecked
                ? showMineNFTs?.map((item) => {
                    return (
                      <div
                        onClick={() =>
                          navigate(
                            `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                          )
                        }
                        className="collection-details-item"
                      >
                        <div className="collection-details-item-img">
                          <img
                            src={item?.image ? item.image : CollImgItem}
                            alt="item"
                          />
                          <span>
                            <svg
                              viewBox="0 0 32 32"
                              focusable="false"
                              className="chakra-icon css-zbxbij"
                            >
                              <path
                                d="M31 20.825V19.2575C31 19.1125 30.8647 19.0075 30.7318 19.0475L23.576 21.1875C23.5374 21.1975 23.5035 21.22 23.4769 21.25C22.7105 22.1258 22.0592 22.7135 21.8867 22.8692L21.8747 22.88C21.43 23.27 20.879 23.4825 20.299 23.4825H17.7083V20.75H19.7673C19.8205 20.75 19.8713 20.73 19.9099 20.695L20.1757 20.4425C20.2893 20.335 20.4247 20.205 20.5866 20.0375C20.6003 20.0232 20.6143 20.0089 20.6284 19.9943C20.7135 19.9066 20.8044 19.8129 20.8935 19.71C20.9999 19.6025 21.1038 19.4825 21.2004 19.365C21.3623 19.185 21.517 18.9975 21.6789 18.8C21.7949 18.67 21.9013 18.5225 22.0052 18.375C22.1212 18.235 22.2348 18.0775 22.3411 17.9275C22.3807 17.8674 22.4228 17.8065 22.4658 17.7444C22.5068 17.6852 22.5487 17.6247 22.59 17.5625C22.6673 17.4425 22.7447 17.315 22.8099 17.195C23.0129 16.87 23.1845 16.5225 23.3295 16.175C23.3961 16.0262 23.4493 15.8694 23.501 15.7171C23.5075 15.698 23.514 15.679 23.5204 15.66C23.5784 15.4825 23.6267 15.315 23.663 15.1375C23.75 14.72 23.7693 14.305 23.7307 13.89C23.721 13.76 23.7113 13.6325 23.6824 13.5125V13.4925C23.6727 13.4075 23.6533 13.3125 23.6267 13.225C23.5398 12.82 23.4044 12.415 23.2328 12.0175C23.1748 11.87 23.1072 11.72 23.0419 11.5825C22.8873 11.285 22.7253 10.9875 22.5417 10.7C22.5048 10.6393 22.4641 10.5778 22.4235 10.5164C22.3922 10.4691 22.3609 10.4218 22.3314 10.375C22.2151 10.1894 22.0843 10.0105 21.9574 9.83688C21.9288 9.79766 21.9003 9.75871 21.8722 9.72001C21.7973 9.61826 21.7153 9.51653 21.6328 9.41412C21.5876 9.35798 21.5422 9.30164 21.4977 9.24498C21.372 9.0875 21.2488 8.93751 21.1231 8.79C20.6736 8.26499 20.2024 7.79001 19.7818 7.38501C19.7045 7.305 19.6199 7.225 19.5329 7.14752C19.2067 6.84 18.9094 6.57248 18.6605 6.36502C18.5857 6.30549 18.5186 6.24685 18.4562 6.19226C18.4137 6.15514 18.3734 6.11989 18.3342 6.08752C18.2588 6.02935 18.1933 5.97776 18.1384 5.93445C18.1035 5.90699 18.0729 5.88286 18.0467 5.86249C18.0273 5.8475 18.0056 5.83752 17.9839 5.82998L17.7083 5.75002V3.39C17.7083 3.00501 17.5585 2.66001 17.3193 2.40748C17.08 2.155 16.7465 2 16.3792 2C15.6445 2 15.05 2.62249 15.05 3.39V4.97998L14.9123 4.94002L14.5377 4.82999L14.1969 4.73251L14.1937 4.73157C14.1937 4.73157 14.1901 4.72998 14.1873 4.72998H14.18L11.5942 4.005C11.4806 3.97249 11.3839 4.09999 11.4419 4.2075L11.8552 4.9975C11.8786 5.05821 11.9084 5.11893 11.9389 5.18132C11.9587 5.2217 11.9788 5.26278 11.9977 5.30502C12.0654 5.44498 12.1331 5.59249 12.1983 5.74C12.2563 5.86998 12.3144 5.99749 12.382 6.1375C12.4104 6.20333 12.4395 6.26995 12.4689 6.33753C12.5769 6.58564 12.6905 6.84654 12.8025 7.12752C12.8992 7.36501 12.9958 7.6025 13.0804 7.85002C13.3124 8.4725 13.5323 9.13748 13.7233 9.82002C13.7708 9.97277 13.8088 10.1206 13.8473 10.2704C13.8636 10.3339 13.88 10.3978 13.8972 10.4625L13.9238 10.5825C14.0012 10.9 14.0689 11.215 14.1172 11.5325C14.1558 11.75 14.1921 11.9575 14.2114 12.1675C14.2404 12.405 14.2694 12.6425 14.2791 12.88C14.2984 13.0975 14.3081 13.325 14.3081 13.5425C14.3081 14.0975 14.2598 14.6325 14.1462 15.1375C14.139 15.1646 14.1319 15.1921 14.1248 15.2198C14.0929 15.3427 14.06 15.4701 14.0205 15.5925C13.9848 15.7236 13.9386 15.8547 13.8905 15.9908C13.8735 16.039 13.8563 16.0878 13.8392 16.1375C13.8361 16.1463 13.8329 16.1552 13.8297 16.1641C13.7941 16.2631 13.758 16.3639 13.7136 16.4625C13.4743 17.0575 13.1771 17.65 12.8702 18.205C12.4207 19.0275 11.9688 19.75 11.6522 20.215C11.6328 20.2451 11.6139 20.2736 11.5957 20.3012C11.573 20.3354 11.5514 20.3681 11.5314 20.4C11.4323 20.545 11.5338 20.75 11.7053 20.75H15.05V23.4825H11.6667C10.758 23.4825 9.91699 22.95 9.511 22.0975C9.30076 21.67 9.21858 21.2 9.26694 20.74C9.27898 20.6025 9.1799 20.4725 9.0446 20.4725H2.21024C2.09423 20.4725 2 20.57 2 20.69V20.835C2 25.345 5.5211 29 9.86623 29H22.126C24.4241 29 25.729 26.8336 27.0116 24.7043C27.3691 24.1108 27.7249 23.5201 28.1 22.98C28.7743 22.01 30.3959 21.24 30.8695 21.03C30.9468 20.995 31 20.915 31 20.825Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M4.13152 16.5262L4.03272 16.6834C3.94565 16.8191 4.04211 17 4.20682 17H10.3339C10.4021 17 10.4656 16.9667 10.5033 16.9095C10.5833 16.7857 10.6586 16.6572 10.7268 16.5262C11.2563 15.6262 11.7268 14.6524 11.8986 13.9334C12.3009 12.1858 11.4421 9.37873 10.4468 7.12164C10.3809 6.97166 10.1763 6.95739 10.0892 7.09546L4.13152 16.5262Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                          <strong>
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              </svg>
                            </button>
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-three-dots-vertical"
                                viewBox="0 0 16 16"
                              >
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              </svg>
                            </button>
                          </strong>
                        </div>
                        <h3>
                          {item?.title} #{item?.tokenId}
                        </h3>
                        <h4>
                          <span>
                            <svg
                              viewBox="0 0 48 96"
                              focusable="false"
                              className="chakra-icon css-1bftssy"
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
                            {item?.priceUSD}
                          </span>{" "}
                          <strong>
                            <svg
                              viewBox="0 0 24 24"
                              focusable="false"
                              className="chakra-icon css-1gpu3vi"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                focusable="false"
                                className="chakra-icon css-brr9t8"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </svg>{" "}
                            6,098
                          </strong>
                        </h4>
                        <h6>
                          Offer{" "}
                          <svg
                            viewBox="0 0 48 96"
                            focusable="false"
                            className="chakra-icon css-1ijxv3w"
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
                          <strong>42</strong>
                        </h6>
                        <a href="#">
                          Connect{" "}
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-1sdtgly"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 1V10.1715L20.585 6.58655L21.9992 8.00076L16 13.9999V14L16 14L16 14V13.9999L10.0008 8.00076L11.415 6.58655L15 10.1715V1H17ZM28 6.99996H27.3095L26 12.5L25.9745 12.5007L25.1997 16H7.61969L7.01959 12.9995L7 13L5 3C4.90353 2.52688 4.48276 1.99023 4 1.99996H0V3.99996H3.18L7 23.2C7.09647 23.6731 7.51724 24.0097 8 24H26V22H8.82L8 18H26C26.4767 18.0116 26.8952 17.6851 27 17.22L29 8.21996C29.0679 7.9193 28.9934 7.60412 28.798 7.36573C28.6026 7.12734 28.3081 6.99239 28 6.99996ZM12 27.9999C12 29.1045 11.1046 29.9999 10 29.9999C8.89543 29.9999 8 29.1045 8 27.9999C8 26.8954 8.89543 25.9999 10 25.9999C11.1046 25.9999 12 26.8954 12 27.9999ZM26 27.9999C26 29.1045 25.1046 29.9999 24 29.9999C22.8954 29.9999 22 29.1045 22 27.9999C22 26.8954 22.8954 25.9999 24 25.9999C25.1046 25.9999 26 26.8954 26 27.9999Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    );
                  })
                : myNft?.map((item) => {
                    return (
                      <div
                        onClick={() =>
                          navigate(
                            `/single-product/${item?.collectionAddress}/${item?.tokenId}`
                          )
                        }
                        className="collection-details-item"
                      >
                        <div className="collection-details-item-img">
                          <img
                            src={item?.image ? item.image : CollImgItem}
                            alt="item"
                          />
                          <span>
                            <svg
                              viewBox="0 0 32 32"
                              focusable="false"
                              className="chakra-icon css-zbxbij"
                            >
                              <path
                                d="M31 20.825V19.2575C31 19.1125 30.8647 19.0075 30.7318 19.0475L23.576 21.1875C23.5374 21.1975 23.5035 21.22 23.4769 21.25C22.7105 22.1258 22.0592 22.7135 21.8867 22.8692L21.8747 22.88C21.43 23.27 20.879 23.4825 20.299 23.4825H17.7083V20.75H19.7673C19.8205 20.75 19.8713 20.73 19.9099 20.695L20.1757 20.4425C20.2893 20.335 20.4247 20.205 20.5866 20.0375C20.6003 20.0232 20.6143 20.0089 20.6284 19.9943C20.7135 19.9066 20.8044 19.8129 20.8935 19.71C20.9999 19.6025 21.1038 19.4825 21.2004 19.365C21.3623 19.185 21.517 18.9975 21.6789 18.8C21.7949 18.67 21.9013 18.5225 22.0052 18.375C22.1212 18.235 22.2348 18.0775 22.3411 17.9275C22.3807 17.8674 22.4228 17.8065 22.4658 17.7444C22.5068 17.6852 22.5487 17.6247 22.59 17.5625C22.6673 17.4425 22.7447 17.315 22.8099 17.195C23.0129 16.87 23.1845 16.5225 23.3295 16.175C23.3961 16.0262 23.4493 15.8694 23.501 15.7171C23.5075 15.698 23.514 15.679 23.5204 15.66C23.5784 15.4825 23.6267 15.315 23.663 15.1375C23.75 14.72 23.7693 14.305 23.7307 13.89C23.721 13.76 23.7113 13.6325 23.6824 13.5125V13.4925C23.6727 13.4075 23.6533 13.3125 23.6267 13.225C23.5398 12.82 23.4044 12.415 23.2328 12.0175C23.1748 11.87 23.1072 11.72 23.0419 11.5825C22.8873 11.285 22.7253 10.9875 22.5417 10.7C22.5048 10.6393 22.4641 10.5778 22.4235 10.5164C22.3922 10.4691 22.3609 10.4218 22.3314 10.375C22.2151 10.1894 22.0843 10.0105 21.9574 9.83688C21.9288 9.79766 21.9003 9.75871 21.8722 9.72001C21.7973 9.61826 21.7153 9.51653 21.6328 9.41412C21.5876 9.35798 21.5422 9.30164 21.4977 9.24498C21.372 9.0875 21.2488 8.93751 21.1231 8.79C20.6736 8.26499 20.2024 7.79001 19.7818 7.38501C19.7045 7.305 19.6199 7.225 19.5329 7.14752C19.2067 6.84 18.9094 6.57248 18.6605 6.36502C18.5857 6.30549 18.5186 6.24685 18.4562 6.19226C18.4137 6.15514 18.3734 6.11989 18.3342 6.08752C18.2588 6.02935 18.1933 5.97776 18.1384 5.93445C18.1035 5.90699 18.0729 5.88286 18.0467 5.86249C18.0273 5.8475 18.0056 5.83752 17.9839 5.82998L17.7083 5.75002V3.39C17.7083 3.00501 17.5585 2.66001 17.3193 2.40748C17.08 2.155 16.7465 2 16.3792 2C15.6445 2 15.05 2.62249 15.05 3.39V4.97998L14.9123 4.94002L14.5377 4.82999L14.1969 4.73251L14.1937 4.73157C14.1937 4.73157 14.1901 4.72998 14.1873 4.72998H14.18L11.5942 4.005C11.4806 3.97249 11.3839 4.09999 11.4419 4.2075L11.8552 4.9975C11.8786 5.05821 11.9084 5.11893 11.9389 5.18132C11.9587 5.2217 11.9788 5.26278 11.9977 5.30502C12.0654 5.44498 12.1331 5.59249 12.1983 5.74C12.2563 5.86998 12.3144 5.99749 12.382 6.1375C12.4104 6.20333 12.4395 6.26995 12.4689 6.33753C12.5769 6.58564 12.6905 6.84654 12.8025 7.12752C12.8992 7.36501 12.9958 7.6025 13.0804 7.85002C13.3124 8.4725 13.5323 9.13748 13.7233 9.82002C13.7708 9.97277 13.8088 10.1206 13.8473 10.2704C13.8636 10.3339 13.88 10.3978 13.8972 10.4625L13.9238 10.5825C14.0012 10.9 14.0689 11.215 14.1172 11.5325C14.1558 11.75 14.1921 11.9575 14.2114 12.1675C14.2404 12.405 14.2694 12.6425 14.2791 12.88C14.2984 13.0975 14.3081 13.325 14.3081 13.5425C14.3081 14.0975 14.2598 14.6325 14.1462 15.1375C14.139 15.1646 14.1319 15.1921 14.1248 15.2198C14.0929 15.3427 14.06 15.4701 14.0205 15.5925C13.9848 15.7236 13.9386 15.8547 13.8905 15.9908C13.8735 16.039 13.8563 16.0878 13.8392 16.1375C13.8361 16.1463 13.8329 16.1552 13.8297 16.1641C13.7941 16.2631 13.758 16.3639 13.7136 16.4625C13.4743 17.0575 13.1771 17.65 12.8702 18.205C12.4207 19.0275 11.9688 19.75 11.6522 20.215C11.6328 20.2451 11.6139 20.2736 11.5957 20.3012C11.573 20.3354 11.5514 20.3681 11.5314 20.4C11.4323 20.545 11.5338 20.75 11.7053 20.75H15.05V23.4825H11.6667C10.758 23.4825 9.91699 22.95 9.511 22.0975C9.30076 21.67 9.21858 21.2 9.26694 20.74C9.27898 20.6025 9.1799 20.4725 9.0446 20.4725H2.21024C2.09423 20.4725 2 20.57 2 20.69V20.835C2 25.345 5.5211 29 9.86623 29H22.126C24.4241 29 25.729 26.8336 27.0116 24.7043C27.3691 24.1108 27.7249 23.5201 28.1 22.98C28.7743 22.01 30.3959 21.24 30.8695 21.03C30.9468 20.995 31 20.915 31 20.825Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M4.13152 16.5262L4.03272 16.6834C3.94565 16.8191 4.04211 17 4.20682 17H10.3339C10.4021 17 10.4656 16.9667 10.5033 16.9095C10.5833 16.7857 10.6586 16.6572 10.7268 16.5262C11.2563 15.6262 11.7268 14.6524 11.8986 13.9334C12.3009 12.1858 11.4421 9.37873 10.4468 7.12164C10.3809 6.97166 10.1763 6.95739 10.0892 7.09546L4.13152 16.5262Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                          <strong>
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              </svg>
                            </button>
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-three-dots-vertical"
                                viewBox="0 0 16 16"
                              >
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              </svg>
                            </button>
                          </strong>
                        </div>
                        <h3>
                          {item?.title} #{item?.tokenId}
                        </h3>
                        <h4>
                          <span>
                            <svg
                              viewBox="0 0 48 96"
                              focusable="false"
                              className="chakra-icon css-1bftssy"
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
                            {item?.priceUSD}
                          </span>{" "}
                          <strong>
                            <svg
                              viewBox="0 0 24 24"
                              focusable="false"
                              className="chakra-icon css-1gpu3vi"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                focusable="false"
                                className="chakra-icon css-brr9t8"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13 7C11.8954 7 11 7.89543 11 9V14H5C3.89543 14 3 14.8954 3 16V23C3 24.1046 3.89543 25 5 25H7H11H13H19H21H25H27C28.1046 25 29 24.1046 29 23V19C29 17.8954 28.1046 17 27 17H21V9C21 7.89543 20.1046 7 19 7H13ZM25 23H27V19H21V23H25ZM19 23V19V9H13V16V23H19ZM11 23V16H5V23H7H11Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </svg>{" "}
                            6,098
                          </strong>
                        </h4>
                        <h6>
                          Offer{" "}
                          <svg
                            viewBox="0 0 48 96"
                            focusable="false"
                            className="chakra-icon css-1ijxv3w"
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
                          <strong>42</strong>
                        </h6>
                        <a href="#">
                          Connect{" "}
                          <svg
                            viewBox="0 0 32 32"
                            focusable="false"
                            className="chakra-icon css-1sdtgly"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 1V10.1715L20.585 6.58655L21.9992 8.00076L16 13.9999V14L16 14L16 14V13.9999L10.0008 8.00076L11.415 6.58655L15 10.1715V1H17ZM28 6.99996H27.3095L26 12.5L25.9745 12.5007L25.1997 16H7.61969L7.01959 12.9995L7 13L5 3C4.90353 2.52688 4.48276 1.99023 4 1.99996H0V3.99996H3.18L7 23.2C7.09647 23.6731 7.51724 24.0097 8 24H26V22H8.82L8 18H26C26.4767 18.0116 26.8952 17.6851 27 17.22L29 8.21996C29.0679 7.9193 28.9934 7.60412 28.798 7.36573C28.6026 7.12734 28.3081 6.99239 28 6.99996ZM12 27.9999C12 29.1045 11.1046 29.9999 10 29.9999C8.89543 29.9999 8 29.1045 8 27.9999C8 26.8954 8.89543 25.9999 10 25.9999C11.1046 25.9999 12 26.8954 12 27.9999ZM26 27.9999C26 29.1045 25.1046 29.9999 24 29.9999C22.8954 29.9999 22 29.1045 22 27.9999C22 26.8954 22.8954 25.9999 24 25.9999C25.1046 25.9999 26 26.8954 26 27.9999Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    );
                  })}
            </div>
          )}
          {/* no nfts */}
          {myNft.length < 1 && !isLoading && (
            <div
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px",
                paddingTop: "10px",
              }}
            >
              {/* <svg
                viewBox="0 0 32 32"
                focusable="false"
                class="chakra-icon css-1ijz67n"
              >
                <path
                  d="M 25.832031 18.507812 L 22.71875 18.007812 L 22.761719 17.726562 C 23.234375 14.851562 24.148438 14.097656 25.667969 13.445312 C 26.78125 12.96875 27.675781 12.378906 27.851562 11.300781 C 28.035156 10.160156 27.257812 9.273438 26.148438 9.097656 C 25.070312 8.925781 23.960938 9.480469 23.695312 10.8125 L 20.34375 10.273438 C 20.945312 6.996094 23.628906 5.824219 26.613281 6.304688 C 29.875 6.828125 31.925781 8.878906 31.460938 11.753906 C 31.152344 13.6875 29.957031 14.734375 28.273438 15.398438 C 26.847656 15.972656 26.152344 16.628906 25.878906 18.226562 Z M 25.78125 21.871094 C 25.597656 22.964844 24.542969 23.699219 23.492188 23.527344 C 22.40625 23.355469 21.652344 22.332031 21.835938 21.238281 C 22 20.160156 23.039062 19.425781 24.121094 19.597656 C 25.175781 19.769531 25.945312 20.792969 25.78125 21.871094 Z M 13.738281 8.980469 L 21.917969 13.675781 L 14.027344 27.265625 L 0.398438 19.445312 L 5.136719 11.285156 Z M 5.953125 15.539062 C 7.8125 12.316406 11.933594 11.210938 15.15625 13.074219 L 17.941406 14.683594 L 16.335938 17.46875 C 14.476562 20.695312 10.355469 21.800781 7.132812 19.9375 L 4.347656 18.328125 Z M 12.714844 18.472656 C 14.199219 18.074219 15.089844 16.578125 14.703125 15.132812 C 14.3125 13.683594 12.796875 12.835938 11.308594 13.234375 C 9.824219 13.632812 8.933594 15.128906 9.320312 16.574219 C 9.710938 18.019531 11.226562 18.871094 12.714844 18.472656 Z M 12.382812 16.949219 C 13.007812 16.78125 13.378906 16.140625 13.210938 15.511719 C 13.042969 14.886719 12.402344 14.515625 11.773438 14.683594 C 11.148438 14.851562 10.777344 15.496094 10.945312 16.121094 C 11.113281 16.746094 11.757812 17.117188 12.382812 16.949219 Z M 12.382812 16.949219 "
                  fill="var(--text-color)"
                  fill-rule="evenodd"
                ></path>
              </svg> */}
              <h2
                style={{
                  lineHeight: "1.5rem",
                  fontWeight: 700,
                  color: "var(--text-color)",
                }}
              >
                No Nft Found
              </h2>
            </div>
          )}
          {/* no nfts */}
          {isMineChecked && showMineNFTs.length < 1 && (
            <div
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px",
                paddingTop: "10px",
              }}
            >
              {/* <svg
                viewBox="0 0 32 32"
                focusable="false"
                class="chakra-icon css-1ijz67n"
              >
                <path
                  d="M 25.832031 18.507812 L 22.71875 18.007812 L 22.761719 17.726562 C 23.234375 14.851562 24.148438 14.097656 25.667969 13.445312 C 26.78125 12.96875 27.675781 12.378906 27.851562 11.300781 C 28.035156 10.160156 27.257812 9.273438 26.148438 9.097656 C 25.070312 8.925781 23.960938 9.480469 23.695312 10.8125 L 20.34375 10.273438 C 20.945312 6.996094 23.628906 5.824219 26.613281 6.304688 C 29.875 6.828125 31.925781 8.878906 31.460938 11.753906 C 31.152344 13.6875 29.957031 14.734375 28.273438 15.398438 C 26.847656 15.972656 26.152344 16.628906 25.878906 18.226562 Z M 25.78125 21.871094 C 25.597656 22.964844 24.542969 23.699219 23.492188 23.527344 C 22.40625 23.355469 21.652344 22.332031 21.835938 21.238281 C 22 20.160156 23.039062 19.425781 24.121094 19.597656 C 25.175781 19.769531 25.945312 20.792969 25.78125 21.871094 Z M 13.738281 8.980469 L 21.917969 13.675781 L 14.027344 27.265625 L 0.398438 19.445312 L 5.136719 11.285156 Z M 5.953125 15.539062 C 7.8125 12.316406 11.933594 11.210938 15.15625 13.074219 L 17.941406 14.683594 L 16.335938 17.46875 C 14.476562 20.695312 10.355469 21.800781 7.132812 19.9375 L 4.347656 18.328125 Z M 12.714844 18.472656 C 14.199219 18.074219 15.089844 16.578125 14.703125 15.132812 C 14.3125 13.683594 12.796875 12.835938 11.308594 13.234375 C 9.824219 13.632812 8.933594 15.128906 9.320312 16.574219 C 9.710938 18.019531 11.226562 18.871094 12.714844 18.472656 Z M 12.382812 16.949219 C 13.007812 16.78125 13.378906 16.140625 13.210938 15.511719 C 13.042969 14.886719 12.402344 14.515625 11.773438 14.683594 C 11.148438 14.851562 10.777344 15.496094 10.945312 16.121094 C 11.113281 16.746094 11.757812 17.117188 12.382812 16.949219 Z M 12.382812 16.949219 "
                  fill="var(--text-color)"
                  fill-rule="evenodd"
                ></path>
              </svg> */}
              <h2
                style={{
                  lineHeight: "1.5rem",
                  fontWeight: 700,
                  color: "var(--text-color)",
                }}
              >
                No Nft Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </CollectionMain>

    //   <div class="css-1tlxypu">
    //     <svg
    //       viewBox="0 0 32 32"
    //       focusable="false"
    //       class="chakra-icon css-1ijz67n"
    //     >
    //       <path
    //         d="M 25.832031 18.507812 L 22.71875 18.007812 L 22.761719 17.726562 C 23.234375 14.851562 24.148438 14.097656 25.667969 13.445312 C 26.78125 12.96875 27.675781 12.378906 27.851562 11.300781 C 28.035156 10.160156 27.257812 9.273438 26.148438 9.097656 C 25.070312 8.925781 23.960938 9.480469 23.695312 10.8125 L 20.34375 10.273438 C 20.945312 6.996094 23.628906 5.824219 26.613281 6.304688 C 29.875 6.828125 31.925781 8.878906 31.460938 11.753906 C 31.152344 13.6875 29.957031 14.734375 28.273438 15.398438 C 26.847656 15.972656 26.152344 16.628906 25.878906 18.226562 Z M 25.78125 21.871094 C 25.597656 22.964844 24.542969 23.699219 23.492188 23.527344 C 22.40625 23.355469 21.652344 22.332031 21.835938 21.238281 C 22 20.160156 23.039062 19.425781 24.121094 19.597656 C 25.175781 19.769531 25.945312 20.792969 25.78125 21.871094 Z M 13.738281 8.980469 L 21.917969 13.675781 L 14.027344 27.265625 L 0.398438 19.445312 L 5.136719 11.285156 Z M 5.953125 15.539062 C 7.8125 12.316406 11.933594 11.210938 15.15625 13.074219 L 17.941406 14.683594 L 16.335938 17.46875 C 14.476562 20.695312 10.355469 21.800781 7.132812 19.9375 L 4.347656 18.328125 Z M 12.714844 18.472656 C 14.199219 18.074219 15.089844 16.578125 14.703125 15.132812 C 14.3125 13.683594 12.796875 12.835938 11.308594 13.234375 C 9.824219 13.632812 8.933594 15.128906 9.320312 16.574219 C 9.710938 18.019531 11.226562 18.871094 12.714844 18.472656 Z M 12.382812 16.949219 C 13.007812 16.78125 13.378906 16.140625 13.210938 15.511719 C 13.042969 14.886719 12.402344 14.515625 11.773438 14.683594 C 11.148438 14.851562 10.777344 15.496094 10.945312 16.121094 C 11.113281 16.746094 11.757812 17.117188 12.382812 16.949219 Z M 12.382812 16.949219 "
    //         fill="var(--text-color)"
    //         fill-rule="evenodd"
    //       ></path>
    //     </svg>
    //     <div class="chakra-text css-qt372v">No NFTs found</div>
    //   </div>
  );
};

export default TabOne;
