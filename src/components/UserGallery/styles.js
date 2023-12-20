import styled, { css } from "styled-components";

export const GalleryDesign = styled.div`
  padding-top: 20px;
  // max-width: calc(100vw - 320px);
  padding: 0px 20px;
  .drop-zone {
    border: 3px dashed blue !important;
    /* Add any additional styling to indicate the drop zone */
  }
  // upload images preview
  .images-wrapper {
    display: grid !important;
    gridtemplatecolumns: repeat(4, 1fr) !important;
    gap: 10px;
    height: 400px !important;
    maxheight: 400px !important;
    overflowy: scroll;
    width: 100%;
  }
  .ant-select-selector {
    width: 220px !important;
    color: black !important;
    // padding: 0 120px !important;
    outline: none !important;
    border: 1px solid var(--border-color) !important;
    background: var(--input-bg) !important;
    color: var(--input-text);
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    color: var(--input-text);
    font-weight: bold;
    background: var(--input-bg) !important;
  }
  .ant-select-arrow {
    right: 24px;
    color: var(--input-text);
    font-weight: bold;
    top: 18px;
  }
  .ant-select-selection-item {
    color: var(--input-text);
  }
  .ant-select-dropdown {
    width: 160px !important;
    background: var(--input-bg) !important;
  }

  .ant-select-item-option-content {
    color: var(--input-text);
  }

  // ----------search bar

  .search span,
  .search input {
    background: var(--input-bg);
    border: none;
    padding: 5.1px 38px;
    color: var(--input-text);
  }

  .search input::placeholder {
    color: var(--input-text);
  }
  .search-outer {
    display: flex;
    position: relative;
  }

  .search-outer svg {
    width: 24px;
    height: auto;
    position: absolute;
    right: 4px;
    top: 8px;
    color: var(--input-text);
    border-left: 2px solid var(--input-text);
    padding-left: 5px;
    cursor: pointer;
  }
  .search-outer svg:hover {
    color: #0056b3;
  }

  .checkbox-wrapper-12 {
    position: relative;
  }
  .checkbox-wrapper-12 > svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
  }
  .checkbox-wrapper-12 * {
    box-sizing: border-box;
  }
  .checkbox-wrapper-12 input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
  }
  .checkbox-wrapper-12 input[type="checkbox"]:focus {
    outline: 0;
  }
  .checkbox-wrapper-12 .cbx {
    width: 24px;
    height: 24px;
    top: calc(50vh - 12px);
    left: calc(50vw - 12px);
  }
  .checkbox-wrapper-12 .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid var(--text-color);
    border-radius: 50%;
  }
  .checkbox-wrapper-12 .cbx label {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-filter: url("#goo-12");
    filter: url("#goo-12");
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg path {
    stroke: var(--text-color);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }
  .checkbox-wrapper-12 .cbx input:checked + label {
    animation: splash-12 0.6s ease forwards;
  }
  .checkbox-wrapper-12 .cbx input:checked + label + svg path {
    stroke-dashoffset: 0;
  }
  @-moz-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb,
        16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb,
        -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @-webkit-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb,
        16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb,
        -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @-o-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb,
        16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb,
        -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb,
        16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb,
        -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  // commenting for testing
  // .ant-modal-content {
  //   border-radius: 20px 20px 0 0;
  //   background-color: #000000;
  // }

  /* (A) WHOLE PAGE */
  * {
    box-sizing: border-box;
  }
  body {
    background: #eee;
  }
  // max-width: 1600px;
  .gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 6px;
    padding-top: 10px;

    // max-width: 1600px;
    margin: 0 20px;
    overflow: hidden;
  }

  /* (C) GALLERY IMAGES */
  .gallery img {
    /* (C1) DIMENSION */
    width: 300px;
    height: 290px;

    /* (C3) IMAGE RESIZE */
    /* cover | contain | fill | scale-down */
    object-fit: contain;
    position: relative;
  }

  /* (E) OPTIONAL ZOOM ON HOVER */
  .gallery img:hover {
    z-index: 9;
    transform: scale(1.05);
    /* linear | ease | ease-in | ease-out | ease-in-out */
    transition: transform ease 0.5s;
  }

  /* (D) ON SMALL SCREENS - 2 IMAGES PER ROW */
  @media only screen and (max-width: 600px) {
    .images-wrapper {
      gridtemplatecolumns: repeat(2, 1fr);
      gap: 5px;
    }
    .gallery {
      grid-template-columns: repeat(2, 1fr);
    }
    .gallery img {
      /* (C1) DIMENSION */
      width: 260px;
      height: 250px;

      /* (C3) IMAGE RESIZE */
      /* cover | contain | fill | scale-down */
      object-fit: contain;
      position: relative;
    }
  }
  .red-color {
    background: #db0d36;
    color: #fff;
  }

  /* (D) ON SMALL SCREENS - 3 IMAGES PER ROW */
  @media only screen and (max-width: 1000px) and (min-width: 600px) {
    .images-wrapper {
      gridtemplatecolumns: repeat(3, 1fr);
      gap: 5px;
    }
    .gallery {
      grid-template-columns: repeat(3, 1fr);
    }
    .gallery img {
      /* (C1) DIMENSION */
      width: 240px;
      height: 240px;

      /* (C3) IMAGE RESIZE */
      /* cover | contain | fill | scale-down */
      object-fit: contain;
      position: relative;
    }
  }

  /* (D) ON SMALL SCREENS - 4 IMAGES PER ROW */
  @media only screen and (max-width: 1700px) and (min-width: 900px) {
    .images-wrapper {
      gridtemplatecolumns: repeat(4, 1fr);
      gap: 10px;
    }
    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
    .gallery img {
      /* (C1) DIMENSION */
      width: 240px;
      height: 240px;

      /* (C3) IMAGE RESIZE */
      /* cover | contain | fill | scale-down */
      object-fit: contain;
      position: relative;
    }
  }
  /* (D) ON Big SCREENS - 4 IMAGES PER ROW */
  @media only screen and (min-width: 1700px) {
    .images-wrapper {
      gridtemplatecolumns: repeat(5, 1fr);
      gap: 10px;
    }
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

  .filters {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
  }
  .sub-filters1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 480px;
  }
  .sub-filters2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 480px;
  }
  // New gallery images style
  .right-side {
    flex: 2;
    box-sizing: border-box;
    overflow-x: hidden;
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
  @media screen and (max-width: 1050px) {
    .filters {
      flex-direction: column;
      justify-content: space-around;
    }
  }
  @media screen and (max-width: 1050px) and (min-width: 620px) {
    .sub-filters1 {
      padding-bottom: 10px;
      width: 500px;
    }
    .sub-filters2 {
      padding-bottom: 6px;
      width: 500px;
    }
  }
  @media screen and (max-width: 620px) {
    .filters {
      padding: 4px 0px;
    }
    .sub-filters1 {
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 5px;
      width: 300px;
    }
    .sub-filters2 {
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 5px;
      width: 300px;
      height: 150px;
    }
    .search-outer {
      padding-top: 5px;
    }
    .search-outer svg {
      width: 24px;
      height: auto;
      position: absolute;
      right: 4px;
      top: 14px;
      color: var(--input-text);
      border-left: 2px solid var(--input-text);
      padding-left: 5px;
      cursor: pointer;
    }
    .ant-select-selector {
      width: 350px !important;
      color: black !important;
      // padding: 0 120px !important;
      outline: none !important;
      border: 1px solid var(--border-color) !important;
      background: var(--input-bg) !important;
      color: var(--input-text);
      font-size: 16px;
    }
    .ant-select-arrow {
      right: -113px;
      color: var(--input-text);
      font-weight: bold;
      top: 18px;
    }
    .search span,
    .search input {
      background: var(--input-bg);
      border: none;
      padding: 5.1px 38px;
      color: var(--input-text);
      width: 350px;
    }
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

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;

  h3 {
    margin-top: 0;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
  }

  button {
    margin-right: 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const PopupButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Button = styled.button`
  position: relative;
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
  width: 150px;
  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: var(--text-color);
  }
  @media screen and (max-width: 620px) {
    width: 350px;
  }
