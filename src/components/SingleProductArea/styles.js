import styled, { css } from "styled-components";

export const SingleProduct = styled.div`
  background-image: var(--apy-bg-gradient);
  .single-product-inner {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 40px;

    padding: 50px 30px 100px;
  }

  .single-product-left img {
    width: 100%;
    margin-bottom: 20px;
  }

  .single-product-inner .ant-collapse {
    border-color: var(--border-color);
  }

  .single-product-inner .ant-collapse-header {
    background: var(--input-bg);
    padding: 15px 20px;
  }

  .single-product-inner span.ant-collapse-header-text {
    color: var(--button-hover-bg);
    font-size: 16px;
  }

  .single-product-inner .ant-collapse-expand-icon {
    color: var(--button-hover-bg);
  }

  .single-product-inner .ant-collapse-content .ant-collapse-content-box {
    background: var(--dark-bg);
  }

  .single-product-inner .ant-collapse-content {
    border: none;
  }

  .single-product-inner .ant-collapse-item {
    border-color: var(--border-color);
  }

  .single-product-accordion-tab ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-color);
    gap: 4px;
  }

  .single-product-accordion-tab ul li span {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);rder-color);
    border-radius: 20px;
    gap: 8px;
    max-width: fit-content;
    padding: 3px 13px;
    font-size: 11px;
    color: var(--reward-color);
  }

  .single-product-accordion-tab ul li span svg {
    height: auto;
    width: 18px;
  }

  .single-product-accordion-tab ul li {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #858791;
    font-weight: 300;
  }

  .single-product-accordion-tab ul li strong {
    font-weight: 600;
  }

  .single-product-accordion-tab ul li strong:last-child {
    font-weight: 300;
  }

  .single-product-acc-list {
    display: grid;
    gap: 10px;
    margin: 20px 0 5px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .single-product-acc-list-item {
    background: #122149;
    border-radius: 8px;
    padding: 8px 10px;
    color: #fff;
    background-image: var(--collect-gradient);
  }

  .single-product-acc-list-item svg {
    height: auto;
    width: 10px;
  }

  .single-product-acc-list-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .single-product-acc-list-item-head strong {
    font-weight: 400;
    color: #78a9ff;
    font-size: 11px;
  }

  .single-product-acc-list-item-head ul li {
    background: #2b447f;
    width: 5px;
    height: 5px;
    border-radius: 50px;
  }

  .single-product-acc-list-item-head ul li.active {
    background: #78a9ff;
  }

  .single-product-acc-list-item h4 {
    margin: 0;
    font-size: 11px;
  }

  .single-product-acc-list-item p {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 11px;
  }

  .single-product-acc-list-item p strong {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .single-product-acc-list-item p strong span {
    font-weight: 300;
  }
  .single-pro-token ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #84868f;
    font-weight: 300;
  }

  .single-pro-token ul li strong {
    font-weight: 400;
    color: var(--reward-color);
  }

  .single-pro-token ul {
    display: grid;
    gap: 20px;
  }

  .single-pro-token hr {
    border: 1px solid var(--border-color);
    margin: 20px 0;
  }

  .single-pro-token ul a {
    color: #0ce467;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .single-product-inner .ant-collapse-content-box {
    padding: 25px 20px;
  }
  .single-pro-token ul a svg {
    height: auto;
    width: 16px;
  }
  .collection-details-info-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .collection-details-info-head img {
    width: 50px !important;
    height: 50px !important;
    border-radius: 50px;
    margin: 0 !important;
  }

  .collection-details-social {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }

  .collection-details-social a svg {
    height: auto;
    width: 20px !important;
  }

  .collection-details-social a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    color: var(--text-color);
  }

  .collection-details-social a:hover {
    background: var(--menu-hover-color);
  }

  .collection-details-info h2 {
    color: var(--button-hover-bg);
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    gap: 11px;
    margin-top: 30px;
  }

  .collection-details-info h2 svg {
    height: auto;
    width: 20px;
    color: #4589ff;
  }

  .collection-details-info h3 a {
    display: flex;
    align-items: center;
    color: #82848e;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
  }

  .collection-details-info h3 svg {
    height: auto;
    width: 15px;
  }

  .collection-avatar-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    color: var(--text-color);
    row-gap: 15px;
    margin: 30px 0;
  }

  .collection-avatar-item svg {
    height: auto;
    width: 12px;
  }

  .collection-avatar-item strong {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 16px;
  }

  .collection-avatar-item span {
    color: #7e8089;
    font-weight: 300;
    font-size: 13px;
  }

  .collection-details-info button {
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-color);
    padding: 15px 30px;
    border-radius: 10px;
    cursor: pointer;
  }

  .collection-details-info button:hover {
    background: var(--menu-hover-color);
  }

  .single-product-right-title h2 {
    color: var(--text-color);
    margin-top: 30px;
    font-size: 16px;
    font-weight: 600;
  }
  .single-product-right-title h2 span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .single-product-right-title h2 span:last-child {
    color: #83858e;
    font-weight: 400;
    font-size: 14px;
    margin-top: 3px;
  }
  .single-product-right-title h2 svg {
    height: auto;
    width: 18px;
    color: #4589ff;
  }
  .single-product-right-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .single-product-right-title ul {
    display: flex;
    align-items: center;
    color: var(--text-color);
    gap: 10px;
  }

  .single-product-right-title ul li {
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid var(--border-color);
    padding: 10px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .single-product-right-title ul li svg {
    height: auto;
    width: 20px;
  }

  .single-product-right-title ul li:hover {
    background: var(--menu-hover-color);
  }

  .single-product-right-body h3 {
    font-size: 44px;
    color: var(--text-color);
    margin: 20px 0;
  }

  .single-product-right-body .single-product-accordion-tab {
    margin-bottom: 50px;
  }
  .collection-right-offer-list li svg {
    height: auto;
    width: 14px;
  }

  .collection-right-offer-list ul li span {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #898b94;
    font-weight: 300;
    margin-bottom: 5px;
  }

  .collection-right-offer-list ul li {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .collection-right-offer-list ul li strong,
  .collection-right-offer-list ul li a {
    color: var(--text-color);
  }
  .collection-right-offer-list ul li a span {
    margin-bottom: 0;
    color: var(--text-color);
  }
  .collection-right-offer-list ul li a:hover {
    text-decoration: underline;
  }
  .collection-right-offer-list a.ant-dropdown-trigger {
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
    max-width: fit-content;
    cursor: pointer;
    margin-bottom: 40px;
  }
  .collection-right-activity-head ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .collection-right-activity-head ul li a {
    color: var(--button-hover-bg);
    border: 1px solid var(--border-color);
    padding: 8px 10px;
    border-radius: 10px;
    display: block;
  }

  .collection-right-activity-body-item-left button {
    background: transparent;
    border: 1px solid var(--border-color);
    color: #6b96e3;
    border-radius: 10px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
  }

  .collection-right-activity-body-item-left button svg {
    height: auto;
    width: 14px;
  }

  .collection-right-activity-body-item {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .collection-right-activity-body-item-left ul {
    display: flex;
    align-items: center;
    color: #868791;
    font-weight: 300;
    gap: 15px;
    margin: 12px 0;
  }

  .collection-right-activity-body-item-left ul li a {
    color: var(--button-hover-bg);
  }

  .collection-right-activity-head {
    margin-bottom: 40px;
  }

  .collection-right-activity-body-item-right svg {
    height: auto;
    width: 22px;
    color: var(--text-color);
  }

  .collection-right-activity-body-item-right a {
    border: 1px solid var(--border-color);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .collection-right-activity-body-item-right a:hover {
    background: var(--menu-hover-color);
  }
  .single-product-right-offer-tab {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    display: grid;
    align-items: center;
    margin-bottom: 40px;
    grid-template-columns: 1fr 1fr;
  }

  .single-product-right-offer-tab h2 svg {
    height: auto;
    width: 10px;
  }

  .single-product-right-offer-tab h2 {
    color: #6b6e76;
    font-weight: 400;
    margin: 0;
    font-size: 14px;
  }

  .single-product-right-offer-tab h2 span {
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  .single-product-right-offer-tab h2 span strong {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--text-color);
  }

  .single-product-right-offer-tab button {
    background: var(--border-color);
    border: none;
    color: var(--text-color);
    font-weight: 600;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  .single-product-right-offer-tab button:hover {
    background: var(--menu-hover-color);
  }
  .show-desktop {
    display: block;
  }
  .show-mobile {
    display: none;
  }
  @media screen and (max-width: 991px) {
    .show-desktop {
      display: none;
    }
    .show-mobile {
      display: block;
    }
    .single-product-inner {
      padding: 10px 30px 100px;
      grid-template-columns: 1fr;
    }
    .single-product-right-body h3 {
      font-size: 32px;
    }
  }
`;
export const PopUpContentArea = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  text-align: center;
  padding: 5px;
`;
export const ConnectWalletModel = styled.div`
  h2 {
    margin: 0;
    font-size: 30px;
    margin-top: 40px;
  }

  p {
    color: var(--reward-color);
  }

  button {
    background: var(--button-bg);
    border: none;
    font-weight: 600;
    padding: 15px 30px;
    border-radius: 8px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    color: var(--button-text);
  }
  button:hover {
    background: var(--button-hover-bg);
  }
`;
export const LoadingScreen = styled.div`
  position: absolute;
  left: 50vw;
  width: 100%;
  height: 100%;
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
`;
export const OutlineBox = styled.div`
  border: 1px solid #40475d;
  border-radius: 10px;
  color: #c4c4c4;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 25px;
`;
