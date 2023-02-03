import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSend = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default App;
