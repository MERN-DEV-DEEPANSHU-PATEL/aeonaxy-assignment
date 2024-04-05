import makeRequest from "@/hooks/usePrivateAxios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Option {
  id: number;
  label: string;
  description?: string;
  imageUrl: string;
}

const OPTIONS: Option[] = [
  {
    id: 1,
    label: "I'm a designer looking to share my work",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestias voluptate culpa unde enim placeat nisi impedit",
    imageUrl: "https://iili.io/JwgrNHv.png",
  },
  {
    id: 2,
    label: "I'm looking to hire a designer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repudiandae sint harum provident distinctio quos!",
    imageUrl: "https://iili.io/Jwgr5Ku.png",
  },
  {
    id: 3,
    label: "I'm looking for design inspiration",
    description:
      "With over 7 million shots from a vast community of designers, Dribbble is the leading source for design inspiration.",
    imageUrl: "https://iili.io/Jwggg8x.png",
  },
];

const WhyDribble: FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleOptionClick = (option: Option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.some((opt) => opt.id === option.id)) {
        return prevOptions.filter((opt) => opt.id !== option.id);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((opt) => opt.id === option.id);
  };

  const navigate = useNavigate();

  return (
    <div className="md:max-w-[90%] mx-auto p-1 md:p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">What brings you to Dribbble?</h1>
      <p className="text-gray-600 mb-6">
        Select the options that best describe you. Don't worry, you can explore
        other options later.
      </p>
      <div className="md:max-w-[90%] ml-2 md:m-auto mt-24 gap-20 md:gap-1 grid grid-cols-1 justify-items-center md:grid-cols-3">
        {OPTIONS.map((option) => {
          let selected = isOptionSelected(option);
          return (
            <div
              key={option.id}
              className={`p-4 w-72 h-72 rounded-lg shadow-md cursor-pointer relative bg-gray-50  ${
                selected
                  ? "border-transparent ring-pink-600 ring-2"
                  : "shadow14"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div
                className={`transition-smooth absolute ${
                  selected ? "-top-[90px]" : "top-4"
                }`}
              >
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="m-auto h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold">{option.label}</h2>
                <p
                  className={`text-gray-600 transition-smooth ${
                    selected ? "scale-100" : "scale-0"
                  }`}
                >
                  {option.description}
                </p>
                {/* ADD HERE A RIGHT ICONS WITH PINK COLOR CIRCLE ON BACKGROUND IF OPTION IS SELECTED ELSE ONLY TRANSPARENT CIRCLE WITH GREY BORDER VISIBLE */}
              </div>
              <div className="absolute left-1/2 translate-x-[-50%] bottom-2">
                {selected ? (
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <h4 className="text-gray-900 font-semibold mb-4">
          Anything else? You can select multiple
        </h4>
        <button
          onClick={() => {
            makeRequest.get("/auth/user/getotp");
            navigate("/");
          }}
          className="bg-pink-500 text-white px-12 py-2 rounded-lg shadow-md"
        >
          Finish
        </button>
        <p>or press RETURN</p>
      </div>
    </div>
  );
};

export default WhyDribble;
