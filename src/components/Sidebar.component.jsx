import React, { useState, useEffect } from "react";
import "./sidebar.style.css";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { RateReviewOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat.component";
import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import db from "../firebase/firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    onSnapshot(collection(db, "chats"), (snapShot) => {
      setChats(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  console.log("reRender");

  const addChat = async () => {
    const chatRomName = prompt("Please enter a chat rom name");
    if (chatRomName) {
      try {
        await addDoc(collection(db, "chats"), {
          chatName: chatRomName,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const signOutHandler = () => {
    signOut(auth)
      .then((res) => {
        alert("Sign Out Successful");
      })
      .catch((err) => {
        alert("Sign Out Fail");
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          onClick={signOutHandler}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton
          onClick={addChat}
          variant="outlined"
          className="sidebar__inputButton"
        >
          <RateReviewOutlined />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => {
          return <SidebarChat key={id} id={id} chatName={chatName} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
