import { FaGithub, FaUser } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, Send, Trash } from "lucide-react";
import CardChat from "./components/CardChat";
import chat from "./data/chat";
import { IoCreateSharp } from "react-icons/io5";

const App = () => {

  const ContainerChat = useRef()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(chat)

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const [fieldChat, setFieldChat] = useState("")

  const handleFieldChat = (e) => {
    setFieldChat(e.target.value)
  }

  useEffect(() => {
    ContainerChat.current.scrollTo({
      top: ContainerChat.current.scrollHeight,
      behavior: 'smooth'
    })

    return () => {
      ContainerChat.current.scrollTo({
        top: ContainerChat.current.scrollHeight,
        behavior: 'smooth'
      })
    }

  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (fieldChat === "") return

    setLoading(true)

    setData([...data, {
      imageProfile: "https://github.com/shadcn.png",
      sender: "me",
      message: fieldChat,
    }])

    setFieldChat("")


    const res = await fetch("http://localhost:3000/v1/api/chat", {
      method: 'POST',
      body: JSON.stringify({
        text: fieldChat,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const result = await res.json()

      setData((value) => [...value, {
        imageProfile: "/foto.jpg",
        sender: "mphstar",
        message: result.text,
      }])

      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col h-[100dvh] flex-1 md:justify-center  w-screen container max-w-[1100px]'>
      <div className='flex flex-row items-center h-fit justify-between gap-3 pt-2'>
        <div className="flex flex-col">
          <h1><span className="font-semibold">Mphstar</span>Bot</h1>
          <p className="text-xs md:hidden">Build by <span className="font-semibold text-xs">Mphstar</span> with ❤️</p>
        </div>
        <FaGithub size={30} />
      </div>

      <div className="flex flex-col md:flex-row flex-1 md:flex-initial h-[500px] mt-3 border-gray-100 ">
        <div className="hidden md:flex flex-col border-[2px] px-6 py-4 rounded-tl-[5px] rounded-bl-[5px]">
          <div className="flex flex-row items-center">
            <p className="font-semibold text-2xl flex-1">Chat <span className="text-gray-300 text-2xl">(1)</span></p>
            <IoCreateSharp size={20} className="text-gray-500 hover:text-gray-600" />
          </div>

          <div className="flex flex-row gap-3 w-[200px] mt-12 hover:bg-gray-100 duration-300 ease-in-out px-3 py-2 cursor-default">
            <Avatar>
              <AvatarImage src="/foto.jpg" />
              <AvatarFallback><FaUser /></AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full truncate">
              <h1 className="font-semibold">Mphstar</h1>
              <p className="flex w-full text-xs text-gray-400">Nothing.</p>
            </div>

          </div>
        </div>
        <div className="flex flex-col h-full flex-1 md:border-[2px] border-l-0">
          <div className="flex flex-row h-fit items-center gap-2 md:border-b-2 px-0 md:px-6 py-4">
            <div className="flex flex-row gap-3 flex-1">
              <Avatar>
                <AvatarImage src="/foto.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full truncate">
                <h1>Mphstar</h1>
                {loading
                  ?
                  <p className="flex w-full text-xs text-gray-400 items-center gap-1">Sedang mengetik...</p>
                  :
                  <p className="flex w-full text-xs text-gray-400 items-center gap-1">
                    <span className="size-2 bg-green-500 rounded-full">
                    </span>
                    Active
                  </p>
                }
              </div>

            </div>
            <div className="flex flex-row">
              <a href="https://mphstar.my.id" target="_blank" rel="noopener noreferrer"><Info /></a>
            </div>
          </div>
          <div ref={ContainerChat} className="flex  flex-col h-full overflow-y-auto px-0 md:px-6 py-4 gap-2">

            {data.map((item, index) => (
              <CardChat key={index} sender={item.sender} msg={item.message} image={item.imageProfile} isSending={item.isSending ?? false} />
            ))}
          </div>
          <div className="flex flex-row h-fit py-3 px-0 md:px-4 items-center gap-3 relative">
            {image && <div onClick={() => {
              setImage(undefined)
            }} className="absolute size-32 bg-white border-[2px] bottom-16 left-16 rounded-[5px]">
              <div className="hover:bg-black/30 bg-black/0 absolute w-full h-full backdrop-blur-xs flex flex-col justify-center items-center duration-300 ease-in-out group">
                <Trash className="text-white group-hover:opacity-100 opacity-0 duration-300 ease-in-out" color="white" />
              </div>
              <img className="w-full h-full object-contain" src={URL.createObjectURL(image)} alt="Preview Image" />
            </div>}
            {/* <label htmlFor="image"><Image className="text-gray-400" /></label>
            <input onChange={handleImage} className="hidden" accept="image/*" type="file" name="" id="image" /> */}
            <form onSubmit={handleSubmit} className="flex-1">
              <input disabled={loading} value={fieldChat} onChange={handleFieldChat} className="border-[2px] rounded-full px-4 py-1 w-full" type="text" name="" placeholder={loading ? "Menunggu.." : "Aa"} id="" />
            </form>
            <Send onClick={handleSubmit} className="text-gray-400 hover:text-gray-600" />
          </div>
        </div>
      </div>
      <div className="md:flex hidden flex-row h-fit justify-center md:justify-between py-2">
        <p className="text-sm">Build by <span className="font-semibold text-sm">Mphstar</span> with ❤️</p>
        <p className="text-sm hidden md:flex">Source code available on GitHub.</p>
      </div>
    </div>
  )
}

export default App