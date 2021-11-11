import React, { forwardRef } from "react";
import { Avatar } from "@mui/material";
import "./message.style.css";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Message = forwardRef(({ id, contents }, ref) => {
  const user = useSelector(selectUser);
  return (
    <div
      ref={ref}
      className={`message ${
        user.email === contents.email && "message__sender"
      }`}
    >
      <Avatar className="message__photo" src={contents.photo} />
      <p>{contents.message}</p>
      <small>{new Date(contents.timestamp?.toDate()).toLocaleString()}</small>
    </div>
  );
});

export default Message;
