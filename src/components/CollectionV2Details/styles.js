import styled, { css } from "styled-components";

export const CollectionMain = styled.div`
  .star-svg {
    color: var(--text-color);
  }
  .share-link {
    padding: 1px 24px !important;
    width: 300px !important;
    line-height: 12px;
  }
  .collection-details-area {
    overflow: hidden;
    position: relative;
    padding: 100px 0 80px;
  }
  .collection-area-bg {
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

  .collection-area-bg img {
    width: 100%;
  }

  .tab-content .ant-tabs-nav:before {
    border-bottom: none;
  }

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
    color: var(--text-color);
  }
  .collection-area-header span.ant-input-affix-wrapper input::placeholder {
    color: var(--text-color);
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
  // unselected view grid/list
  .inactive-view-r {
    border-right: 1px solid var(--border-color);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .inactive-view-l {
    border-left: 1px solid var(--border-color);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  // selected view grid/list
  .active-view-r {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    background: var(--menu-hover-color) !important;
    color: #0ce467;
  }
  .active-view-l {
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    background: var(--menu-hover-color) !important;
    color: #0ce467;
  }
  .collection-area-header ul li svg {
    vertical-align: middle;
    height: auto;
    width: 25px;
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
    border-top: 0px solid var(--border-color);
    border-bottom: 0px solid var(--border-color);
    padding: 6px 0;
  }

  .collection-area-body table tbody td span {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .collection-area-body table tbody td span svg {
    height: auto;
    width: 14px;
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
    // max-width: 150px;
  }
  .collection-area-body tbody tr td img {
    height: auto;
    width: 40px;
    border-radius: 8px;
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
  .collection-details-area-inner {
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr;
    margin: 0 30px;
    align-items: flex-start;
  }

  .collection-details-avatar {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .collection-details-avatar img {
    border-radius: 50px;
    width: 100px;
    height: 100px;
  }

  .collection-details-avatar h2 svg {
    height: auto;
    width: 25px;
    color: var(--text-color);
    vertical-align: middle;
    margin-left: 8px;
    cursor: pointer;
  }

  .collection-details-avatar h2 {
    color: var(--text-color);
    font-weight: 700;
    font-size: 40px;
  }

  .collection-details-avatar h2 strong {
    display: block;
    font-size: 20px;
  }

  .collection-details-avatar h2 svg:first-child {
    color: #4589ff;
  }

  .collection-details-avatar h2 strong span {
    color: #7f818a;
    font-weight: 400;
  }

  .collection-details-left p {
    color: #8a8c95;
    font-size: 16px;
    margin: 10px 0;
    line-height: 1.5;
  }

  .collection-avatar-list {
    display: flex;
    gap: 50px;
    align-items: center;
    margin-top: 30px;
  }

  .collection-avatar-item svg {
    height: auto;
    width: 18px;
  }

  .collection-avatar-item strong {
    display: flex;
    color: var(--text-color);
    gap: 10px;
    font-size: 30px;
  }

  .collection-avatar-item span {
    display: flex;
    color: #8a8c95;
    // margin-top: 5px;
    // display: block;
    gap: 6px;
    font-size: 14px;
    line-height: 20px;
    justify-content: center;
    align-items: center;
    text-decoration: none solid rgba(138, 140, 149);
  }

  .collection-avatar-item span.red {
    color: #fa4d56 !important;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.22px;
  }

  .collection-area-body {
    display: flex;
    gap: 30px;
    margin-top: 20px;
    padding-bottom: 100px;
  }

  .collection-filter-buy-now {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }

  .collection-filter-buy-now h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 16px;
  }

  .collection-filter-buy-now button .ant-switch-inner {
    background: var(--menu-hover-color);
  }

  .collection-filter-buy-now button.ant-switch-checked .ant-switch-inner {
    background: #109b48;
  }

  .collection-filter-price-range h3 {
    font-size: 12px;
    color: var(--text-color);
    font-weight: 400;
    margin: 15px 0 10px;
  }

  .collection-filter-price-range-input {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .collection-filter-price-range-input .ant-input-number {
    width: 100%;
    background: var(--input-bg);
    border: 0px;
    padding: 5px;
    color: var(--text-color);
  }

  .collection-filter-price-range-input .ant-input-number input::placeholder {
    color: #676e75;
  }

  .collection-details-filter {
    min-width: 370px;
    max-width: 370px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 20px;
    height: 100vh;
    padding-bottom: 50px;
  }
  .collection-details-items-list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .collection-filter-price-range .ant-input-number-handler-wrap {
    display: none !important;
  }

  .collection-filter-price-range .ant-input-number-handler svg {
    color: var(--text-color);
  }

  .collection-filter-price-range-input input {
    color: var(--text-color) !important;
  }

  .collection-filter-price-range {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .collection-details-filter .ant-collapse-item {
    border-color: transparent;
    margin-bottom: 20px;
  }

  .collection-details-filter .ant-collapse-header-text {
    color: var(--text-color);
  }

  .collection-details-filter svg {
    color: var(--text-color);
  }
  .collection-details-filter .ant-collapse {
    border: none;
  }

  .collection-details-filter .ant-collapse-header {
    padding: 0;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .collection-details-filter .anticon-search svg,
  .collection-details-filter .ant-collapse-arrow svg {
    color: #8a8c95;
  }

  .collection-details-filter .ant-collapse-content {
    background: transparent;
    border-color: var(--border-color);
  }

  .collection-details-filter .ant-collapse-content-box {
    padding: 0;
    margin-top: 20px;
  }
  .collection-panel-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-color);
    margin: 20px 0;
  }

  .collection-panel-list-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .collection-panel-list-left .ant-checkbox-inner {
    background: transparent;
    border-color: var(--border-color);
    border-radius: 0;
    width: 20px;
    height: 20px;
  }

  .collection-panel-list-left .ant-checkbox-checked .ant-checkbox-inner {
    background: var(--text-color);
  }

  .collection-panel-list-left .ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: var(--border-color) !important;
  }

  .collection-panel-list-left strong span {
    display: block;
    font-weight: 400;
    font-size: 12px;
    color: #7c7d86;
  }

  .collection-panel-list-left strong {
    color: var(--reward-color);
    font-weight: 400;
  }

  .collection-panel-list-right strong {
    color: var(--reward-color);
    font-weight: 400;
    text-align: right;
    display: block;
  }

  .collection-panel-list-right strong span {
    display: block;
    font-size: 12px;
    font-weight: 300;
  }
  .collection-details-item-img {
    position: relative;
  }

  .collection-details-item-img img {
    width: 100%;
    height: 230px;
  }

  .collection-details-item-img span {
    position: absolute;
    top: 10px;
    left: 8px;
  }

  .collection-details-item-img strong {
    position: absolute;
    right: 10px;
    top: 10px;
    display: grid;
    gap: 10px;
    display: none;
  }
  .collection-details-item:hover .collection-details-item-img strong {
    display: grid;
  }
  .collection-details-item-img span svg {
    height: auto;
    width: 35px;
    color: #fff;
    background: var(--token-coin-bg);
    border-radius: 50px;
    padding: 5px;
  }

  .collection-details-item-img strong button {
    background: var(--token-coin-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    color: #fff;
    cursor: pointer;
  }
  .collection-details-item h3 {
    font-size: 14px;
    color: #c6c6cb;
    margin: 15px 15px 10px;
  }

  .collection-details-item {
    border: 1px solid var(--border-color);
    border-radius: 10px;
    position: relative;
    padding-bottom: 20px;
    height: 380px;
    cursor: pointer;
  }

  .collection-details-item h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px 30px;
  }

  .collection-details-item h4 span svg {
    height: auto;
    width: 10px;
  }

  .collection-details-item h4 span {
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .collection-details-item h4 strong svg {
    height: auto;
    width: 15px;
  }

  .collection-details-item h4 strong {
    display: flex;
    align-items: center;
    gap: 3px;
    color: #05cd59;
    font-weight: 400;
    font-size: 12px;
    border: 1px solid #0c5c2c;
    border-radius: 8px;
    padding: 3px 10px;
  }

  .collection-details-item h6 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #777a82;
    margin: 0 15px;
  }

  .collection-details-item h6 svg {
    height: auto;
    width: 12px;
  }

  .collection-details-item h6 strong {
    color: var(--text-color);
  }

  .collection-details-item a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    font-weight: 700;
    background: var(--tab-hover);
    color: #0ce467;
    position: absolute;
    width: 100%;
    bottom: 0;
    display: none;
  }
  .collection-details-item:hover a {
    display: flex;
  }
  .collection-details-item a svg {
    height: auto;
    width: 20px;
  }
  .collection-details-right {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
  }

  .collection-details-right a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 10px;
    border-radius: 8px;
    text-decoration: none;
  }

  .collection-details-right a svg {
    height: auto;
    width: 22px;
  }

  .collection-details-right a:hover {
    background: var(--menu-hover-color);
  }

  @media screen and (max-width: 1300px) {
    .collection-details-items-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media screen and (max-width: 991px) {
    .collection-details-right {
      justify-content: flex-start;
      margin: 20px 0;
    }
    .collection-details-filter {
      display: none;
    }
    .collection-area-header .ant-dropdown-trigger,
    .collection-area-header ul {
      display: none;
    }
    .collection-details-items-list {
      grid-template-columns: 1fr 1fr;
    }
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

    .collection-area-bg {
      position: unset;
      opacity: unset;
      transform: unset;
      filter: unset;
      height: 160px;
      -webkit-mask: unset;
    }

    .collection-details-area {
      padding: 0;
      overflow: unset;
    }

    .collection-area-bg img {
      height: 150px;
      object-fit: cover;
    }

    .collection-details-avatar {
      display: grid;
      gap: 0;
      margin-top: -60px;
    }

    .collection-details-avatar h2 {
      font-size: 25px;
      margin-top: 40px;
    }

    .collection-details-left p {
    }

    .collection-avatar-list {
      flex-wrap: wrap;
      gap: 30px;
    }

    .collection-details-area-inner {
      grid-template-columns: 1fr;
    }

    .collection-avatar-item strong {
      font-size: 19px;
      align-items: center;
    }

    .collection-avatar-item span {
      font-size: 14px;
      margin: 0;
    }

    .collection-avatar-item svg {
      width: 10px;
    }
  }

  // no nft
  // .css-1tlxypu {
  //   width: 50vw;
  //   display: flex;
  //   flex-direction: column;
  //   -webkit-box-align: center;
  //   align-items: center;
  //   -webkit-box-pack: center;
  //   justify-content: center;
  //   padding-top: 2rem;
  //   padding-bottom: 2rem;
  // }
  // .css-1tlxypu svg {
  //   width: 120px;
  // }
  // .css-qt372v {
  //   color: var(--text-color);
  //   font-size: 1rem;
  //   line-height: 1.5rem;
  //   font-weight: 700;
  // }
  // LIST VIEW
  table {
    font-variant-numeric: initial;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: gray;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    border-bottom: 1px solid #8a8c95;
    margin-bottom: 20px;
  }
  tr {
    display: table-row;
    vertical-align: center;
    border-color: inherit;
  }
  th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
  }
  tbody {
    display: table-row-group;
    vertical-align: center;
    border-color: inherit;
  }
  .css-1tskjsp th {
    padding: var(--lr-space-2);
    text-transform: none;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--lr-colors-text-02);
    font-weight: 400;
  }
  .css-7gz4p9 {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    text-align: start;
    padding-inline-start: 1rem;
    padding-inline-end: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1rem;
    font-size: 0.75rem;
    color: #8a8c95;
    border-bottom-width: ;
    border-bottom-style: ;
    border-color: #2a3136;
  }
  .css-bwzk3j {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1rem;
    font-size: 0.75rem;
    color: #8a8c95;
    border-bottom-width: ;
    border-bottom-style: ;
    border-color: #2a3136;
  }
  .css-xijxvx {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1rem;
    font-size: 0.75rem;
    color: #8a8c95;
    border-bottom-width: ;
    border-bottom-style: ;
    border-color: #2a3136;
  }
  .css-3ifijw {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1rem;
    font-size: 0.75rem;
    color: #8a8c95;
    border-bottom-width: ;
    border-bottom-style: ;
    border-color: #2a3136;
  }
  .css-3g3mnc {
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    line-height: 1.25rem;
    border-bottom-width: ;
    border-bottom-style: ;
    max-width: 300px;
    border-color: #2a3136;
    padding-left: 12px !important;
  }

  .css-84zodg {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .css-1n9alrw {
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }
  .table-span: {
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 0px;
    position: absolute;
    inset: 0px;
  }
  .table-span img {
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
  .table-image {
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
  .css-1q6zaao {
    background: var(--dark-bg);
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .css-5umux0 td {
    padding-inline-start: 0.5rem;
    padding-inline-end: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 0;
  }
  .css-150cn8k {
    text-align: start;
    padding-inline-start: 0.6rem;
    padding-inline-end: 0.6rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    line-height: 1.25rem;
    border-bottom-width: ;
    border-bottom-style: ;
    border-color: #2a3136;
    padding-left: 16px !important;
  }
  .css-1yiidbn {
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
    color: #fff;
    height: 2rem;
    min-width: 2rem;
    font-size: 0.875rem;
    padding-inline-start: 0.5rem;
    padding-inline-end: 0.5rem;
    pointer-events: painted;
    visibility: visible;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0);
    padding: 0px;
  }
  .css-1yiidbn svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  .css-1626ime {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: #8a8c95;
    vertical-align: middle;
    fill: none;
  }
  .chakra-text {
    color: #f3f3f8;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    padding: 0 10px;
  }
  .css-1m0h5h6 {
    display: inline-flex;
    vertical-align: top;
    -webkit-box-align: center;
    align-items: center;
    max-width: 100%;
    font-weight: 600;
    line-height: 1.2;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border-radius: 9999px;
    transition: background-color 0.2s ease-out 0s;
    background: rgba(0, 0, 0, 0);
    min-height: 0.5rem;
    min-width: 0.5rem;
    font-size: 0.7rem;
    padding-inline: 6px;
    padding-top: 0px;
    padding-bottom: 0px;
    --badge-color: #697077;
    color: rgb(173, 173, 179);
    box-shadow: none;
    border-width: 2.5px;
    border-style: solid;
    border-image: initial;
    border-color: #0c5c2c;
    cursor: default;
    width: 80px;
  }
  .css-1gpu3vi {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 3em;
    flex-shrink: 0;
    vertical-align: top;
    margin-inline-end: 0.5rem;
    margin-right: 0.25rem;
    color: #04cd58;
    font-weight: 700;
  }
  .css-1f36937 {
    line-height: 1.6;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    --chakra-line-clamp: 1;
    color: #04cd58;
    font-weight: 700;
  }
  .css-1rs56qv {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: currentcolor;
    vertical-align: middle;
  }
  .css-1vy5fhu {
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
    transition-duration: 200ms;
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
    color: var(--text-color);
    height: 2rem;
    min-width: 2rem;
    font-size: 0.875rem;
    padding-inline-start: 0.5rem;
    padding-inline-end: 0.5rem;
    border-top-color: #2a3136;
    border-left-color: #2a3136;
    border-right-color: #2a3136;
    border-bottom-color: #2a3136;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    margin-left: 8px !important;
    cursor: pointer;
  }
  .css-b527o0 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    max-width: 150px;
  }
  .css-14yq6wh {
    width: 10px;
    height: 20px;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: currentcolor;
    vertical-align: middle;
    margin-right: 0.25rem;
  }
  .css-dzui3e {
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .css-lcxwm8 {
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    // padding-top: 1rem;
    // padding-bottom: 1rem;
    padding-left: 24px !important;
    line-height: 1.25rem;
    border-bottom-width: ;
    border-bottom-style: ;
    // display: none;
    border-color: #2a3136;
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
  .css-n17w0h {
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
  }
  .css-182pcal {
    transition-property: var(--lr-transition-property-common);
    transition-duration: 0.1s;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
    outline: transparent solid 2px;
    outline-offset: 2px;
    color: unset;
    pointer-events: all;
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
  .css-110hi9e {
    text-align: start;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    line-height: 1.25rem;
    border-bottom-width: ;
    border-bottom-style: ;
    // display: none;
    border-color: #2a3136;
    padding-left: 20px !important ;
  }
  .css-1psr8q8 {
    color: #8a8c95;
    font-size: 0.875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--chakra-line-clamp);
    --chakra-line-clamp: 1;
    word-break: break-all;
  }
  .css-15xd263 {
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
    transition-duration: 0.2s;
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
    color: var(--text-color);
    height: 2rem;
    min-width: 2rem;
    font-size: 0.875rem;
    padding-inline-start: 0.5rem;
    padding-inline-end: 0.5rem;
    outline: transparent solid 2px;
    border-radius: 8px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0);
    padding: 0px;
  }
  .css-onkibi {
    width: 1em;
    height: 1em;
    display: inline-block;
    line-height: 1em;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    color: var(--text-color);
    vertical-align: middle;
  }

  .checkbox-wrapper-23 *,
  .checkbox-wrapper-23 *:after,
  .checkbox-wrapper-23 *:before {
    box-sizing: border-box;
  }

  .checkbox-wrapper-23 input {
    position: absolute;
    opacity: 0;
  }

  .checkbox-wrapper-23 input:checked + label svg path {
    stroke-dashoffset: 0;
  }

  .checkbox-wrapper-23 input:focus + label {
    transform: scale(1.03);
  }

  .checkbox-wrapper-23 input + label {
    display: block;
    border: 2px solid var(--text-color);
    width: 18px;
    height: 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .checkbox-wrapper-23 input + label:active {
    transform: scale(1.05);
    border-radius: 12px;
  }

  .checkbox-wrapper-23 input + label svg {
    pointer-events: none;
    padding: 5%;
  }

  .checkbox-wrapper-23 input + label svg path {
    fill: none;
    stroke: var(--text-color);
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 101;
    transition: all 250ms cubic-bezier(1, 0, 0.37, 0.91);
  }

  // popup
  .css-12g7zl4 {
    padding-inline-start: 0.75rem;
    padding-inline-end: 0.75rem;
    color: #121619;
    padding: 0px;
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
    width: 220px !important;
    text-align: center;
    background: #f3f3f8;
    border-color: inherit;
    border-radius: 12px;
    padding: 1rem;
  }
`;

export const LoadingScreen = styled.div`
  position: absolute;
  left: 20vw;
  width: 100%;
  height: 100%;
  z-index: 222222px;
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
`;
