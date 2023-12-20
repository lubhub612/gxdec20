import React, { useState, useEffect, useCallback } from "react";
import {
  MainContentContainer,
  ProfileSettingsContainer,
  SettingFormContainer,
  SettingBanner,
  SettingForm,
  FormGroup,
  VerificationSection,
  NotificationSection,
  MenuWrapper,
  Tab,
  ProjectInfoWrapper,
  Main,
  ProfileArea,
  Profile,
  ProfileContent,
  MyLink,
  ItemInner,
  ListArea,
  Item,
  ItemContent,
  ExtraInfo,
  FaceId,
  FaceIdInner,
  FaceIdItem,
  MainArea,
  FaceRefItem,
} from "./styles";
import settingCover from "../../../assets/images/setting-banner.png";
import profileLogo from "../../../assets/images/profile-banner2.png";
import FormInputBox from "../../Shared/FormInputBox";
import FileUploader from "../../Shared/FileUploader";
import { ChangeIcon } from "../../Shared/SvgIcons";
import { SettingPageSections } from "./../index";
import ToggleGroupItem from "../../Shared/ToggleGroupItem";
import { Creator } from "./Creator";
import { ProjectInfo } from "../../CreateSignup/ProjectInfo";
import { ProjectTags } from "../../CreateSignup/ProjectTags";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import useToast from "../../../hooks/useToast";
import { useCustomWallet } from "../../../contexts/WalletContext";
import GradientButton from "../../Shared/GradientButton";
import CopyToClipboard from "react-copy-to-clipboard";
import desktopLogo from "../../../assets/images/logo-desktop.png";
import { useTranslation } from "react-i18next";

