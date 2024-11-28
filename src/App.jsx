import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { IoCreateSharp } from "react-icons/io5";
import ContactItem from "./components/ContactItem";
import Chatbot from "./utils/Chatbot";
import ImageGenerator from "./utils/ImageGenerator";

const App = () => {
  const [selectedchat, setSelectedChat] = useState(0);

  return (
    <>
      <img
        className="fixed top-0 object-cover w-full h-full left-0 opacity-20 -z-10"
        src="/bg.jpg"
        alt="Background"
      />
      <div className="flex flex-col h-[100dvh] flex-1 md:justify-center  w-screen container max-w-[1100px]">
        <div className="flex flex-row items-center h-fit justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <h1>
              <span className="font-semibold text-pink-500 text-base">
                Mphstar
              </span>
              AI
            </h1>
            <p className="text-xs md:hidden">
              Build by <span className="font-semibold text-xs">Mphstar</span>{" "}
              with ❤️
            </p>
          </div>
          <a
            href="https://github.com/mphstar/mphstar-ai.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </a>
        </div>

        <div className="flex flex-row flex-1 md:flex-initial md:backdrop-blur-md h-[500px] mt-3 border-gray-100 ">
          <div className="flex flex-col border-r-[1px] md:border-[1px] px-0 md:px-6 py-4 rounded-tl-[5px] rounded-bl-[5px]">
            <div className="flex flex-row items-center">
              <p className="font-semibold text-2xl flex-1">
                Chat <span className="text-gray-300 md:text-2xl">(1)</span>
              </p>
              <IoCreateSharp
                size={20}
                className="text-gray-500 hover:text-gray-600 hidden md:block"
              />
            </div>

            <div className="flex flex-col gap-2 mt-2 md:mt-6">
              <div onClick={() => setSelectedChat(0)}>
                <ContactItem image={"/foto.jpg"} description={"Chat Bot"} selected={selectedchat == 0} />
              </div>
              <div onClick={() => setSelectedChat(1)}>
                <ContactItem
                  selected={selectedchat == 1}
                  image={"/furina.jpeg"}
                  name="Furina"
                  description={"Image generator"}
                />
              </div>
            </div>
          </div>

          {/* list fitur   */}
          <div className={`${selectedchat === 0 ? 'block' : 'hidden'} w-full`}>
            <Chatbot />
          </div>
          <div className={`${selectedchat === 1 ? 'block' : 'hidden'} w-full`}>
            <ImageGenerator />
          </div>
        </div>
        <div className="md:flex hidden flex-row h-fit justify-center md:justify-between py-2">
          <p className="text-sm">
            Build by{" "}
            <span className="font-semibold text-sm text-pink-500">Mphstar</span>{" "}
            with ❤️
          </p>
          <p className="text-sm hidden md:flex items-center gap-1">
            Source code available on{" "}
            <a
              className="text-sm font-semibold text-pink-500"
              href="https://github.com/mphstar/mphstar-ai.git"
              target="_blank"
            >
              Github
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
