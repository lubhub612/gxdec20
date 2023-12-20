import styled, { css } from 'styled-components';

export const RewardStyle = styled.div`
  .reward-area {
    max-width: 1200px;
    margin: auto;
    grid-template-columns: 1fr 1fr;
    padding: 0 30px;
  }
  .reward-area-inner {
    display: grid;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 80px 0;
  }
  .reward-left h3 {
    color: var(--button-hover-bg);
    font-size: 26px;
    margin: 0;
  }

  .reward-left h2 {
    font-size: 70px;
    margin: 10px 0 20px;
    color: #0de466;
  }
  .reward-left h2 svg {
    color: #8a8c95;
    height: auto;
    width: 24px;
  }
  .reward-left button {
    color: var(--text-color);
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    padding: 10px 20px;
    font-size: 16px;
    padding: 12px 25px;
    font-weight: 600;
  }
  .reward-right img {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 560px;
  }
  .reward-left-inner {
    display: flex;
    align-items: center;
  }
  .reward-left-inner button {
    cursor: pointer;
  }
  .reward-left-inner button svg {
    height: auto;
    width: 22px;
  }

  .reward-left-inner a {
    border: 1px solid #0ce467;
    border-radius: 10px;
    color: #0ce467;
    cursor: pointer;
    font-size: 16px;
    padding: 12px 25px;
    font-weight: 600;
    text-decoration: none;
  }
  .ant-tabs-nav:before {
    border-color: var(--border-color) !important;
  }

  .ant-tabs-tab {
    color: #8a8c95;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-tab:hover {
    color: var(--reward-color) !important;
  }
  .ant-tabs-ink-bar {
    background: #0de466 !important;
  }
  .ant-tabs-nav {
    margin: 0 !important;
  }
  .ant-tabs-content-holder {
    background: var(--dark-bg);
    position: relative;
  }
  @media screen and (max-width: 991px) {
     .reward-right img {
      max-width: 260px;
      z-index: -1;
  }
   .reward-left h2 {
    font-size: 50px;
}
`;

export const RewardTabItem = styled.div`
  .reward-inner-item {
    border: 1px solid var(--border-color);
    margin-bottom: 30px;
    border-radius: 10px;
  }

  .reward-inner-item-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    color: var(--text-color);
  }

  .reward-inner-item-left h2 {
    margin: 0;
    color: var(--button-hover-bg);
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 8px;
  }

  .reward-inner-item-left p {
    margin: 0;
    color: #8a8c95;
    font-size: 12px;
  }

  .reward-inner-item-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .reward-inner-item-right-info span {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8a8c95;
  }

  .reward-inner-item-right svg {
    height: auto;
    width: 40px;
  }

  .reward-inner-item-right-info span svg {
    height: auto;
    width: 20px;
    cursor: pointer;
  }

  .reward-inner-item button {
    background: var(--border-color);
    border: none;
    width: 100%;
    color: #0de466;
    padding: 18px;
    cursor: pointer;
    font-weight: 700;
  }
  .reward-tab-area {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 35px;
    margin: 80px 0;
  }

  .reward-tab-area-right-item {
    border: 1px solid var(--border-color);
    padding: 20px;
    display: flex;
    gap: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .reward-tab-area-right-item-right svg {
    height: auto;
    width: 50px;
    color: #8a8c95;
  }

  .reward-tab-area-right-item-left h2 {
    margin: 0;
    color: var(--reward-color);
    font-size: 14px;
    font-weight: 400;
  }

  .reward-tab-area-right-item-left p {
    color: #75777f;
    font-size: 12px;
  }

  .reward-tab-area-right-item-left p strong {
    color: var(--button-hover-bg);
    font-weight: 400;
  }

  .reward-tab-area-right-item-left a {
    color: #0fd762;
    font-weight: 600;
  }
  @media screen and (max-width: 991px) {
    .reward-tab-area {
      grid-template-columns: 1fr;
      margin: 50px 0;
    }
  }
`;
export const InfoContent = styled.div`
  max-width: 300px;
  ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
  }

  h2 {
    font-size: 12px;
    margin: 0;
  }
  p {
    font-size: 12px;
    margin: 0;
    margin-top: 10px;
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
    .cus-model-wallet {
      grid-template-columns: 1fr;
    }

    .model-wallet-left {
      padding: 0;
      border: none;
    }

    .model-wallet-right {
      display: none;
    }
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
      background: #293136;
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
