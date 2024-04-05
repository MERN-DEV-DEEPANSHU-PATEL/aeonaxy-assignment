import { FC, useState, ChangeEvent } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import makeRequest from "@/hooks/usePrivateAxios";
import Logo from "@/assets/Logo";

interface AvatarInterface {
  avatarBase64: string;
  file: File | "";
}

const ProfileUpdatePage: FC = () => {
  const [avatar, setAvatar] = useState<AvatarInterface>({
    file: "",
    avatarBase64: "https://iili.io/JNUXqQ9.png",
  });
  const [location, setLocation] = useState<string>("");
  const [isDefaultImg, setIsDefaultImg] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar({ file: file, avatarBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleNextClick = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (isDefaultImg) {
        formData.append("isDefaultImg", `${isDefaultImg}`);
      } else {
        formData.append("image", avatar.file);
      }
      formData.append("location", location);
      const { data } = await makeRequest.put("/auth/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.msg);
      navigate("/auth/whydribbble");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="hidden sm:block absolute top-0 lg:top-10 left-20 w-32" />
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl text-gray-500 font-bold mb-4">
          Welcome! Let's create your profile
        </h2>
        <p className="text-gray-600 mb-6">
          Let others get to know you better! You can do these later
        </p>
        <div className="mb-4">
          <div className="relative flex flex-wrap justify-center items-center gap-20">
            <input
              type="file"
              id="avatar"
              name="avatar"
              required
              disabled={isDefaultImg}
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <label
              htmlFor="avatar"
              className={`w-20 ${
                isDefaultImg ? "cursor-not-allowed" : "cursor-pointer"
              } h-20 text-sm hover:text-xl hover:border-dashed transiton-smooth rounded-full bg-gray-200 border-dotted border-2 border-gray-500 flex items-center justify-center text-gray-500`}
            >
              <img
                src={avatar.avatarBase64}
                alt="avatar"
                className="w-14 h-14 transition-smooth hover:scale-125"
              />
            </label>
            <div className="flex flex-col">
              <label
                htmlFor="avatar"
                className={`my-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white ${
                  isDefaultImg ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Choose Image
              </label>
              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <label className="inline-flex items-center w-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDefaultImg}
                    onChange={() => setIsDefaultImg((prev) => !prev)}
                    className="sr-only peer"
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600" />
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Choose Default Image
                  </span>
                </label>
              </div>
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
              required
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
          className={`bg-pink-500 text-white py-2 ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } px-4 rounded-md hover:bg-pink-600 transition-colors duration-300`}
          disabled={isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
