import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ContactItem = ({ name = "Mphstar", description, image, selected }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div
            className={`flex ${
              selected ? "md:bg-pink-500 md:text-white" : "md:hover:bg-gray-100"
            } rounded-md flex-row gap-3 w-fit md:w-[200px]  duration-300 ease-in-out md:px-3 py-2 cursor-default`}
          >
            <Avatar className={`border-2 ${selected ? 'border-pink-500' : ''} md:border-none`}>
              <AvatarImage src={image} />
              <AvatarFallback>
                <FaUser />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col w-full truncate">
              <h1 className="font-semibold w-fit">{name}</h1>
              <p
                className={`${
                  selected ? "text-gray-200" : "text-gray-400"
                } flex w-full text-xs `}
              >
                {description}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="md:hidden">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ContactItem;
