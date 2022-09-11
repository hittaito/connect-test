import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { ChatService } from "../schemas/v1/chat_connectweb";

const Home: NextPage = () => {
  const [statement, setStatement] = useState<string>("");

  const client = createPromiseClient(
    ChatService,
    createConnectTransport({
      baseUrl: "http://localhost:8080",
    })
  );
  const send = async (text: string) => {
    const res = await client.send({
      id: "1",
      text: "Hello fron client",
    });
    console.log(res);
  };
  const handleSend = () => {
    send("aaaa");
  };

  const read = async () => {
    for await (const res of client.read({
      id: "a",
      text: "server side stream",
    })) {
      console.log(res);
    }
  };
  const handleRead = () => {
    read();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleSend}>Send</button>
      <button onClick={handleRead}>Read</button>
    </div>
  );
};

export default Home;
