import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./sidebarChat.style.css";
import { useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import db from "../firebase/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const SidebarChat = ({ id, chatName }) => {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    const messageRef = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(messageRef, (snapshot) => {
      setChatInfo(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, [id]);
  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.data.photo} />
      <div className="sidebarChat__info">
        <h3> {chatName}</h3>
        <p>{chatInfo[0]?.data.message}</p>
        <small>
          {" "}
          {new Date(chatInfo[0]?.data.timestamp?.toDate())
            .toLocaleString()
            .slice(11)}
        </small>
      </div>
    </div>
  );
};

export default SidebarChat;
