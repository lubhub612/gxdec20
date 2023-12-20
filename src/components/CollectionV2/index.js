import * as React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Tabs, Input, Dropdown } from "antd";
import CollImg from "../../assets/images/coll-img.avif";

import { CollectionMain, LoadingScreen, Button as MyButton } from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ReactLoading from "react-loading";
import useDebounce from "../../hooks/useDebounce";
import AllCollectionsTab from "./Tabs";
import WatchListTab from "./WatchListTab";
export default function CollectionArea(props) {
  const navigate = useNavigate();
  const { filter } = props;
  const { invokeServer } = useGlobal();
  const [collections, setCollections] = React.useState([]);
  const [watchList, setWatchList] = React.useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const { wallet } = useCustomWallet();
  const { toastError, toastInfo } = useToast();
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [tab, setTab] = React.useState(1);

  // const [searchKeyword, setSearchKeyword] = React.useState("");

  // const handleSelectedOption = (value) => {
  //   const sortCollections = collections.sort((a, b) => {
  //     if (value === "high") {
  //       return (b.tradeVolume - a.tradeVolume)
  //     } else if (value === "low") {
  //       return (a.tradeVolume - b.tradeVolume)
  //     }
  //   });
  //   setCollections([...sortCollections]);
  // }

  const getCollections = (keyword) => {
    setLoading(true);
    if (filter === "all") {
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
    } else if (filter === "owner") {
      invokeServer(
        "get",
        `/api/collection?owner=${wallet.address}&extra=onlyOwner&keyword=${searchKeyword}`
      )
        .then((res) => {
          if (res.data.result === 0) {
            toastInfo("warning", res.data.msg);
          } else if (res.data.result === 1) {
            setCollections(res.data.collections);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("get-owner-coll-err:", err.message);
          toastError("Fail", err.message);
          setLoading(false);
        });
    }
  };
  const getWatchList = (keyword) => {
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));

    if (filter === "all" && user) {
      invokeServer("get", `/api/collection/user-watch-list?user_id=${user.id}`)
        .then((res) => {
          if (res.data.result === 0) {
            toastInfo("warning", res.data.message);
          } else if (res.data.result === 1) {
            setWatchList(res.data.collections);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("get-all-coll-err:", err.message);
          toastError("Fail:", err.message);
          setLoading(false);
        });
    } else if (filter === "owner") {
      invokeServer(
        "get",
        `/api/collection?owner=${wallet.address}&extra=onlyOwner&keyword=${searchKeyword}`
      )
        .then((res) => {
          if (res.data.result === 0) {
            toastInfo("warning", res.data.msg);
          } else if (res.data.result === 1) {
            setCollections(res.data.collections);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("get-owner-coll-err:", err.message);
          toastError("Fail", err.message);
          setLoading(false);
        });
    }
  };
  // const handleSearchInput = (e) => {
  //   console.log("search", e.target.value);
  //   setSearchKeyword(e.target.value);
  // }
  // //debouncing the search input field
  // const debouncedValue = useDebounce(searchKeyword, 500);
  // const handleSearch = React.useCallback(() => {
  //   // searchStyleByKeyword(debouncedValue);
  //   handleGetCollections();
  // }, [debouncedValue]);

  // React.useEffect(() => handleSearch(), [handleSearch]);

  React.useEffect(() => {
    getCollections();
  }, [filter]);
  React.useEffect(() => {
    getCollections();
  }, [wallet.address]);
  // React.useEffect(() => {
  //   getCollections();
  // }, [auth]);

  // const TabOne = () => {
  //   const options = [
  //     {
  //       key: '1',
  //       label: <p onClick={() => handleSelectedOption("high")}>high to low</p>,
  //     },

  //     {
  //       key: '2',
  //       label: <p onClick={() => handleSelectedOption("low")}>low to high</p>,
  //     },
  //   ];

  //   return (
  //     <div className="collection-area">
  //       <div className="collection-area-header">
  //         <button>
  //           <svg
  //             viewBox="0 0 32 32"
  //             focusable="false"
  //             className="chakra-icon css-1sdtgly"
  //             aria-hidden="true"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               clipRule="evenodd"
  //               d="M18 28H14C12.8954 28 12 27.1046 12 26V18.41L4.59 11C4.21441 10.6266 4.00223 10.1196 4 9.59V6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V9.59C27.9978 10.1196 27.7856 10.6266 27.41 11L20 18.41V26C20 27.1046 19.1046 28 18 28ZM6 6V9.59L14 17.59V26H18V17.59L26 9.59V6H6Z"
  //               fill="currentColor"
  //             ></path>
  //           </svg>{' '}
  //           Filter
  //         </button>
  //         <Input
  //           size="large"
  //           placeholder="Search"
  //           prefix={<SearchOutlined />}
  //           onChange={(e) => handleSearchInput(e)}
  //         />
  //         <Dropdown
  //           menu={{
  //             items: options,
  //           }}
  //           trigger={['click']}
  //         >
  //           <a onClick={(e) => e.preventDefault()}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="16"
  //               height="16"
  //               fill="currentColor"
  //               className="bi bi-chevron-down"
  //               viewBox="0 0 16 16"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  //               />
  //             </svg>
  //           </a>
  //         </Dropdown>
  //         <ul>
  //           <li>24h</li>
  //           <li>7d</li>
  //           <li>30d</li>
  //           <li>Max</li>
  //         </ul>
  //       </div>
  //       <div className="collection-area-body">
  //         <div className="collection-area-body-desktop">
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>#</th>
  //                 <th>Collection</th>
  //                 <th>Floor</th>
  //                 <th>Vol</th>
  //                 <th>Owners</th>
  //                 <th>Items</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {
  //                 loading
  //                   ? <LoadingScreen>
  //                     <ReactLoading type="cylon" color="#AAFF26" width={120} />
  //                   </LoadingScreen>
  //                   : <>{
  //                     collections.map((collection, index) =>
  //                       <tr key={collection._id}>
  //                         <td>{index + 1}</td>
  //                         <td>
  //                           <span>
  //                             <img src={collection.logoURI} alt="collection" />
  //                             {collection.name}
  //                             <svg
  //                               xmlns="http://www.w3.org/2000/svg"
  //                               width="16"
  //                               height="16"
  //                               fill="currentColor"
  //                               className="bi bi-patch-check-fill"
  //                               viewBox="0 0 16 16"
  //                             >
  //                               <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
  //                             </svg>
  //                           </span>
  //                         </td>
  //                         <td>
  //                           <span>
  //                             <svg
  //                               viewBox="0 0 48 96"
  //                               focusable="false"
  //                               className="chakra-icon css-anc12x"
  //                             >
  //                               <path
  //                                 d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
  //                                 fill="#767676"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
  //                                 fill="#767676"
  //                               ></path>
  //                             </svg>{' '}
  //                             10,73
  //                           </span>
  //                           <strong className="green">+32.2%</strong>
  //                         </td>
  //                         <td>
  //                           <span>
  //                             <svg
  //                               viewBox="0 0 48 96"
  //                               focusable="false"
  //                               className="chakra-icon css-anc12x"
  //                             >
  //                               <path
  //                                 d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
  //                                 fill="#767676"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
  //                                 fill="#767676"
  //                               ></path>
  //                             </svg>{' '}
  //                             1,254.89
  //                           </span>
  //                           <strong className="red">-65.7%</strong>
  //                         </td>
  //                         <td>
  //                           <span>11,186</span>
  //                           <strong className="ash">57.5% unique</strong>
  //                         </td>
  //                         <td>10,000</td>
  //                       </tr>)
  //                   }
  //                   </>
  //               }
  //             </tbody>
  //           </table>
  //         </div>
  //         <div className="collection-area-body-mobile">
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>#</th>
  //                 <th>Collection</th>
  //                 <th>Floor</th>
  //                 <th>Vol</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {
  //                 loading
  //                   ? <LoadingScreen>
  //                     <ReactLoading type="cylon" color="#AAFF26" width={120} />
  //                   </LoadingScreen>
  //                   : <>{
  //                     collections.map((collection, index) =>
  //                       <tr key={collection._id}>
  //                         <td>{index + 1}</td>
  //                         <td>
  //                           <span>
  //                             <img src={collection.logoURI} alt="collection" />
  //                             {collection.name}
  //                             <svg
  //                               xmlns="http://www.w3.org/2000/svg"
  //                               width="16"
  //                               height="16"
  //                               fill="currentColor"
  //                               className="bi bi-patch-check-fill"
  //                               viewBox="0 0 16 16"
  //                             >
  //                               <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
  //                             </svg>
  //                           </span>
  //                         </td>
  //                         <td>
  //                           <span>
  //                             <svg
  //                               viewBox="0 0 48 96"
  //                               focusable="false"
  //                               className="chakra-icon css-anc12x"
  //                             >
  //                               <path
  //                                 d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
  //                                 fill="#767676"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
  //                                 fill="#767676"
  //                               ></path>
  //                             </svg>{' '}
  //                             10,73
  //                           </span>
  //                           <strong className="green">+32.2%</strong>
  //                         </td>
  //                         <td>
  //                           <span>
  //                             <svg
  //                               viewBox="0 0 48 96"
  //                               focusable="false"
  //                               className="chakra-icon css-anc12x"
  //                             >
  //                               <path
  //                                 d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z"
  //                                 fill="#767676"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z"
  //                                 fill="#8E8E8E"
  //                               ></path>
  //                               <path
  //                                 d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z"
  //                                 fill="#5F5F5F"
  //                               ></path>
  //                               <path
  //                                 d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z"
  //                                 fill="#767676"
  //                               ></path>
  //                             </svg>{' '}
  //                             1,254.89
  //                           </span>
  //                           <strong className="red">-65.7%</strong>
  //                         </td>
  //                         <td>
  //                           <span>11,186</span>
  //                           <strong className="ash">57.5% unique</strong>
  //                         </td>
  //                         <td>10,000</td>
  //                       </tr>)
  //                   }
  //                   </>
  //               }
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  const handleTabChange = (activeKey) => {
    if (activeKey === "1") {
      getCollections();
    } else if (activeKey === "2") {
      getWatchList();
    }
  };

  const items = [
    {
      key: "1",
      label: `All Collections`,
      children: (
        <AllCollectionsTab
          collections={collections}
          setCollections={setCollections}
          getCollections={getCollections}
          loading={loading}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      ),
    },
    {
      key: "2",
      label: `My Watchlists`,
      children: (
        <WatchListTab
          collections={watchList}
          setCollections={setWatchList}
          getCollections={getWatchList}
          loading={loading}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      ),
    },
  ];
  return (
    <CollectionMain>
      <div className="collection-header">
        <h2>Rankings</h2>
      </div>
      <div className="create-button">
        <MyButton
          style={{
            position: "absolute",
            top: -4,
            right: 30,
            zIndex: 99,
          }}
          onClick={() => navigate("/my-collections/create")}
        >
          Create Collection
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            fill="currentColor"
            class="bi bi-plus"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
          </svg>
        </MyButton>

        {/* <button
       
          class="button-6"
          role="button"
      
        >
          Create Collection
        </button> */}
      </div>
      <div className="tab-content">
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
      </div>
    </CollectionMain>
  );
}
