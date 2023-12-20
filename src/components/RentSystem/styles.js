import styled, { css } from "styled-components";

export const RentPageContainer = styled.div`
  overflow: hidden;
  overflow-y: auto;
  .rent-wrapper {
    // min-height: calc(100vh - 337px);

  }
  .grid-container {
    height: 100%;
    width: 100%;
    padding: 2rem 2.5rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns with equal size */
    grid-gap: 8rem; /* Gap between grid items */
    position: relative;
  }

  .grid-item1 {
    flex-glow: 1;
    position: relative;
    max-height: 28vh;
    min-height: 28vh; 
  }
  .rent-wrapper {
    // background: rgb(27,59,63);
    // background-image: radial-gradient(ellipse at  right, rgba(27,59,63,1) 0%, rgba(17,26,28,0) 60%);
//   radial-gradient(ellipse at top left, rgba(27,59,63,1) 0%, rgba(17,26,28,0) 30%);
  background-repeat: no-repeat;

  }

  .rounded-xl {
    border-radius: 0.75rem;
  }
  .w-full {
    width: 100%;
  }
  .min-h {
    min-height: 200px;
  }

  .rounded-image {
    width: 8rem !important;
    height: 8rem;
    border: 5px solid rgba(0, 0, 0, 0.6) !important;
    border-radius: 9999px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 64px;
    // top: 155px;
    bottom: -44px;
    width: 100%;
  }

  @media (min-width: 300px) and (max-width: 767px){
   
    .class-1{
        margin: 0 10px;
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 4px;
      }
      .class-3a{
        display: flex;
       justify-content: flex-start;
        gap : 4;
        width : 100% !important;
    }
    
  }
  @media (min-width: 300px) and (max-width: 800px){
   
      .mx-10 {
        margin-left: 1.5rem !important;
        margin-right: 1.5rem !important;
    }
  }

//   @media (min-width: 450px) and (max-width: 700px) {
//     .rounded-image {
//         left: 34px;
//         bottom: -36px;
//         width: 6rem !important;
//         height: 6rem;
//         border: 3px solid rgba(0, 0, 0, 0.6) !important;
//     } 
// }
  @media (min-width: 450px) and (max-width: 600px) {
    .rounded-image {
        left: 28px;
        width: 6rem !important;
        height: 6rem;
        border: 3px solid rgba(0, 0, 0, 0.6) !important;
    } 
}
  @media (min-width: 300px) and (max-width: 450px) {
    .rounded-image {
        left: 34px;
        width: 6rem !important;
        height: 6rem;
        border: 3px solid rgba(0, 0, 0, 0.6) !important;
    } 
    // .grid-item1 {
    //     max-height: 30vh 
    //   }
      .grid-container {
        padding: 1rem 1rem;
        margin-bottom: 0;
    height: 100%;
      }
      .class-1{
        margin: 0 10px;
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 4px;
      }
      .class-2{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width:100%;
        gap: 4px;
      }
     
    .bg-bar{
    height: 100% !important;
    margin-top: 12px !important
    }
    .class-2 .ant-select {
        margin-bottom: 0px !important ;
      }
}

  .text-heading {
    font-size: 36px;
    font-weight: 700;
    line-height: 40px;
    text-decoration: none solid rga(255, 255, 255);
    word-spacing: 0px;
    color: var(--text-color);
  }
  .text-desc {
    font-size: 1.125rem;
    line-height: 1.75rem;
    // text-decoration: none solid rgb(141, 139, 155);
    color: var(--text-color);
  }
  .text-desc-bold {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: var(--text-color);
  }
  .duration-300 {
    transition-duration: 0.3s;
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
  .text-light-0,
  .text-white {
    --tw-text-opacity: 1;
    color: var(--text-color);
  }
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  a {
    color: #177ddc;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  .comp-2 {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }
  .class-1{
    margin: 0 10px;
    margin-top: 22px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }

  
  .class-2{
      display: flex;
      width:100%;
      gap: 4px;
    }
    .class-3{
        display: flex;
        border: 1px solid var(--border-color);
        background-color: var(--input-bg) !important;
        border-radius: 0.5rem;
  height: 38px

      }
      
    .class-3a{
        display: flex;
        align-items: center;
        gap : 4;
        width : 400px
    }

.class-4{
    display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--rounded-lg);
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: .5rem;
        padding-top: 2px;
        padding-bottom: 2px;
  font-size: 0.875rem;
    line-height: 2px;
  color: var(--text-color);
  transition: color var(--transition-colors);
  cursor: pointer;
  hover: hover:text-primary;
  height: 40px
}

.class-4a::hover{
    color:#177ddc;
}
.text-base {
    font-size: 1rem;
    line-height: 1.5rem;
}
// ant d select
.class-2 .ant-select {
    width: 250px !important;
  }
  .class-2  .ant-select-selection-item {
    background: var(--input-bg);
  }
  .class-2  .ant-select-selection-search {
    color: var(--input-bg) !important;
  }
  .class-2  .ant-select-selector {
    color: black !important;
    // padding: 0 120px !important;
    outline: none !important;
    border: 1px solid var(--border-color) !important;
    background: var(--input-bg) !important;
    color: var(--input-text);
    font-size: 16px;
    height: 38px !important;
    border-radius: 10px;
  }
  .ant-select-selection-placeholder {
    color: var(--input-text);
    // font-weight: bold;
    // background: rgba(0, 0, 0, 0.25);
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
    width: 100% !important;
    // background: var(--input-bg) !important;
  }

  .ant-select-item-option-content {
    color: var(--input-text);
  }

.class-5 {
    position: relative;
    z-index: 30;
  }
  .class-6{
    border-color: hsla(0,4%,86%,.2);
    border-radius: 0.5rem;
    display: flex
  }

// ----BAR
.relative {
    position: relative;
  }
  
  .z-0 {
    z-index: 0;
  }
  
  .mx-10 {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
}
  
  .mt-10 {
    margin-top: 10px;
  }
  
  .flex {
    display: flex;
  }
  
  .items-center {
    align-items: center;
  }
  
  .gap-4 {
    gap: 4px;
  }
  
  .overflow-hidden {
    overflow: hidden;
  }
  
  .rounded-xl {
    border-radius: 1rem;
  }
  
  .px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
}
  
.py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
  
  .text-xl {
    font-size: 1.25rem; /* Adjust as needed */
  }
  


  .css-1d1w0wk {
    background: rgb(73, 203, 222) !important;
}   

  .blur-4xl {
    filter: blur(4xl);
  }
  
  .absolute {
    position: absolute;
  }
  
  .left-10 {
    left: 10px;
  }
  
  .-z-10 {
    z-index: -10;
  }
  
  .h-[180px] {
    height: 180px;
  }
  
  .w-[30%] {
    width: 30%;
  }
  
  .-rotate-[60deg] {
    transform: rotate(-60deg);
  }
  .rotate-[60deg] {
    transform: rotate(-60deg);
  }
  
  .bg-glow {
    background-color: var(--glow);
  }
  
  .blur-[190px] {
    backdrop-filter: blur(190px);
  }
  .blur-[150px] {
    backdrop-filter: blur(150px);
  }
  
  .right-40 {
    right: 10rem;
}
.text-light-0, .text-white {
    --tw-text-opacity: 1;
    color: var(--text-color);
}
.flex-col {
    flex-direction: column;
}
.flex {
    display: flex;
    
}
.av{
    padding: 0 10px
}
.text-medium-3 {
    --tw-text-opacity: 1;
    color: rgb(141, 130, 155);
    font-size: 20px;
    line-height:28px;
    font-weight: 700
}
.text-light-0, .text-white {
    --tw-text-opacity: 1;
    color:var(--text-color);
}
.bg-bar{
    background: rgb(17,26,28);
background: radial-gradient(circle, rgba(17,26,28,0.8380602240896359) 0%, rgba(26,55,59,1) 100%);

height: 100px
}
// COMP 5
.px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
}
.mt-12 {
    margin-top: 3rem;
}
.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.class-7 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }
  
  @media (min-width: 768px) {
    .class-7 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
//     .rounded-image {
//         width: 8rem !important;
//         height: 8rem;
//         left: 40px;
//         top: 115px;
//         width: 100%;
//       }
    
  }

  @media (max-width: 1024px) {
    .grid-container {
        grid-gap: 4rem; /* Gap between grid items */
        display: flex;
        flex-direction: column
      }
  }
  @media (min-width: 1024px) {
    .class-7 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  @media (min-width: 1280px) {
    .class-7 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  
  @media (min-width: 1536px) {
    .class-7 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  .class-8{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 1rem;
    border: 1px solid  hsla(0,4%,86%,.2);
    border-color: hsla(0,4%,86%,.2);
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;

  }

  .class-9 {
    aspect-ratio: 1/1;
    width: 100%;
    overflow: hidden;
    border-radius: 0.75rem;
  }
  
  .class-10 {
    position: relative;
    min-width: 100%;
    border-radius: 0.75rem;
    background-color: rgba(11,11,11,1);
  }

  .class-11{
    position: absolute;
    top: 26px;
    right: 20px;
    z-index: 20;
    display: flex;
    height: 1.75rem;
    width: 1.75rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    background-color: rgb(22,22,22);
    color: white;
  }
  
  .class-11:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .class-12{
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .class-13{
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 20;
  }

  .class-14 {
    cursor: pointer;
    border-radius: var(--rounded-md);
    color: var(--text-color);
    position: absolute;
    
    bottom: 10px;
    right: 8px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .class-15{
    display: flex;
    align-items: center;
    gap: 1px;
    transform: scale(1.5);
    border-radius: 50%;
    background-color: white ;
    color: rgb(0,0,0);
  }

  .class-16{
    aspect-ratio: 1/1;
    object-fit: contain;
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    vertical-align: middle;
    border-style: none;
    border-radius: 0.75rem;
    object-fit: contain;
  }

  .class-17 {
    font-size: 1.125rem; /* Adjust as needed */
    color: white;
    padding-top: 12px
  }
  .class-18 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  .class-19 {
    display: flex;
    width: 100%;
    cursor: pointer;
    align-items: center;

    gap: 8px;
    font-weight: bold;
    line-height : 28px

  }
  .class-20 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-size: 1.125rem; /* Adjust as needed */
    line-height : 28px;
    color: var(--text-color)
  }
  .class-21{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem; /* Adjust as needed */
    color: rgb(177,175,187);
  }

  .class-22 {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .class-23{
    display: inline-block;
    cursor: pointer;
  }

  .class-24 {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem; /* Adjust as needed */
  }
  .class-25{
    display: flex;
    flex-direction: column;
    color: var(--text-light-2);
  }
  .class-26{
    float: left;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;

  }

  .class-27{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;
    border-radius: .75rem;
    border: 0;
    color: rgb(34,34,34);
    border-color: hsla(0,4%,86%,.2);
    background-color: rgba(255, 255, 255, 0.3);
    padding: 3px;
    transition: all;
    display: inline-block;
    flex: none;
    padding: 10px 16px;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    opacity: 0.5;
  }
  .class-28 {
    display: flex;
    align-items: center;
    color: var(--text-color);
    padding: 2px;
    font-size: 1rem; /* Adjust as needed */
    border-radius: 0.5rem;
    gap: 2px;
  }
  
  .class-28:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  // modal
  .ant-modal-content {
    background-color: #000000 !important;
  }
  .blur-overlay {
    
    backdrop-filter: blur(8px); /* Adjust the blur strength as needed */
    pointer-events: none; /* Allow interaction with elements underneath the overlay */
  }

`;

