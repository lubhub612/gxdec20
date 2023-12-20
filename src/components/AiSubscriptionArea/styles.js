import styled, { css } from "styled-components";

export const AiSubArea = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 100px 30px;
  h2 {
    color: var(--text-color);
    text-align: center;
    font-size: 50px;
    margin: 0;
  }

  p {
    text-align: center;
    color: var(--text-color);
    font-size: 18px;
  }
  .ant-tabs-nav {
  }

  .ant-tabs-nav-wrap {
    justify-content: center;
  }

  .ant-tabs-nav:before {
    display: none;
  }

  .ant-tabs-tab {
    background: var(--ai-button-no-active) !important;
    color: var(--text-color) !important;
    border: none !important;
    border-radius: 10px !important;
    font-size: 16px !important;
    padding: 15px 60px !important;
    margin: 0 !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    background: var(--ai-button) !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #e6e9f1 !important;
  }
  .ant-tabs-nav-list {
    background: #1a1e2d;
    border-radius: 10px !important;
    margin-top: 60px;
  }
  .faq-area {
    margin-top: 150px;
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
    padding: 20px 30px;
  }

  .faq-area .ant-collapse-content-box {
    background: var(--dark-bg);
    padding: 20px 30px;
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
    font-size: 20px;
  }
  .ant-collapse {
    border-color: var(--border-color) !important;
    margin-top: 50px;
    border-radius: 10px;
  }
  .ant-collapse-content-box p {
    text-align: left;
  }
  @media screen and (max-width: 991px) {
    .ant-tabs-tab {
      padding: 12px 30px !important;
    }
  }
`;
export const PriceListContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 40px;

  .price-list-item {
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
  }

  .price-list-item-top {
    background: var(--ai-top-bg);
    padding: 50px 40px 40px;
  }

  .price-list-item-top h2 {
    font-size: 24px;
    text-align: left;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 400;
  }

  .price-list-item-top h3 {
    text-align: left;
    color: var(--text-color);
    font-size: 30px;
    margin: 0;
  }

  .price-list-item-top h3 span {
    color: var(--text-color);
    font-size: 14px;
  }
  .price-list-item-top h4 {
    text-align: left;
    color: var(--text-color);
    font-weight: 400;
    margin: 10px 0 30px;
    font-size: 16px;
  }

  .price-list-item-top button {
    display: block;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    color: #ffffff;
  }

  .price-list-item-top a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    margin-top: 15px;
    color: #2c6cb0;
  }

  .price-list-item-bottom {
    background: var(--ai-bottom-bg);
    padding: 40px 40px 100px;
    text-align: left;
    color: var(--text-color);
  }

  .price-list-item-bottom ul li {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;
    padding-bottom: 20px;
    color: var(--text-color);
  }

  .price-list-item-bottom ul li svg {
    color: #059669;
    display: flex;
  }

  .price-list-item-bottom ul li:last-child {
    border-bottom: 0;
  }
  .price-list-item:nth-child(1) h2 {
    color: #2dd4bf;
  }
  .price-list-item:nth-child(2) h2 {
    color: #818cf8;
  }
  .price-list-item:nth-child(3) h2 {
    color: #fbbf23;
  }
  .price-list-item:nth-child(1) button {
    background: #0e9488;
  }
  .price-list-item:nth-child(2) button {
    background: #4f46e5;
  }
  .price-list-item:nth-child(3) button {
    background: #d97705;
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;
