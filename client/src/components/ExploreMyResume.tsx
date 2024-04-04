import React from "react";
import { FaGlobe, FaGithub, FaFileAlt, FaLaptopCode } from "react-icons/fa";

const ExploreMyResume: React.FC = () => {
  const openWebsite = () => {
    window.open("https://deepanshupatel.netlify.app/", "_blank");
  };

  const openGithub = () => {
    window.open("https://github.com/MERN-DEV-DEEPANSHU-PATEL", "_blank");
  };

  const openAssignmentRepo = () => {
    window.open(
      "https://github.com/MERN-DEV-DEEPANSHU-PATEL/aeonaxy-assignment",
      "_blank"
    );
  };

  const openMyResume = () => {
    window.open(
      "https://drive.google.com/file/d/1rJvg3aUgnXwoRkb6skShX13I57dNf20-/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">
        Explore My Resume
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <button
          className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          onClick={openWebsite}
        >
          <FaGlobe className="inline-block mr-2" />
          My Website
        </button>
        <button
          className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          onClick={openGithub}
        >
          <FaGithub className="inline-block mr-2" />
          GitHub Profile
        </button>
        <button
          className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          onClick={openAssignmentRepo}
        >
          <FaLaptopCode className="inline-block mr-2" />
          Assignment Repo
        </button>
        <button
          className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          onClick={openMyResume}
        >
          <FaFileAlt className="inline-block mr-2" />
          My Resume
        </button>
      </div>
    </div>
  );
};

export default ExploreMyResume;
