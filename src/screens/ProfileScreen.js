import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Nav from "../Nav";
import { auth } from "../firebase";
import "./ProfileScreen.css";
import PlansScreen from "./PlansScreen";
function ProfileScreen() {
  const user = useSelector(selectUser);

  // by this use selector we will get all the information of the user inside the redux that we have passed earlier like the name , email and password
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://th.bing.com/th/id/OIP.RVrOPD5JrRGgryrmR6bLKAAAAA?w=146&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
            alt="avatar"
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => auth.signOut()}
                // this is a logout function from the firebase
                // it will now go inside the app.js and there is no user so logout and now it go in redux and set user to null
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
