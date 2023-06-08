import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import "./App.css";
import{useDispatch, useSelector} from "react-redux"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
function App() {
//  const user = null; // if we dont have any user
//  AFTER MAKING REDUX INSTEAD OF USING HARD CODED VALUE WE CAN USE SELECTERS
// WE CAN GET VALUES OUT OF THE STORE USING THE SELECTERS
// THAT WILL GO INSIDE THE STATE AND THEN IN THE USERSLICE AND THEN GET THE USER FROM THE STORE

const user =useSelector(selectUser);
// my above statement is not working so ihave used the latest one

// const user =useSelector(state=>selectUser);
// here select user is the name of the selecter that is mentioned inside the userslice file
// this will give us the user back

  const dispatch = useDispatch();
  // to modify the state now we need do dispatch the login or the logout action
useEffect(()=>{
const unsubscribe= auth.onAuthStateChanged(userAuth =>{
  // this is a listener that listen to the changes in the user authentication

  // as we have modified the reducer so now when the user will change as we have fired the user inside the user state so we can now access the user anywhere in this project



  if(userAuth){
    // logged in
 
    // user auth have many this like name, id , email we need to capture these things and use it
dispatch(login({
  // in this we can pass an object that is setted as a payload inside our state
  uid : userAuth.uid,
  email: userAuth.email,
}
));

  }
  else{
    // logged out
    dispatch(logout());
    // this will set the user back to null
  }
});
return unsubscribe;

// similar way of doing the above one

// return ()=>{
//   unsubscribe();
// // as we dont want to attach the same listener we want it to listen than detach and then listen to the next event
// // so when the cleanup so run the unsubscribe function
// }


// WE CAN GET VALUES OUT OF THE STORE USING THE SELECTERS
// THAT WILL GO INSIDE THE STATE AND THEN IN THE USERSLICE AND THEN GET THE USER FROM THE STORE

},[dispatch]);

  return (
    <div className="app">
      <Router>
        {/* so if no user so need to login first otherwise show the other components like home screen */}

        {!user ? (
          <LoginScreen />
        ) : (
          /* switch make sure it matches to the accurate url */
          /* in mine switch is not working so iused routes */
          /* <Switch> */
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
          /* </Switch> */
        )}
      </Router>
    </div>
  );
}

export default App;
