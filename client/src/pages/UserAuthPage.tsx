import Logo from "@/assets/Logo";
import { FC, SyntheticEvent, useState } from "react";

const UserAuthPage: FC = () => {
  const [isMember, setIsMember] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    acceptPolicy: true,
  });
  const [error, setError] = useState({
    isError: false,
    msg: "",
    inputName: "",
  });

  const handleChange = (e: any) => {
    if (e.target && e.target.type === "checkbox") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else if (e.target) {
      console.log(e);
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      console.log(inputs);
    } catch (error: any) {
      setError(error.response);
    }
  };

  return (
    <div className="flex min-h-screen bg-yellow-100">
      <div className="flex-[3] relative hidden lg:block">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQKPODPSC96kHD7Sjh_dzO4hKkrTykXcDcKJzIifqTAvn9Wfx"
          alt="Dummy Image"
          className="h-full w-full"
        />
        <Logo className=" w-40 absolute top-0 left-5 p-5" />
        <h1 className="text-2xl font-bold text-indigo-500 absolute top-20 left-5 p-5">
          Discover the world's top Designers & Creatives.
        </h1>
        <div className=" absolute bottom-20 left-5 p-5 text-lg text-indigo-600">
          Art by Peter Tarka
        </div>
      </div>
      <div className="flex-[5] flex justify-center items-center px-6 py-8 bg-white rounded-lg shadow-md overflow-scroll relative">
        <p className="text-sm text-gray-600  absolute top-2 right-2 sm:top-5 sm:right-5">
          Already a member?
          <button
            onClick={() => setIsMember((prev) => !prev)}
            className="text-blue-600 hover:underline"
          >
            {isMember ? "Sign Up" : "Sign In"}
          </button>
        </p>
        <div className="max-w-lg  ">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {isMember ? "Login Into Your Account" : "Sign up to Dribble"}
            </h2>
            {error.isError && (
              <p className="text-sm text-red-500">{error.msg}</p>
            )}
          </div>
          <form>
            {!isMember && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={inputs.name}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 border ${
                      error.inputName == "name"
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    value={inputs.username}
                    placeholder="johndoe"
                    className={`w-full px-3 py-2 border  ${
                      error.inputName == "username"
                        ? "border-red-500"
                        : "border-gray-300"
                    }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={inputs.email}
                placeholder="example@mail.com"
                className={`w-full px-3 py-2 border  ${
                  error.inputName == "email"
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={inputs.password}
                placeholder="6+ characters strong password"
                className={`w-full px-3 py-2 border  ${
                  error.inputName == "password"
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {!isMember && (
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      name="acceptPolicy"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      Creating an account means you're okay with our Terms of
                      Service, Privacy Policy, and our default Notification
                      Settings.
                    </label>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              onClick={onSubmit}
              className="w-full py-3 px-6 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              {isMember ? "Login" : " Create Account"}
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