export const MainContent = (props) => {
  const { activeSection } = props;

  const {
    auth,
    setAuth,
    creatorSignupInfo,
    setCreatorSignupInfo,
    handleSubmitCreatorInfo,
    updateSessionProfile,
  } = useAuth();
  const { wallet } = useCustomWallet();
  const { addFileToIPFS, getIPFSUrl, invokeServer } = useGlobal();
  const { showLoading, hideLoading, toastInfo, toastError, toastSuccess } =
    useToast();

  const [name, setName] = useState("");
  const [nameWarning, setNameWarning] = useState("");
  const [accountBio, setAccountBio] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameWarning, setUserNameWarning] = useState("");
  const [emailName, setEmailName] = useState(auth.loggedEmailName);
  const [emailNameWarning, setEmailNameWarning] = useState("");
  const {t}=useTranslation()
  const [coverImage, setCoverImage] = useState(settingCover);
  const [coverFile, setCoverFile] = useState(null);
  const [profileImage, setProfileImage] = useState(profileLogo);
  const [profileFile, setProfileFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState("creator");

  const [notificationSettings, setNotificationSettings] = useState({
    New_Item_Sold: true,
    New_Bid_Activity: true,
    Auction_Expiration: false,
    Owned_Asset_Upadates: false,
    Like_On_Post: false,
    Comment_Post: false,
    HyperchainX_Newsletter: false,
  });

  const changeCoverImage = (uploaded) => {
    let objectUrl = URL.createObjectURL(uploaded);
    setCoverImage(objectUrl);
    setCoverFile(uploaded);
  };

  const changeProfileImage = (uploaded) => {
    let objectUrl = URL.createObjectURL(uploaded);
    setProfileImage(objectUrl);
    setProfileFile(uploaded);
  };

  const creatorList = [
    { key: "creator", title: "Creator" },
    { key: "project_info", title: "Project Info" },
    { key: "project_tags", title: "Project Tags" },
  ];

  useEffect(() => {
    setUserName(auth.loggedUserName);
  }, [auth.loggedUserName]);

  useEffect(() => {
    setEmailName(auth.loggedEmailName);
  }, [auth.loggedEmailName]);

  useEffect(() => {
    setName(auth.businessName);
  }, [auth.businessName]);

  useEffect(() => {
    if (auth.avatarURI) {
      setProfileImage(auth.avatarURI);
    }
  }, [auth.avatarURI]);

  useEffect(() => {
    if (auth.coverURI) {
      setCoverImage(auth.coverURI);
    }
  }, [auth.coverURI]);

  useEffect(() => {
    setAccountBio(auth.bio);
  }, [auth.bio]);

  useEffect(() => {
    if (!name) {
      setNameWarning("(empty)");
      return;
    }

    let ac = new AbortController();

    invokeServer(
      "get",
      `/api/signin/profile?address=${wallet.address}&businessName=${name}`
    )
      .then((r) => {
        if (r.data.result === 1 && ac.signal.aborted !== true) {
          let rt = r.data.msg;
          if (rt) {
            rt = "(" + rt + ")";
          }
          setNameWarning(rt);
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });

    return () => {
      ac.abort();
    };
  }, [name, wallet.address]);

  useEffect(() => {
    if (!userName) {
      setUserNameWarning("(empty)");
      return;
    }

    let ac = new AbortController();

    invokeServer(
      "get",
      `/api/signin/profile?address=${wallet.address}&name=${userName}`
    )
      .then((r) => {
        if (r.data.result === 1 && ac.signal.aborted !== true) {
          let rt = r.data.msg;
          if (rt) {
            rt = "(" + rt + ")";
          }
          setUserNameWarning(rt);
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });

    return () => {
      ac.abort();
    };
  }, [userName, wallet.address]);

  useEffect(() => {
    if (!emailName) {
      setEmailNameWarning("(empty)");
      return;
    }

    let ac = new AbortController();
    invokeServer(
      "get",
      `/api/signin/profile?address=${wallet.address}&email=${emailName}`
    )
      .then((r) => {
        if (r.data.result === 1 && ac.signal.aborted !== true) {
          let rt = r.data.msg;
          if (rt) {
            rt = "(" + rt + ")";
          }
          setEmailNameWarning(rt);
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
    return () => {
      ac.abort();
    };
  }, [emailName, wallet.address]);

  const updateProfileInformation = async () => {
    showLoading("Updating profile information...");
    if (coverFile !== null) {
      // showLoading('Uploading cover image to IPFS...');

      try {
        let res = await addFileToIPFS(coverFile);
        let imageURI = getIPFSUrl(res.path);

        let r = await invokeServer("post", "/api/signin/profile", {
          address: wallet.address,
          coverURI: imageURI,
        });

        hideLoading();

        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              coverURI: imageURI,
            };
          });

          updateSessionProfile({
            coverURI: imageURI,
          });

          // toastInfo('Cover Image', r.data.msg);
        } else {
          toastError("Cover Image", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Cover Image", err.message);
      }
    }

    if (profileFile !== null) {
      // showLoading('Uploading avatar image to IPFS...');

      try {
        let res = await addFileToIPFS(profileFile);
        let imageURI = getIPFSUrl(res.path);

        // showLoading('Updating profile information...');

        let r = await invokeServer("post", "/api/signin/profile", {
          address: wallet.address,
          avatarURI: imageURI,
        });
        hideLoading();
        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              avatarURI: imageURI,
            };
          });

          updateSessionProfile({
            avatarURI: imageURI,
          });
          // toastInfo('Profile Image', r.data.msg);
        } else {
          toastError("Profile Image", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Profile Image", err.message);
      }
    }

    if (name !== "") {
      try {
        // showLoading('Updating profile business name...');

        let r = await invokeServer("post", "/api/signin/profile", {
          address: wallet.address,
          businessName: name,
        });

        hideLoading();
        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              businessName: name,
            };
          });
          updateSessionProfile({
            businessName: name,
          });
          // toastInfo('Profile Business Name', r.data.msg);
        } else {
          toastError("Profile Business Name", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Profile Business Name", err.message);
      }
    }

    if (accountBio !== "") {
      try {
        // showLoading('Updating profile bio...');

        let r = await invokeServer("post", "/api/signin/profile", {
          address: wallet.address,
          bio: accountBio,
        });

        hideLoading();
        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              bio: accountBio,
            };
          });
          updateSessionProfile({
            bio: accountBio,
          });
          // toastInfo('Profile Biography', r.data.msg);
        } else {
          toastError("Profile Biography", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Profile Biography", err.message);
      }
    }

    if (userName !== "") {
      try {
        // showLoading('Updating profile user name...');

        let r = await invokeServer("post", "/api/signin/profile", {
          name: userName,
          address: wallet.address,
        });

        hideLoading();
        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              loggedUserName: userName,
            };
          });
          updateSessionProfile({
            loggedUserName: userName,
          });
          // toastInfo('Profile User Name', r.data.msg);
        } else {
          toastError("Profile User Name", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Profile User Name", err.message);
      }
    }

    if (emailName !== "") {
      try {
        // showLoading('Updating profile email...');

        let r = await invokeServer("post", "/api/signin/profile", {
          email: emailName,
          address: wallet.address,
        });

        hideLoading();
        if (r.data.result === 1) {
          setAuth((t) => {
            return {
              ...t,
              loggedEmailName: emailName,
            };
          });
          updateSessionProfile({
            loggedEmailName: emailName,
          });
          // toastInfo('Profile Email', r.data.msg);
        } else {
          toastError("Profile Email", r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError("Profile Email", err.message);
      }
    }
    toastInfo("Profile Setting", "Profile Updated");
  };

  const updateNotificationInformation = async () => {
    let notif = JSON.stringify(notificationSettings);
    try {
      showLoading("Updating notification information...");

      let r = await invokeServer("post", "/api/signin/profile", {
        address: wallet.address,
        notification: notif,
      });

      hideLoading();
      if (r.data.result === 1) {
        setAuth((t) => {
          return {
            ...t,
            notification: notif,
          };
        });
        updateSessionProfile({
          notification: notif,
        });
        toastInfo("Profile Notification", r.data.msg);
      } else {
        toastError("Profile Notification", r.data.msg);
      }
    } catch (err) {
      hideLoading();

      console.log(err.message);
      toastError("Profile Notification", err.message);
    }
  };

  useEffect(() => {
    let notif = JSON.parse(auth.notification);

    setNotificationSettings((t) => {
      return {
        ...t,
        New_Item_Sold: notif.New_Item_Sold || false,
        New_Bid_Activity: notif.New_Bid_Activity || false,
        Auction_Expiration: notif.Auction_Expiration || false,
        Owned_Asset_Upadates: notif.Owned_Asset_Upadates || false,
        Like_On_Post: notif.Like_On_Post || false,
        Comment_Post: notif.Comment_Post || false,
        HyperchainX_Newsletter: notif.HyperchainX_Newsletter || false,
      };
    });
  }, [auth.notification]);

  useEffect(() => {
    setCreatorSignupInfo((t) => {
      return {
        ...t,
        name: auth.loggedUserName,
        email: auth.loggedEmailName,
      };
    });
  }, [auth.loggedUserName, auth.loggedEmailName]);

  return (
    <MainContentContainer>
      <SettingFormContainer>
        {activeSection === SettingPageSections.profile ? (
          <>
            <ProfileSettingsContainer>
                <h2>{t("Profile Settings")}</h2>
              <div className="profile-setting-inner">
                <div className="profile-settings-input">
                  <FormInputBox
                    title={"Name"}
                    placeholder={"Enter Name"}
                    name={"name"}
                    type={"text"}
                    required={true}
                    value={name}
                    warning={`${nameWarning}`}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormInputBox
                    title={"Username"}
                    placeholder={"Enter username"}
                    name={"username"}
                    type={"text"}
                    required={true}
                    value={userName}
                    warning={`${userNameWarning}`}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <FormInputBox
                    title={"Bio"}
                    name={"account-bio"}
                    placeholder={"Tell the world your story!"}
                    type={"text-area"}
                    value={accountBio}
                    onChange={(e) => setAccountBio(e.target.value)}
                  />
                  <FormInputBox
                    title={"Email Address"}
                    placeholder={"Enter email"}
                    name={"email"}
                    type={"text"}
                    required={true}
                    value={emailName}
                    warning={`${emailNameWarning}`}
                    onChange={(e) => setEmailName(e.target.value)}
                  />
                  {/* <h3>Social Connections</h3>
                  <p>
                    Help collectors verify your account by connecting Twitter
                  </p>
                  <div className="social-tab">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>{' '}
                      Twitter
                    </span>
                    <button>Connect</button>
                  </div>
                  <strong>Links</strong>
                  <ul>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                      <input type="text" placeholder="YourInstagramHandle" />
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                      </svg>
                      <input type="text" placeholder="yoursite.io" />
                    </li>
                  </ul> */}
                  <FormInputBox
                    title={"Wallet Address"}
                    name={"wallet-address"}
                    type={"text"}
                    value={wallet.address}
                    onChange={() => {}}
                  />
                </div>
                <div className="profile-setting-right">
                  <strong>{t("Profile Image")}</strong>
                  <div className="logo-image">
                    <img src={profileImage} alt="" />
                    <div className="overlay">
                      <FileUploader
                        label={"change"}
                        icon={<ChangeIcon />}
                        isOnlyIcon={true}
                        handleFile={changeProfileImage}
                      />
                      <div className="overlay-text">{t("Change")}</div>
                    </div>
                  </div>
                  <strong>{t("Profile Banner")}</strong>
                  <div className="cover-image">
                    <img src={coverImage} alt="profile_cover" />
                    <div className="overlay">
                      <FileUploader
                        label={"change"}
                        icon={<ChangeIcon />}
                        isOnlyIcon={true}
                        handleFile={changeCoverImage}
                      />
                      <div className="overlay-text">{t("Change")}</div>
                    </div>
                  </div>
                </div>
                <GradientButton
                  label={"Save"}
                  isNoPadding
                  height={"50px"}
                  width={"160px"}
                  fontSize={"18px"}
                  handleClick={updateProfileInformation}
                />
              </div>
            </ProfileSettingsContainer>
            `
          </>
        ) : activeSection === SettingPageSections.verification ? (
          <VerificationSection>
            <MenuWrapper>
              {creatorList.map((item) => (
                <Tab
                  key={item.key}
                  active={selectedItem === item.key}
                  onClick={() => setSelectedItem(item.key)}
                >
                  {item.title}
                </Tab>
              ))}
            </MenuWrapper>
            {selectedItem === "creator" && (
              <Creator handleGo={() => setSelectedItem("project_info")} />
            )}
            {selectedItem === "project_info" && (
              <ProjectInfoWrapper>
                <ProjectInfo
                  creatorInfo={creatorSignupInfo}
                  setCreatorInfo={setCreatorSignupInfo}
                  handleBack={() => setSelectedItem("creator")}
                  handleNext={() => setSelectedItem("project_tags")}
                />
              </ProjectInfoWrapper>
            )}
            {selectedItem === "project_tags" && (
              <ProjectInfoWrapper>
                <ProjectTags
                  creatorInfo={creatorSignupInfo}
                  setCreatorInfo={setCreatorSignupInfo}
                  handleSubmit={handleSubmitCreatorInfo}
                  handleBack={() => setSelectedItem("project_info")}
                />
              </ProjectInfoWrapper>
            )}
          </VerificationSection>
        ) : activeSection === SettingPageSections.notification ? (
          <NotificationSection>
            <div className="title">{t("Notifications")}</div>
            <div className="description">
              {t("Edit your notification preferences")}
            </div>
            <div className="content">
              <div className="content-item">
                <ToggleGroupItem
                  title={"New Item Sold"}
                  description={"When someone purchased one of your items"}
                  isChecked={notificationSettings.New_Item_Sold}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      New_Item_Sold: !prev.New_Item_Sold,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"New Bid Activity"}
                  description={"When someone bids on one of your items"}
                  isChecked={notificationSettings.New_Bid_Activity}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      New_Bid_Activity: !prev.New_Bid_Activity,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"Auction Expiration"}
                  description={"When an auction you created ends"}
                  isChecked={notificationSettings.Auction_Expiration}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      Auction_Expiration: !prev.Auction_Expiration,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"Owned Asset Upadates"}
                  description={
                    "When a siginificant update occurs for one of the item you have buyed"
                  }
                  isChecked={notificationSettings.Owned_Asset_Upadates}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      Owned_Asset_Upadates: !prev.Owned_Asset_Upadates,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"Like on Post"}
                  description={"When someone like on one of your items"}
                  isChecked={notificationSettings.Like_On_Post}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      Like_On_Post: !prev.Like_On_Post,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"Comment Post"}
                  description={"When someone comment on one of your items"}
                  isChecked={notificationSettings.Comment_Post}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      Comment_Post: !prev.Comment_Post,
                    }))
                  }
                />
              </div>
              <div className="content-item">
                <ToggleGroupItem
                  title={"HyperchainX Newsletter"}
                  description={"Occasional updates from the GX team"}
                  isChecked={notificationSettings.HyperchainX_Newsletter}
                  toggleChecked={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      HyperchainX_Newsletter: !prev.HyperchainX_Newsletter,
                    }))
                  }
                />
              </div>
            </div>
            <GradientButton
              label={"Update notification information"}
              height={"42px"}
              width={"320px"}
              fontSize={"18px"}
              isNoPadding
              handleClick={updateNotificationInformation}
            />
          </NotificationSection>
        ) : activeSection === SettingPageSections.referral ? (
          <MainArea>
            <Main>
              {console.log(
                auth,
                "-=-=-=-===-=====-------====-------->>>>>>>>>>"
              )}
              <ProfileArea>
                <Profile>
                  <img src={desktopLogo} alt="avatar" />
                  <ProfileContent>
                    <span>{t("My GX ID")}</span>
                    <strong>{auth.id?.substr(0, 5) + "..."}</strong>
                    <p>
                      {auth.address?.substr(0, 4) +
                        "..." +
                        auth.address?.slice(-4)}
                      <CopyToClipboard text={auth.address}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 20 20"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                        >
                          <path d="M15 6.667H8.332c-.92 0-1.667.746-1.667 1.666V15c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.747 1.667-1.667V8.333c0-.92-.746-1.666-1.667-1.666Z"></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.469 3.468A2.167 2.167 0 0 1 5 2.833h6.666A2.167 2.167 0 0 1 13.834 5v1.667a.5.5 0 0 1-1 0V5a1.167 1.167 0 0 0-1.167-1.167H5.001A1.167 1.167 0 0 0 3.834 5v6.667a1.167 1.167 0 0 0 1.167 1.166h1.666a.5.5 0 1 1 0 1H5.001a2.167 2.167 0 0 1-2.167-2.166V5c0-.575.228-1.126.635-1.532Z"
                          ></path>
                        </svg>
                      </CopyToClipboard>
                    </p>
                  </ProfileContent>
                </Profile>
                <MyLink>
                  <h3>
                    {t("My referral link")}
                    <CopyToClipboard
                      text={`https://nft.gx.exchange/explorer?RefID=${auth.id}`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path d="M15 6.667H8.332c-.92 0-1.667.746-1.667 1.666V15c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.747 1.667-1.667V8.333c0-.92-.746-1.666-1.667-1.666Z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.469 3.468A2.167 2.167 0 0 1 5 2.833h6.666A2.167 2.167 0 0 1 13.834 5v1.667a.5.5 0 0 1-1 0V5a1.167 1.167 0 0 0-1.167-1.167H5.001A1.167 1.167 0 0 0 3.834 5v6.667a1.167 1.167 0 0 0 1.167 1.166h1.666a.5.5 0 1 1 0 1H5.001a2.167 2.167 0 0 1-2.167-2.166V5c0-.575.228-1.126.635-1.532Z"
                        ></path>
                      </svg>
                    </CopyToClipboard>
                  </h3>
                  <a href="#">
                    NFT.GX.Exchange?RefID={auth.id?.substr(0, 5) + "..."}
                  </a>
                  <p>
                    {t("Share your referral link and invite your friends to the GX to build your team")}
                  </p>
                </MyLink>
              </ProfileArea>
              <ListArea>
                <Item>
                  <h3>
                    <span>
                      {t("Upline")}
                      <strong>
                        <p>
                          {t("Upline is the superior partner who invited you into the GX system")}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-question-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                        </svg>
                      </strong>
                    </span>
                    <strong>{t("Level: 12")}</strong>
                  </h3>
                  <ItemInner>
                    <img src={desktopLogo} alt="avatar" />
                    <ItemContent>
                      <h4>
                        {t("GX")}{" "}
                        <CopyToClipboard text={auth.address}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 20 20"
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                          >
                            <path d="M15 6.667H8.332c-.92 0-1.667.746-1.667 1.666V15c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.747 1.667-1.667V8.333c0-.92-.746-1.666-1.667-1.666Z"></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.469 3.468A2.167 2.167 0 0 1 5 2.833h6.666A2.167 2.167 0 0 1 13.834 5v1.667a.5.5 0 0 1-1 0V5a1.167 1.167 0 0 0-1.167-1.167H5.001A1.167 1.167 0 0 0 3.834 5v6.667a1.167 1.167 0 0 0 1.167 1.166h1.666a.5.5 0 1 1 0 1H5.001a2.167 2.167 0 0 1-2.167-2.166V5c0-.575.228-1.126.635-1.532Z"
                            ></path>
                          </svg>
                        </CopyToClipboard>
                      </h4>
                      <h5>
                        {auth.address?.substr(0, 4) +
                          "..." +
                          auth.address?.slice(-4)}
                        <CopyToClipboard text={auth.address}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 20 20"
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                          >
                            <path d="M15 6.667H8.332c-.92 0-1.667.746-1.667 1.666V15c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.747 1.667-1.667V8.333c0-.92-.746-1.666-1.667-1.666Z"></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.469 3.468A2.167 2.167 0 0 1 5 2.833h6.666A2.167 2.167 0 0 1 13.834 5v1.667a.5.5 0 0 1-1 0V5a1.167 1.167 0 0 0-1.167-1.167H5.001A1.167 1.167 0 0 0 3.834 5v6.667a1.167 1.167 0 0 0 1.167 1.166h1.666a.5.5 0 1 1 0 1H5.001a2.167 2.167 0 0 1-2.167-2.166V5c0-.575.228-1.126.635-1.532Z"
                            ></path>
                          </svg>
                        </CopyToClipboard>
                      </h5>
                    </ItemContent>
                  </ItemInner>
                </Item>
                <Item>
                  <h3>
                    <span>
                      {t("Your GX Token Balance")}
                      <strong>
                        <p>
                          {t("GX is the native BSC token of the GX platform, which rewards its holders with automatic passive interest payments within 15 minutes")}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-question-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                        </svg>
                      </strong>
                    </span>
                  </h3>
                  <ExtraInfo>
                    <h5>{t("0.000")}</h5>
                    <p>{t("Fixed APY 36.5%")}</p>
                  </ExtraInfo>
                </Item>
              </ListArea>
              <FaceId>
                <FaceIdInner>
                  <FaceIdItem>
                    <span>{t("GX ID")}</span>
                    <strong>{auth.id}</strong>
                  </FaceIdItem>
                  <FaceIdItem>
                    <span>{t("Partners")}</span>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.875 12.5a4.062 4.062 0 1 0 0-8.125 4.062 4.062 0 0 0 0 8.125Z"
                          stroke="#fff"
                          stroke-miterlimit="10"
                        ></path>
                        <path
                          d="M12.14 4.523c.36-.097.73-.147 1.102-.148a4.063 4.063 0 0 1 0 8.125M1.25 15.422a6.875 6.875 0 0 1 11.25 0M13.242 12.5a6.868 6.868 0 0 1 5.625 2.922"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>{" "}
                      {auth?.ref?.length}
                    </span>
                  </FaceIdItem>
                </FaceIdInner>
                <FaceRefItem>
              {auth?.ref &&
                auth?.ref?.map((item, index) => {
                  return (
                    <div key={index}>
                      <a
                        href={`https://polygonscan.com/address/${item.address}`}
                        target="_blank"
                      >
                        <p>
                          <img src={desktopLogo} alt="avatar" /> {item.name}{" "}{t("ID")}{" "}
                          {item._id?.substr(0, 5) + "..."}
                        </p>
                      </a>
                    </div>
                  );
                })}
            </FaceRefItem>
              </FaceId>
            </Main>
          </MainArea>
        ) : (
          <></>
        )}
      </SettingFormContainer>
    </MainContentContainer>
  );
};
