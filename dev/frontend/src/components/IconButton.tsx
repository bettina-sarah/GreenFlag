import React from "react";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IconButtonProps {
  icon: string;
  page?: string | null; // button can naviagate or execute custom function!
  onClick?: () => void;
  toggleState?: boolean; // optional turn on off !
  suggestion_id?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  page,
  onClick,
  toggleState,
}) => {
  const [isActive, setIsActive] = useState<boolean>(toggleState || false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (page) {
      navigate(`/${page}`);
    }

    // If a custom onClick function is provided, execute it
    if (onClick) {
      console.log("onclick");
      onClick(); // !! when i define my button, i can provide it any function i want !!!
    }

    // If the button has a toggleState prop, toggle its state
    if (toggleState !== undefined) {
      setIsActive((prev) => !prev);
    }
    if (isActive) {
      console.log(
        "im now an active button .. if you want, execute smth extra here idk"
      );
    }
  };

  return (
    <button
      className="w-15 h-12 flex items-center justify-center p-1 border-none
    hover:bg-teal-500 rounded"
      onClick={handleClick}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default IconButton;
