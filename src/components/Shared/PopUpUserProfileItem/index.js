import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LinkItem, PopUpUserProfileItemContainer } from "./styles";
import NotificationUserImage from "../../../assets/images/notification-user-sample.png";
import { useCustomWallet } from "../../../contexts/WalletContext";
import { useTranslation } from "react-i18next";

const PopUpUserProfileItem = (props) => {
  let navigate = useNavigate();
  const { handleLogOut } = useAuth();
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { wallet } = useCustomWallet();

  return (
    <PopUpUserProfileItemContainer>
      <div className="popup-title">
        <div className="user-image">
          {auth.avatarURI && auth.avatarURI !== "" ? (
            <>
              <img src={auth.avatarURI} alt="" />
            </>
          ) : (
            <>
              <img src={NotificationUserImage} alt="user-img" />
            </>
          )}
        </div>
        <div className="user-detail">
          <div className="user-name">
            {auth.loggedUserName != "" ? auth.loggedUserName : "ON1 Force"}
          </div>
          <div className="user-name">
            {wallet.address
              ? wallet.address.slice(0, 6) + "..." + wallet.address.slice(-4)
              : "0x0"}
          </div>
        </div>
      </div>
      <LinkItem onClick={() => navigate("/profile/me")}>
        {t("Profile")}
      </LinkItem>
      {/* <LinkItem onClick={() => navigate("/gallery")}>
        {t("My Gallery")}
      </LinkItem> */}
      {/* <LinkItem>Favorites</LinkItem> */}
      <LinkItem onClick={() => navigate("/my-collections")}>
        {t("My Collections")}
      </LinkItem>
      <LinkItem onClick={() => navigate("/settings")}>{t("Settings")}</LinkItem>
      <LinkItem onClick={handleLogOut}>{t("Log Out")}</LinkItem>
    </PopUpUserProfileItemContainer>
  );
};

export default PopUpUserProfileItem;
