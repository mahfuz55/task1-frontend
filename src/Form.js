import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:7000";

function Form() {
  const [inpValue, setInpValue] = useState("");
  const inpRef = useRef(null);

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.emit("newMessage");
  // }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setInpValue("");
    inpRef.current.focus();
    console.log(inpValue);

    const socket = socketIOClient(ENDPOINT);
    socket.emit("newMessage", { data: inpValue });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message"> message</label>
        <input
          ref={inpRef}
          name="message"
          value={inpValue}
          placeholder="Type message"
          onChange={e => setInpValue(e.target.value)}
          type="text"
        />
        <button type="submit" className="form__btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default Form;
