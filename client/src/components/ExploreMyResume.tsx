import React from "react";
import { FaGlobe, FaGithub, FaFileAlt, FaLaptopCode } from "react-icons/fa";

const ExploreMyResume: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">
        Explore My Resume
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <a
          className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          href={"https://deepanshupatel.netlify.app"}
          target="_blank"
        >
          <FaGlobe className="inline-block mr-2" />
          My Portfolio
        </a>
        <a
          className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          href={"https://github.com/MERN-DEV-DEEPANSHU-PATEL"}
          target="_blank"
        >
          <FaGithub className="inline-block mr-2" />
          GitHub Profile
        </a>
        <a
          className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          href={
            "https://github.com/MERN-DEV-DEEPANSHU-PATEL/aeonaxy-assignment"
          }
          target="_blank"
        >
          <FaLaptopCode className="inline-block mr-2" />
          Assignment Repo
        </a>
        <a
          className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 hover:text-white transition-colors duration-300 transform hover:scale-105 animate-bounce"
          href={
            "https://drive.google.com/file/d/1rJvg3aUgnXwoRkb6skShX13I57dNf20-/view?usp=sharing"
          }
          target="_blank"
        >
          <FaFileAlt className="inline-block mr-2" />
          My Resume
        </a>
      </div>
    </div>
  );
};

export default ExploreMyResume;