`;
export const GreenButton = styled.button`
  position: relative;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  width: 160px;
  background: var(--menu-hover-color);
  color: var(--text-color);
  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: var(--text-color);
  }
`;
export const RedButton = styled.button`
  position: relative;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  width: 110px;
  background: var(--menu-hover-color);
  color: var(--text-color);
  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: var(--text-color);
  }
`;

export const AddGalleryModel = styled.div`
  h2 {
    margin: 0;
    font-size: 30px;
    margin-top: 40px;
  }

  p {
    color: var(--reward-color);
  }

  input {
    width: 300px;
    height: 30px;
    border-radius: 6px;
    padding: 22px 10px;
    color: black;
    font-size: 18px;
  }

  button {
    font-size: 16px;
    border: none;
    font-weight: 600;
    padding: 12px 34px;
    border-radius: 8px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    color: white;
  }

  button:hover {
    transform: scale(1.05);
  }
  .red-btn {
    background-color: var(--menu-hover-color);
    color: var(--text-color);
  }
  .green-btn {
    background-color: var(--menu-hover-color);
    color: var(--text-color);
  }
`;

export const MainModalContainer = styled.div`
  background: rgb(0 0 0 / 70%);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  overflow: auto;
  padding: 50px 0;
  justify-content: center;
  align-items: center;
  display: flex;

  @media (max-width: 900px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const MainModalOverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: 0;
`;

export const MainModalContentContainer = styled.div`
  margin: 0 auto;
  position: relative;
  background: #222430;
  width: ${({ width }) => (width ? width : "420px")};
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    min-height: ${({ height }) => (height ? height : "85vh")};
    max-height: calc(100vh - 60px);
  }
`;

export const MainModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  .modal-title {
    display: flex;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #fff;
    text-align: center;
    white-space: pre-wrap;

    .modal-title-icon {
      display: flex;
      align-items: center;
      > svg {
        width: 30px;
        height: 30px;
        color: #aaff26;
        path {
          stroke: #aaff26;
        }
      }
    }

    .modal-title-text {
      display: flex;
      align-items: center;
      margin-left: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      color: #ffffff;
    }
  }

  .modal-close {
    cursor: pointer;
    svg {
      color: #fff;
    }
  }
`;

export const MainModalBodyContainer = styled.div`
  max-height: calc(100vh - 220px);
  overflow-x: hidden;
  padding: 40px 16px;
  @media (min-width: 768px) {
    max-height: calc(100vh - 160px);
  }
`;