export const ModalContainer = styled.div`
  .ant-tooltip-inner {
    background-color: white !important;
  }

  .css-1pxskp3 {
    box-shadow: rgba(255, 255, 255, 0.15) 0px 0px 48px;
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
  .rounded-xl {
    border-radius: 0.75rem;
  }
  .max-w-98vw {
    max-width: 98vw;
  }
  .w-560px {
    width: 560px;
  }
  .h-fit {
    height: -moz-fit-content;
    height: fit-content;
  }
  .my-10vh {
    // margin-top: 10vh;
    // margin-bottom: 10vh;
  }

  .p-8 {
    padding: 2rem;
  }
  .bg-dark-6 {
    --tw-bg-opacity: 1;
    background-color: var(--bg-dark) !important;
  }
  .rounded-lg {
    border-radius: 0.5rem;
  }

  .text-light-0,
  .text-white {
    --tw-text-opacity: 1;
    color: var(--text-color);
  }
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--text-color);
  }
  .text-center {
    text-align: center;
  }

  .text-medium-4 {
    --tw-text-opacity: 1;
    color: rgb(109 108 124);
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }
  .dcSOna {
    min-height: 55vh !important;
    max-height: calc(100vh - 60px);
  }
  .pb-6 {
    padding-bottom: 1.5rem;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .gap-4 {
    gap: 1rem;
  }
  .justify-center {
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
  .flex {
    display: flex;
  }
  .lgw-1 {
    width: 50%;
  }
  .w-3-4 {
    width: 50%;
  }
  .relative {
    position: relative;
  }
  .rounded-lg {
    border-radius: 0.5rem;
  }
  .w-3-4 img {
    max-width: 100%;
    height: auto;
    display: block;
    vertical-align: middle;
    border-style: none;
  }
  // icon
  .text-light-0,
  .text-white {
    --tw-text-opacity: 1;
    color: var(--text-color);
  }

  .rounded-md {
    border-radius: 0.375rem;
  }
  .gap-3 {
    gap: 0.75rem;
  }
  .items-center {
    align-items: center;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .z-20 {
    z-index: 20;
  }
  .top-3 {
    top: 0.75rem;
  }
  .right-3 {
    right: 0.75rem;
  }
  .absolute {
    position: absolute;
  }

  .text-dark-6 {
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, 1);
  }
  .bg-light-0 {
    --tw-bg-opacity: 1;
    background-color: var(--text-color);
  }
  .rounded-full {
    border-radius: 9999px;
  }
  .gap-1 {
    gap: 0.25rem;
  }

  .css-kpv81v {
    backdrop-filter: blur(24px);
  }
  .text-secondary {
    --tw-text-opacity: 1;
    color: rgb(126 255 232);
  }
  .py-10px {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .bg-opacity-60 {
    --tw-bg-opacity: 0.6;
  }
  .bg-dark-66 {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .border-border {
    border: hsla(0, 4%, 86%, 0.2);
  }
  .border,
  .border-1px {
    border-width: 1px;
  }
  .rounded-xl {
    border-radius: 0.75rem;
  }
  .translate-y-1/2 {
    --tw-translate-y: 50%;
  }
  .-translate-x-1/2 {
    --tw-translate-x: -50%;
  }
  .left-12 {
    left: 70px;
  }
  .bottom-0 {
    bottom: -10px;
    padding: 10px 14px;
  }
  .-translate-x-1/2,
  .translate-y-1/2 {
    transform: translate(-50%, 50%) rotate(0) skewX(0) skewY(0) scaleX(1)
      scaleY(1);
  }
  .text-medium-3 {
    --tw-text-opacity: 1;
    color: rgb(141 139 155);
  }
  .text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .mb-8 {
    margin-bottom: 2rem;
  }
  .justify-between {
    justify-content: space-between;
  }
  .gap-4 {
    gap: 1rem;
  }
  .gap-1 {
    gap: 0.25rem;
  }
  .border-border {
    border-color: hsla(0, 4%, 86%, 0.2);
  }
  .border-t,
  .border-t-[1px] {
    border-top-width: 1px;
  }
  .pt-4 {
    padding-top: 1rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .font-medium {
    font-weight: 500;
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .text-medium-3 {
    --tw-text-opacity: 1;
    color: rgb(141 139 155);
  }
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .items-end {
    align-items: flex-end;
  }
  .text-right {
    text-align: right;
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
  .bg-primary {
    --tw-bg-opacity: 1;
    background: var(--menu-hover-color);
    color: var(--text-color);
  }
  .gap-5 {
    gap: 1.25rem;
  }
  .h-12 {
    height: 3rem;
  }

  @media only screen and (min-width: 1600px) {
    .w-3-4 {
      width: 60% !important;
    }
    .left-12 {
      left: 95px;
    }
    .bottom-0 {
      bottom: -10px;
      padding: 10px 14px;
    }
  }
  @media only screen and (min-width: 2000px) {
    .w-3-4 {
      width: 75% !important;
    }
    .left-12 {
      left: 104px;
    }
    .bottom-0 {
      bottom: -10px;
      padding: 12px 40px;
    }
  }

  @media only screen and (max-width: 380px) {
    .w-3-4 {
      width: 75% !important;
    }
    .left-12 {
      left: 60px !important;
    }
    .bottom-0 {
      bottom: -23px !important ;
      padding: 12px 10px;
    }
  }
  @media only screen and (min-width: 380px) and (max-width: 600px) {
    .w-3-4 {
      width: 75% !important;
    }
    .left-12 {
      left: 80px !important;
    }
    .bottom-0 {
      bottom: -23px !important ;
      padding: 12px 10px;
    }
  }
`;
