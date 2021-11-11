import React from "react";
import "./imessage.style.css";
import Sidebar from "./Sidebar.component";
import Chat from "./Chat.component";

const Imessage = () => {
  return (
    <div className="imessage">
      {/* Sidebar */}
      <Sidebar />
      {/* Chat */}
      <Chat />
    </div>
  );
};

export default Imessage;
