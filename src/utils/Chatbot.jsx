import React, { useEffect, useRef, useState } from "react";
import CardChat from "../components/CardChat";
import chat from "../data/chat";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Info, Send } from "lucide-react";

const Chatbot = () => {
  const ContainerChat = useRef();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(chat);

  const [fieldChat, setFieldChat] = useState("");

  const handleFieldChat = (e) => {
    setFieldChat(e.target.value);
  };

  useEffect(() => {
    

    return () => {
     
    };
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fieldChat === "") return;

    setLoading(true);

    setData([
      ...data,
      {
        imageProfile: "https://github.com/shadcn.png",
        sender: "me",
        message: fieldChat,
      },
    ]);

    setFieldChat("");

    try {
      const res = await fetch(
        `https://api.ryzendesu.vip/api/ai/chatgpt?text=${fieldChat}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const result = await res.json();

        setData((value) => [
          ...value,
          {
            imageProfile: "/foto.jpg",
            sender: "mphstar",
            message: result.response,
          },
        ]);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      setData((value) => [
        ...value,
        {
          imageProfile: "/foto.jpg",
          sender: "mphstar",
          message: "Maaf, koneksi lagi buruk",
        },
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 md:border-[1px] pl-4 border-l-0">
      <div className="flex flex-row h-fit items-center gap-2 md:border-b-[1px] px-0 md:px-6 py-4">
        <div className="flex flex-row gap-3 flex-1">
          <Avatar>
            <AvatarImage src="/foto.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full truncate">
            <h1>Mphstar</h1>
            {loading ? (
              <p className="flex w-full text-xs text-gray-400 items-center gap-1">
                Sedang mengetik...
              </p>
            ) : (
              <p className="flex w-full text-xs text-gray-400 items-center gap-1">
                <span className="size-2 bg-green-500 rounded-full"></span>
                Active
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <a
            href="https://mphstar.my.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Info />
          </a>
        </div>
      </div>
      <div
        ref={ContainerChat}
        className="flex  flex-col h-full overflow-y-auto px-0 md:px-6 py-4 gap-4"
      >
        {data.map((item, index) => (
          <CardChat
            key={index}
            sender={item.sender}
            msg={item.message}
            image={item.imageProfile}
            isSending={item.isSending ?? false}
          />
        ))}
      </div>
      <div className="flex flex-row h-fit py-3 px-0 md:px-4 items-center gap-3 relative">
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            disabled={loading}
            value={fieldChat}
            onChange={handleFieldChat}
            className="border-[2px] rounded-full px-4 py-1 w-full"
            type="text"
            name=""
            placeholder={loading ? "Menunggu.." : "Aa"}
            id=""
          />
        </form>
        <Send
          onClick={handleSubmit}
          className="text-gray-400 hover:text-gray-600"
        />
      </div>
    </div>
  );
};

export default Chatbot;
