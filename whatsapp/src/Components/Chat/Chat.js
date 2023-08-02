import React, { useEffect, useState } from "react";
import "./chat.css";
import image from "../../images/profile2.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider/stateProvider";
import firebase from "firebase/compat/app";

function Chat() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // seclecting the name based on the id
    // roomId capurted from the url we passed when clicked in the sidebarChat.js
    if (roomId) {
      // if ther is roomId go inside the rooms...use the room id inside the url to fetch the datas and from the data select the name based on the id  and set in in the variable roomName
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      // fetching the messages(created manually) from the database based on id and order it based on timestamp(created manually)and set in the variable messages
      db.collection(`rooms`)
        .doc(roomId)
        .collection("messages")
        .orderBy(`timestamp`, `asc`)
        // capture the change and put it the variable messages(so the we can display them)
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMesage = (e) => {
    e.preventDefault();

    // inserting into the messages based on id (inside the messages there are message,name,timestamp created manually) in db
    db.collection("rooms").doc(roomId).collection("messages").add({
      // targeted when typed
      message: input,

      // user.displayName coming form google auth
      name: user.displayName,

      // using time which is on the server
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // clears the txt after enter///
    setInput("");
  };

  console.log(messages);
  return (
    <div className="chat">
      <div className="chat_header">
        <img src={image} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at {/* dated based on the last message(.length - 1) */}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            //so if the name we looged in with(user.displayName) and the one  sending the message is equal...it means the user logged is txting..so is so give the css properties of chat_reciver
            className={`chat_Message ${
              message.name === user.displayName && "chat_reciver"
            } `}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {/* setting the date and time */}
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a message..."
            // targeting the typed thing and setting it to varaible input
            onChange={(e) => setInput(e.target.value)}
          />
          {/* renders the function sendMesage */}
          <button onClick={sendMesage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
