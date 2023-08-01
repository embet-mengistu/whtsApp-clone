import React, { useEffect, useState } from "react";

import "./sidebarChat.css";
import image from "../../images/profile2.png";
import db from "../../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, addNewChat, name }) {
  const [messages, setMessages] = useState("");

  const createChat = () => {
    const roomName = prompt("please enter name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  // getting the messages and ordering it by desending from
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <img src={image} />

        <div className="sidebarChat_info">
          <h2> {name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
