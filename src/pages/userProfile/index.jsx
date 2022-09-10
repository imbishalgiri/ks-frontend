import { CircularProgress, IconButton } from "@material-ui/core";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaFile, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../apis/axios";
import Appbar from "../../components/appbar";
import { getUser } from "../../redux/authSlices";
import "./styles.css";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { requestedUser, user } = useSelector((state) => state?.auth);

  const hiddenFileInput = useRef();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploased] = useState(false);

  // fetching user here
  useEffect(() => {
    id && dispatch(getUser(id));
  }, [id]);

  const handlePicClick = (event) => {
    hiddenFileInput.current.click();
  };

  const isMyProfile = () => id === user?._id;

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("_id", id);
    setIsUploading(true);
    AxiosInstance.put("/users/update", formData)
      .then((data) => {
        toast.success("profile picture changed");
        setIsUploading(false);
        setIsUploased(true);
      })
      .catch((err) => {
        toast.error("error uploading image");
      });
  };

  return (
    <>
      <Appbar />
      <div className="parent">
        {requestedUser?.userfetching ? (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="left-div">
              <div
                className="image-parent"
                onClick={isMyProfile() && handlePicClick}
              >
                <img
                  className="image-child"
                  src={`${
                    (image && URL.createObjectURL(image)) ||
                    requestedUser?.user?.avatar ||
                    "https://placehold.jp/626c62/ffffff/150x150.png?text=KS%20USER"
                  }`}
                />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                {isMyProfile() && (
                  <div className="change-photo">Change Photo</div>
                )}
              </div>
              <div className="name">
                {requestedUser?.user?.firstName +
                  " " +
                  requestedUser?.user?.lastName}
              </div>
              <br />
              {requestedUser?.user?.createdAt && (
                <small style={{ color: "#ddd" }}>
                  Joined {moment(requestedUser?.user?.createdAt).fromNow()}
                </small>
              )}

              <br />
              {image && !isUploaded && (
                <div className="upload-btn-profile">
                  <IconButton
                    style={{
                      background: "rgb(146, 146, 168)",
                      marginTop: "20px",
                    }}
                    onClick={handleUpload}
                  >
                    {!isUploading && <FaUpload style={{ color: "#fff" }} />}
                    {isUploading && (
                      <CircularProgress style={{ color: "#3d28b6" }} />
                    )}
                  </IconButton>
                </div>
              )}
            </div>

            <div className="right-div">
              <div className="heading-side">
                Heyyy welcome to the profile page of{" "}
                {requestedUser?.user?.firstName +
                  " " +
                  requestedUser?.user?.lastName}{" "}
                !!!
              </div>
              <div className="right-body">
                <div
                  className="rbc"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ margin: "5px 100px" }}>
                    <strong style={{ marginRight: "10px" }}> Email:</strong>{" "}
                    {requestedUser?.user?.email}
                  </div>
                  <div style={{ margin: "5px 100px" }}>
                    <strong style={{ marginRight: "10px" }}> Faculty:</strong>{" "}
                    {requestedUser?.user?.faculty}
                  </div>
                  <div style={{ margin: "5px 100px" }}>
                    <strong style={{ marginRight: "10px" }}> Semester:</strong>{" "}
                    {requestedUser?.user?.semester}
                  </div>
                  <div style={{ margin: "5px 100px" }}>
                    <strong style={{ marginRight: "10px" }}> Role:</strong>{" "}
                    {requestedUser?.user?.role}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
