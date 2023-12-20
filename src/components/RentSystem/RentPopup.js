import React from "react";
import {
  MainModalContainer,
  MainModalOverlayContainer,
  MainModalContentContainer,
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
        width={"560px"}
        // minHeight={"calc(100vh - 150px)"}
        height={"400px"}
      >
        <div
          style={{
            // maxHeight: "calc(100vh - 220px)",
            overflowX: "hidden",
            // padding: "16px 12px",
            // maxHeight: "calc(100vh - 160px)",
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
