import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Popover, Modal } from "antd";
import {
  RewardStyle,
  RewardTabItem,
  InfoContent,
  CusModelArea,
} from "./styles";
import CollImg from "../../assets/images/GX.svg";
import Meta1 from "../../assets/images/icons/1.svg";
import Meta2 from "../../assets/images/icons/2.svg";
import Meta3 from "../../assets/images/icons/3.svg";
import Meta4 from "../../assets/images/icons/4.svg";
import Meta5 from "../../assets/images/icons/5.svg";
import Meta6 from "../../assets/images/icons/6.svg";
import { Link } from "react-router-dom";
const TabOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModel = () => {
    setIsModalOpen(false);
  };
  return (
    <RewardTabItem>
      <div className="reward-tab-area">
        <div className="reward-tab-area-left">
          <div className="reward-inner-item">
            <div className="reward-inner-item-inner">
              <div className="reward-inner-item-left">
                <h2>GX Compounder</h2>
                <p>Earn GX & More GX!</p>
              </div>
              <div className="reward-inner-item-right">
                <div className="reward-inner-item-right-info">
                  <strong>22.51%</strong>
                  <span>
                    APY{" "}
                    <Popover content={content}>
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-b4aax7"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2 16C2 8.26801 8.26801 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM17.5 23.5C17.5 24.3284 16.8284 25 16 25C15.1716 25 14.5 24.3284 14.5 23.5C14.5 22.6716 15.1716 22 16 22C16.8284 22 17.5 22.6716 17.5 23.5ZM17 8.00001H15.5C14.3057 7.99735 13.1596 8.4706 12.3151 9.31509C11.4706 10.1596 10.9973 11.3057 11 12.5V13H13V12.5C13 11.1193 14.1193 10 15.5 10H17C18.3807 10 19.5 11.1193 19.5 12.5C19.5 13.8807 18.3807 15 17 15H15V19.5H17V17C19.4853 17 21.5 14.9853 21.5 12.5C21.5 10.0147 19.4853 8.00001 17 8.00001ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Popover>
                  </span>
                </div>
                <svg
                  viewBox="0 0 40 40"
                  focusable="false"
                  className="chakra-icon css-gipgov"
                >
                  <g clip-path="url(#clip0_598_106403)">
                    <circle
                      cx="16.6667"
                      cy="16.6669"
                      r="16.6667"
                      fill="#878D96"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8889 12.5003H10.2639C12.1084 9.66549 15.5974 8.38106 18.8397 9.34317C22.082 10.3053 24.3057 13.2849 24.3055 16.6669H25.6944C25.6983 12.8617 23.3158 9.46263 19.7376 8.16823C16.1593 6.87383 12.1536 7.96208 9.7222 10.8891V8.3336H8.33331V13.8891H13.8889V12.5003ZM19.4444 20.8336H23.0694C21.2248 23.6683 17.7358 24.9528 14.4935 23.9907C11.2512 23.0285 9.02753 20.049 9.02775 16.6669H7.63886C7.63494 20.4721 10.0174 23.8712 13.5957 25.1656C17.1739 26.46 21.1796 25.3717 23.611 22.4447V25.0002H24.9999V19.4447H19.4444V20.8336Z"
                      fill="black"
                    ></path>
                  </g>
                  <g clip-path="url(#clip1_598_106403)">
                    <circle
                      cx="31.6667"
                      cy="31.6666"
                      r="8.33333"
                      fill="#0CE466"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.6667 32.5676C30.7134 32.5676 29.94 31.7949 29.94 30.8409C29.94 29.8869 30.7134 29.1142 31.6667 29.1142C32.6199 29.1142 33.3934 29.8869 33.3934 30.8409C33.3934 31.7949 32.6199 32.5676 31.6667 32.5676ZM30.9159 30.8409C30.9159 31.2557 31.2522 31.5916 31.6667 31.5916C32.0811 31.5916 32.4174 31.2557 32.4174 30.8409C32.4174 30.4261 32.0811 30.0901 31.6667 30.0901C31.2522 30.0901 30.9159 30.4261 30.9159 30.8409Z"
                      fill="black"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.1111 30.8432L29.4144 27.5376H33.9189L37.2222 30.8432L31.6667 36.3964L26.1111 30.8432ZM34.2192 29.6397C32.8157 28.23 30.5177 28.23 29.1141 29.6397L27.9129 30.8409L29.1141 32.0421C30.5177 33.4518 32.8157 33.4518 34.2192 32.0421L35.4204 30.8409L34.2192 29.6397Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_598_106403">
                      <rect
                        width="33.3333"
                        height="33.3333"
                        fill="white"
                        transform="translate(0 0.000244141)"
                      ></rect>
                    </clipPath>
                    <clipPath id="clip1_598_106403">
                      <rect
                        width="16.6667"
                        height="16.6667"
                        fill="white"
                        transform="translate(23.3334 23.3333)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <button>Connect</button>
          </div>
          <div className="reward-inner-item">
            <div className="reward-inner-item-inner">
              <div className="reward-inner-item-left">
                <h2>GX Compounder</h2>
                <p>Earn GX & More GX!</p>
              </div>
              <div className="reward-inner-item-right">
                <div className="reward-inner-item-right-info">
                  <strong>22.51%</strong>
                  <span>
                    APY{" "}
                    <Popover content={content}>
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-b4aax7"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2 16C2 8.26801 8.26801 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM17.5 23.5C17.5 24.3284 16.8284 25 16 25C15.1716 25 14.5 24.3284 14.5 23.5C14.5 22.6716 15.1716 22 16 22C16.8284 22 17.5 22.6716 17.5 23.5ZM17 8.00001H15.5C14.3057 7.99735 13.1596 8.4706 12.3151 9.31509C11.4706 10.1596 10.9973 11.3057 11 12.5V13H13V12.5C13 11.1193 14.1193 10 15.5 10H17C18.3807 10 19.5 11.1193 19.5 12.5C19.5 13.8807 18.3807 15 17 15H15V19.5H17V17C19.4853 17 21.5 14.9853 21.5 12.5C21.5 10.0147 19.4853 8.00001 17 8.00001ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Popover>
                  </span>
                </div>
                <svg
                  viewBox="0 0 40 40"
                  focusable="false"
                  className="chakra-icon css-gipgov"
                >
                  <g clip-path="url(#clip0_598_106403)">
                    <circle
                      cx="16.6667"
                      cy="16.6669"
                      r="16.6667"
                      fill="#878D96"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8889 12.5003H10.2639C12.1084 9.66549 15.5974 8.38106 18.8397 9.34317C22.082 10.3053 24.3057 13.2849 24.3055 16.6669H25.6944C25.6983 12.8617 23.3158 9.46263 19.7376 8.16823C16.1593 6.87383 12.1536 7.96208 9.7222 10.8891V8.3336H8.33331V13.8891H13.8889V12.5003ZM19.4444 20.8336H23.0694C21.2248 23.6683 17.7358 24.9528 14.4935 23.9907C11.2512 23.0285 9.02753 20.049 9.02775 16.6669H7.63886C7.63494 20.4721 10.0174 23.8712 13.5957 25.1656C17.1739 26.46 21.1796 25.3717 23.611 22.4447V25.0002H24.9999V19.4447H19.4444V20.8336Z"
                      fill="black"
                    ></path>
                  </g>
                  <g clip-path="url(#clip1_598_106403)">
                    <circle
                      cx="31.6667"
                      cy="31.6666"
                      r="8.33333"
                      fill="#0CE466"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.6667 32.5676C30.7134 32.5676 29.94 31.7949 29.94 30.8409C29.94 29.8869 30.7134 29.1142 31.6667 29.1142C32.6199 29.1142 33.3934 29.8869 33.3934 30.8409C33.3934 31.7949 32.6199 32.5676 31.6667 32.5676ZM30.9159 30.8409C30.9159 31.2557 31.2522 31.5916 31.6667 31.5916C32.0811 31.5916 32.4174 31.2557 32.4174 30.8409C32.4174 30.4261 32.0811 30.0901 31.6667 30.0901C31.2522 30.0901 30.9159 30.4261 30.9159 30.8409Z"
                      fill="black"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.1111 30.8432L29.4144 27.5376H33.9189L37.2222 30.8432L31.6667 36.3964L26.1111 30.8432ZM34.2192 29.6397C32.8157 28.23 30.5177 28.23 29.1141 29.6397L27.9129 30.8409L29.1141 32.0421C30.5177 33.4518 32.8157 33.4518 34.2192 32.0421L35.4204 30.8409L34.2192 29.6397Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_598_106403">
                      <rect
                        width="33.3333"
                        height="33.3333"
                        fill="white"
                        transform="translate(0 0.000244141)"
                      ></rect>
                    </clipPath>
                    <clipPath id="clip1_598_106403">
                      <rect
                        width="16.6667"
                        height="16.6667"
                        fill="white"
                        transform="translate(23.3334 23.3333)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {/* onClick={showModal}*/}
            <button>Connect</button>
          </div>
        </div>
        <div className="reward-tab-area-right">
          <div className="reward-tab-area-right-item">
            <div className="reward-tab-area-right-item-left">
              <h2>Protocol Rewards</h2>
              <p>
                100% of GX's trading fees are distributed between creators
                and wallets that commit GX tokens, along with bonus GX
                rewards! There are two methods for earning protocol rewards:
              </p>
              <p>
                <strong>Standard Method</strong> earn GX and WETH
              </p>
              <p>
                <strong>GX Compounder</strong> automatically turn your WETH
                earnings into more GX!
              </p>
              <a href="#">Learn More</a>
            </div>
            <div className="reward-tab-area-right-item-right">
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1n7fwx8"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26 15L24.59 13.59L17 21.17V2H15V21.17L7.41 13.59L6 15L16 25L26 15ZM26 24V28H6V24H4V28C4 29.1046 4.89543 30 6 30H26C27.1046 30 28 29.1046 28 28V24H26Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="reward-tab-area-right-item">
            <div className="reward-tab-area-right-item-left">
              <h2>Trading Rewards</h2>
              <p>
                Earn trading rewards when you buy or sell any NFT on GX
                (private listings excluded). Rewards distributed once daily.
              </p>
              <a href="#">Learn More</a>
            </div>
            <div className="reward-tab-area-right-item-right">
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1n7fwx8"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
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
    </RewardTabItem>
  );
};
const TabTwo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModel = () => {
    setIsModalOpen(false);
  };
  return (
    <RewardTabItem>
      <div className="reward-tab-area">
        <div className="reward-tab-area-left">
          <div className="reward-inner-item">
            <div className="reward-inner-item-inner">
              <div className="reward-inner-item-left">
                <h2>GX Compounder</h2>
                <p>Earn GX & More GX!</p>
              </div>
              <div className="reward-inner-item-right">
                <div className="reward-inner-item-right-info">
                  <strong>22.51%</strong>
                  <span>
                    APY{" "}
                    <Popover content={content}>
                      <svg
                        viewBox="0 0 32 32"
                        focusable="false"
                        className="chakra-icon css-b4aax7"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2 16C2 8.26801 8.26801 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM17.5 23.5C17.5 24.3284 16.8284 25 16 25C15.1716 25 14.5 24.3284 14.5 23.5C14.5 22.6716 15.1716 22 16 22C16.8284 22 17.5 22.6716 17.5 23.5ZM17 8.00001H15.5C14.3057 7.99735 13.1596 8.4706 12.3151 9.31509C11.4706 10.1596 10.9973 11.3057 11 12.5V13H13V12.5C13 11.1193 14.1193 10 15.5 10H17C18.3807 10 19.5 11.1193 19.5 12.5C19.5 13.8807 18.3807 15 17 15H15V19.5H17V17C19.4853 17 21.5 14.9853 21.5 12.5C21.5 10.0147 19.4853 8.00001 17 8.00001ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Popover>
                  </span>
                </div>
                <svg
                  viewBox="0 0 40 40"
                  focusable="false"
                  className="chakra-icon css-gipgov"
                >
                  <g clip-path="url(#clip0_598_106403)">
                    <circle
                      cx="16.6667"
                      cy="16.6669"
                      r="16.6667"
                      fill="#878D96"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8889 12.5003H10.2639C12.1084 9.66549 15.5974 8.38106 18.8397 9.34317C22.082 10.3053 24.3057 13.2849 24.3055 16.6669H25.6944C25.6983 12.8617 23.3158 9.46263 19.7376 8.16823C16.1593 6.87383 12.1536 7.96208 9.7222 10.8891V8.3336H8.33331V13.8891H13.8889V12.5003ZM19.4444 20.8336H23.0694C21.2248 23.6683 17.7358 24.9528 14.4935 23.9907C11.2512 23.0285 9.02753 20.049 9.02775 16.6669H7.63886C7.63494 20.4721 10.0174 23.8712 13.5957 25.1656C17.1739 26.46 21.1796 25.3717 23.611 22.4447V25.0002H24.9999V19.4447H19.4444V20.8336Z"
                      fill="black"
                    ></path>
                  </g>
                  <g clip-path="url(#clip1_598_106403)">
                    <circle
                      cx="31.6667"
                      cy="31.6666"
                      r="8.33333"
                      fill="#0CE466"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.6667 32.5676C30.7134 32.5676 29.94 31.7949 29.94 30.8409C29.94 29.8869 30.7134 29.1142 31.6667 29.1142C32.6199 29.1142 33.3934 29.8869 33.3934 30.8409C33.3934 31.7949 32.6199 32.5676 31.6667 32.5676ZM30.9159 30.8409C30.9159 31.2557 31.2522 31.5916 31.6667 31.5916C32.0811 31.5916 32.4174 31.2557 32.4174 30.8409C32.4174 30.4261 32.0811 30.0901 31.6667 30.0901C31.2522 30.0901 30.9159 30.4261 30.9159 30.8409Z"
                      fill="black"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.1111 30.8432L29.4144 27.5376H33.9189L37.2222 30.8432L31.6667 36.3964L26.1111 30.8432ZM34.2192 29.6397C32.8157 28.23 30.5177 28.23 29.1141 29.6397L27.9129 30.8409L29.1141 32.0421C30.5177 33.4518 32.8157 33.4518 34.2192 32.0421L35.4204 30.8409L34.2192 29.6397Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_598_106403">
                      <rect
                        width="33.3333"
                        height="33.3333"
                        fill="white"
                        transform="translate(0 0.000244141)"
                      ></rect>
                    </clipPath>
                    <clipPath id="clip1_598_106403">
                      <rect
                        width="16.6667"
                        height="16.6667"
                        fill="white"
                        transform="translate(23.3334 23.3333)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <button>Connect</button>
          </div>
        </div>
        <div className="reward-tab-area-right">
          <div className="reward-tab-area-right-item">
            <div className="reward-tab-area-right-item-left">
              <h2>Trading Rewards</h2>
              <p>
                Earn trading rewards when you buy or sell any NFT on GX
                (private listings excluded). Rewards distributed once daily.
              </p>
              <a href="#">Learn More</a>
            </div>
            <div className="reward-tab-area-right-item-right">
              <svg
                viewBox="0 0 32 32"
                focusable="false"
                className="chakra-icon css-1n7fwx8"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.41 26.59L7.83 23H28V21H7.83L11.41 17.41L10 16L4 22L10 28L11.41 26.59ZM28 10L22 4L20.59 5.41L24.17 9H4V11H24.17L20.59 14.59L22 16L28 10Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
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
    </RewardTabItem>
  );
};
const items = [
  {
    key: "1",
    label: `Protocol`,
    children: <TabOne />,
  },
  {
    key: "2",
    label: `Listing & Trading`,
    children: <TabTwo />,
  },
];
const content = (
  <InfoContent>
    <ul>
      <li>
        GX APR <span>8.12%</span>
      </li>
      <li>
        WETH (Fee Sharing) APR <span>12.49%</span>
      </li>
      <li>
        WETH (Fee Sharing) APY<span>13.30%</span>
      </li>
      <li>
        Daily estimated compounds<span>41</span>
      </li>
    </ul>
    <hr />
    <h2>APY = (1 + WETH APY) * (1 + GX APR) - 1</h2>
    <p>
      Rates shown are estimates, and fluctuate according to many different
      factors, including token prices, trading volume, liquidity, amount
      committed, and more.
    </p>
    <p>
      Trading fees collected by the protocol are distributed as rewards to users
      committing GEX. Reward rates are adjusted roughly every 24 hours, based
      on the past 24 hours’ trading activity.
    </p>
  </InfoContent>
);
export default function Home() {
  const [selectedTab, setSelectedTab] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    let tab = id.toString();
    setSelectedTab(tab);
    console.log("selectedTab", typeof tab);
  }, [id]);

  return (
    <RewardStyle>
      <div className="reward-area">
        <div className="reward-area-inner">
          <div className="reward-left">
            <h3>Commit GX, earn up to</h3>
            <h2>
              22.54% APY{" "}
              <Popover content={content}>
                <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  className="chakra-icon css-b4aax7"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 16C2 8.26801 8.26801 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM17.5 23.5C17.5 24.3284 16.8284 25 16 25C15.1716 25 14.5 24.3284 14.5 23.5C14.5 22.6716 15.1716 22 16 22C16.8284 22 17.5 22.6716 17.5 23.5ZM17 8.00001H15.5C14.3057 7.99735 13.1596 8.4706 12.3151 9.31509C11.4706 10.1596 10.9973 11.3057 11 12.5V13H13V12.5C13 11.1193 14.1193 10 15.5 10H17C18.3807 10 19.5 11.1193 19.5 12.5C19.5 13.8807 18.3807 15 17 15H15V19.5H17V17C19.4853 17 21.5 14.9853 21.5 12.5C21.5 10.0147 19.4853 8.00001 17 8.00001ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Popover>
            </h2>
            <div className="reward-left-inner">
              <Link to="/buy-GX-token">Buy GX</Link>
              <button>
                Add to Wallet{" "}
                <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  className="chakra-icon css-1sdtgly"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4ZM22 15H17V10H15V15H10V17H15V22H17V17H22V15Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="reward-right">
            <img src={CollImg} alt="coll" />
          </div>
        </div>
        {selectedTab && <Tabs defaultActiveKey={selectedTab} items={items} />}
      </div>
    </RewardStyle>
  );
}
