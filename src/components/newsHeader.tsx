import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@/components/ui/switch";

interface NewsHeaderProps {
  setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ setIsListView }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <nav className="flex justify-between items-center">
      <div className="text-2xl font-bold">
        What&apos;s happening around the world?
      </div>
      <div className="flex space-x-4">
        <div
          className="ml-5 cursor-pointer"
          onClick={() => setIsListView(true)}
        >
          <FontAwesomeIcon icon={faBars} className="h-4 w-4 text-gray-800" />
          <span className="text-gray-500 ml-2">List View</span>
        </div>
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
        <div
          className="ml-5 cursor-pointer"
          onClick={() => setIsListView(false)}
        >
          <FontAwesomeIcon icon={faTh} className="h-4 w-4 text-gray-800" />
          <span className="text-gray-500 ml-2">Grid View</span>
        </div>
      </div>
    </nav>
  );
};

export default NewsHeader;
