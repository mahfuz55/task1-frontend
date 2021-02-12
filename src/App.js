import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:7000";

function App() {
  const [response, setResponse] = useState({});
  useEffect(() => {
    const socket = socketIOClient(
      ENDPOINT,
      { transports: ["websocket"] },
      { reconnection: false }
    );
    socket.on("newMessage", data => {
      setResponse(data);
    });

    socket.on("disconnect", () => {
      console.log("diconnected from server");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="app">
      {console.log(response)}
      {/* <h1 className="response">{response.length}</h1> */}
      <Form />
    </div>
  );
}

export default App;
