import React, { useState, useEffect } from "react";
import {
  GalleryDesign,
  Button as MyButton,
  GreenButton,
  AddGalleryModel,
  RedButton,
} from "./styles";
import { useGlobal } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import DetailPopup from "./DetailPopup";
import { useNavigate } from "react-router-dom";

// import { RMIUploader } from "react-multiple-image-uploader";

import { LoadingScreen } from "./styles";
import ReactLoading from "react-loading";
import MainModal from "./Popup";
import { Select } from "antd";
import { Button, Dropdown, Input } from "antd";
import useToast from "../../hooks/useToast";
import "./menustyle.css";
import { SearchOutlined } from "@ant-design/icons";
function Index() {
  const { invokeServer } = useGlobal();
  const { auth } = useAuth();
  const navigate = useNavigate();

  let dataSources = [
    {
      id: 1,
      dataURL: "https://picsum.photos/seed/1/600",
    },
    {
      id: 2,
      dataURL: "https://picsum.photos/seed/2/600",
    },
    {
      id: 3,
      dataURL: "https://picsum.photos/seed/3/600",
    },
    {
      id: 4,
      dataURL: "https://picsum.photos/seed/4/600",
    },
    {
      id: 5,
      dataURL: "https://picsum.photos/seed/5/600",
    },
    {
      id: 6,
      dataURL: "https://picsum.photos/seed/6/600",
    },
  ];

  const [isLoading, setisLoading] = useState(false);
  const [myImages, setMyImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openMyGalleries, setOpenMyGalleries] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [userGalleries, setUserGalleries] = useState([]);
  const [userId, setuserId] = useState(null);
  const [myGalleries, setMyGalleries] = useState([]);
  const [uploadedImages, setuploadedImages] = useState(dataSources);
  const { toastError, toastSuccess, toastInfo } = useToast();

  const [searchValue, setSearchValue] = useState("");

  // detail modal on images
  const [gridSize, setGridSize] = React.useState(2);
  const [openDetailModal, setopenDetailModal] = React.useState(false);
  const [imageDetail, setimageDetail] = React.useState(null);
  const [generateSimilar, setGenerateSimilar] = React.useState(null);
  const [loadingUpscale, setLoadingUpscale] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

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

  const handleDetailModal = (obj) => {
    console.log("image", obj);

    setopenDetailModal(true);
    setimageDetail(obj);
  };
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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
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

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleSearchClick = () => {
    performSearch();
  };

  const performSearch = () => {
    // Handle the search functionality with the searchValue
    console.log(searchValue);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user?.id) {
      invokeServer(
        "get",
        `/api/ai_images/search-image?user_id=${user?.id}&prompt=${searchValue}`
      )
        .then((r) => {
          console.log("---------------searched this row", r);
          if (r.data.length > 0) {
            const reversedImages = [...r.data].reverse();

            setMyImages(reversedImages);
          } else {
            setMyImages([]);
          }
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }
  };

  // gallery filter
  const handleChange = (value) => {
    if (value === "all") {
      GetAllImages();
    } else {
      let user = JSON.parse(localStorage.getItem("logInIdV1"));
      if (user?.id) {
        invokeServer(
          "get",
          `/api/gallery/images-in-gallery/${user?.id}/${value}`
        )
          .then((r) => {
            setMyImages(r.data);
          })
          .catch((err) => {
            console.log(`${err.message}`);
          });
      }
    }
  };

  // gallery delete
  const deleteGallery = (value) => {
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user?.id) {
      invokeServer("get", `/api/gallery/delete-gallery/${user?.id}/${value}`)
        .then((r) => {
          console.log("---------------delete this row", r);

          getUserGalleries();
          toastSuccess("Gallery Deleted");
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }
  };
  // Image delete
  const deleteImages = () => {
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user?.id) {
      invokeServer("put", `/api/gallery/delete-images`, {
        imageIds: selectedImages,
      })
        .then(async (r) => {
          await toastSuccess("Deleted Successfully");
          setSelectedImages([]);
          GetAllImages();
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
    }
  };

  const hideModel = () => {
    setIsPopupOpen(false);
  };

  const handleGalleryNameChange = (e) => {
    setGalleryName(e.target.value);
  };

  const handleCreateGallery = () => {
    // Perform any desired actions with the gallery name
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    invokeServer(
      "get",
      `/api/gallery/create-gallery?name=${galleryName}&id=${user.id}`
    )
      .then(async (r) => {
        getUserGalleries();
        await toastSuccess("New Gallery Created");
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
    // Close the popup
    setIsPopupOpen(false);
  };

  const handleGenrateSimilar = (imageDetail) => {
    console.log("imageDetail", imageDetail);
    setGenerateSimilar(imageDetail);
    setopenDetailModal(false);
    navigate("/ai-images", { state: imageDetail });
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
          let response = r.data.items?.map((item) => {
            return {
              value: item?._id,
              label: item?.name,
            };
          });
          response = response.concat({ value: "all", label: "All Images" });

          setMyGalleries(response);

          setUserGalleries(arr);
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
      // Close the popup
      setIsPopupOpen(false);
    }
  };
  const saveToGallery = (e) => {
    // Perform any desired actions with the gallery name
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    let gallery_id = e.key;
    if (user?.id) {
      invokeServer("put", `/api/gallery/update-gallery`, {
        imageIds: selectedImages,
        galleryId: gallery_id,
      })
        .then(async (r) => {
          await toastSuccess("Moved to gallery");
          setSelectedImages([]);
          GetAllImages();
        })
        .catch((err) => {
          console.log(`${err.message}`);
        });
      // Close the popup
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    GetAllImages();
  }, [auth?.isLoggedIn]);

  const GetAllImages = () => {
    let ac = new AbortController();
    let user = JSON.parse(localStorage.getItem("logInIdV1"));

    if (user?.id) {
      invokeServer("get", `/api/ai_styles/user-images?user_id=${user.id}`)
        .then((res) => {
          if (ac.signal.aborted === false) {
            if (res.data.msg === "found") {
              let rr = res.data.items;
              // console.log("user images", rr);
              const reversedImages = [...rr].reverse();
              setMyImages(reversedImages);
              setisLoading(false);
            }
          }
          setisLoading(false);
        })
        .catch((err) => {
          console.log(`${err.message}`);
          setisLoading(false);
        });
    } else {
      setMyImages([]);
    }

    return () => ac.abort();
  };

  useEffect(() => {
    setisLoading(true);
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    if (user) {
      setuserId(user?.id);
    }

    GetAllImages();
  }, []);

  useEffect(() => {
    getUserGalleries();
  }, []);

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

  // user uploaded images to gallery
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [moveImagetoGallery, setmoveImagetoGallery] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
    setImagesToUpload([]);
    setmoveImagetoGallery(null);
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);
    setImagesToUpload((prevImages) => [...prevImages, ...newImages]);
  };
  const handleImageDrop = (event) => {
    event.preventDefault();
    setIsDragging(false); // Set isDragging to false after dropping the files
    const files = event.dataTransfer.files;
    const newImages = Array.from(files);
    setImagesToUpload((prevImages) => [...prevImages, ...newImages]);
  };

  const RemoveImage = (index) => {
    setImagesToUpload((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  // Function to generate a random string
  const generateRandomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  // Function to get the file extension from the filename
  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const handleImageSubmit = () => {
    let user = JSON.parse(localStorage.getItem("logInIdV1"));
    console.log("user images", imagesToUpload);

    // Pass the selected images to a function as files
    if (imagesToUpload?.length < 1) {
      toastSuccess("warning", "No image selected");
    } else {
      const formData = new FormData();
      const currentDate = new Date();

      // Format the current date and time as desired
      const formattedDate = currentDate.toISOString().replace(/[-:.T]/g, "");

      // imagesToUpload.forEach((image, index) => {
      //   formData.append(`images`, image, `image${formattedDate}.jpg`);
      // });

      for (let i = 0; i < imagesToUpload.length; i++) {
        const file = imagesToUpload[i];
        const uniqueName = `${Date.now()}_${generateRandomString(
          8
        )}.${getFileExtension(file.name)}`;
        formData.append("images", file, uniqueName);
      }

      if (user?.id) {
        setisLoading(true);
        invokeServer(
          "post",
          `/api/ai_images/upload-to-gallery?user_id=${user.id}&gallery_id=${moveImagetoGallery}`,
          formData
        )
          .then((res) => {
            if (res.data.result === 1) {
              console.log("user images response", res);
              setisLoading(false);
              setVisible(false);
              setImagesToUpload([]);
              GetAllImages();
              if (res.data.images.length === 1) {
                toastSuccess("Info", "Image uploaded successfully");
              } else if (res.data.images.length > 1) {
                toastSuccess("Info", "Images uploaded successfully");
              }
            }

            setisLoading(false);
          })
          .catch((err) => {
            console.log(`${err.message}`);
          });
      } else {
        console.log("login required");
      }
    }
  };

  const handleGalleryChange = (value) => {
    setmoveImagetoGallery(value);
  };

  // testing new design

  const getColumns = () => {
    const columns = Array.from({ length: gridSize }, () => []);

    // const reversedImages = [...myImages].reverse();
    const reversedImages = [...myImages];

    reversedImages.forEach((image, index) => {
      const shortestColumnIndex = columns.findIndex(
        (column) =>
          column.length === Math.min(...columns.map((col) => col.length))
      );
      columns[shortestColumnIndex].push(image);
    });
    console.log(" getColumns()", columns);
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

  // End testing new design

  return (
    <GalleryDesign>
      {selectedImages?.length == 0 ? (
        <div
          className="filters"
          // style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          //   width: "100%",
          //   padding: "10px 20px",
          // }}
        >
          {userGalleries?.length > 0 && (
            <div
              className="sub-filters1"
              style={
                {
                  // display: "flex",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  // width: "480px",
                }
              }
            >
              <Select
                // showSearch
                placeholder="Select a Gallery"
                style={{
                  width: 220,
                }}
                onChange={handleChange}
                options={myGalleries}
              />
              <div className="search-outer">
                <div className="search">
                  <Input
                    size="large"
                    placeholder="Search by prompt"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleEnterKey}
                  />
                </div>
                <SearchOutlined onClick={handleSearchClick} />
                {/* <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearchClick}
                /> */}
              </div>
            </div>
          )}
          {userId && (
            <div
              className="sub-filters2"

              // style={{
              //   display: "flex",
              //   justifyContent: "space-between",
              //   width: "460px",
              // }}
            >
              <MyButton onClick={() => setOpenMyGalleries(true)}>
                My Galleries
                <svg
                  style={{ color: "var(--text-color)" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  height="22px"
                  fill="currentColor"
                  class="bi bi-list-stars"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                    fill="var(--text-color)"
                  ></path>{" "}
                  <path
                    d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"
                    fill="var(--text-color)"
                  ></path>{" "}
                </svg>
              </MyButton>
              <MyButton onClick={() => setIsPopupOpen(true)}>
                Create Gallery
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  height="22px"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    fill="var(--text-color)"
                  ></path>
                  <path
                    d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                    fill="var(--text-color)"
                  ></path>
                </svg>
              </MyButton>
              <MyButton onClick={() => handleSetVisible()}>
                Upload
                <svg
                  fill="currentColor"
                  viewBox="0 0 1024 1024"
                  width="26px"
                  height="26px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="var(--text-color)"
                    d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
                  ></path>
                </svg>
              </MyButton>
              {/* React component to upload images to gallery */}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            id="my-dropdown"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              // width: "100%",
              padding: "10px 20px",
            }}
          >
            <Dropdown
              className="my-dd"
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
              <GreenButton>
                Move to Gallery
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    fill="white"
                  ></path>
                  <path
                    d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                    fill="white"
                  ></path>
                </svg>
              </GreenButton>
            </Dropdown>
          </div>
          <RedButton onClick={() => deleteImages()}>
            Delete
            <svg
              style={{ color: "white", cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                fill="var(--text-color)"
              ></path>{" "}
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                fill="var(--text-color)"
              ></path>{" "}
            </svg>
          </RedButton>
        </div>
      )}

      {isLoading && (
        <LoadingScreen>
          <ReactLoading type="cylon" color="#AAFF26" width={120} />
        </LoadingScreen>
      )}
      <div className="right-side">
        <div className="row">
          {/* {console.log("myImages", myImages)}
        {console.log("myImages reverse", myImages?.reverse())} */}
          {myImages?.length > 0
            ? getColumns().map((column, columnIndex) => {
                return (
                  <div
                    className={`column ${
                      gridSize === 1 ? "single-column" : ""
                    }`}
                    key={columnIndex}
                  >
                    {column.map(
                      (image, index) => {
                        const isSelected = selectedImages.includes(image?._id);

                        const handleClick = () => {
                          if (isSelected) {
                            // Remove the image ID from the array
                            setSelectedImages((prevState) =>
                              prevState.filter((id) => id !== image._id)
                            );
                          } else {
                            // Add the image ID to the array
                            setSelectedImages((prevState) => [
                              ...prevState,
                              image._id,
                            ]);
                          }
                        };
                        return (
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
                                    {/* {seconds.toFixed(1)} */}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{ position: "relative", width: "100%" }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: 99,
                                    top: 10,
                                    right: 10,
                                    // display: "flex",
                                    // alignItems: "center",
                                    // justifyContent: "space-between",
                                    // width: "50px",
                                  }}
                                >
                                  <div
                                    onClick={() => handleClick()}
                                    class="checkbox-wrapper-12"
                                  >
                                    <div class="cbx">
                                      <input
                                        id={`cbx-${image._id}`}
                                        type="checkbox"
                                        checked={isSelected}
                                        readOnly
                                      />
                                      <label
                                        htmlFor={`cbx-${image._id}`}
                                      ></label>
                                      <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                      >
                                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                                      </svg>
                                    </div>
                                    {/* <!-- Gooey--> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      version="1.1"
                                    >
                                      <defs>
                                        <filter id="goo-12">
                                          <fegaussianblur
                                            in="SourceGraphic"
                                            stddeviation="4"
                                            result="blur"
                                          ></fegaussianblur>
                                          <fecolormatrix
                                            in="blur"
                                            mode="matrix"
                                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                            result="goo-12"
                                          ></fecolormatrix>
                                          <feblend
                                            in="SourceGraphic"
                                            in2="goo-12"
                                          ></feblend>
                                        </filter>
                                      </defs>
                                    </svg>
                                  </div>
                                  {/* heart icon for favorite */}
                                  {/* <div>
                        <svg
                          style={{
                            color: "var(--text-color)",
                            cursor: "pointer",
                            marginTop: "6px",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="var(--text-color)"
                          class="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                            fill="var(--text-color)"
                          ></path>{" "}
                        </svg>
                      </div> */}
                                </div>

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
                              </div>
                            )}
                          </div>
                        );
                      }
                      // <img
                      //   src={image.image_url}
                      //   style={{ width: "100%" }}
                      //   alt={`Image ${index}`}
                      //   key={index}
                      // />
                    )}
                  </div>
                );
              })
            : // commenting for testing
              // myImages?.map((item) => {
              //     const isSelected = selectedImages.includes(item?._id);

              //     const handleClick = () => {
              //       if (isSelected) {
              //         // Remove the image ID from the array
              //         setSelectedImages((prevState) =>
              //           prevState.filter((id) => id !== item._id)
              //         );
              //       } else {
              //         // Add the image ID to the array
              //         setSelectedImages((prevState) => [...prevState, item._id]);
              //       }
              //     };
              //     return (
              //       <div style={{ position: "relative", width: "300px" }}>
              //         <div
              //           style={{
              //             position: "absolute",
              //             zIndex: 99,
              //             top: 10,
              //             right: 10,
              //             // display: "flex",
              //             // alignItems: "center",
              //             // justifyContent: "space-between",
              //             // width: "50px",
              //           }}
              //         >
              //           <div
              //             onClick={() => handleClick()}
              //             class="checkbox-wrapper-12"
              //           >
              //             <div class="cbx">
              //               <input
              //                 id={`cbx-${item._id}`}
              //                 type="checkbox"
              //                 checked={isSelected}
              //                 readOnly
              //               />
              //               <label htmlFor={`cbx-${item._id}`}></label>
              //               <svg
              //                 width="22"
              //                 height="22"
              //                 viewBox="0 0 16 16"
              //                 fill="none"
              //               >
              //                 <path d="M2 8.36364L6.23077 12L13 2"></path>
              //               </svg>
              //             </div>
              //             {/* <!-- Gooey--> */}
              //             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              //               <defs>
              //                 <filter id="goo-12">
              //                   <fegaussianblur
              //                     in="SourceGraphic"
              //                     stddeviation="4"
              //                     result="blur"
              //                   ></fegaussianblur>
              //                   <fecolormatrix
              //                     in="blur"
              //                     mode="matrix"
              //                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              //                     result="goo-12"
              //                   ></fecolormatrix>
              //                   <feblend in="SourceGraphic" in2="goo-12"></feblend>
              //                 </filter>
              //               </defs>
              //             </svg>
              //           </div>
              //           {/* heart icon for favorite */}
              //           {/* <div>
              //           <svg
              //             style={{
              //               color: "var(--text-color)",
              //               cursor: "pointer",
              //               marginTop: "6px",
              //             }}
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="22"
              //             height="22"
              //             fill="var(--text-color)"
              //             class="bi bi-heart"
              //             viewBox="0 0 16 16"
              //           >
              //             {" "}
              //             <path
              //               d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              //               fill="var(--text-color)"
              //             ></path>{" "}
              //           </svg>
              //         </div> */}
              //         </div>
              //         {/* {console.log("image url", item?.image_url)} */}
              //         <img
              //           // crossorigin="anonymous"
              //           src={item?.image_url}
              //           alt="my nft image"
              //           style={{ width: "300px" }}
              //           onClick={() => handleDetailModal(item)}
              //           // class="gallery__image"
              //           // className={`gallery__image ${isSelected ? "selected" : ""}`}
              //         />
              //       </div>
              //     );
              // })
              // end
              isLoading === false && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100vw",
                    textAlign: "center",
                    color: "white",
                    fontSize: "18px",
                    padding: "100px 0",
                    fontWeight: 500,
                  }}
                >
                  No Images Found
                </div>
              )}
        </div>
      </div>

      {isPopupOpen && (
        <MainModal
          title={"Create Your Gallery"}
          handleClose={() => setIsPopupOpen(false)}
        >
          <AddGalleryModel>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                placeholder="Enter gallery name"
                value={galleryName}
                onChange={handleGalleryNameChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="red-btn" onClick={hideModel}>
                Cancel
              </button>
              <button className="green-btn" onClick={handleCreateGallery}>
                Create
              </button>
            </div>
          </AddGalleryModel>
        </MainModal>
      )}
      {openMyGalleries && (
        <MainModal
          title={"My Galleries"}
          handleClose={() => setOpenMyGalleries(false)}
        >
          {/* <AddGalleryModel> */}
          {myGalleries.length > 0 &&
            myGalleries.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ lineHeight: "20px" }}>{item.label}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "80px",
                    }}
                  >
                    {/* <svg
                      style={{ color: "white", cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                        fill="var(--text-color)"
                      ></path>{" "}
                    </svg> */}
                    <svg
                      onClick={() => deleteGallery(item?.value)}
                      style={{ color: "white", cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        fill="var(--text-color)"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        fill="var(--text-color)"
                      ></path>{" "}
                    </svg>
                  </div>
                </div>
              );
            })}

          {/* </AddGalleryModel> */}
        </MainModal>
      )}
      {visible && (
        <MainModal
          title={"Upload Your Images"}
          handleClose={() => setVisible(false)}
          width="80vw"
          height="500px"
        >
          <div style={{ padding: "0 10px" }}>
            <div style={{ display: "flex", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  id="imageInput"
                  style={{ display: "none" }}
                />
                <label htmlFor="imageInput">
                  <div
                    onDrop={handleImageDrop}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    className={isDragging ? "drop-zone" : ""} // Add a CSS class for highlighting when files are dragged over
                    style={{
                      border: "2px dashed gray",
                      borderRadius: "14px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      height: "300px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      style={{ color: "var(--text-color)", width: "100px" }}
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="var(--text-color)"
                        d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
                      ></path>
                    </svg>
                    <span>Click or drag and drop images here</span>
                  </div>
                </label>
                <Select
                  // showSearch
                  placeholder="Select a Gallery"
                  style={{
                    width: 220,
                  }}
                  onChange={handleGalleryChange}
                  options={myGalleries}
                />
                <MyButton onClick={handleImageSubmit}>Upload Images</MyButton>
              </div>
              <div
                // className="images-wrapper"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                  height: "400px",
                  maxHeight: "400px",
                  overflowY: "scroll",
                  width: "100%",
                  padding: "16px 0",
                  // border: "2px dashed gray",
                }}
              >
                {imagesToUpload.map((image, index) => (
                  <div style={{ maxWidth: "226px", position: "relative" }}>
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                      style={{ width: "200px" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 10,
                        top: -6,
                        zIndex: 22,
                      }}
                    >
                      <svg
                        onClick={() => RemoveImage(index)}
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="white"
                        class="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        {" "}
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                          fill="rgb(255,77,79)"
                        ></path>{" "}
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <RMIUploader
            // isOpen={visible}
            hideModal={hideModal}
            onSelect={() => onSelect()}
            onUpload={onUpload}
            onRemove={onRemove}
            dataSources={uploadedImages}
          /> */}
        </MainModal>
      )}

      {/* image detail modal */}
      {openDetailModal && (
        <DetailPopup
          title={imageDetail?.prompt?.split(" ").slice(0, 5).join(" ")}
          handleClose={() => setopenDetailModal(false)}
          noSearchbar
          width={imageDetail?.width}
        >
          {imageDetail?.prompt ? (
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
                  {imageDetail?.is_upScaled == true ? (
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
                        handleGenrateSimilar(imageDetail);
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
          ) : (
            <div
              style={{
                // background: " rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                // padding: "20px",
                borderRadius: "14px",
                maxWidth: "100%",
                // minHeight: "350px",
                // maxHeight: "500px",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                  // maxWidth: "900px",
                  maxHeight: "83vh",
                  // height: "100%",
                  borderRadius: "8px",
                }}
                src={imageDetail?.image_url}
              />
            </div>
          )}
        </DetailPopup>
      )}
    </GalleryDesign>
  );
}

export default Index;
