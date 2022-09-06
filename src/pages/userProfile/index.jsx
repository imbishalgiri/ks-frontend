import Appbar from "../../components/appbar";
import "./styles.css";

const UserProfile = () => {
  return (
    <>
      <Appbar />
      <div className="parent">
        <div className="left-div">
          <div className="image-parent">
            <img src="https://via.placeholder.com/150" />
          </div>
          <div className="name">I am name</div>
        </div>

        <div className="right-div">
          <div className="heading-side">
            Heyyy welcome to the profile page !!!
          </div>
          <div className="right-body">
            <div className="rbc">hi there</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
