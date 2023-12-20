import styled, { css } from 'styled-components';

export const BuyTokenStyle = styled.div`
  color: var(--text-color);
  margin: 100px auto;
  max-width: 1200px;
  padding: 0 30px;

  h2 {
    text-align: center;
    font-size: 50px;
    margin: 0;
    margin-bottom: 50px;
  }
  .buy-token-area {
    max-width: 510px;
    margin: auto;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 10px;
    background: var(--dark-bg);
  }
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
  .buy-token-area h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 18px;
    color: var(--text-color);
    margin: 0;
    padding: 5px;
    margin-bottom: 10px;
  }

  .buy-token-area h3 span {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #727880;
    cursor: pointer;
  }

  .buy-token-area h3 span svg {
    height: auto;
    width: 14px;
  }

  .buy-token-area span:last-child svg {
    width: 20px;
  }
  .buy-token-area h3 strong {
    display: flex;
    gap: 15px;
  }
  .buy-token-input-item {
    background: var(--token-bg);
    border-radius: 15px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding-bottom: 40px;
  }
  .buy-token-input-item input:focus {
    box-shadow: none;
    outline: none;
  }
  .buy-token-input-item input {
    background: transparent;
    border: none;
    font-size: 16px;
  }

  .buy-token-input-item button {
    background: var(--token-coin-bg);
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 400;
    color: var(--text-color);
    border-radius: 50px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .buy-token-input-item button img {
    max-width: 20px;
  }

  .buy-token-input-item button svg {
    width: 18px;
  }

  .buy-token-input-item input {
    width: 100%;
    padding: 7px 10px;
    font-weight: 600;
    font-size: 30px;
    color: var(--text-color);
  }
  .buy-token-input-item input::placeholder {
    color: #838993;
  }
  .buy-token-input-group {
    position: relative;
  }

  .buy-token-switch {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--token-bg);
    border: 4px solid var(--border-color);
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    cursor: pointer;
  }

  .buy-token-switch svg {
    width: 18px;
  }
  .buy-token-area p {
    color: var(--text-color);
    margin: 0;
    background: var(--token-bg);
    margin-top: -2px;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    gap: 6px;
  }

  .buy-token-input-item:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .buy-token-area p svg {
    width: 16px;
    height: auto;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  input[type='number'] {
    -moz-appearance: textfield !important;
  }
  .buy-token-connect button {
    background: #13bd58;
    border: none;
    width: 100%;
    padding: 14px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 10px;
    margin: 15px 0;
    cursor: pointer;
  }
  .ant-drawer-header {
    padding: 10px 20px !important;
  }

  .ant-drawer-title {
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .setting-area-sidebar-item h2 {
    margin: 0;
    text-align: left;
    font-size: 14px;
    color: var(--text-color);
    font-weight: 400;
    margin-bottom: 12px;
  }

  .setting-area-sidebar-item input {
    width: 100%;
    padding: 15px;
    background: var(--input-bg);
    border: none;
    border-radius: 10px;
    color: var(--text-color);
    font-size: 16px;
    border: 1px solid var(--border-color);
  }

  .setting-area-sidebar-item {
    margin-bottom: 20px;
  }
  .setting-area-sidebar ul li img {
    height: auto;
    width: 30px;
    border-radius: 10px;
  }

  .setting-area-sidebar ul li h4 {
    margin: 0;
    font-weight: 400;
  }
  .setting-area-sidebar ul li a {
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid var(--border-color);
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .setting-area-sidebar ul li a:hover {
    background: #15c55c;
  }
  .setting-area-coin-list input {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    padding: 15px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .setting-area-coin-list ul li {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .setting-area-coin-list ul li img {
    height: auto;
    width: 30px;
  }

  .setting-area-coin-list ul li span strong {
    display: block;
    color: var(--text-color);
    font-size: 14px;
  }

  .setting-area-coin-list ul li span {
    color: #878d96;
    font-weight: 300;
    font-size: 12px;
  }

  .setting-area-coin-list ul li:hover {
    background: var(--tab-hover);
  }
`;

export const ConnectWallets = styled.span`
  button {
    background: #13bd58 !important;
    color: #000 !important;
  }
`;
