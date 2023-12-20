import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import GradientButton from "../Shared/GradientButton";
import { CreateNewIcon } from "../Shared/SvgIcons";
import { Input, TextArea } from "../Shared/InputBox";
import { UploadFile } from "./UploadFile";
import data from "../../data.json";
import { Select } from "antd";

import {
  CollectionCreatorContainer,
  CollectionHeroContainer,
  CreateFormContainer,
  CreateFormHeader,
  CustomLabel,
  CreateFormDetails,
  CustomDescription,
  BannerImageContainer,
  BannerImageWrapper,
  LogoImageContainer,
  LogoImageWrapper,
} from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";
import useToast from "../../hooks/useToast";
import { useContract } from "../../contexts/ContractContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCustomWallet } from "../../contexts/WalletContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CollectionCreator = () => {
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedtoken, setSelectedtoken] = useState([]);

  const tokens = ["ETH", "WETH", "DAI", "USDC", "ASH", "BAT"];
  const blockchains = ["BNB Chain", "Polygon", "Ethereum"];

  const filteredOptions = tokens?.filter((o) => !selectedtoken.includes(o));
  const options = [
    {
      value: 1,
      label: "Abstract",
    },
    {
      value: 2,
      label: "Action",
    },
    {
      value: 3,
      label: "Adoptables",
    },
    {
      value: 4,
      label: "Adventure",
    },
    {
      value: 5,
      label: "FIFA",
    },
    {
      value: 6,
      label: "3D",
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleCategoryChange = (value) => {
    console.log(`selected ${value}`);
    setselectedCategory(value);
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const [collection, setCollection] = useState({});

  const [photo, setPhoto] = useState(null);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const { t } = useTranslation();
  const { invokeServer, addFileToIPFS, getIPFSUrl } = useGlobal();
  const { toastError, toastSuccess, showLoading, hideLoading } = useToast();
  const { createNewCollection } = useContract();
  const { wallet } = useCustomWallet();

  const onCreateNewCollection = async () => {
    if (auth.isLoggedIn !== true) {
      toastError("Fail", "Please sign in as a creator");
      return;
    }

    let photoHash = "",
      logoHash = "";

    if (logo != null) {
      await showLoading("Adding logo image to ipfs...");
      try {
        const hash = await addFileToIPFS(logo.file);
        await toastSuccess("logo hash", getIPFSUrl(hash.path));
        logoHash = hash.path;
      } catch (err) {
        await toastError("Error adding to IPFS", err.toString());
        await hideLoading();
        return;
      }
    }

    if (photo != null) {
      await showLoading("Adding banner image to ipfs...");
      try {
        const hash = await addFileToIPFS(photo.file);
        await toastSuccess("banner hash", getIPFSUrl(hash.path));
        photoHash = hash.path;
      } catch (err) {
        await toastError("Error adding to IPFS", err.toString());
        await hideLoading();
        return;
      }
    }

    await showLoading("creating on blockchain...");
    let ret = await createNewCollection({
      banner: photoHash,
      logo: logoHash,
      name: name,
      description: description,
      website: website,
      twitter: twitter,
      instagram: instagram,
      discord: discord,
    });

    if (ret !== undefined) {
      let newContractAddress =
        ret.events.CreatedERC1155TradableContract.returnValues.newContract;
      invokeServer("post", "/api/collection/new", {
        name: name,
        description: description,
        bannerURI: getIPFSUrl(photoHash),
        logoURI: getIPFSUrl(logoHash),
        contractAddress: newContractAddress,
        user: auth.loggedUserName,
        walletAddress: wallet.address,
        website: website,
        twitter: twitter,
        instagram: instagram,
        discord: discord,
      })
        .then((r) => {
          if (r.data.result == 1) {
            toastSuccess("Success", "server: " + r.data.msg);
            navigate("/my-collections");
          } else {
            toastError("Fail", "server: " + r.data.msg);
          }
        })
        .catch((err) => {
          toastError("Fail", err.toString());
        });
    }

    await hideLoading();
  };

  useEffect(() => {
    const rval = getRandomInt(data.collections.length);
    setCollection((t) => {
      return data.collections[rval];
    });
  }, []);

  let categories = [
    {
      value: 1,
      label: "Art",
    },
    {
      value: 2,
      label: "Domain Names",
    },
    {
      value: 3,
      label: "Gaming",
    },
    {
      value: 4,
      label: "Memberships",
    },
    {
      value: 5,
      label: "Music",
    },
    {
      value: 6,
      label: "PFPs",
    },
    {
      value: 7,
      label: "Photography",
    },
    {
      value: 8,
      label: "Sports Collectibles",
    },
    {
      value: 9,
      label: "Virtual Worlds",
    },
    {
      value: 10,
      label: "No category",
    },
  ];
  let myGalleries = [
    {
      value: 1,
      label: "One",
    },
  ];

  return (
    <CollectionCreatorContainer>
      <CreateFormContainer>
        <CreateFormHeader>
          <CreateNewIcon />
          <span>{t("Create a Collection")}</span>
        </CreateFormHeader>
        <CreateFormDetails>
          <CustomLabel>
            <span>*</span>
            {t("Logo Image")}
          </CustomLabel>
          <CustomDescription>{t("350 x 350 recommended")}</CustomDescription>
          <LogoImageContainer>
            <LogoImageWrapper>
              <UploadFile setPhoto={setLogo} />
            </LogoImageWrapper>
          </LogoImageContainer>

          <BannerImageContainer>
            <CustomLabel>
              <span>*</span>
              {t("Banner image")}
            </CustomLabel>
            <CustomDescription>
              {t("1400 x 400 recommended")}{" "}
            </CustomDescription>
            <BannerImageWrapper>
              <UploadFile setPhoto={setPhoto} />
            </BannerImageWrapper>
          </BannerImageContainer>

          <CustomLabel>
            <span>*</span>
            {t("Name")}
          </CustomLabel>
          <Input
            placeholder="Enter name for your collection"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <CustomLabel>{t("Description")}</CustomLabel>
          <TextArea
            placeholder="Enter name for your collection"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Social links */}
          <CustomLabel>{t("Website")}</CustomLabel>
          <Input
            placeholder="Enter your website link"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <CustomLabel>{t("Discord")}</CustomLabel>
          <Input
            placeholder="Enter your discord link"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
          />
          <CustomLabel>{t("Twitter")}</CustomLabel>
          <Input
            placeholder="Enter your twitter link"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <CustomLabel>{t("Instagram")}</CustomLabel>
          <Input
            placeholder="Enter your instagram link"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <CustomLabel>{t("Category and tags")}</CustomLabel>
          <CustomDescription>
            {t(
              "Make your items more discoverable on OpenSea by adding tags and a category."
            )}{" "}
          </CustomDescription>
          <Select
            // showSearch
            value={selectedCategory}
            placeholder="Select a category"
            onChange={handleCategoryChange}
            options={categories}
          />
          {selectedCategory && (
            <div className="select-tags">
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder="Add upto 5 tags"
                onChange={handleChange}
                options={options}
              />
            </div>
          )}
          <CustomLabel>{t("Blockchain")}</CustomLabel>
          <CustomDescription>
            {t(
              "Select the blockchain where you'd like new items from this collection to be added by default."
            )}{" "}
          </CustomDescription>
          <Select
            // showSearch
            placeholder="Select a blockchain"
            // onChange={handleChange}

            options={blockchains?.map((item) => ({
              value: item,
              label: item,
            }))}
          />

          <CustomLabel>{t("Payment tokens")}</CustomLabel>
          <CustomDescription>
            {t("These tokens can be used to buy and sell your items.")}{" "}
          </CustomDescription>
          <div className="select-tags">
            <Select
              mode="multiple"
              placeholder="Add a token"
              value={selectedtoken}
              onChange={setSelectedtoken}
              style={{
                width: "100%",
              }}
              options={filteredOptions?.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
          <GradientButton label="Create" handleClick={onCreateNewCollection} />
        </CreateFormDetails>
      </CreateFormContainer>

      <CollectionHeroContainer>
        <h2>{t("Preview")}</h2>
        <Collection
          collection={collection}
          photo={photo?.url}
          logo={logo?.url}
          name={name}
          description={description}
        />
      </CollectionHeroContainer>
    </CollectionCreatorContainer>
  );
};
