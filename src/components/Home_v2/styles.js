import styled, { css } from "styled-components";

export const HomePageArea = styled.div`
  .hero-area {
    overflow: hidden;
    position: relative;
    padding: 100px 0;
  }
  .hero-area-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    transform: scale(1.1);
    filter: blur(8px);
    pointer-events: none;
    webkit-mask: linear-gradient(#121619, transparent 95%);
    mask: linear-gradient(#121619, transparent 95%);
  }

  .hero-area-inner {
    z-index: 1;
    position: relative;
  }

  .hero-area-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container {
    max-width: 1200px;
    margin: auto;
    padding: 0 30px;
  }

  .hero-inner {
    display: grid;
    align-items: center;
    gap: 100px;
    grid-template-columns: 1fr 1fr;
  }

  .hero-left h2 {
    color: var(--text-color);
    font-weight: 700;
    font-size: 70px;
    max-width: 500px;
    margin: 0;
    line-height: 1.2;
  }

  .hero-left p {
    color: var(--hero-text);
    font-size: 16px;
    max-width: 400px;
    margin: 30px 0;
    line-height: 1.7;
  }

  .hero-left p a {
    color: #12ca5e;
    text-decoration: none;
    margin-left: 5px;
  }

  .hero-button a {
    background: var(--button-bg);
    color: var(--button-text);
    font-weight: 700;
    text-decoration: none;
    font-size: 18px;
    display: inline-block;
    padding: 15px 26px;
    border-radius: 10px;
    transition: 0.3s;
  }

  .hero-button {
    display: flex;
    gap: 10px;
  }

  .hero-button a:last-child {
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-color);
  }

  .hero-button a:hover {
    background: var(--button-hover-bg);
  }
  .hero-button a:last-child:hover {
    background: var(--button-hover-bg);
    color: var(--button-text);
  }

  .hero-img {
    position: relative;
    background: var(--hero-bg);
  }

  .hero-img img {
    width: 100%;
    height: auto;
  }

  .hero-right {
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
  }

  .hero-right h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 20px;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--hero-bg);
  }

  .hero-right h2 svg {
    color: #4589ff;
  }
  .hero-img h3 {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--hero-bg);
    display: flex;
    align-items: center;
    gap: 7px;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 16px;
    color: var(--text-color);
    margin: 0;
  }

  .hero-img h3 svg {
    height: auto;
    width: 22px;
  }
  .home-top-collection-today h2 {
    text-align: center;
    color: var(--text-color);
    font-size: 50px;
    margin: 0;
    margin-bottom: 80px;
  }

  .home-top-collection-today table {
    width: 100%;
    color: var(--text-color);
    border-collapse: collapse;
    text-align: left;
    font-weight: 700;
  }

  .home-top-collection-today table thead th {
    color: var(--button-hover-bg);
    font-weight: 400;
    height: 50px;
  }

  .home-top-collection-today tbody td {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 20px 0;
  }

  .home-top-collection-today table tbody td span {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .home-top-collection-today table tbody td span svg {
    height: auto;
    width: 10px;
  }

  // .home-top-collection-today tbody strong {
  //   color: #e64951;
  //   font-weight: 400;
  //   font-size: 14px;
  // }
  .home-top-collection-today tbody strong {
    font-weight: 400;
    font-size: 14px;
  }
  .home-top-collection-today tbody strong.red {
    color: #e64951;
  }
  .home-top-collection-today tbody strong.green {
    color: #0bb04f;
  }
  .home-top-collection-today tbody strong.ash {
    color: #8a8c95;
  }
  .home-top-collection-today tbody tr td:nth-child(2) span svg {
    width: 18px;
    color: #4589ff;
  }

  .home-top-collection-today tbody tr td:nth-child(2) {
    max-width: 130px;
  }
  .home-top-collection-today tbody tr td:nth-child(2) img {
    height: auto;
    width: 40px;
    border-radius: 50px;
    margin-left: 20px;
  }
  .home-top-collection-today tbody tr {
    transition: 0.3s;
  }
  .home-top-collection-today tbody tr:hover {
    background: var(--tab-hover);
    cursor: pointer;
  }
  .home-top-collection-today button {
    display: block;
    margin: auto;
    margin-top: 60px;
    background: var(--button-bg);
    color: var(--button-text);
    border: none;
    font-weight: 700;
    font-size: 18px;
    padding: 18px 30px;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
  }

  .home-top-collection-today button:hover {
    background: var(--button-hover-bg);
  }
  .home-apy-section-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
    padding: 100px 0;
  }

  .home-apy-section {
    background-image: var(--apy-bg-gradient);
  }

  .home-apy-content h2 {
    font-size: 50px;
    color: var(--text-color);
    margin: 0;
  }

  .home-apy-content p {
    color: var(--reward-color);
    margin: 30px 0;
    max-width: 460px;
  }

  .home-apy-content button {
    display: block;
    background: var(--button-bg);
    color: var(--button-text);
    border: none;
    font-weight: 700;
    font-size: 18px;
    padding: 18px 30px;
    border-radius: 10px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    cursor: pointer;
  }
  .home-apy-content button:hover {
    background: var(--button-hover-bg);
  }
  .home-collection-mobile {
    display: none;
  }
  @media screen and (max-width: 991px) {
    .home-collection-desktop {
      display: none;
    }
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 60px;
    }

    .hero-area {
      padding: 70px 0;
    }

    .hero-left h2 {
      font-size: 42px;
    }

    .home-top-collection-today h2 {
      font-size: 30px;
    }

    .home-apy-section-inner {
      grid-template-columns: 1fr;
      padding: 80px 0;
    }

    .home-apy-content h2 {
      font-size: 42px;
    }
    .home-collection-mobile {
      display: grid;
    }
    .home-collection-list-item {
      display: grid;
      grid-template-columns: 1fr 8fr 1fr;
      color: var(--text-color);
      gap: 10px;
      padding: 20px 0;
    }
    .home-collection-list-item:hover {
      background: var(--tab-hover);
    }
    .home-collection-mobile img {
      height: auto;
      width: 50px;
      border-radius: 50px;
    }

    .home-collection-mobile-center {
      display: flex;
      gap: 15px;
    }

    .home-collection-mobile-content h2 {
      margin: 0;
      font-size: 16px;
      display: flex;
      gap: 5px;
      align-items: center;
      margin-bottom: 10px;
    }
    .home-collection-mobile-content h2 svg {
      color: #4589ff;
    }

    .home-collection-mobile-content svg {
      height: auto;
      width: 10px;
    }

    .home-collection-mobile-content ul li strong {
      font-size: 14px;
      color: #7e818a;
      min-width: 60px;
      margin-top: 7px;
    }

    .home-collection-mobile-content ul li {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .home-collection-mobile-content ul li span {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .home-collection-mobile-content ul li span .h-c-changes {
      color: #e44a52;
      margin-left: 15px;
    }

    .home-collection-mobile-right button {
      background: transparent;
      border: none;
      color: var(--text-color);
      display: flex;
      margin: 0;
      padding: 0;
      margin-left: auto;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -8px;
    }
    .home-collection-mobile-right button:hover {
      background: #262c31;
    }
    .home-collection-mobile-left {
      font-weight: 700;
      font-size: 18px;
      margin-top: 5px;
    }
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
