import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
function Nav() {
  // this function is hel;ping in the hiding and showing the navbar ass we scroll down it will disappear
  const [show, handleShow] = useState(false);
// to make it avatar to link to the profilescrren we can use usehistory of eact but now its updated to use navigate
// so it will push new page in the history
// use history is use navigate now

const history=useNavigate();





  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      // so if we scrolled more than 100 so so it will show the navbar
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
    // this return statement is the cleanup functiuon and remove that function that is attached to the listener
    // we alwas dont need a cleanup but it is a good practice
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      {/* so it will onlyy render the navblack class when the show function is true */}

      <div className="nav_contents">
        {/* here it will navigate to the original page */}
        <img
         onClick={()=>{
          history("/")
        }}
          className="nav_logo"
          //   src="https://variety.com/wp-content/uploads/2020/05/netflix-logo.png?w=1024"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        {/* by use navigate we can push the page in the navigate stack and we can now go back if we want without reloading */}
        
        <img
        onClick={()=>{
          history("/profile")
        }}
          className="nav_avatar" 
          // src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          src="https://th.bing.com/th/id/OIP.RVrOPD5JrRGgryrmR6bLKAAAAA?w=146&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
