import Logo from "@/assets/Logo";
import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/InputField";
import makeRequest from "@/hooks/usePrivateAxios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAuthPage: FC = () => {
  const [isMember, setIsMember] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    acceptPolicy: false,
  });
  const [error, setError] = useState({
    isError: false,
    msg: "",
    inputNames: [],
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    setError((prev) => ({
      ...prev,
      inputNames: prev.inputNames.filter((inp) => inp !== e.target.name),
    }));
    if (e.target && e.target.type === "checkbox") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else if (e.target) {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!isMember) {
      try {
        console.log(inputs);
        const { data } = await makeRequest.post("/auth/user/register", inputs);
        console.log(data);
        toast.success("Register Successful");
        navigate("/auth/profile");
        setIsLoading(false);
      } catch (error: any) {
        toast.error("Invalid Credentials");
        setError({ isError: true, ...error.response.data });
        setIsLoading(false);
      }
    } else {
      try {
        await makeRequest.post("/auth/user/login", inputs);
        toast.success("Login Success");
        navigate("/");
      } catch (error: any) {
        toast.error(error.response.data.msg);
        // setError({ isError: true, ...error.response.data });
      }
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
                <InputField
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  value={inputs.fullName}
                  placeholder="John Doe"
                  error={error}
                  label="Name"
                />
                <InputField
                  onChange={handleChange}
                  type="text"
                  name="username"
                  value={inputs.username}
                  placeholder="ex. johndoe"
                  error={error}
                  label="Username"
                />
              </>
            )}
            <InputField
              onChange={handleChange}
              type="email"
              name="email"
              value={inputs.email}
              placeholder="ex. example@gmail.com"
              error={error}
              label="Email"
            />
            <InputField
              onChange={handleChange}
              type="password"
              name="password"
              value={inputs.password}
              placeholder="ex. enter strong pass. of 6 char"
              error={error}
              label="Password"
            />
            {!isMember && (
              <Checkbox
                onChange={handleChange}
                checked={inputs.acceptPolicy}
                label="Creating an account means you're okay with our Terms ofService, Privacy Policy, and our default NotificationSettings."
                name="acceptPolicy"
              />
            )}
            <button
              type="submit"
              onClick={onSubmit}
              disabled={isMember ? false : isLoading || !inputs.acceptPolicy}
              style={{
                cursor: isMember
                  ? "pointer"
                  : isLoading || !inputs.acceptPolicy
                  ? "not-allowed"
                  : "pointer",
              }}
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
