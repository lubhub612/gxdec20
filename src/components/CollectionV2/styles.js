import styled, { css } from "styled-components";

export const CollectionMain = styled.div`
  .collection-header {
    background-image: var(--apy-bg-gradient);
    padding: 60px 30px;
  }
  .collection-header h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 60px;
  }
  .tab-content .ant-tabs-nav:before {
    border-bottom: none;
  }
  // adition
  // .tab-content .ant-tabs-nav {
  //   width: 500px;
  // }

  .tab-content .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--text-color);
  }

  .tab-content .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background: #0ce467;
  }

  .tab-content .ant-tabs-tab .ant-tabs-tab-btn {
    color: #8a8c95;
    font-size: 16px;
  }

  .tab-content .ant-tabs-nav-wrap {
    background: var(--collection-bg);
    padding: 0 30px;
  }

  .tab-content .ant-tabs-content {
    background: var(--dark-bg);
    padding: 0 30px;
  }
  .tab-content .ant-tabs-nav {
    margin: 0;
  }

  .collection-area-header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
  }

  .collection-area-header button {
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-color);
    background: var(--input-bg);
    border: none;
    gap: 10px;
    min-width: fit-content;
    cursor: pointer;
  }
  .collection-area-header .ant-dropdown-trigger {
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-color);
    background: var(--input-bg);
    border: none;
    gap: 10px;
    min-width: fit-content;
    cursor: pointer;
  }

  .collection-area-header button svg {
    height: auto;
    width: 20px;
  }

  .collection-area-header span.ant-input-affix-wrapper input {
    padding: 3px;
    background: var(--input-bg);
  }

  .collection-area-header span.ant-input-affix-wrapper svg {
    color: #8a8c95;
  }

  .collection-area-header span.ant-input-affix-wrapper {
    background: var(--input-bg);
  }

  .collection-area-header ul {
    display: flex;
    color: var(--text-color);
    font-weight: 600;
  }

  .collection-area-header ul li {
    border-right: 1px solid var(--border-color);
    background: var(--dark-bg);
    padding: 10px 15px;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    min-width: 60px;
    text-align: center;
    cursor: pointer;
  }
  .collection-area-header ul li:hover {
    background: var(--menu-hover-color);
  }
  .collection-area-header ul li:first-child {
    border-left: 1px solid var(--border-color);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: var(--border-color);
    color: #0ce467;
  }

  .collection-area-header ul li:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .collection-area-body table {
    width: 100%;
    color: var(--text-color);
    border-collapse: collapse;
    text-align: left;
    font-weight: 700;
  }

  .collection-area-body table thead th {
    color: var(--button-hover-bg);
    font-weight: 400;
    height: 50px;
  }

  .collection-area-body tbody td {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 20px 0;
  }

  .collection-area-body table tbody td span {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .collection-area-body table tbody td span svg {
    height: auto;
    width: 10px;
  }

  .collection-area-body tbody strong {
    font-weight: 400;
    font-size: 12px;
  }
  .collection-area-body tbody strong.red {
    color: #e64951;
  }
  .collection-area-body tbody strong.green {
    color: #0bb04f;
  }
  .collection-area-body tbody strong.ash {
    color: #8a8c95;
  }
  .collection-area-body tbody tr td:nth-child(2) span svg {
    width: 18px;
    color: #4589ff;
  }

  .collection-area-body tbody tr td:nth-child(2) {
    max-width: 130px;
  }
  .collection-area-body tbody tr td img {
    height: auto;
    width: 40px;
    border-radius: 50px;
  }
  .collection-area-body tbody tr {
    transition: 0.3s;
  }
  .collection-area-body tbody tr:hover {
    background: var(--tab-hover);
    cursor: pointer;
  }
  .collection-area-body-desktop {
    display: block;
  }

  .collection-area-body-mobile {
    display: none;
  }

  @media screen and (max-width: 991px) {
    .collection-area-body-desktop {
      display: none;
    }
    .collection-area-body-mobile {
      display: block;
    }
    .collection-area-header {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
    .collection-area-header .ant-dropdown-trigger {
      min-width: max-content;
    }
  }

  .css-1ce57o2 {
    width: 4rem;
    height: 4rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: #0ce466;
    vertical-align: middle;
    padding-bottom: 2px;
  }
  .css-120vxwj {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  .css-1feo50q {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    max-width: 512px;
  }
  .css-1feo50q {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    max-width: 512px;
  }
  .css-vir874 {
    color: var(--text-color);
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }
  .css-801ndf {
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 1rem;
    margin-inline: 0px;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  .css-g8ykms {
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
    background-color: #f3f3f8;
    color: #121619;
    height: 3rem;
    min-width: 3rem;
    font-size: 0.875rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    padding-bottom: 0.4rem;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0);
  }
  // create collection button
  .create-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background: var(--collection-bg);
    padding: 0 30px;
    position: relative;
  }

  /* CSS */
  .button-6 {
    align-items: center;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
  }

  .button-6:hover,
  .button-6:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  .button-6:hover {
    transform: translateY(-1px);
  }

  .button-6:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }

  // pop up on click
  .css-12g7zl4 {
    padding-inline-start: 0.75rem;
    padding-inline-end: 0.75rem;
    color: #121619;
    padding: 0px;
  }
  .css-vmox5t {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .css-vmox5t .ant-switch {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 22px;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    position: relative;
    display: inline-block;
    min-width: 44px;
    height: 22px;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.25);
    border: 0;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
  }
  .css-vmox5t button .ant-switch-inner {
    background: var(--menu-hover-color) !important;
  }

  .css-vmox5t button.ant-switch-checked .ant-switch-inner {
    background: #109b48 !important;
  }
  .css-looygl {
    --popper-arrow-bg: #f3f3f8;
    background: #f3f3f8;
  }
  .css-ndx8mv {
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
    width: 270px !important;
    text-align: center;
    background: #f3f3f8;
    border-color: inherit;
    border-radius: 12px;
    padding: 1rem;
  }
`;
export const Button = styled.button`
  background: var(--menu-hover-color);
  border: none;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 170px;
  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: var(--text-color);
  }
`;
export const LoadingScreen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
