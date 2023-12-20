import styled, { css } from "styled-components";

export const AiScreenStyle = styled.div`
  .container {
    display: grid;
    grid-template-columns: 0.5fr 3.5fr;
    gap: 0;
    margin: 16px 20px;
    color: var(--text-color);
  }

  .left-menu {
    border: 1px solid var(--border-color);
    background: var(--dark-bg);
    padding: 20px;
    border-radius: 15px;
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    width: 380px;
    justify-content: center;
    min-height: calc(100vh - 120px);
    max-height: calc(100vh - 120px);
    position: relative;
  }

  .button-box {
    margin-top: 26px;
    padding: 4px 6px 12px;
    // position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #303236;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .button-box span {
    line-height: 1.5;
    color: var(--text-color) !important;
    font-size: 14px;
    font-weight: 400;
    padding: 4px 0;
  }

  .gen-btn {
    height: 46px;
    width: 300px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 600 !important;
    background: #5858e6;
    border: 1px solid #5858e6;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: 0.24s ease-in-out;
    outline: none;
    padding: 3px 18px;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    overflow: hidden;
    -webkit-user-select: n;
  }

  //--------------------Tabs Style--------------------------------
  .ant-tabs-nav {
  }

  .ant-tabs-nav-wrap {
    // justify-content: center;
  }

  .ant-tabs-nav:before {
    display: none;
  }

  .ant-tabs-tab {
    // background: var(--ai-button-no-active) !important;
    color: var(--text-color) !important;
    border: none !important;
    border-radius: 10px !important;
    font-size: 16px !important;
    padding: 10px 20px !important;
    margin: 0 !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    // background: var(--ai-button) !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--text-color) !important;
  }
  .ant-tabs-nav-list {
    // background: #1a1e2d;
    border-radius: 10px !important;
  }

  //--------------------------------Collaps style-----------------------------
  .faq-area {
  }

  .faq-area a {
    color: #3182ce;
    text-decoration: none;
  }

  .faq-area .ant-collapse-header {
    background: var(--dark-bg) !important;
    color: var(--text-color) !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    // padding: 2px 3px;
  }

  .faq-area .ant-collapse-content-box {
    background: var(--dark-bg);
    // padding: 2px 3px;
  }

  .faq-area .ant-collapse-content {
    border-color: var(--border-color) !important;
  }

  .faq-area .ant-collapse-item {
    border-color: var(--border-color);
  }

  .faq-area .ant-collapse-item {
    border-color: var(--border-color) !important;
    margin-bottom: 10px;
  }
  span.ant-collapse-header-text {
    font-size: 16px;
  }

  .ant-collapse {
    border-color: var(--border-color) !important;
    margin-top: 5px;
    border-radius: 10px;
    width: 340px;
    min-height: calc(100vh - 330px);
    max-height: calc(100vh - 330px);
    overflow-y: scroll !important;
    position: relative;

    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: #aaff26;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #aaff26;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #aaff26;
    }
  }
  .ant-collapse-content-box p {
    text-align: left;
    color: var(--text-color) !important;
  }

  //   ----------------------inside the collaps--------------------
  .prompt-input {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: block;
    border-radius: 4px;
    border: 1px solid #3c3f44;
    background: var(--dark-bg);
    outline: none;
    color: var(--text-color);
    padding: 3px 14px;
    transition: 0.36s ease-in-out;
    box-shadow: 0 0 0 2px transparent;
    display: flex;
    align-items: center;
    padding-top: 9px;
    font-size: 14px;
    line-height: 160%;
    resize: none;
  }
  .my-input {
    width: 100%;
    height: 40px;
    max-width: 100%;
    min-width: 100%;
    display: block;
    border-radius: 4px;
    border: 1px solid #3c3f44;
    background: var(--dark-bg);
    outline: none;
    color: var(--text-color);
    padding: 3px 14px;
    transition: 0.36s ease-in-out;
    box-shadow: 0 0 0 2px transparent;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 160%;
    resize: none;
  }
  select {
    width: 100%;
    height: 40px;
    max-width: 100%;
    min-width: 100%;
    color: var(--text-color);
    padding: 3px 14px;
    border-radius: 4px;
    border: 1px solid #3c3f44;
    background: var(--dark-bg);
    outline: none;

    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='292.4' height='292.4'%3E%3Cpath fill='%23FFFFFF' d='M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }

  textarea:focus {
    box-shadow: 0 0 0 2px rgba(115, 115, 234, 0.3);
    border: 1px solid #7373ea;
  }
  input:focus {
    box-shadow: 0 0 0 2px rgba(115, 115, 234, 0.3);
    border: 1px solid #7373ea;
  }
  //   -----------------------upload image box----------------------
  .upload-box {
    width: 150px;
    height: 150px;
    position: relative;
    border: 1px solid #303236;
    border-radius: 4px;
    background-color: var(--dark-bg);
    overflow: hidden;
    color: var(--text-color);
    // background-image: url(
    //   data:image/svg + xml,
    //   %3Csvgwidth="9"height="9"viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"%3E%3Cgfill="rgb(84, 84, 84)"fill-opacity="1"fill-rule="evenodd"%3E%3Ccirclecx="3"cy="3"r="1"/%3E%3C/g%3E%3C/svg%3E
    // );
    cursor: pointer;
  }
  .drop-image {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .drop-image p {
    color: var(--text-color) !important;
  }
  p {
    color: var(--text-color) !important;
  }

  // ----------------drop

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // padding: 10px 0;
  }
  .checkbox span {
    color: rgba(247, 248, 248, 0.6) !important;
    font-size: 14px;
    margin-left: 12px;
  }
  .controlNet label {
    color: var(--text-color) !important;
    margin-bottom: 10px;
  }
  .controlNet {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  // -----------------------slider--------------
  .slider {
    // -webkit-appearance: none;
    width: 100%;
    height: 3px;
    background: rgb(60, 63, 68);
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  .slider-mini {
    // -webkit-appearance: none;
    width: 130px;
    height: 3px;
    background: rgb(60, 63, 68);
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  //   -----------------------strength box---------------
  .box {
    position: relative;
    width: 100%;
    margin: 18px 0;
    padding: 12px;
    border: 1px solid #3c3f44;
    border-radius: 6px;
    background: var(--dark-bg);
    color: #5858e6 !important;
    font-size: 14px;
    line-height: 150%;
  }

  .box span {
    color: var(--text-color);
    font-weight: 500;
    font-size: 12px;
  }
  .box p {
    color: var(--text-color);
    font-size: 14px;
  }

  .visible {
    display: block;
  }

  .hidden {
    display: none;
  }

  .close-icon {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .close-icon svg {
    fill: white;
  }

  //   -------------------- Resolutio tabs-----------------------
  .tabs____XQO_K {
    padding-bottom: 0;
  }
  .tabs_tabs__Fe7TQ {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
  }
  .tabs_tab__BE_3O {
    margin: 0 18px 0 0;
    padding: 0 6px 12px 3px;
    position: relative;
  }
  .tabs_active__wGYZV {
    border-bottom: 1px solid #5858e6 !important;
  }
  .tabs_active__wGYZV a {
    color: #5858e6 !important;
  }
  .tabs_a__uhbWD {
    font-size: 14px !important;
    line-height: 12px !important;
    font-weight: 500 !important;
    color: hsla(180, 7%, 97%, 0.7) !important;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  // ---------------------- aspect ratio-------------
  .ratio-chip {
    width: 74px !important;
    height: 29px !important;
    border: 1px solid #3c3f44;
    background: var(--dark-bg) !important;
    border-radius: 3px !important;
    padding: 3px 9px !important;
    font-size: 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    cursor: pointer !important;
    transition: 0.12s linear !important;
  }

  .ratio-chip span {
    font-size: 14px !important;
    color: var(--text-color) !important;
  }
  .radio-group {
    display: flex;
    flex-wrap: wrap;
  }

  .radio-option {
    margin: 4px; /* Add spacing between radio options */
    /* OR */
    padding: 10px; /* Add spacing between radio options */
  }
  //   -----------------------toggle button-------------------

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The toggle */
  .toggle {
    position: absolute;
    cursor: pointer;
    top: 6px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 46px;
    height: 23px;
    background-color: #303236;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .toggle:before {
    position: absolute;
    content: "";
    width: 16px;
    height: 16px;
    left: 4px;
    bottom: 4px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .toggle {
    background-color: #2196f3;
  }

  input:focus + .toggle {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .toggle:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded toggles */
  .toggle.round {
    border-radius: 34px;
  }

  .toggle.round:before {
    border-radius: 50%;
  }

  .toggle-box {
    display: flex;
    align-items: center;
  }
  .toggle-box p {
    font-size: 12px;
    font-weight: 400;
    color: hsla(180, 7%, 97%, 0.6);
  }

  // -------------modal style

  .right-side {
    flex: 2;
    max-height: calc(100vh - 120px);
    overflow-y: scroll;
    box-sizing: border-box;
  }

  .images-right {
    position: relative;
    width: 25%;
    padding: 3px;
    text-align: center;
  }

  .row {
    display: -ms-flexbox; /* IE 10 */
    display: flex;
    -ms-flex-wrap: wrap; /* IE 10 */
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create two equal columns that sits next to each other */
  .column {
    -ms-flex: 50%; /* IE 10 */
    flex: 25%;
    padding: 0 4px;
  }

  .column img {
    margin-top: 8px;
    vertical-align: middle;
  }

  /* Style the buttons */
  .btn {
    border: none;
    outline: none;
    padding: 10px 16px;
    background-color: var(--dark-bg);
    cursor: pointer;
    font-size: 18px;
  }

  .btn:hover {
    background-color: #ddd;
  }

  .btn.active {
    background-color: #666;
    color: white;
  }
  .image-container {
    display: flex;
    justify-content: center;
    border-radius: 9px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    border: 1px solid #303236;
    background: #232426;
  }
  .image_view_image_bg {
    background-size: 100% 100%;
    width: 100%;
    height: 80%;
    position: absolute;
    // top: 10%;
    // left: 25%;

    filter: blur(20px);
    transform: translateZ(0);
    opacity: 0.8;
  }
  .image_view_outer {
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    max-width: 512px;
  }
  .image_view_inner {
    position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }
  .image-body {
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 0px;
    position: relative;
    max-width: 100%;
  }
  .details-list ul {
    list-style: none;
    margin: 0;
    padding: 12px 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 12px;
    over-flow: hidden;
  }
  .details-list li {
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    color: var(--text-color);
    gap: 9px;
    font-size: 16px;
    font-weight: 600;
    // color: hsla(180, 7%, 97%, 0.8);
    margin: 3px 0 0;
    line-height: 21px;
    word-spacing: 0px;
    flex-shrink: 0;
  }
  // glow button

  .glow-on-hover {
    width: 350px;
    // height: 50px;
    border: none;
    line-height: 20px;
    font-size: 16px;
    font-weight: 700;
    font-family: sans-serif;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    opacity: 1;
    padding: 20px 14px;

    margin-top: 26px;
    margin-bottom: 10px;
  }

  .glow-on-hover:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  .glow-on-hover:active {
    color: #000;
  }

  .glow-on-hover:active:after {
    background: transparent;
  }

  .glow-on-hover:hover:before {
    opacity: 1;
  }

  .glow-on-hover:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  // popup buttons small
  .wrapper {
    // position: fixed;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    // alignitems: center;
    // justifycontent: center;
    position: relative;
  }

  .wrapper a {
    display: block;
    width: 160px;
    // height: 50px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 700;
    font-family: sans-serif;
    text-decoration: none;
    color: var(--text-color);
    border: 2px solid var(--border-color);
    border-radius: 14px;
    letter-spacing: 2px;
    text-align: center;
    padding: 10px 10px 10px 28px;
    margin-left: 0px;
    position: relative;
    transition: all 0.35s;
    cursor: pointer;
  }

  .wrapper a span {
    position: relative;
    z-index: 2;
  }

  .wrapper a:after {
    position: absolute;
    content: "";
    border-radius: 14px;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: green;
    transition: all 0.35s;
  }

  .wrapper a:hover {
    color: #fff;
    padding: 10px 0px 10px 0px;
    // font-size: 14px;
  }

  .wrapper a:hover:after {
    width: 100%;
  }

  // popup buttons large
  .wrapper2 {
    // margin-right: 20px;
    position: relative;
  }

  .wrapper2 a {
    display: block;
    width: 190px;
    // height: 50px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 700;
    font-family: sans-serif;
    text-decoration: none;
    color: var(--text-color);
    border: 2px solid var(--border-color);
    border-radius: 14px;
    letter-spacing: 2px;
    text-align: center;
    padding: 10px 0px 10px 44px;
    margin-left: 0px;
    position: relative;
    transition: all 0.35s;
    cursor: pointer;
  }

  .wrapper2 a span {
    position: relative;
    z-index: 2;
  }

  .wrapper2 a:after {
    position: absolute;
    content: "";
    border-radius: 14px;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;

    background: green;
    transition: all 0.35s;
  }

  .wrapper2 a:hover {
    color: #fff;
    padding: 10px 0px 10px 0px;
    // font-size: 14px;
  }

  .wrapper2 a:hover:after {
    width: 100%;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  @media screen and (min-width: 1700px) {
    .images-right {
      width: 16.6667% !important;
    }
    .column {
      flex: 16.6667% !important;
    }
    .container {
      grid-template-columns: 0.5fr 3.5fr;
    }
  }
  @media screen and (min-width: 2400px) {
    .images-right {
      width: 12.5% !important;
    }
    .column {
      flex: 12.5% !important;
    }
  }
`;

export const LoadingScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
