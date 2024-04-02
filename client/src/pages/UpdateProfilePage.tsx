import Logo from "@/assets/Logo";
import { ChangeEvent, FC, useState } from "react";
import { FiCamera, FiMapPin } from "react-icons/fi";

const ProfileUpdatePage: FC = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleNextClick = () => {
    console.log(avatar);
    console.log(location);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className=" hidden sm:block absolute top-0 lg:top-10 left-20 w-32" />
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl text-gray-500 font-bold mb-4">
          Welcome! Let's create your profile
        </h2>
        <p className="text-gray-600 mb-6">
          Let others get to know you better! You can do these later
        </p>
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-gray-700 font-bold mb-2"
          >
            Add an avatar
          </label>
          <div className="relative flex flex-wrap justify-center items-center gap-20">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <div
              className={`w-20 h-20 text-sm  hover:text-xl hover:border-dashed transiton-smooth rounded-full bg-gray-200 border-dotted border-2 border-gray-500 flex items-center justify-center text-gray-500 cursor-pointer ${
                avatar ? "bg-cover bg-no-repeat" : ""
              }`}
              style={{ backgroundImage: `url(${avatar})` }}
            >
              <FiCamera />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="cursor-pointer my-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5   dark:text-white"
              >
                Choose Image
              </label>

              <p className="mt-4 text-sm text-gray-500">
                &gt; Or choose one of our defaults
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Add your location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter a location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiMapPin
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
