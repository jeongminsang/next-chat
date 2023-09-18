import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import io from "socket.io-client";
import { useEffect, useState } from 'react';

// export const socket = socketIo(('/api/socketio'), {
//   withCredentials: true,
// });

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);

  useEffect(() => {
    io("http://localhost:3000", { path: "/api/socketio" });
    const socket = io();
    socket.on("connect", () => {
      console.log("socket server connected.");
    });

    socket.on("disconnect", () => {
      console.log("socket server disconnected.");
    });
    socket.emit("hello", "정민상", (response: any) => {
      console.log(response + "입장");
    });
  }, []);

  useEffect(() => {
    const socket = io();
    socket.on("receivemsg", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const handleSend = () => {
    const socket = io();
    socket.emit("sendmsg", message);
    console.log(message);
    setMessage("");
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <div>
        <ul>
          {messageList.map((msg: any, index: number) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

