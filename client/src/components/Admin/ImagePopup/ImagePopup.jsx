import { useState, useRef, useEffect } from "react";
import "./popup.css";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";

// interface image = {
//         blob,
//         frontEndName: file.name,
//         frontEndUrl: URL.createObjectURL(blob),
// }

//todo i need a way to pass the questionId and then check if the question got an Id if yes update if not post the image
const ImagePopup = ({
  onClose,
  Questions,
  currentQuestionIndex,
  setQuestionImage,
}) => {
  // const [isImage,setIsImage] = useState(false)
  //! if image isn't null means image exists my brain is so freaking slow
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();

  // useEffect(()=>{
  //     console.log(currentQuestion)
  // },[currentQuestion])

  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(
    Questions[currentQuestionIndex]
  );

  useEffect(() => {
    setCurrentQuestion(Questions[currentQuestionIndex]);
  }, [currentQuestionIndex, Questions]);

  useEffect(() => {
    if (currentQuestion?.Image !== null) {
        console.log(currentQuestion)
      setImage({
        frontEndName: currentQuestion?.Image,
        frontEndUrl: `/${currentQuestion?.Image}`,
      });
    }
  }, []);

  const selectFile = () => {
    fileInput.current.click();
  };

  const onFileSelect = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".svg"];

    //? getting the file extensino
    const fileExtension = file?.name
      ?.toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (
      file &&
      file.type.startsWith("image/") &&
      allowedExtensions.includes(fileExtension)
    ) {
      const blob = new Blob([file], { type: file.type }); // creating an image blob

      setImage({
        blob,
        frontEndName: file.name,
        frontEndUrl: URL.createObjectURL(blob),
      });
    } else {
      toast.error("please provide a valid Image type (png, jpg,jpeg,svg).");
      setImage(null);
    }
  };

  const handleClose = async () => {
    onClose();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    const allowedExtensions = [".png", ".jpg", ".jpeg", ".svg"];
    const fileExtension = file?.name
      ?.toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (
      file &&
      file.type.startsWith("image/") &&
      allowedExtensions.includes(fileExtension)
    ) {
      const blob = new Blob([file], { type: file.type });
      setImage({
        blob,
        frontEndName: file.name,
        frontEndUrl: URL.createObjectURL(blob),
      });
    } else {
      toast.error("please provide a valid Image type (png, jpg,jpeg,svg).");
      setImage(null);
    }
  };

  //! the updating and image handling logic
  const handleUpdate = async () => {
    if (!image?.frontEndName || !image?.frontEndUrl || !image?.blob) {
      setImage(null);
      toast.info("No current Image");
      return;
    }

    //* creating the formdata that i m gonna upload as image
    const formdata = new FormData();
    formdata.append("image", image.blob);

    //! handle update and post here
    //? the question can have an id or not
    /* 
        ! --> question doesn't have an id means question is being created 
        ?       - drag/browse to select a valid image
        ?       - if user clicks on upload => upload image and set the image name to the corresponding question set the mode to updating image

        ! --> question doesn't has an id means question is being updated
        ?       - drag/browse to select a valid image
        ?       - if user clicks on upload => upload image and set the image name to the corresponding question set the mode to updating image  

        
        
        
        
        
        */
    try {

        // const response = await axios.patch(`/images/{question}`)
        const response = await axios.patch(
          `/images/${currentQuestion?.Id}`,
          formdata
        );
            if (response?.data?.status === "success") {
                if (currentQuestion?.Image) {
                    toast.success("Image updated successfully");
                }
                else{
                    toast.success("Image created successfully");
                }
                console.log(response?.data?.fileInfos?.filename)
                setQuestionImage(
                    currentQuestion.Number,
                    response?.data?.fileInfos?.filename
                );
            }
      }catch (error) {
        if (error?.response?.status === 404) {
            toast.error(error?.response?.data?.message);
            setImage(null);
          } else if (error?.response?.status === 500) {
            toast.error(error?.response?.data?.message);
            setImage(null);
          } else if (error?.response?.status === 401) {
            navigate("/signin", { state: { from: location }, replace: true });
          }
    }
  };

  const handleImageClose = async () => {
    // if question has no id and currentQuestion?.Image === null delete
    if (currentQuestion?.Image) {
      try {
        const response = await axios.delete(
          `/images/${currentQuestion?.Id}`
        );
        if (response?.data?.status === "success") {
          setImage(null);
          setQuestionImage(currentQuestion?.Number, null);
          toast.success("image deleted successfully")
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          toast.error(error?.response?.data?.message);
          setImage(null);
        } else if (error?.response?.status === 500) {
          toast.error(error?.response?.data?.message);
          setImage(null);
        } else if (error?.response?.status === 401) {
          navigate("/signin", { state: { from: location }, replace: true });
        }
      }
    } else {
      setImage(null);
      toast.success("image cleared")

    }
  };
  return (
    <div className="app__imagepopup">
      <div className="title-pannel">
        <div className="title">
          Upload Image <span>Q{currentQuestion.Number}</span>
        </div>
        <span className="material-symbols-rounded" onClick={handleClose}>
          close
        </span>
      </div>
      <div className="divider" />
      <div className="container">
        <div
          className="left"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging ? (
            <span className="select">Drop image here</span>
          ) : (
            <>
              Drag & Drop image here or{" "}
              <span
                className="select"
                style={{ fontWeight: "500" }}
                onClick={selectFile}
              >
                Browse
              </span>
            </>
          )}
          {/* only allowed files are png jpeg and svg+xml */}
          <input
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            ref={fileInput}
            onChange={onFileSelect}
            className="file"
          />
        </div>
        <div className="vline" />
        <div className="right">
          <div style={{opacity:!image ? 0 : 1}} className="shown-result">
            <span
              className="material-symbols-rounded close"
              onClick={handleImageClose}
            >
              close
            </span>
            {/* {console.log(image.frontEndUrl)} */}
            {image && <img src={image.frontEndUrl.includes("blob") ? image.frontEndUrl : `${process.env.REACT_APP_API_ENDPOINT}/${image.frontEndUrl}`} />}
          </div>
        </div>
      </div>
      {
        <button className="upload" onClick={handleUpdate}>
          Upload image
        </button>
      }
    </div>
  );
};

export default ImagePopup;
