import React, { useEffect, useState } from "react";
import "./sidebar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SidebarChat from "../sidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider/stateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  /////////////// created the rooms manualyy in the fribase db and made it generate id automatically///////////////////////////

  useEffect(() => {
    // go to the rooms(the one i created in fribase) collection in database...caputures the changes in the rooms and set it in the variable rooms
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        // go to the caputred changes in the rooms and map the doc and setz datas  on the variables in an object form
        snapshot.docs.map((doc) => ({
          // the auto generated id
          id: doc.id,
          // the data all inseide the rooms
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe(); // Unsubscribe the real-time listener when the component unmounts
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {/* photourl coming from the email photo(fetched data) */}
        <img src={user?.photoURL} className="user_image" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          {/* IconButton making it have  a clickable effect css`s */}
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search " />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {/* passing the info to SidebarChat componet as props  */}
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            // .name(created by myself in firbase db)  from the fetched data above
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
