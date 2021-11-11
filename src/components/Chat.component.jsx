import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { DockOutlined, MicNone } from "@mui/icons-material";
import FlipMove from "react-flip-move";
import Message from "./Message.component";
import { selectChatName, selectChatId } from "../redux/chatSlice.js";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import "./chat.style.css";
import {
  collection,
  query,
  serverTimestamp,
  addDoc,
  onSnapshot,
  orderBy,
} from "@firebase/firestore";
import db from "../firebase/firebase";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const sendMessage = async (e) => {
    e.preventDefault();
    // using firebase
    const messageChatRef = collection(db, "chats", chatId, "messages");

    await addDoc(messageChatRef, {
      timestamp: serverTimestamp(),
      message: input,
      email: user.email,
      photo: user.photo,
      uid: user.uid,
      displayName: user.displayName,
    });

    setInput("");
  };

  useEffect(() => {
    if (chatId) {
      const messagesData = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(messagesData, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    }
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* chat messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map((message) => {
            return <Message key={message.id} contents={message.data} />;
          })}
        </FlipMove>
      </div>
      {/* chat input */}
      <div className="chat__input">
        <form>
          <input
            type="text"
            placeholder="iMessage"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}> Send Message</button>
        </form>
        <IconButton>
          <MicNone className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
