import React, { useEffect, useState } from "react";
import { RentPageContainer, ModalContainer } from "./styles";

import { Select, Dropdown, Tooltip } from "antd";
import MainModal from "./RentPopup";

function Index({ theme }) {
  const [selectedCategory, setselectedCategory] = useState(2);
  const [showDetail, setshowDetail] = useState(false);

  const handleCategoryChange = (value) => {
    console.log(`selected ${value}`);
    setselectedCategory(value);
  };
  let categories = [
    {
      value: 1,
      label: "Recently Listed",
    },
    {
      value: 2,
      label: "Rate: Low to High",
    },
    {
      value: 3,
      label: "Rate: High to Low",
    },
    {
      value: 4,
      label: "Max Duration: Low to High",
    },
    {
      value: 5,
      label: "Max Duration: High to Low",
    },
  ];
  const items = [
    {
      key: "1",
      label: <a>Explorer</a>,
    },
    {
      key: "2",
      label: <a>Metadata</a>,
    },
    {
      key: "3",
      label: <a>Claim Link</a>,
    },
  ];
  const showModal = () => {
    setshowDetail(true);
  };
  // const handleOk = () => {
  //   setshowDetail(false);
  // };
  const handleCancel = () => {
    setshowDetail(false);
  };
  return (
    <RentPageContainer>
      <div
        className="rent-wrapper"
        style={{
          backgroundImage:
            theme == "dark"
              ? "radial-gradient(ellipse at  right, rgba(27,59,63,1) 0%, rgba(17,26,28,0) 60%)"
              : "none",
        }}
      >
        <div class="grid-container">
          <div class="grid-item1">
            <img
              class="min-h w-full rounded-xl"
              src="https://rent.cardinal.so/logos/serum-surfers-hero.png"
              alt="serum-surfers"
              style={{ maxHeight: "28vh", minHeight: "28vh" }}
            />
            <div className="rounded-image">
              <img
                class="w-full"
                src="https://rent.cardinal.so/logos/serum-surfers.png"
                alt="serum-surfers"
              />
            </div>
          </div>
          <div class="grid-item2">
            <div
              style={{
                gap: "1.5rem",
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
              }}
            >
              <div class="text-heading">Serum Surfers</div>
              <div class="text-desc">
                The Serum Surfers are a collection of 5,000 generative NFTs
                minted and launched on Solana through Burnt Finances Ignition
                Launchpad. They are a special homage to the Solana network’s
                inception, where founders Raj Gokal and Anatoly Yakovenko surfed
                alongside many of the early employees at Solana Beach,
                California. The Serum Surfers are the centerpiece of the quickly
                growing Serum NFT Ecosystem, and a key access ticket to
                everything it has in store!
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href="https://www.projectserum.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="cursor-pointer text-xl text-light-0 transition-all duration-300 hover:text-primary css-1et4zpc"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 496 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/SurfersDAO"
                  target="_blank"
                  rel="noreferrer"
                  class="cursor-pointer text-xl text-light-0 transition-all duration-300 hover:text-primary css-1et4zpc"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
                <a
                  href="https://discord.com/invite/projectserum"
                  target="_blank"
                  rel="noreferrer"
                  class="cursor-pointer text-xl text-light-0 transition-all duration-300 hover:text-primary css-1et4zpc"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 640 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                  </svg>
                </a>
              </div>
              {/* ertgyu */}
              <div
                class="middle"
                style={{ display: "flex", flexWrap: "wrap", rowGap: "1.25rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div class="text-desc-bold">Floor price</div>
                  <div class="text-desc">0 ◎ / day</div>
                </div>
                <div
                  style={{
                    margin: "0 4rem",
                    background: "var(--border-color)",
                    width: "1px",
                    height: "2.5rem",
                    margin: "auto 3rem",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  class="flex-col"
                >
                  <div class="text-desc-bold">Listed</div>
                  <div class="text-desc">9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comp-2">
          <div class="text-desc-bold">Results</div>
          <div class="text-desc">9 </div>
        </div>
      </div>
      {/* comp 3 */}
      <div class="class-1 mx-10">
        <div class="class-2">
          <div class="class-3">
            <div
              style={{ background: "rgba(0,0,0,0.5)", height: "36px" }}
              class="class-4 css-1sinufz"
              title=""
            >
              <div>Available</div>
            </div>
            <div class="class-4 css-1sinufz" title="">
              <div>Rented</div>
            </div>
          </div>
          {/* select input */}
          <Select
            value={selectedCategory}
            placeholder="Select a Filter"
            onChange={handleCategoryChange}
            options={categories}
          />
        </div>
        <div class="class-3a">
          <div
            class="class-4 class-4a css-1et4zpc"
            title="Click to refresh latest data"
          >
            <div style={{ width: "71px" }}>a while ago</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="text-2xl false"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
            </svg>
          </div>
          <div style={{ width: "170px", height: "40px" }} class="class-3">
            <div
              class="class-4 css-1sinufz"
              style={{
                background: "rgba(0,0,0,0.5)",
                height: "36px",
                marginRight: "6px",
                textAlign: "center",
              }}
              title="Browse this collection"
            >
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 1.18017e-06C1.34315 1.25259e-06 -9.0294e-07 1.34315 -8.30516e-07 3L-5.68248e-07 9C-5.44107e-07 9.55229 0.447715 10 0.999999 10L9 10C9.55228 10 10 9.55229 10 9L10 1C10 0.447717 9.55228 8.93759e-07 9 9.179e-07L3 1.18017e-06ZM2 3C2 2.44772 2.44771 2 3 2L8 2L8 8L2 8L2 3Z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 22C20.6569 22 22 20.6569 22 19L22 13C22 12.4477 21.5523 12 21 12L13 12C12.4477 12 12 12.4477 12 13L12 21C12 21.5523 12.4477 22 13 22L19 22ZM20 19C20 19.5523 19.5523 20 19 20L14 20L14 14L20 14L20 19Z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 9C22 9.55228 21.5523 10 21 10L13 10C12.4477 10 12 9.55229 12 9L12 1C12 0.447717 12.4477 7.67195e-07 13 7.43054e-07L19 4.80786e-07C20.6569 4.08362e-07 22 1.34315 22 3L22 9ZM20 8L20 3C20 2.44772 19.5523 2 19 2L14 2L14 8L20 8Z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 12C0.447715 12 -4.17544e-07 12.4477 -3.93402e-07 13L-1.31134e-07 19C-5.87108e-08 20.6569 1.34315 22 3 22L9 22C9.55228 22 10 21.5523 10 21L10 13C10 12.4477 9.55228 12 9 12L1 12ZM2 19L2 14L8 14L8 20L3 20C2.44772 20 2 19.5523 2 19Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className="class-4"
              style={{ justifyContent: "space-between !important" }}
              class="flex items-center justify-between rounded-lg px-5 py-2 text-sm text-light-0 transition-colors cursor-default opacity-25  css-1xdhyk6"
              title="View recent activity"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    gap: 12,
                    width: "100px",
                  }}
                  class="flex items-center gap-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.2666 16.9989C12.436 17.7894 13.564 17.7894 13.7334 16.9989L14.9279 11.4245C15.1996 10.1566 16.3201 9.25071 17.6168 9.25071L19 9.25071C19.4142 9.25071 19.75 9.5865 19.75 10.0007C19.75 10.4149 19.4142 10.7507 19 10.7507L17.6168 10.7507C17.0274 10.7507 16.5181 11.1625 16.3946 11.7388L15.2001 17.3132C14.6919 19.6846 11.3081 19.6847 10.7999 17.3132L7.73335 3.00248C7.56396 2.212 6.43603 2.21202 6.26665 3.00247L5.07213 8.57692C4.80042 9.84486 3.6799 10.7507 2.38317 10.7507L1 10.7507C0.585787 10.7507 0.25 10.4149 0.25 10.0007C0.25 9.5865 0.585787 9.25071 1 9.25071L2.38317 9.25071C2.97259 9.25071 3.48192 8.83896 3.60542 8.26262L4.79994 2.68818C5.30811 0.316758 8.6919 0.316786 9.20006 2.68819L12.2666 16.9989Z"
                      fill="#8D8B9B"
                    ></path>
                  </svg>
                  <div
                    style={{ cursor: "pointer", color: "var(--text-color)" }}
                  >
                    Activity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Comp 4 */}
      <div class="bg-bar relative z-0 mx-10 mt-10 flex items-center gap-4 overflow-hidden rounded-xl px-8 py-4 text-xl">
        <div class="blur-4xl absolute left-10 -z-10 h-[180px] w-[30%] -rotate-[60deg] bg-glow blur-[190px] css-1d1w0wk"></div>
        <div class="blur-4xl absolute right-40 -z-10 h-[180px] w-[20%] rotate-[60deg] bg-glow blur-[150px] css-1d1w0wk"></div>
        <div class="text-white">
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.2721 23.2722L9 12.0001L9.70711 11.293L20.9987 22.5846C20.7502 22.8071 20.5079 23.0364 20.2721 23.2722ZM18.6054 25.1912L7.70711 14.293L7 15.0001L18.0187 26.0187C18.2066 25.7372 18.4023 25.4613 18.6054 25.1912ZM42.9814 50.9815C43.2629 50.7935 43.5389 50.5979 43.8089 50.3948L53.669 60.2549L52.9619 60.962L42.9814 50.9815ZM16.7218 28.3077L5.70711 17.293L5 18.0001L16.2916 29.2917C16.4255 28.9587 16.569 28.6305 16.7218 28.3077ZM39.7084 52.7085C40.0415 52.5746 40.3696 52.4311 40.6924 52.2783L50.2548 61.8407L49.5477 62.5478L39.7084 52.7085ZM15.4402 32.026L3.70711 20.293L3 21.0001L15.2143 33.2143C15.2765 32.8137 15.352 32.4175 15.4402 32.026ZM35.7858 53.7859C36.1864 53.7236 36.5827 53.6482 36.9741 53.5599L47.5477 64.1336L46.8406 64.8407L35.7858 53.7859ZM15.0097 36.5955L2.70711 24.293L2 25.0001L15.124 38.1241C15.0648 37.6206 15.0264 37.1108 15.0097 36.5955ZM30.8761 53.8761C31.3795 53.9353 31.8893 53.9737 32.4046 53.9905L43.7193 65.3052L43.0122 66.0123L30.8761 53.8761ZM16.41 42.9959L1.70711 28.293L1 29.0001L18.0953 46.0954C17.4372 45.1256 16.8712 44.0883 16.41 42.9959ZM22.9047 50.9048C23.8745 51.5629 24.9118 52.1289 26.0042 52.5901L39.8909 66.4767L39.1838 67.1838L22.9047 50.9048ZM45.7279 48.728C45.9637 48.4922 46.193 48.2499 46.4155 48.0014L56.3762 57.962L55.669 58.6691L45.7279 48.728ZM33.9411 66.9412L0 33.0001L0.707107 32.293L34.6482 66.2341L33.9411 66.9412ZM1 39.0001L29.2843 67.2843L29.9914 66.5772L1.70711 38.293L1 39.0001ZM3 46.0001L22.799 65.7991L23.5061 65.092L3.70711 45.293L3 46.0001Z"
              fill="white"
            ></path>
            <circle
              cx="34"
              cy="34"
              r="33"
              stroke="#8D8B9B"
              stroke-width="2"
            ></circle>
            <path
              d="M29 30C29 28.8804 29.5583 27.9018 30.4905 27.1738C31.4321 26.4385 32.7132 26 34 26C35.4205 26 36.6859 26.2425 37.5703 26.8321C38.3831 27.3739 39 28.2913 39 30C39 31.1264 38.4956 31.9265 37.7175 32.5333C36.908 33.1645 35.8163 33.5665 34.7761 33.7867C33.3471 34.0893 32 35.3078 32 36.9922V38C32 38.5523 32.4477 39 33 39C33.5523 39 34 38.5523 34 38V36.9922C34 36.4674 34.4581 35.8984 35.1904 35.7434C36.3924 35.4889 37.809 34.9981 38.9474 34.1105C40.1171 33.1983 41 31.8533 41 30C41 27.7087 40.1169 26.1261 38.6797 25.1679C37.3141 24.2575 35.5795 24 34 24C32.2868 24 30.5679 24.5758 29.2595 25.5975C27.9417 26.6266 27 28.1481 27 30C27 30.5523 27.4477 31 28 31C28.5523 31 29 30.5523 29 30Z"
              fill="white"
            ></path>
            <path
              d="M33 44C33.8284 44 34.5 43.3284 34.5 42.5C34.5 41.6716 33.8284 41 33 41C32.1716 41 31.5 41.6716 31.5 42.5C31.5 43.3284 32.1716 44 33 44Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div class="flex flex-col av">
          <div class="text-medium-3">Available</div>
          <div style={{ color: "white" }} class="text-light-0">
            All listed tokens currently available to rent are displayed below
          </div>
        </div>
      </div>
      {/* comp 5 */}
      <div class="mx-auto mt-12 px-10">
        <div class="class-7">
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreigain6dmx7hpin7hn62ej4s6qq2bucuwu2lxxb5r4lcloljg3ektu.ipfs.nftstorage.link?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreicxvyt7owbfdkmeg27qc7jtobjbedoktf3n6xyh5yigjchqdwrojy.ipfs.nftstorage.link/?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreigain6dmx7hpin7hn62ej4s6qq2bucuwu2lxxb5r4lcloljg3ektu.ipfs.nftstorage.link?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreicxvyt7owbfdkmeg27qc7jtobjbedoktf3n6xyh5yigjchqdwrojy.ipfs.nftstorage.link/?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreigain6dmx7hpin7hn62ej4s6qq2bucuwu2lxxb5r4lcloljg3ektu.ipfs.nftstorage.link?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div class="class-8">
            <div class="class-9">
              <div>
                <div
                  class="class-11"
                  title="Quick Actions"
                  aria-expanded="false"
                  style={{ transition: "all 0.2s ease 0s" }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                    </svg>
                  </Dropdown>
                </div>
              </div>

              {/* image */}
              <div class="class-12">
                <div class="class-13"></div>
                <div class="class-14">
                  <div class="class-15">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div style={{ width: "190px" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              background
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              bg_orange
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",

                              justifyContent: "space-between",
                              gap: 4,
                            }}
                          >
                            <div class="mb-1 text-base text-light-0">
                              surfboard
                            </div>
                            <div
                              style={{ color: "rgb(141, 130, 155)" }}
                              class="text-base text-medium-3"
                            >
                              surfboard_water
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://bafkreicxvyt7owbfdkmeg27qc7jtobjbedoktf3n6xyh5yigjchqdwrojy.ipfs.nftstorage.link/?ext=png"
                  alt="Serum Surfers #1058"
                  class="class-16"
                ></img>
              </div>
            </div>
            {/* image title */}
            <div class="class-17">
              <div class="class-18">
                <div class="class-19">
                  <div class="class-20">Serum Surfers #1058</div>
                  <svg
                    stroke="currentColor"
                    fill="var(--text-color)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                  </svg>
                </div>
                <div class="class-21">
                  <div
                    class="class-22"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                  >
                    <div
                      class="class-23"
                      style={{ color: "rgb(23, 125, 220)" }}
                    >
                      @cardinal_labs
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1da1f2"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      variant="colored"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* image bottom */}
            <div style={{ flexGrow: 1 }}>
              <div class="class-24">
                <div>
                  <div class="class-25">
                    <div style={{ color: "rgb(126 255 232)" }}>
                      <div style={{ float: "left" }}>
                        <div class="class-26">
                          Fixed duration: <b> 1h </b>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "rgb(255 255 255)" }}>
                      0 ◎
                      <span style={{ color: "rgb(77 175 187)" }}>
                        {" "}
                        = 0 ◎ / day
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setshowDetail(true)} class="class-27">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={showDetail ? "blur-overlay" : ""} /> */}
      <div style={{ overflowX: "hidden", overflowY: "scroll" }}>
        {showDetail && (
          <MainModal handleClose={() => handleCancel()}>
            <ModalContainer>
              <div class="css-1pxskp3 transition-all rounded-xl max-w-98vw w-560px h-fit my-10vh">
                <div class="rounded-lg bg-dark-6 p-8">
                  {/* top heading */}
                  <div class="text-center text-2xl ">
                    Rent Serum Surfers #3487
                  </div>
                  <div class="mb-2 text-center text-lg text-medium-4">
                    Serum Surfers
                  </div>
                  {/* image */}
                  <div class="mb-4 flex w-full justify-center gap-4 overflow-x-auto pb-6">
                    <div class="relative w-3-4 lgw-1">
                      <img
                        class="rounded-lg"
                        src="https://bafkreicxvyt7owbfdkmeg27qc7jtobjbedoktf3n6xyh5yigjchqdwrojy.ipfs.nftstorage.link?ext=png"
                        alt="Serum Surfers #3487"
                      />
                      {/* icon */}
                      <div class="cursor-pointer rounded-md text-light-0 absolute top-3 right-3 z-20 flex items-center gap-3 rounded-md text-light-0 undefined">
                        <div class="flex items-center gap-1 scale-[1.5] rounded-full bg-light-0 text-dark-6">
                          <Tooltip
                            placement="bottom"
                            title={
                              <div style={{ width: "190px" }}>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",

                                    justifyContent: "space-between",
                                    gap: 4,
                                  }}
                                >
                                  <div class="mb-1 text-base text-light-0">
                                    background
                                  </div>
                                  <div
                                    style={{ color: "rgb(141, 130, 155)" }}
                                    class="text-base text-medium-3"
                                  >
                                    bg_orange
                                  </div>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",

                                    justifyContent: "space-between",
                                    gap: 4,
                                  }}
                                >
                                  <div class="mb-1 text-base text-light-0">
                                    surfboard
                                  </div>
                                  <div
                                    style={{ color: "rgb(141, 130, 155)" }}
                                    class="text-base text-medium-3"
                                  >
                                    surfboard_water
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 16 16"
                              height="1.5rem"
                              width="1.5rem"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                            </svg>
                          </Tooltip>
                        </div>
                      </div>

                      {/* badge */}
                      <div
                        style={{ border: "1px solid rgb(221 218 218 / 20%)" }}
                        class="absolute left-12 bottom-0 -translate-x-1/2 translate-y-1/2 border-1px border-border text-secondary rounded-xl bg-dark-66 bg-opacity-60 px-2 py-10px css-kpv81v"
                      >
                        Fixed duration
                      </div>
                    </div>
                  </div>
                  {/* this nft can be */}
                  <div class="mb-8 px-8 text-center text-base text-medium-3">
                    This NFT can be rented for a fixed duration of 1 hour{" "}
                  </div>
                  {/* stats poriton */}
                  <div class="flex flex-col gap-4">
                    {/* rental duration */}
                    <div class="flex justify-between gap-4">
                      <div class="flex flex-col gap-1">
                        <div class="mb-1 text-base text-light-0">
                          Rental duration
                        </div>
                        <div class="text-base text-medium-3">1 hour </div>
                      </div>
                      <div class="flex flex-col gap-1">
                        <div class="mb-1 text-base text-light-0">
                          Fixed price
                        </div>
                        <div class="text-base text-medium-3">
                          0 ◎<span class="text-medium-3"> = 0 ◎ / day</span>
                        </div>
                      </div>
                    </div>
                    {/* for hours details */}
                    <div
                      style={{ borderTop: "1px solid rgb(221 218 218 / 20%)" }}
                      class="flex justify-between gap-4 border-t-[1px] border-border pt-4"
                    >
                      <div class="flex gap-4">
                        {/* <svg
                          viewBox="0 -0.5 13 12.5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          class="mt-2"
                        >
                          <path
                            d="M27.7175 4.87199H20.8653V2.61599H29.4915V0.359985H20.8495C20.2493 0.359985 19.6737 0.596019 19.2493 1.01616C18.825 1.43631 18.5865 2.00615 18.5865 2.60032V4.88765C18.5865 5.48182 18.825 6.05166 19.2493 6.47181C19.6737 6.89195 20.2493 7.12799 20.8495 7.12799H27.7017V9.38399H18.7495V11.64H27.7175C28.3177 11.64 28.8933 11.404 29.3176 10.9838C29.742 10.5637 29.9805 9.99382 29.9805 9.39965V7.11232C29.9805 6.51815 29.742 5.94831 29.3176 5.52816C28.8933 5.10802 28.3177 4.87199 27.7175 4.87199Z"
                            fill="black"
                          ></path>
                          <path
                            d="M40.9865 0.359985H34.1091C33.8119 0.359985 33.5178 0.417945 33.2433 0.530551C32.9689 0.643158 32.7195 0.808204 32.5095 1.01626C32.2995 1.22431 32.133 1.4713 32.0194 1.7431C31.9058 2.0149 31.8475 2.30618 31.8477 2.60032V9.39965C31.8475 9.69379 31.9058 9.98507 32.0194 10.2569C32.133 10.5287 32.2995 10.7757 32.5095 10.9837C32.7195 11.1918 32.9689 11.3568 33.2433 11.4694C33.5178 11.582 33.8119 11.64 34.1091 11.64H40.9865C41.5867 11.64 42.1624 11.404 42.5867 10.9838C43.0111 10.5637 43.2495 9.99382 43.2495 9.39965V2.60032C43.2495 2.00615 43.0111 1.43631 42.5867 1.01616C42.1624 0.596019 41.5867 0.359985 40.9865 0.359985ZM40.9708 9.38399H34.1344V2.61599H40.9708V9.38399Z"
                            fill="black"
                          ></path>
                          <path
                            d="M65.0562 0.359986H58.3497C57.7495 0.359986 57.1738 0.596021 56.7494 1.01616C56.3251 1.43631 56.0867 2.00615 56.0867 2.60032V11.64H58.3655V7.93325H65.0404V11.64H67.3192V2.60032C67.3194 2.30606 67.261 2.01464 67.1473 1.74274C67.0337 1.47083 66.867 1.22378 66.6568 1.0157C66.4467 0.80763 66.1971 0.642616 65.9225 0.530102C65.6478 0.417587 65.3535 0.35978 65.0562 0.359986ZM65.0404 5.67725H58.3655V2.61599H65.0404V5.67725Z"
                            fill="black"
                          ></path>
                          <path
                            d="M91.7369 0.35999H85.0319C84.7344 0.359372 84.4395 0.416864 84.1644 0.529175C83.8893 0.641485 83.6394 0.806409 83.4287 1.01451C83.218 1.2226 83.0509 1.46978 82.937 1.7419C82.8229 2.01401 82.7642 2.30573 82.7642 2.60032V11.64H85.043V7.93326H91.7211V11.64H93.9999V2.60032C93.9999 2.00615 93.7615 1.43631 93.3371 1.01617C92.9127 0.596025 92.3371 0.35999 91.7369 0.35999ZM91.7211 5.67726H85.0477V2.61599H91.7211V5.67726Z"
                            fill="black"
                          ></path>
                          <path
                            d="M78.4615 9.38399H77.5499L74.2837 1.29999C74.172 1.02262 73.9788 0.784789 73.7292 0.617222C73.4795 0.449656 73.1848 0.360052 72.8832 0.359985H70.8545C70.4545 0.359985 70.0709 0.517286 69.7881 0.797285C69.5052 1.07728 69.3463 1.45704 69.3463 1.85302V11.64H71.6251V2.61599H72.5366L75.8013 10.7C75.9125 10.9774 76.1054 11.2152 76.3548 11.3828C76.6043 11.5505 76.8987 11.64 77.2002 11.64H79.229C79.629 11.64 80.0126 11.4827 80.2954 11.2027C80.5782 10.9227 80.737 10.5429 80.737 10.1469V0.359985H78.4583L78.4615 9.38399Z"
                            fill="black"
                          ></path>
                          <path
                            d="M47.5475 0.359985H45.2687V9.39965C45.2687 9.99382 45.5071 10.5637 45.9315 10.9838C46.356 11.404 46.9315 11.64 47.5317 11.64H54.3838V9.38399H47.5475V0.359985Z"
                            fill="black"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.41173 8.96099C2.4522 8.9176 2.50108 8.88275 2.55546 8.85853C2.60985 8.83431 2.66861 8.8212 2.72824 8.81999H12.6726C12.7147 8.82057 12.7556 8.83318 12.7907 8.85629C12.8257 8.87941 12.8532 8.91205 12.8699 8.95027C12.8867 8.9885 12.8919 9.0307 12.8849 9.07179C12.878 9.11288 12.8593 9.15111 12.8309 9.18189L10.723 11.499C10.6825 11.5424 10.6336 11.5772 10.5793 11.6014C10.5249 11.6257 10.4661 11.6388 10.4065 11.64H0.455778C0.413703 11.6394 0.372695 11.6268 0.337686 11.6037C0.302678 11.5806 0.27516 11.5479 0.258443 11.5097C0.241726 11.4715 0.236522 11.4293 0.243455 11.3882C0.250389 11.3471 0.269166 11.3089 0.297529 11.2781L2.41173 8.96099ZM12.8404 7.04025C12.8688 7.07102 12.8875 7.10926 12.8944 7.15035C12.9014 7.19144 12.8962 7.23363 12.8794 7.27186C12.8627 7.3101 12.8352 7.34273 12.8002 7.36584C12.7651 7.38895 12.7242 7.40156 12.6821 7.40215L2.73456 7.40999C2.67495 7.40877 2.61617 7.39567 2.56179 7.37145C2.50741 7.34722 2.45852 7.31237 2.41807 7.26899L0.294364 4.95972C0.266002 4.92895 0.247225 4.89072 0.24029 4.84963C0.233356 4.80854 0.238561 4.76634 0.255278 4.72811C0.271995 4.68987 0.299512 4.65724 0.334521 4.63413C0.369529 4.61102 0.410538 4.59841 0.452614 4.59782L10.4002 4.58999C10.4598 4.5912 10.5185 4.6043 10.5729 4.62853C10.6273 4.65275 10.6762 4.6876 10.7167 4.73099L12.8404 7.04025ZM2.41173 0.500985C2.4522 0.457606 2.50108 0.422759 2.55546 0.398531C2.60985 0.374303 2.66861 0.361192 2.72824 0.359985L12.679 0.367819C12.721 0.368405 12.7621 0.381014 12.7971 0.404128C12.8321 0.427242 12.8595 0.459877 12.8762 0.498107C12.893 0.536338 12.8982 0.578535 12.8913 0.619624C12.8843 0.660714 12.8656 0.698945 12.8372 0.729719L10.723 3.03899C10.6825 3.08237 10.6336 3.11722 10.5793 3.14145C10.5249 3.16567 10.4661 3.17878 10.4065 3.17999H0.455778C0.413703 3.1794 0.372695 3.16679 0.337686 3.14368C0.302678 3.12057 0.27516 3.08792 0.258443 3.0497C0.241726 3.01147 0.236522 2.96927 0.243455 2.92818C0.250389 2.88709 0.269166 2.84886 0.297529 2.81809L2.41173 0.500985Z"
                            fill="url(#goki_walletkit_solana_logo_fill)"
                          ></path>
                        </svg> */}
                        <div class="mb-2">
                          <div class="text-lg font-medium">0 ◎ for 1 hour </div>
                          <div class="text-sm text-medium-3">
                            Expires at 07/16/23 08:33 PM
                          </div>
                        </div>
                      </div>
                      <div class="mb-2 flex flex-col items-end text-right">
                        <div
                          class="flex cursor-pointer items-center justify-center gap-1 text-sm text-medium-3"
                          aria-label="Token will be reissued with the same parameters after expiration"
                        >
                          <div>Relisting</div>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 16 16"
                            class="text-xs"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* button */}
                    <div class="flex items-center justify-center gap-5 rounded-xl transition-all h-12 cursor-pointer bg-primary hover:bg-primary-hover">
                      <div class="flex items-center justify-center gap-1">
                        <div class="py-3 text-light-0">
                          <div
                            class="flex items-center justify-center text-base"
                            style={{ gap: "5px", color: "var(--text-color)" }}
                          >
                            Rent NFT
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalContainer>
          </MainModal>
        )}
      </div>
    </RentPageContainer>
  );
}

export default Index;
