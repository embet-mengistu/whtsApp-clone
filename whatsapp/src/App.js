import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/sidebar/Sidebar";
import { useState } from "react";
import Login from "./Components/Login/Login";
import { useStateValue } from "./StateProvider/stateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue(null);

  return (
    <div className="app">
      <div className="app_body">
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route
              path="/rooms/:roomId"
              element={
                <>
                  <Sidebar /> <Chat />
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Sidebar />
                </>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
