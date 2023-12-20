import React from "react";
import {
  MainModalContainer,
  MainModalOverlayContainer,
  MainModalContentContainer,
  MainModalHeaderContainer,
  MainModalBodyContainer,
} from "../Shared/MainModal/styles";
// import FaUserCircle from "@meronex/icons/fa/FaUserCircle";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

const MainModal = (props) => {
  const {
    title,
    icon = <MdPhotoLibrary />,
    width = "1200px",
    height = "88vh",
    handleClose,
    children,
  } = props;

  return (
    <MainModalContainer>
      <MainModalOverlayContainer
        onClick={handleClose}
      ></MainModalOverlayContainer>
      <MainModalContentContainer
        width={"calc(100vw - 300px)"}
        minHeight={"calc(100vh - 150px)"}
        // height={height}
      >
        <MainModalHeaderContainer>
          <div
            className="modal-title"
            style={{
              //   width: "1500px !important",
              display: "flex",
              justifyContent: "space-between !important",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--text-color)",
              }}
              className="modal-title-text"
            >
              {title}
            </div>
            <div position="relative">
              <svg
                style={{
                  position: "absolute",
                  left: "150px",
                  top: "26px",
                  color: "#646466",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                // class="input_icon__NMIum"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                //   className="my-input"
                id="prompt"
                name="prompt"
                autocomplete="off"
                placeholder="Search"
                autofocus
                style={{
                  height: "30px",
                  width: "250px",
                  borderRadius: "4px",
                  border: "1px solid #3c3f44",
                  background: "var(--dark-bg)",
                  outline: "none",
                  color: "var(--text-color)",
                  padding: "3px 24px",
                  marginLeft: "14px",
                }}
                spellcheck="false"
              ></input>
            </div>
          </div>
          <div className="modal-close" onClick={handleClose}>
            <svg
              width="11"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M.833 10.323a.653.653 0 00.301-.164l4.043-4.043 4.044 4.043a.61.61 0 00.294.164.723.723 0 00.342 0 .627.627 0 00.3-.17.626.626 0 00.171-.302.723.723 0 000-.341.609.609 0 00-.164-.294L6.121 5.173l4.043-4.044a.609.609 0 00.164-.294.738.738 0 000-.345.586.586 0 00-.17-.298.626.626 0 00-.305-.17.722.722 0 00-.342 0 .608.608 0 00-.29.163L5.177 4.23 1.134.185a.652.652 0 00-.3-.164A.753.753 0 00.49.018a.581.581 0 00-.3.174.652.652 0 00-.164.301.722.722 0 000 .342.609.609 0 00.164.294l4.043 4.044L.19 9.216a.634.634 0 00-.168.294.708.708 0 00-.003.345.586.586 0 00.17.297.627.627 0 00.301.171.723.723 0 00.342 0z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </MainModalHeaderContainer>
        <div
          style={{
            maxHeight: "calc(100vh - 220px)",
            overflowX: "hidden",
            padding: "16px 12px",
            maxHeight: "calc(100vh - 160px)",
            //    ` @media (min-width: 768px) {
            //       max-height: calc(100vh - 160px);
            //     }
            //   `
          }}
        >
          {children}
        </div>
      </MainModalContentContainer>
    </MainModalContainer>
  );
};

export default MainModal;
