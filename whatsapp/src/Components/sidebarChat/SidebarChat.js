import React, { useEffect, useState } from "react";

import "./sidebarChat.css";
import image from "../../images/profile2.png";
import db from "../../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, addNewChat, name }) {
  const [messages, setMessages] = useState("");

  const createChat = () => {
    // when clicked in add new chat it pops up a message with and input from
    const roomName = prompt("please enter name for chat room");
    // roomName is the one typed on the form
    if (roomName) {
      // if there is a roomname add the name to db in rooms-name collections(automitcally with generate id)
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  // getting the messages and ordering it by desending from(so that we can diplay the latest messgage)
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
    // when clicked go based on the id(unique)
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
