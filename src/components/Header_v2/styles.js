import styled, { css } from "styled-components";

export const HeaderArea = styled.div`
  .nav-profile {
    .nav-user-section {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
        height: 21px;
        width: 24px;
        display: inline;
        margin-right: 16px;
      }

      .wallet-icon {
        margin-right: 15px;
        positoin: relative;

        .web3-status {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #aaff26;
        }
      }
    }
  }
  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-search {
      margin-right: 65px;
      margin-left: 75px;

      @media (max-width: 1550px) {
        margin-right: 45px;
        margin-left: 55px;
      }

      @media (max-width: 1100px) {
        margin-right: 35px;
        margin-left: 45px;
      }

      @media (max-width: 800px) {
        margin-right: 25px;
        margin-left: 0px;
        width: 100%;
      }
    }

    .nav-lang {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-links {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }
  }

  .forgot-password-label {
    margin-bottom: 16px;
    color: #e9b405;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    align-self: flex-start;
    cursor: pointer;
  }

  .nav-logged-user-container {
    display: flex;
    align-items: center;
  }

  .nav-logged-user-section {
    margin-right: 14px;

    .creator-icon {
      width: 12px;
      height: 12px;
    }
  }

  .wallet-icon,
  .wallet-icon > a {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    > svg {
      width: 25px;
      height: 25px;
      color: #ffffff;

      @media (min-width: 576px) {
        color: #ffffff;
        &:hover {
          color: #ffffff;
        }
      }
    }

    position: relative;
    .web3-status {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #aaff26;
    }
  }

  .dropdown-content {
    display: none;
    overflow: hidden;
  }

  .dropdown-content.open {
    display: block;
    background: #2a3136;
    height: 113.6px; /* Set your desired height */
    width: 200px;
  }

  .dropdown-content ul {
    display: flex;
    flex-direction: column;
    height: 113.6px;
  }

  .dropdown-content ul li {
    height: 48px;
    line-height: 20px;
    color: #f3f3f8;
    padding: 8px;
    font-size: 16px;
    // font-family: basis grotesque pro sans-serif;
    width: 200px;
  }

  .blinking-colors {
    animation: blink 7s infinite;
    transition: color 1.5s ease-in-out;
    cursor: pointer;
  }

  @keyframes blink {
    0% {
      color: #776b3f;
    } /* Color 1 */
    20% {
      color: #b270b3;
    } /* Color 2 */
    40% {
      color: #fc987a;
    } /* Color 3 */
    60% {
      color: #ffff00;
    } /* Color 4 */
    80% {
      color: #ff00ff;
    } /* Color 5 */
    100% {
      color: #ad7bca;
    } /* Back to Color 1 */
  }

  .header-desktop {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr;
    background: var(--dark-bg);
    padding: 18px 30px;
    align-items: center;
    gap: 50px;
  }
  .header-mobile {
    display: none;
  }

  .logo img {
    height: auto;
    max-width: 130px;
  }

  // auto complete input
  .search .ant-select {
    width: 370px;
  }
  .search .ant-select-selection-search {
    background: rgba(0, 0, 0, 0);
  }
  .search .ant-input-affix-wrapper {
    line-height: 36px;
  }
  .search .ant-input-group-wrapper {
    background: rgba(0, 0, 0, 0);
  }
  .search .ant-input-wrapper {
    background: rgba(0, 0, 0, 0);
  }
  .search .ant-input-group-addon {
    display: none;
  }
  // .rc-virtual-list-holder {
  //   background: red !important;
  // }
  .certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
    color: #666;
    font-weight: bold;
  }
  .certain-category-search-dropdown {
    background: yellow !important;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
    border-bottom: 1px solid #f6f6f6;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item {
    padding-left: 16px;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
    text-align: center;
    cursor: default;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu {
    max-height: 300px;
  }
  .custom-dropdown .ant-select-dropdown {
    background: red; /* Replace with your desired background color */
  }
  .certain-category-search-dropdown {
    background: red; /* Replace with your desired background color */
  }
  .search span,
  .search input {
    background: var(--input-bg);
    border: none;
    border-radius: 8px !important;
    // padding: 5px;
    color: var(--input-text);
    // line-height: 36px;
  }

  .search input::placeholder {
    color: var(--input-text);
  }

  .search span svg {
    width: 20px;
    margin: 0 8px;
    height: auto;
  }

  // **input field clone
  .css-t62k45 {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    outline-offset: 2px;
    color: inherit;
    // margin-top: 13px;
    margin-bottom: 0px;
    // z-index: 1400;
    max-height: calc(100vh - 4rem);
    box-shadow: none;
    margin-inline-start: 1rem;
    margin-inline-end: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    align-self: flex-start;
    top: 0px;
    bottom: auto;
    outline: transparent solid 2px;
    background: var(--input-bg);
    border-color: #2a3136;
    border-width: 1px;

    opacity: 1;
    transform: none;
  }

  .css-srnkcy {
    display: flex;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    background: var(--dark-bg) !important;
  }
  .focused-bg {
    display: flex;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.4rem;
    // background: #21252b;
    background: var(--input-bg);
    padding-bottom: 0.4rem;
  }

  .css-13pmxen {
    display: flex;
    flex: 1 1 0%;
  }
  .css-4302v8 {
    width: 100%;
    display: flex;
    position: relative;
    // background: #2a3136;
    border-radius: 12px;
  }
  .css-4302v8 input {
    background: var(--input-bg);
  }
  .css-1yhfq38 {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .css-13k3jxb {
    display: inline-flex;
    appearance: none;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    user-select: none;
    position: relative;
    white-space-collapse: collapse;
    text-wrap: nowrap;
    vertical-align: middle;
    outline-offset: 2px;
    line-height: 1.2;
    font-weight: 600;
    transition-property: var(--lr-transition-property-common);
    transition-duration: var(--lr-transition-duration-normal);
    background-image: ;
    background-position-x: ;
    background-position-y: ;
    background-size: ;
    background-repeat-x: ;
    background-repeat-y: ;
    background-attachment: ;
    background-origin: ;
    background-clip: ;
    background-color: var(--input-bg);
    color: white;
    height: 3rem;
    min-width: 2.5rem;
    font-size: 0.857rem;
    padding-inline-start: 0.75rem;
    padding-inline-end: 0.75rem;
    width: 100%;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0);
    padding: 0px;
    cursor: pointer;
  }
  .css-1hzyiq5 {
    display: inline-flex;
    align-self: center;
    flex-shrink: 0;
    margin-inline-start: 0.5rem;
  }
  .css-13k3jxb svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  // ----------------------------------
  .css-4302v8-focused input {
    background: rgba(42, 49, 54, 0.35) !important;
    color: var(--text-color);
    border: 0.5px solid;
    width: 100%;
  }
  .css-4302v8-focused input::placeholder {
    color: var(--text-color); /* Replace with your desired color */
  }

  .css-1i774xg {
    left: 0px;
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    z-index: 2;
    pointer-events: none;
  }

  .css-bcoo9n {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: var(--text-color);
    vertical-align: middle;
    transition: color 0.2s ease-out 0s;
  }

  .css-zw5jei {
    width: 100%;
    min-width: 0px;
    outline-offset: 2px;
    position: relative;
    appearance: none;
    border-top-color: ;
    border-top-style: ;
    border-top-width: ;
    border-right-color: ;
    border-right-style: ;
    border-right-width: ;
    border-left-color: ;
    border-left-style: ;
    border-left-width: ;
    border-image-source: ;
    border-image-slice: ;
    border-image-width: ;
    border-image-outset: ;
    border-image-repeat: ;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    font-size: 1rem;
    height: 3rem;
    padding-left: 3rem;
    padding-right: 0.5rem;
    outline: transparent solid 2px;
    border-bottom: 0;
    border-radius: 8;
    transition: all 200ms ease-out 0s;
    background: #2a3136;
  }
  .focused {
    display: flex !important;
  }

  .css-14n1r5f {
    display: inline-flex;
    appearance: none;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    user-select: none;
    position: relative;
    white-space-collapse: collapse;
    text-wrap: nowrap;
    vertical-align: middle;
    outline-offset: 2px;
    line-height: 1.2;
    font-weight: 600;
    transition-property: var(--lr-transition-property-common);
    transition-duration: var(--lr-transition-duration-normal);
    background-image: ;
    background-position-x: ;
    background-position-y: ;
    background-size: ;
    background-repeat-x: ;
    background-repeat-y: ;
    background-attachment: ;
    background-origin: ;
    background-clip: ;
    background-color: rgba(0, 0, 0, 0);
    color: #0ce466;
    height: 3rem;
    min-width: 3rem;
    font-size: 0.875rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0);
  }

  .css-p4firc {
    width: 100%;
    max-height: 500px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 999999;
    position: absolute;
    top: 61px;
    background: var(--input-bg);
    display: none;
    padding-inline: 0px;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    flex: 1 1 0%;
    overflow: auto;
    color: #c7c7cc;
  }
  .css-j7qwjs {
    display: flex;
    // flex-direction: column;
  }
  .css-gzn1bh {
    display: flex;
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #2a3136;
  }
  .css-1vowvxp {
    padding: 1rem 0 1rem 1rem;
    width: 100px;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #2a3136;
    flex-shrink: 0;
  }
  .css-70qvj9 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .css-1f985zb {
    color: #818c95;
    font-size: 1rem;
    fontweight: 700;
    line-height: 1.25rem;
    // margin-right: 0.25rem;
  }
  .class-111 {
    visibility: hidden;
    position: absolute;
    min-width: max-content;
    inset: 0px auto auto 0px;
  }
  .css-740s06 {
    z-index: 1800;
  }
  .css-1nc29x7 {
    position: relative;
    display: flex;
    flex-direction: column;
    --popper-bg: colors.white;
    --popper-arrow-bg: #2a3136;
    --popper-arrow-shadow-color: blackAlpha.400;
    width: auto;
    border-top-style: ;
    border-top-width: ;
    border-right-style: ;
    border-right-width: ;
    border-bottom-style: ;
    border-bottom-width: ;
    border-left-style: ;
    border-left-width: ;
    border-image-source: ;
    border-image-slice: ;
    border-image-width: ;
    border-image-outset: ;
    border-image-repeat: ;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    z-index: 1800;
    color: #121619;
    max-width: 20rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: #f3f3f8;
    border-color: inherit;
    border-radius: 4px;
  }
  .class-123 {
    transform-origin: var(--popper-transform-origin);
    --popper-arrow-size: 16px;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.95) translateZ(0px);
  }

  .css-duli2z {
    display: flex;
    flex-direction: column;
    width: 100%;
    // padding-top: 0.5rem;
    // padding-bottom: 0.5rem;
    min-width: 0px;
  }
  .css-sz3opf {
    min-width: 0px;
    cursor: pointer;
  }

  .css-sz3opf a {
    line-height: 1.5rem;
    background-color: transparent;
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
    cursor: pointer;
  }

  .css-m7uh5z {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    transition: background 200ms ease 0s;
    min-height: 3rem;
  }
  .css-1jlenk1 {
    position: relative;
    width: 32px;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  .css-1jlenk1 > :not(style) {
    overflow: hidden;
    position: absolute;
    inset: 0px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .css-zsqaea {
    border-radius: 4px;
    color: rgba(0, 0, 0, 0);
  }

  .css-q7uoxg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .css-xilb59 {
    animation: 0.4s ease 0s 1 normal none running animation-5j8bii;
    width: 100%;
    height: 100%;
  }
  .class-124 {
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
  .class-125 {
    box-sizing: border-box;
    display: block;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 0px;
    max-width: 100%;
  }
  .class-126 {
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
    object-fit: cover;
  }
  .class-127 {
    // position: absolute;
    // inset: 0px;
    // box-sizing: border-box;
    // padding: 0px;
    // border: none;
    // margin: auto;
    // display: block;
    // width: 0px;
    // height: 0px;
    // min-width: 100%;
    // max-width: 100%;
    // min-height: 100%;
    // max-height: 100%;
    // object-fit: cover;

    display: block;
    max-width: 100%;
    width: 50px;
    height: 50px;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 4px;
    border-radius: 8px;
  }
  .css-1n1ctis {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-left: 4px;
  }
  .css-70qvj9 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .css-p1egjx {
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    --chakra-line-clamp: 1;
    word-break: break-all;
  }
  .css-r7tori {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 1em;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    color: #4589ff;
    vertical-align: middle;
    margin-left: 0.25rem;
  }
  .css-70qvj9 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .css-1qc5mst {
    color: #8a8c95;
    font-size: 0.75rem;
    line-height: 1rem;
  }
  .css-tnns6f {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: currentcolor;
    vertical-align: middle;
  }
  .css-1wsgt1t {
    color: #8a8c95;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
  }
  // input drop down
  .a-row {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    font-size: 22px !important;
    width: 100%;
  }
  .ant-select-dropdown .ant-select-item-option-content {
    background: red !important;
  }
  .a-row span {
    font-size: 22px;
  }

  .a-row span svg {
    height: auto;
    width: 18px;
  }

  .class-one {
    width: 100%;
    display: flex;
    height: 40px;
  }
  .menu ul {
    display: flex;
    justify-content: center;
  }
  .menu ul li {
    width: 113px;
  }
  .menu ul li a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 700;
    padding: 12px 22px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .menu ul li a:hover {
    background: var(--menu-hover-color);
  }
  .image-li {
    width: 174px !important ;
  }
  .account-icons ul {
    display: flex;
    gap: 10px;
    color: var(--text-color);
    font-weight: 700;
    justify-content: center;
  }

  .account-icons ul li svg {
    height: auto;
    width: 19px;
  }

  .account-icons ul li a {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .account-icons .wallet-icon svg {
    background: var(--menu-hover-color);
  }
  .account-icons ul li a {
    padding: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-color);
  }
  .account-icons ul li.wallet-icon a,
  .account-icons ul li:hover a {
    background: var(--menu-hover-color);
  }

  .account-icons ul li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 991 is changed to 1160 because of overflow issue
  @media screen and (max-width: 1500px) {
    .header-desktop {
      display: none;
    }
    .header-mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--dark-bg);
      padding: 15px 30px;
    }

    .header-mobile svg {
      height: auto;
      width: 20px;
      color: var(--text-color);
    }

    .header-mobile-right ul {
      display: flex;
      gap: 10px;
    }

    .header-mobile-right ul li {
      padding: 14px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid transparent;
    }

    .header-mobile-right ul li.active {
      background: var(--menu-hover-color);
    }

    .mobile-search-icon {
      padding: 15px 15px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid var(--menu-hover-color);
    }

    .header-mobile-left {
      display: flex;
      gap: 30px;
    }

    .header-mobile-left img {
      height: auto;
      width: 53px;
    }
  }
`;
export const CusModelArea = styled.div`
  .cus-model-wallet {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 30px 0;
  }

  .model-wallet-left {
    border-right: 1px solid var(--border-color);
    padding-right: 50px;
  }

  .model-wallet-left h2 {
    color: #80828c;
    font-size: 12px;
  }

  .model-wallet-left ul li img {
    height: auto;
    width: 30px;
    border-radius: 5px;
  }

  .model-wallet-left ul li a {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 0;
    color: var(--text-color);
    font-weight: 600;
  }

  .model-wallet-left ul li a:hover {
    background: var(--tab-hover);
  }
  .model-wallet-right ul img {
    height: auto;
    width: 50px;
  }

  .model-wallet-right {
    text-align: center;
    padding: 0 50px;
  }

  .model-wallet-right ul {
    text-align: left;
  }

  .model-wallet-right h2 {
    font-size: 18px;
    margin-bottom: 30px;
  }

  .model-wallet-right ul li {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .model-wallet-right ul li p {
    color: #898b94;
    font-size: 12px;
    font-weight: 300;
  }

  .model-wallet-right ul li p strong {
    color: var(--text-color);
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .model-wallet-right button {
    background: #0ce467;
    border: none;
    display: block;
    margin: 20px auto;
    font-weight: 600;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .model-wallet-right a {
    color: #0ce467;
    font-weight: 600;
  }

  .model-wallet-right a:hover {
    text-decoration: underline;
  }
  .cus-cart-body-content p {
    text-align: center;
    color: var(--reward-color);
    line-height: 1.9;
    font-size: 14px;
    font-weight: 300;
  }
  @media screen and (max-width: 991px) {
    .menu-footer-area {
      display: grid;
      align-items: flex-end;
    }

    .menu-footer-social-area {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 150px;
      margin: auto;
      margin-top: 20px;
    }

    .menu-footer-social-area a {
      color: var(--text-color);
    }

    .mobile-side-menus {
      display: grid;
      height: 85vh;
    }
    .mobile-side-menus ul li a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-color);
      gap: 10px;
      background: var(--menu-hover-color);
      margin: 10px 0;
      padding: 15px 20px;
      border-radius: 5px;
    }

    .mobile-side-menus ul li a span {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mobile-side-menus ul li a span svg {
      height: auto;
      width: 20px;
    }

    .mobile-cus-area ul {
      background: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 20px;
      margin-bottom: 20px;
    }

    .mobile-cus-area ul img {
      height: auto;
      width: 60px;
      display: block;
      margin: auto;
      margin-bottom: 10px;
      border-radius: 10px;
    }

    .mobile-cus-area ul li a {
      color: var(--text-color);
    }

    .mobile-cus-info h2 {
      margin: 0;
      margin-bottom: 10px;
      color: var(--text-color);
    }

    .mobile-cus-info p {
      margin: 0;
      line-height: 1.6;
    }

    .mobile-cus-info a {
      display: inline-block;
      color: #0ce467;
      border: 1px solid var(--border-color);
      padding: 10px 30px;
      margin: 30px 10px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
    }
    .mobile-cus-info a:hover {
      background: #0ce467;
      color: #000;
    }
    .mobile-cus-info {
      text-align: center;
      color: var(--reward-color);
    }
  }
`;
