import styled, { css } from "styled-components";

export const FooterArea = styled.div`
  background-image: var(--apy-bg-gradient);
  padding: 100px 30px 50px;
  .wrapper {
    position: relative;
    height: 60vh;
    width: 100%;
  }
  .inner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  // media query
  @media screen and (max-width: 1000px) {
    .wrapper {
      margin-top: 220px;
    }
  }
  // media query
  @media screen and (min-width: 1920px) {
    .wrapper {
      height: 40vh;
    }
  }
  @media screen and (min-height: 1000px) {
    .wrapper {
      height: 40vh;
    }
  }

  .footer-area-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  .footer-menus {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .footer-logo {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
  }

  .footer-logo img {
    height: auto;
    max-width: 200px;
  }

  .footer-menu-item h2 {
    color: var(--text-color);
    font-size: 16px;
    margin: 0;
  }

  .footer-menu-item ul li a {
    color: var(--reward-color);
    text-decoration: none;
    display: block;
    margin-top: 18px;
    font-size: 16px;
  }
  .footer-menu-item ul li a:hover {
    text-decoration: underline;
  }
  .footer-menu-item ul li.footer-links a {
    color: #13c85d;
  }
  .footer-info {
    border-top: 1px solid var(--border-color);
    margin-top: 50px;
    padding-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-color);
  }

  .footer-info a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 700;
  }

  .footer-info-menus ul {
    display: flex;
    gap: 20px;
  }

  .footer-info-menus {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .footer-info-menus li a {
    display: flex;
  }

  .footer-info-menus ul button {
    background: var(--menu-hover-color);
    border: none;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
  .footer-info-menus ul button svg {
    width: 20px;
    height: auto;
  }

  @media screen and (max-width: 1000px) {
    .footer-menus {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .footer-area-inner {
      grid-template-columns: 1fr;
    }

    .footer-logo {
      justify-content: inherit;
    }

    .footer-info {
      display: grid;
      text-align: center;
      justify-content: center;
    }

    .footer-info-menus {
      display: grid;
      justify-content: center;
    }

    .footer-info-menus ul {
      justify-content: center;
    }
  }
`;
