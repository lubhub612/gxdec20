import React, { useEffect, useState } from "react";
import { AiScreenStyle, LoadingScreen } from "./style";
import { Tabs, Collapse, Modal } from "antd";
import MainModal from "./Popup";
import DetailPopup from "./DetailPopup";
import WalletModal from "../Shared/MainModal";
import { ConnectWalletForm } from "../Shared/ConnectWalletForm";
import { useGlobal } from "../../contexts/GlobalContext";
import useToast from "../../hooks/useToast";
import ReactLoading from "react-loading";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "antd";
import "./my-style.css";
import { useLocation } from "react-router-dom";
const { Panel } = Collapse;

const TabOne = (props) => {
  const {
    setGeneratedImages,
    handleClick,
    setLoading,
    loading,
    GetAllImages,
    generateSimilar,
  } = props;
  const { invokeServer, global } = useGlobal();
  const { toastError, toastInfo } = useToast();
  const { auth } = useAuth();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [aiModels, setAiModels] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [resolutionTab, setResolutionTab] = useState(1);
  const [strength, setStrength] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(true);
  const [isVisible4, setIsVisible4] = useState(true);
  const [openModels, setIsOpenModels] = useState(false);
  const [selectedRatioWidth1, setSelectedRatioWidth1] = useState(608);
  const [selectedRatioHeight1, setSelectedRatioHeight1] = useState(912);
  const [selectedRatio, setSelectedRatio] = useState("608x912");
  const [selectedRatioWidth, setSelectedRatioWidth] = useState(640);
  const [selectedRatioHeight, setSelectedRatioHeight] = useState(640);
  const [selectedRatio2, setSelectedRatio2] = useState(null);
  const [noOfImages, setNoOfImages] = useState(4);
  const [noOfSteps, setNoOfSteps] = useState(30);
  const [noOfGuidance, setNoOfGuidance] = useState(10);
  const [selectedRatioIndex, setselectedRatioIndex] = useState(2);
  const [selectedModel, setSelectedModel] = useState({
    Name: "Synthica",
    model_id: "13c9af5c-aa0b-47e0-b010-37854db4f29b",
  });
  // new id   13c9af5c-aa0b-47e0-b010-37854db4f29b
  // old id   22b0857d-7edc-4d00-9cd9-45aa509db093
  const [noOfSeeds, setnoOfSeeds] = useState(null);
  const [promptValue, setPromptValue] = useState(null);
  const [negativepromptValue, setNegativePromptValue] = useState(null);
  const [selectedScheduler, setSelectedScheduler] = useState(
    "82cf78dd-6afb-48cc-aca6-14224cca6950"
  );

  const handleSeedChange = (e) => {
    const value = e.target.value;
    // Validate the input value to allow positive and negative numbers only
    if (/^-?\d*$/.test(value)) {
      setnoOfSeeds(value);
    }
  };

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPromptValue(value);
  };

  const handleNegativePromptChange = (e) => {
    const value = e.target.value;
    setNegativePromptValue(value);
  };

  const handleConnectWallet = () => {
    setIsModalOpen(false);
    setShowConnectWallet(true);
  };
  const hideModel = () => {
    setIsModalOpen(false);
  };
  const aspectRatios = [
    { ratio: "1:1", value: "768x768" },
    { ratio: "4:5", value: "672x840" },
    { ratio: "2:3", value: "608x912" },
    { ratio: "3:2", value: "912x608" },
    { ratio: "9:16", value: "576x1024" },
    { ratio: "16:9", value: "1024x576" },
  ];

  const handleRadioChange = (value, index) => {
    setSelectedRatio(value);
    const [width, height] = value.split("x");
    setSelectedRatioWidth1(width);
    setSelectedRatioHeight1(height);
    setselectedRatioIndex(index);
  };

  const handleIconClick = () => {
    setIsVisible(false);
  };
  const handleIsVisible2Click = () => {
    setIsVisible2(false);
  };
  const handleIsVisible3Click = () => {
    setIsVisible3(false);
  };
  const handleIsVisible4Click = () => {
    setIsVisible4(false);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  // strength slider handler
  const handleSliderChange = (event) => {
    const value = parseFloat(event.target.value);
    setStrength(value);
  };
  // image aspect width handler
  const handleAspectWidthChange = (event) => {
    const value = parseFloat(event.target.value);
    setSelectedRatioWidth(value);
    setSelectedRatio2(`${value}x${selectedRatioHeight}`);
  };
  // image aspect height handler
  const handleAspectHeightChange = (event) => {
    const value = parseFloat(event.target.value);
    setSelectedRatioHeight(value);
    setSelectedRatio2(`${value}x${selectedRatioHeight}`);
  };
  //  noOfImages handler
  const handlenoOfImagesChange = (event) => {
    const value = parseFloat(event.target.value);
    setNoOfImages(value);
  };
  //  noOfSteps handler
  const handlenoOfStepsChange = (event) => {
    const value = parseFloat(event.target.value);
    setNoOfSteps(value);
  };
  //  noOfGuidance handler
  const handlenoOfGuidanceChange = (event) => {
    const value = parseFloat(event.target.value);
    setNoOfGuidance(value);
  };
  // Scheduler
  const handleSchedulerChange = (value) => {
    setSelectedScheduler(value);
  };

  // Get all ai models
  const getAiModels = () => {
    invokeServer("get", `/api/ai_images/`)
      .then((r) => {
        setAiModels(r.data.items);
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };

  useEffect(() => {
    getAiModels();
  }, []);

  useEffect(() => {
    if (generateSimilar?.prompt) {
      // setSelectedModel(generateSimilar.model)
      setPromptValue(generateSimilar?.prompt);
      setStrength(generateSimilar?.strength);
      setNoOfImages(generateSimilar?.num_outputs);
      generateSimilar?.negativePromp
        ? setNegativePromptValue(generateSimilar?.negativePromp)
        : setNegativePromptValue("");
      setnoOfSeeds(generateSimilar?.seeds);
      setNoOfGuidance(generateSimilar?.guidanceScale);
      setNoOfSteps(generateSimilar?.steps);
      setResolutionTab(generateSimilar?.resolution);
      setSelectedImage(generateSimilar?.uploadedImageUrl);
      if (generateSimilar.resolution == 1) {
        setSelectedRatio(`${generateSimilar.width}x${generateSimilar.height}`);
        setSelectedRatioWidth1(generateSimilar.width);
        setSelectedRatioHeight1(generateSimilar.height);
        setSelectedRatio2(null);
      }
      if (generateSimilar.resolution == 2) {
        setSelectedRatioWidth(generateSimilar.width);
        setSelectedRatioHeight(generateSimilar.height);
        setSelectedRatio2(
          `${generateSimilar.width} x ${generateSimilar.height}`
        );
      }
    }
  }, [generateSimilar]);

  useEffect(() => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      // serverURL
      invokeServer("post", "/api/ai_images/upload", formData)
        .then((response) => {
          // Handle the response from the server
          if (response.data.result == 1) {
            setImageUrl(`${response.data.image}`);
          }
        })
        .catch((error) => {
          // Handle the error
          console.error("Failed to upload image:", error.message);
        });
    }
  }, [imageFile]);

  // genrate image handler
  const handlerSubmit = () => {
    handleClick(noOfImages, selectedRatioWidth1, selectedRatioHeight1);
    let data = {
      model_id: selectedModel.model_id,
      scheduler_id: selectedScheduler,
      negative_prompt: negativepromptValue,
      init_image_url: imageUrl ? imageUrl : null,
      prompt_strength: strength,
      width: selectedRatio2
        ? parseInt(selectedRatioWidth)
        : parseInt(selectedRatioWidth1),
      height: selectedRatio2
        ? parseInt(selectedRatioHeight)
        : parseInt(selectedRatioHeight1),
      seed: parseInt(noOfSeeds),
      num_outputs: noOfImages,
      inference_steps: noOfSteps,
      guidance_scale: noOfGuidance,
      output_image_extension: "jpeg",
      prompt: promptValue,
      resolution: resolutionTab,
    };
    if (promptValue.length > 3) {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem("logInIdV1"));

      invokeServer("post", `/api/ai_images/generate-image?id=${user.id}`, data)
        .then((r) => {
          if (r.data.result == 1) {
            setGeneratedImages(r.data.images);
            setLoading(false);
            GetAllImages();
          } else {
            GetAllImages();
            setGeneratedImages([]);
            setLoading(false);
            // toastError("error", r.data.message);
          }
          // setAiModels(r.data.items);
        })
        .catch((err) => {
          // console.log("errror", `${err}`);
          setLoading(false);
          GetAllImages();
          toastError("error", err.message);
        });
    } else {
      toastInfo(
        "warning",
        "The prompt should be a minimum of 4 characters long"
      );
    }
  };

  return (
    <AiScreenStyle>
      <div className="faq-area">
        <Collapse defaultActiveKey={"1"} expandIconPosition="end">
          <Panel
            onClick={() => setIsOpenModels(true)}
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  style={{ color: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-aspect-ratio"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
                    fill="white"
                  ></path>{" "}
                  <path
                    d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"
                    fill="white"
                  ></path>{" "}
                </svg>
                <span style={{ marginLeft: 12 }}>
                  Model: {selectedModel.Name}
                </span>
              </div>
            }
            key="0"
          ></Panel>
          <Panel
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-edit3"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span style={{ marginLeft: 12 }}>Prompt</span>
              </div>
            }
            key="1"
          >
            <p>Prompt</p>
            <textarea
              value={promptValue}
              className="prompt-input"
              id="prompt"
              name="prompt"
              autocomplete="off"
              placeholder="Describe something you'd like to see generated. Experiment with different words and styles..."
              autofocus
              style={{ minHeight: "90px", height: "97px" }}
              spellcheck="false"
              onChange={handlePromptChange}
            ></textarea>
            <p>Negative Prompt</p>
            <input
              className="my-input"
              id="prompt"
              name="prompt"
              value={negativepromptValue}
              autocomplete="off"
              placeholder="What you don't want in your image"
              autofocus
              style={{ display: "flex", alignItems: "center" }}
              spellcheck="false"
              onChange={handleNegativePromptChange}
            ></input>
          </Panel>
          <Panel
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-image"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <span style={{ marginLeft: 12 }}>Image</span>
              </div>
            }
            key="2"
          >
            <div
              className="upload-box"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => {
                document.getElementById("imageInput").click();
              }}
            >
              <div className="drop-image">
                {selectedImage ? (
                  <img
                    style={{ width: "150px", height: "150px" }}
                    src={selectedImage}
                    alt="Selected"
                  />
                ) : (
                  <p
                    style={{
                      paddingTop: "30px",
                      paddingLeft: "10px",
                    }}
                  >
                    Drag and drop an image here or click to select
                  </p>
                )}

                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            {selectedImage && (
              <div
                style={{
                  position: "relative",
                }}
              >
                <svg
                  onClick={() => {
                    setSelectedImage(null);
                    setImageFile(null);
                    setImageUrl(null);
                  }}
                  style={{
                    position: "absolute",
                    top: "-24px",
                    right: "130px",
                    zIndex: 9999999,
                    color: "#f7f8f8",
                    cursor: "pointer",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />{" "}
                </svg>
              </div>
            )}
            {/* <div className="checkbox">
              <input type="checkbox" />
              <p style={{ marginLeft: "4px" }}>
                Crop center to fit output resolution
              </p>
            </div> */}
            {/* <div className="controlNet">
              <p>Control image with ControlNet:</p>
              <select className="my-input"></select>
            </div> */}
            <div className="controlNet">
              <p htmlFor="strengthSlider">
                Strength: <span id="strengthValue">{strength}</span>
              </p>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={strength}
                id="strengthSlider"
                className="slider"
                onChange={handleSliderChange}
              />
              <div className={`box ${isVisible ? "visible" : "hidden"}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  <span
                    style={{
                      marginLeft: "4px",
                      // color: "#f7f8f8",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Strength
                  </span>
                </div>
                <div className="close-icon" onClick={handleIconClick}>
                  <svg
                    style={{ color: "white" }}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    // color: "#f7f8f899",
                    fontSize: "13px",
                    lineHeight: "150%",
                  }}
                >
                  Strength represents the similarity between generated output
                  and the init image. Setting low strength values will result in
                  images similar to the input. High strength will produce more
                  diverse outputs that closer resemble the prompt.
                </p>
              </div>
            </div>
          </Panel>
          <Panel
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-scaling"
                >
                  <path d="M21 3 9 15"></path>
                  <path d="M12 3H3v18h18v-9"></path>
                  <path d="M16 3h5v5"></path>
                  <path d="M14 15H9v-5"></path>
                </svg>
                <span style={{ marginLeft: 12 }}>
                  Resolution: {selectedRatio2 ? selectedRatio2 : selectedRatio}
                </span>
              </div>
            }
            key="3"
          >
            {/* <nav className="tabs____XQO_K">
              <ul className="tabs_tabs__Fe7TQ">
                <li
                  onClick={() => {
                    setResolutionTab(1);
                    setSelectedRatio2(null);
                  }}
                  className={`tabs_tab__BE_3O ${
                    resolutionTab == 1 ? "tabs_active__wGYZV" : null
                  }`}
                >
                  <a class="tabs_a__uhbWD ">Simple</a>
                </li>
                <li
                  onClick={() => setResolutionTab(2)}
                  className={`tabs_tab__BE_3O ${
                    resolutionTab == 2 ? "tabs_active__wGYZV" : null
                  }`}
                >
                  <a class="tabs_a__uhbWD ">Advanced</a>
                </li>
              </ul>
            </nav> */}
            {/* tab 1 */}
            <div className="radio-group" style={{ paddingTop: "10px" }}>
              {resolutionTab == 1 &&
                aspectRatios.map((ratioObj, index) => (
                  <div
                    className="ratio-chip radio-option"
                    key={index}
                    onClick={() => handleRadioChange(ratioObj.value, index)}
                  >
                    <svg
                      class="flex-shrink-0 -ml-1 mr-2 text-c-on-bg group-hover:text-c-primary"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={selectedRatioIndex == index ? "#5858e6" : "none"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {ratioObj.ratio == "1:1" && (
                        <rect
                          x="4"
                          y="4"
                          width="16"
                          height="16"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                      {ratioObj.ratio == "4:5" && (
                        <rect
                          x="5.5"
                          y="4"
                          width="13"
                          height="16"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                      {ratioObj.ratio == "2:3" && (
                        <rect
                          x="6"
                          y="3"
                          width="12"
                          height="18"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                      {ratioObj.ratio == "9:16" && (
                        <rect
                          x="7"
                          y="3"
                          width="10"
                          height="18"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                      {ratioObj.ratio == "3:2" && (
                        <rect
                          x="3"
                          y="6"
                          width="18"
                          height="12"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                      {ratioObj.ratio == "16:9" && (
                        <rect
                          x="3"
                          y="6"
                          width="18"
                          height="12"
                          rx="2"
                          stroke={"var(--text-color)"}
                          stroke-width="1.5"
                        ></rect>
                      )}
                    </svg>

                    <span>{ratioObj.ratio}</span>
                    {/* <input
                      style={{ cursor: "pointer" }}
                      type="radio"
                      id={`radio-${index}`}
                      name="aspectRatio"
                      value={ratioObj.value}
                      checked={selectedRatio === ratioObj.value}
                      onChange={handleRadioChange}
                    /> */}
                  </div>
                ))}
            </div>
            {/* tab 2 */}
            <div style={{ paddingTop: "10px" }}>
              {resolutionTab == 2 && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p htmlFor="widthSlider">
                      Width: <span id="widthValue">{selectedRatioWidth}</span>
                    </p>
                    <input
                      type="range"
                      min="256"
                      max="1024"
                      step="64"
                      value={selectedRatioWidth}
                      id="widthSlider"
                      className="slider-mini"
                      onChange={handleAspectWidthChange}
                    />
                  </div>
                  <div>
                    <p htmlFor="heightSlider">
                      Height:{" "}
                      <span id="heightValue">{selectedRatioHeight}</span>
                    </p>
                    <input
                      type="range"
                      min="256"
                      max="1024"
                      step="64"
                      value={selectedRatioHeight}
                      id="heightSlider"
                      className="slider-mini"
                      onChange={handleAspectHeightChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </Panel>
          <Panel
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-sliders-horizontal"
                >
                  <line x1="21" y1="4" x2="14" y2="4"></line>
                  <line x1="10" y1="4" x2="3" y2="4"></line>
                  <line x1="21" y1="12" x2="12" y2="12"></line>
                  <line x1="8" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="20" x2="16" y2="20"></line>
                  <line x1="12" y1="20" x2="3" y2="20"></line>
                  <line x1="14" y1="2" x2="14" y2="6"></line>
                  <line x1="8" y1="10" x2="8" y2="14"></line>
                  <line x1="16" y1="18" x2="16" y2="22"></line>
                </svg>
                <span style={{ marginLeft: 12 }}>Generation Parameters</span>
              </div>
            }
            key="4"
          >
            <div>
              <p htmlFor="imagesSlider">
                Number of images: <span id="widthValue">{noOfImages}</span>
              </p>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={noOfImages}
                id="imagesSlider"
                className="slider"
                onChange={handlenoOfImagesChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p htmlFor="imagesSlider">
                  Steps: <span id="widthValue">{noOfSteps}</span>
                </p>
                <input
                  type="range"
                  min="1"
                  max="75"
                  step="1"
                  value={noOfSteps}
                  id="imagesSlider"
                  className="slider-mini"
                  onChange={handlenoOfStepsChange}
                />
              </div>
              <div>
                <p htmlFor="imagesSlider">
                  Guidance Scale: <span id="widthValue">{noOfGuidance}</span>
                </p>
                <input
                  type="range"
                  min="1"
                  max="19"
                  step="1"
                  value={noOfGuidance}
                  id="imagesSlider"
                  className="slider-mini"
                  onChange={handlenoOfGuidanceChange}
                />
              </div>
            </div>
            {noOfSteps < 14 && (
              <div className={`box ${isVisible2 ? "visible" : "hidden"}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  <span
                    style={{
                      marginLeft: "4px",
                      color: "#f7f8f8",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Steps
                  </span>
                </div>
                <div className="close-icon" onClick={handleIsVisible2Click}>
                  <svg
                    style={{ color: "white" }}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    color: "#f7f8f899",
                    fontSize: "13px",
                    lineHeight: "150%",
                  }}
                >
                  Low number of steps may result in bad image quality or noise.
                  We recommend 20-25 steps. Learn more here.
                </p>
              </div>
            )}
            {noOfSteps > 35 && (
              <div className={`box ${isVisible2 ? "visible" : "hidden"}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  <span
                    style={{
                      marginLeft: "4px",
                      color: "#f7f8f8",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Steps
                  </span>
                </div>
                <div className="close-icon" onClick={handleIsVisible2Click}>
                  <svg
                    style={{ color: "white" }}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    color: "#f7f8f899",
                    fontSize: "13px",
                    lineHeight: "150%",
                  }}
                >
                  High number of steps may take a while to generate. For fast
                  generations we recommend 20-25 steps. Learn more here.
                </p>
              </div>
            )}
            {noOfGuidance < 6 && (
              <div className={`box ${isVisible3 ? "visible" : "hidden"}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  <span
                    style={{
                      marginLeft: "4px",
                      color: "#f7f8f8",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Guidance scale
                  </span>
                </div>
                <div className="close-icon" onClick={handleIsVisible3Click}>
                  <svg
                    style={{ color: "white" }}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    color: "#f7f8f899",
                    fontSize: "13px",
                    lineHeight: "150%",
                  }}
                >
                  Low guidance scale value may result in bad prompt
                  interpretation. We recommend values in 7-12 range. Learn more
                  here.
                </p>
              </div>
            )}
            {noOfGuidance > 14 && (
              <div className={`box ${isVisible3 ? "visible" : "hidden"}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  <span
                    style={{
                      marginLeft: "4px",
                      color: "#f7f8f8",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Guidance scale
                  </span>
                </div>
                <div className="close-icon" onClick={handleIsVisible3Click}>
                  <svg
                    style={{ color: "white" }}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    color: "#f7f8f899",
                    fontSize: "13px",
                    lineHeight: "150%",
                  }}
                >
                  High guidance scale may result in a loss of quality. We
                  recommend values in 7-12 range. Learn more here.{" "}
                </p>
              </div>
            )}
            <div>
              <p>Seed</p>
              <input
                className="my-input"
                id="prompt"
                name="prompt"
                autocomplete="off"
                placeholder="Blank for random"
                autofocus
                value={noOfSeeds}
                onChange={handleSeedChange}
                // style={{ minHeight: "40px", height: "97px" }}
                spellcheck="false"
              ></input>
            </div>
          </Panel>

          {/* commented in two steps */}
          <Panel
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-settings"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span style={{ marginLeft: 12 }}>Advanced</span>
              </div>
            }
            key="5"
          >
            <div className="controlNet">
              <p>Sampler</p>
              <select
                // defaultValue="dpmsolver++"
                value={selectedScheduler}
                id="scheduler"
                name="scheduler"
                onChange={(e) => handleSchedulerChange(e.target.value)}
              >
                {selectedModel.Name == "Synthica" ? (
                  <>
                    <option value="82cf78dd-6afb-48cc-aca6-14224cca6950">
                      DDIM
                    </option>
                    <option value="b7224e56-1440-43b9-ac86-66d66f9e8c91">
                      P Sampler
                    </option>
                  </>
                ) : (
                  <>
                    <option value="6fb13b76-9900-4fa4-abf8-8f843e034a7f">
                      Euler
                    </option>
                    <option value="af2679a4-dbbb-4950-8c06-c3bb15416ef6">
                      Euler A
                    </option>
                    <option value="9d175114-9a26-4371-861c-729ba9ecb4da">
                      DPM Multistep
                    </option>
                    <option value="55027f8b-f046-4e71-bc51-53d5448661e0">
                      LMS
                    </option>
                  </>
                )}
              </select>
            </div>
            <div className={`box ${isVisible4 ? "visible" : "hidden"}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-lightbulb"
                >
                  <line x1="9" y1="18" x2="15" y2="18"></line>
                  <line x1="10" y1="22" x2="14" y2="22"></line>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                </svg>
                <span
                  style={{
                    marginLeft: "4px",
                    // color: "#f7f8f8",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "100%",
                  }}
                >
                  Sampler
                </span>
              </div>
              <div className="close-icon" onClick={handleIsVisible4Click}>
                <svg
                  style={{ color: "white" }}
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p
                style={{
                  color: "#f7f8f899",
                  fontSize: "13px",
                  lineHeight: "150%",
                }}
              >
                Use DPM-Solver++ for fastest generation.
              </p>
            </div>
            {/* <div className="toggle-box">
              <label class="switch">
                <input type="checkbox" />
                <span class="toggle round"></span>
              </label>
              <p>Skip ControlNet pre-processing</p>
            </div> */}
            {/* <div className="toggle-box">
              <label class="switch">
                <input type="checkbox" />
                <span class="toggle round"></span>
              </label>
              <p>Fix faces (+1 credit/image)</p>
            </div> */}
            <p>
              You can always upscale and enhance faces after generating images
            </p>
          </Panel>
        </Collapse>
        <div className="button-box">
          <span>Need {noOfImages} credits for this generation.</span>
          {loading ? (
            <div style={{ position: "relative" }}>
              <button className="gen-btn">
                Generating {noOfImages} {noOfImages > 1 ? "Images" : "Image"}
              </button>
              <div style={{ position: "absolute", top: 8, right: 10 }}>
                <ReactLoading type="spin" color="#AAFF26" width={30} />
              </div>
            </div>
          ) : (
            <div>
              {auth?.isLoggedIn && (
                <button
                  className="gen-btn"
                  onClick={() =>
                    promptValue
                      ? handlerSubmit()
                      : toastInfo(
                          "Warning",
                          "Text prompt is required for generation"
                        )
                  }
                >
                  Generate {noOfImages} {noOfImages > 1 ? "Images" : "Image"}
                </button>
              )}
              {auth?.isLoggedIn !== true && (
                <button
                  className="gen-btn"
                  onClick={() => {
                    handleConnectWallet();
                  }}
                >
                  Generate {noOfImages} {noOfImages > 1 ? "Images" : "Image"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {openModels && (
        <MainModal
          title={"Select Model"}
          handleClose={() => setIsOpenModels(false)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: " repeat(5,1fr)",
              gridGap: "12px",
              gap: "12px",
              overflow: "hidden",
              padding: "3px",
            }}
          >
            {aiModels?.length > 0 &&
              aiModels.map((model) => {
                return (
                  <div
                    key={model.model_id}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      //   padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        paddingBottom: "100%",
                      }}
                    >
                      <img
                        src={
                          require(`../../assets/images/${model.image_url}`)
                            .default
                        }
                        alt="Model Image"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <div
                        onClick={() => {
                          setIsOpenModels(false);
                          setSelectedModel({
                            Name: model.Name,
                            model_id: model.model_id,
                          });
                        }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          background:
                            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(135,135,135,0) 40%, rgba(255,255,255,0) 100%)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 0,
                        width: "100%",
                        // background: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      <p style={{ margin: 0 }}>{model.Name}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </MainModal>
      )}
      {showConnectWallet && (
        <WalletModal
          title={"My Wallet"}
          handleClose={() => setShowConnectWallet(false)}
        >
          <ConnectWalletForm
            goToSignIn={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            handleClose={() => setShowConnectWallet(false)}
          />
        </WalletModal>
      )}
    </AiScreenStyle>
  );
};

function AiImages() {
  const { toastSuccess, toastInfo } = useToast();
  const [loadingUpscale, setLoadingUpscale] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myImages, setMyImages] = useState([]);
  const [userId, setuserId] = useState(null);
  const { invokeServer } = useGlobal();
  const { auth } = useAuth();
  const location = useLocation();
  const detailPassedfromGallery = location.state;

  const handleClick = (noOfImages, width, height) => {
    setSeconds(1);
    const newBoxes = Array.from({ length: noOfImages }, () => ({
      image_url: "loading",
      width,
      height,
    }));
    setMyImages([...myImages, ...newBoxes]);
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 60) {
          clearInterval(timer);
          return 1;
        }
        return prevSeconds + 0.01;
      });
    }, 10);
  };

  const [seconds, setSeconds] = useState(1);
  const [gridSize, setGridSize] = React.useState(2);
  const [openDetailModal, setopenDetailModal] = React.useState(false);
  const [imageDetail, setimageDetail] = React.useState(null);
  const [generateSimilar, setGenerateSimilar] = React.useState(null);
  const [userGalleries, setUserGalleries] = useState([]);

  useEffect(() => {
    if (detailPassedfromGallery) {
      setGenerateSimilar(detailPassedfromGallery);
    }
  }, [location.state]);

  const handleDetailModal = (obj) => {
    setopenDetailModal(true);
    setimageDetail(obj);
  };

  // get all user images
  const GetAllImages = () => {
    let ac = new AbortController();
    let user = JSON.parse(localStorage.getItem("logInIdV1"));

    if (user?.id) {
      invokeServer("get", `/api/ai_images/user-images?user_id=${user.id}`)
        .then((res) => {
          if (ac.signal.aborted === false) {
            if (res.data.msg === "found") {
              let rr = res.data.items;
              // console.log("res.data.items", res.data.items);
              setMyImages(rr);
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }

    return () => ac.abort();
  };

  useEffect(() => {
    // setLoading(true);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user) {
      setuserId(user?.id);
      GetAllImages();
    } else {
      setMyImages([]);
    }
  }, [auth.isLoggedIn]);
  useEffect(() => {
    // setLoading(true);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user) {
      setuserId(user?.id);
      GetAllImages();
    }
  }, []);

  const items = [
    {
      key: "1",
      label: `Generate`,
      children: (
        <TabOne
          setGeneratedImages={setGeneratedImages}
          generatedImages={generatedImages}
          setLoading={setLoading}
          loading={loading}
          GetAllImages={GetAllImages}
          handleClick={handleClick}
          generateSimilar={generateSimilar}
        />
      ),
    },
  ];
  const getColumns = () => {
    const columns = Array.from({ length: gridSize }, () => []);

    const reversedImages = [...myImages].reverse();

    reversedImages.forEach((image, index) => {
      const shortestColumnIndex = columns.findIndex(
        (column) =>
          column.length === Math.min(...columns.map((col) => col.length))
      );
      columns[shortestColumnIndex].push(image);
    });

    return columns;
  };

  useEffect(() => {
    getColumns();
  }, [myImages]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth > 2400) {
        setGridSize(8);
      } else if (windowWidth > 1700) {
        setGridSize(6);
      } else if (windowWidth > 1400) {
        setGridSize(4);
      } else {
        setGridSize(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // copy text to clip board
  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toastSuccess("Success", "Prompt copied to clipboard");
      console.log("Text copied to clipboard");
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  };
  // download image
  const handleDownloadClick = (fileName) => {
    invokeServer("get", `/api/ai_images/download?fileName=${fileName}`)
      .then((res) => {
        if (res.data.result == 1) {
          toastSuccess("Image Downloaded");
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };
  // delete image
  const handleDeleteImage = (fileName) => {
    invokeServer("get", `/api/ai_images/delete-image?fileName=${fileName}`)
      .then((res) => {
        if (res.data.result == 1) {
          toastSuccess("Image Deleted");
          setopenDetailModal(false);
          GetAllImages();
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };
  // upscale image
  const handleUpscale = (obj) => {
    setLoadingUpscale(true);
    invokeServer(
      "get",
      `/api/ai_images/upscale-image?output_image_id=${obj.output_image_id}&model_id=${obj.model}`
    )
      .then((res) => {
        if (res.data.result == 1) {
          setimageDetail(res.data.updatedImage);
          setLoadingUpscale(false);
          toastSuccess("Image Upscaled");
          // setopenDetailModal(false);
          // GetAllImages();
        }
      })
      .catch((err) => {
        console.log(`${err.message}`);
        setLoadingUpscale(false);
        toastSuccess(err.message);
      });
  };

  // save to gallery handler
  const saveToGallery = (e) => {
    // Perform any desired actions with the gallery name
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    let gallery_id = e.key;
    if (user?.id) {
      invokeServer("put", `/api/gallery/update-gallery`, {
        imageIds: [imageDetail._id],
        galleryId: gallery_id,
      })
        .then(async (r) => {
          await toastSuccess("Moved to gallery");
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }
  };

  const getUserGalleries = () => {
    // Perform any desired actions with the gallery name
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user?.id) {
      invokeServer("get", `/api/gallery/user-galleries?user_id=${user?.id}`)
        .then((r) => {
          let arr = r.data.items?.map((item) => {
            return {
              key: item?._id,
              label: item?.name,
            };
          });
          // let response = r.data.items?.map((item) => {
          //   return {
          //     value: item?._id,
          //     label: item?.name,
          //   };
          // });
          // response = response.concat({ value: "all", label: "All Images" });

          // setMyGalleries(response);

          setUserGalleries(arr);
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }
  };

  useEffect(() => {
    getUserGalleries();
  }, []);

  // download
  const handleDownload = async () => {
    try {
      setLoadingDownload(true);
      invokeServer(
        "get",
        `/api/ai_images/download-image?url=${imageDetail.image_url}`
      )
        .then((base64Image) => {
          setLoadingDownload(false);
          const link = document.createElement("a");
          link.href = `data:image/png;base64,${base64Image.data}`;
          link.download = imageDetail?.fileName;
          link.click();
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
      // const response = await axios.get(imageDetail.image_url, {
      //   responseType: "blob", // Specify the response type as blob
      // });

      // console.log("---url", response);
      // // Create a Blob from the response data
      // const blob = new Blob([response.data], { type: "image/jpeg" });

      // // Create a temporary URL for the Blob
      // const url = window.URL.createObjectURL(blob);

      // // Create a link element
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "Example-Image.jpg";
      // link.target = "_blank";
      // link.rel = "noreferrer";

      // // Programmatically click the link to trigger the download
      // link.click();

      // // Clean up the temporary URL
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <AiScreenStyle>
      <div className="container">
        <div className="left-menu">
          <div className="tabs-header">
            <Tabs defaultActiveKey={1} items={items} />
          </div>
        </div>
        <div className="right-side">
          {loading ? (
            <LoadingScreen>
              {/* <ReactLoading type="cylon" color="#AAFF26" width={120} /> */}
            </LoadingScreen>
          ) : (
            ""
          )}

          <div className="row">
            {myImages.length > 0 &&
              getColumns().map((column, columnIndex) => (
                <div
                  className={`column ${gridSize === 1 ? "single-column" : ""}`}
                  key={columnIndex}
                >
                  {column.map(
                    (image, index) => (
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "4px",
                        }}
                      >
                        {image.image_url === "loading" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: `350px`,
                              border: "1px solid #3c3f44",
                              borderRadius: "14px",
                            }}
                          >
                            <div position="relative">
                              <ReactLoading
                                type="spin"
                                color="var(--text-color)"
                                height={30}
                                width={30}
                              />

                              <p
                                style={{
                                  position: "absolute",
                                  width: "20px",
                                  top: 150,
                                  right: 85,
                                  fontWeight: 700,
                                  color: "var(--text-color)",
                                }}
                              >
                                {seconds.toFixed(1)}s
                              </p>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={image.image_url}
                            style={{
                              width: "100%",
                              cursor: "pointer",
                              borderRadius: "0.5rem",
                            }}
                            alt={`Image ${index}`}
                            key={index}
                            onClick={() => handleDetailModal(image)}
                          />
                        )}
                      </div>
                    )
                    // <img
                    //   src={image.image_url}
                    //   style={{ width: "100%" }}
                    //   alt={`Image ${index}`}
                    //   key={index}
                    // />
                  )}
                </div>
              ))}
            {loading == false && myImages?.length == 0 && (
              <div
                style={{
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <p> No generated images found </p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      {openDetailModal && (
        <DetailPopup
          title={imageDetail?.prompt?.split(" ").slice(0, 5).join(" ")}
          handleClose={() => setopenDetailModal(false)}
          noSearchbar
          width={imageDetail.width}
        >
          <div style={{ display: window.innerWidth > 1000 ? "flex" : null }}>
            {/* right side */}
            <div
              style={{
                // background: " rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                // padding: "20px",
                borderRadius: "14px",
                maxWidth: "900px",
                // minHeight: "350px",
                // maxHeight: "500px",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  // width:"100%"
                  maxWidth: "900px",
                  maxHeight: "83vh",
                  // height: "100%",
                  borderRadius: "8px",
                }}
                src={imageDetail?.image_url}
              />
            </div>
            {/* left side */}
            <div
              style={{
                minWidth: "400px",
                maxWidth: "400px",
                padding: "0 20px",
                maxHeight: "530px",
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: 42,
                    left: 114,
                    zIndex: 1,
                  }}
                  class="w-5 h-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Zm9-3a.75.75 0 0 1 .728.568l.258 1.036a2.63 2.63 0 0 0 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258a2.63 2.63 0 0 0-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.624 2.624 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395a1.5 1.5 0 0 0-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395a1.5 1.5 0 0 0 .948-.948l.395-1.183a.75.75 0 0 1 .71-.513Z"
                    fill="white"
                  ></path>
                </svg>
                {imageDetail.is_upScaled == true ? (
                  <button
                    onClick={() =>
                      toastInfo("Warning", "Image is already upscaled")
                    }
                    class="glow-on-hover"
                    type="button"
                  >
                    Upscaled
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpscale(imageDetail)}
                    class="glow-on-hover"
                    type="button"
                  >
                    Upscale
                  </button>
                )}
                {loadingUpscale && (
                  <div
                    style={{
                      position: "absolute",
                      top: 42,
                      right: 104,
                      zIndex: 1,
                    }}
                  >
                    <ReactLoading type="spin" color="#AAFF26" width={26} />
                  </div>
                )}
              </div>
              {/* <div>
                <button onClick={handleDownload}>Download Image</button>
              </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                }}
              >
                <div className="wrapper2">
                  <svg
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 24,
                    }}
                    class="w-5 h-5 -ml-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.28 3.83c.97.16 1.73.92 1.9 1.9.06.36.58.36.65 0 .16-.98.92-1.74 1.9-1.9.36-.07.36-.6 0-.66a2.31 2.31 0 0 1-1.9-1.9c-.07-.36-.6-.36-.66 0a2.31 2.31 0 0 1-1.9 1.9c-.36.07-.36.6 0 .66Zm11 11c.97.16 1.73.92 1.9 1.9.06.36.58.36.65 0 .16-.98.92-1.74 1.9-1.9.36-.07.36-.6 0-.66a2.31 2.31 0 0 1-1.9-1.9c-.07-.36-.6-.36-.66 0a2.31 2.31 0 0 1-1.9 1.9c-.36.07-.36.6 0 .66Zm1.9-9.1a2.31 2.31 0 0 0-1.9-1.9c-.37-.07-.37-.6 0-.66a2.31 2.31 0 0 0 1.9-1.9c.06-.36.58-.36.65 0 .16.98.92 1.74 1.9 1.9.36.07.36.6 0 .66-.98.16-1.74.92-1.9 1.9-.07.36-.6.36-.66 0Zm-6.64 1.2a2.5 2.5 0 0 1 3.53 3.53l-1.12 1.13-3.54-3.54 1.13-1.12Zm1.44 5.62-8.52 8.52a2.5 2.5 0 0 1-3.53-3.53l8.52-8.52 3.53 3.53Zm-3.53-1.6L3.89 18.5a1.14 1.14 0 0 0 1.61 1.6l7.55-7.55-1.6-1.6Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <a
                    onClick={() => {
                      setGenerateSimilar(imageDetail);
                      setopenDetailModal(false);
                    }}
                  >
                    <span>Generate Similar</span>
                  </a>
                </div>
                <div className="wrapper">
                  <svg
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 18,
                    }}
                    class="w-5 h-5 -ml-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.389 2.171A2.25 2.25 0 0 1 6.25 2h9a2.25 2.25 0 0 1 2.25 2.25v13a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 4 17.25v-13a2.25 2.25 0 0 1 1.389-2.079ZM15.25 3.5h-9a.75.75 0 0 0-.75.75v13a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-13a.75.75 0 0 0-.75-.75Zm3.247 1.127L18.5 6.75v10.504a3.25 3.25 0 0 1-3.25 3.25H6.634a2.25 2.25 0 0 0 2.122 1.5h6.494a4.75 4.75 0 0 0 4.75-4.75V6.75a2.25 2.25 0 0 0-1.503-2.123Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <a onClick={() => handleCopyClick(imageDetail.prompt)}>
                    <span>Copy Prompt</span>
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                  padding: "8px 0",
                  position: "relative",
                }}
              >
                <div className="wrapper">
                  <svg
                    class="w-5 h-5 -ml-0.5"
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 24,
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.828 18.858h12.344a1.029 1.029 0 0 1 .14 2.047l-.14.01H5.828a1.028 1.028 0 0 1-.14-2.047l.14-.01h12.344H5.828ZM11.86 2.41 12 2.4a1.029 1.029 0 0 1 1.019.889l.01.14v10.544l3.092-3.092a1.03 1.03 0 0 1 1.34-.098l.115.098a1.029 1.029 0 0 1 .099 1.34l-.099.115-4.85 4.849a1.028 1.028 0 0 1-1.338.1l-.115-.1-4.85-4.848a1.029 1.029 0 0 1 1.34-1.554l.115.098 3.093 3.094V3.43a1.028 1.028 0 0 1 .889-1.02L12 2.4l-.14.01Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <a onClick={handleDownload}>
                    <span>Download</span>
                  </a>
                </div>
                {loadingDownload && (
                  <div
                    style={{
                      position: "absolute",
                      top: 22,
                      left: 134,
                      zIndex: 1,
                    }}
                  >
                    <ReactLoading type="spin" color="#AAFF26" width={16} />
                  </div>
                )}
                <div className="wrapper">
                  <svg
                    class="w-5 h-5 -ml-0.5"
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 36,
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 1.25A2.75 2.75 0 0 0 7.25 4v.68c-1.6.13-3.1.32-4.4.58a.75.75 0 1 0 .3 1.48c.36-.08.74-.14 1.13-.2l.8 12.7a3.75 3.75 0 0 0 3.74 3.51h6.36a3.75 3.75 0 0 0 3.74-3.52l.8-12.7 1.13.2a.75.75 0 0 0 .3-1.47c-1.3-.26-2.8-.45-4.4-.58V4A2.75 2.75 0 0 0 14 1.25h-4Zm5.25 3.33V4c0-.69-.56-1.25-1.25-1.25h-4c-.69 0-1.25.56-1.25 1.25v.58c2.13-.1 4.37-.1 6.5 0ZM5.77 6.33a58.5 58.5 0 0 1 12.46 0l-.8 12.81a2.25 2.25 0 0 1-2.25 2.11H8.82a2.25 2.25 0 0 1-2.25-2.11l-.8-12.8Zm4.48 2.63a.75.75 0 0 0-1.5.08l.5 9a.75.75 0 1 0 1.5-.08l-.5-9Zm4.3-.7c.4.01.72.37.7.78l-.5 9a.75.75 0 0 1-1.5-.08l.5-9a.75.75 0 0 1 .8-.7Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <a onClick={() => handleDeleteImage(imageDetail.fileName)}>
                    <span>Delete</span>
                  </a>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  gap: 6,
                }}
                className="dropdown-wrapper"
              >
                <Dropdown
                  menu={{
                    onClick: saveToGallery,
                    items: userGalleries.map((item) => {
                      let obj = {
                        key: item?.key,
                        label: (
                          <div
                            style={{
                              position: "relative",
                              padding: "0px 10px",
                            }}
                          >
                            <a>{item?.label}</a>
                          </div>
                        ),
                      };
                      return obj;
                    }),
                  }}
                  placement="bottom"
                >
                  <div className="wrapper2">
                    <svg
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 30,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <a>
                      <span>Move to Gallery</span>
                    </a>
                  </div>
                </Dropdown>
              </div>
              {/* details */}
              <div className="details-list" style={{ padding: "20px 0px" }}>
                <ul>
                  <li>{imageDetail.prompt}</li>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      gap: 30,
                    }}
                  >
                    <li>
                      <span style={{ fontWeight: 400 }}>Size:</span>
                      {imageDetail?.width} x {imageDetail?.height}
                    </li>
                    <li>
                      {" "}
                      <span style={{ fontWeight: 400 }}>Guidance scale:</span>
                      {imageDetail?.guidanceScale}
                    </li>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      gap: 66,
                    }}
                  >
                    <li>
                      <span style={{ fontWeight: 400 }}> Model:</span>{" "}
                      {imageDetail?.modelName}
                    </li>

                    <li>
                      <span style={{ fontWeight: 400 }}>Strength:</span>{" "}
                      {imageDetail?.strength}
                    </li>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      gap: 78,
                    }}
                  >
                    <li>
                      <span style={{ fontWeight: 400 }}>Steps:</span>
                      {imageDetail?.steps}
                    </li>
                    {imageDetail?.seeds && (
                      <li>
                        <span style={{ fontWeight: 400 }}>Seeds:</span>{" "}
                        {imageDetail?.seeds}
                      </li>
                    )}
                  </div>
                  <div>
                    {imageDetail?.negativePromp && (
                      <li>
                        <span style={{ fontWeight: 400 }}>
                          Negative prompt:
                        </span>{" "}
                        {imageDetail?.negativePromp}
                      </li>
                    )}
                  </div>
                  <li>
                    <span style={{ fontWeight: 400 }}> Created:</span>{" "}
                    {formatDate(imageDetail?.createdAt)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DetailPopup>
      )}
    </AiScreenStyle>
  );
}

export default AiImages;
