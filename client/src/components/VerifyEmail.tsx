import makeRequest from "@/hooks/usePrivateAxios";
import { FC } from "react";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const VerifyEmail: FC<{
  email: string | undefined;
}> = ({ email }) => {
  const reqOtp = async () => {
    try {
      await makeRequest.get("/auth/user/getotp");
      toast.success("Email sent For verificcation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Please verify your email...</h1>
      <div className="flex flex-col justify-center items-center mb-6">
        <div className="relative">
          <FaEnvelope className="h-24 w-24 text-gray-400 mr-4" />
          <span className="absolute -top-2 right-2   text-3xl">
            <FaCheckCircle className=" w-12 h-12 rounded-full text-pink-500 border-4 border-white bg-white" />
          </span>
        </div>
        <p className="text-gray-600">
          Please verify your email address. We've sent a confirmation email to:
        </p>
      </div>
      <p className="text-gray-600 mb-6">
        Click the confirmation link in that email to begin using Dribbble.
      </p>
      <div className="space-y-2">
        <strong>{email}</strong>
        <p className="text-gray-600">
          Didn't receive the email? Check your Spam folder, it may have been
          caught by a filter. If you still don't see it, you can{" "}
          <button className="text-pink-500 underline" onClick={() => reqOtp()}>
            resend the confirmation email
          </button>
          .
        </p>
        <p className="text-gray-600">
          Wrong email address?{" "}
          <button
            className="text-pink-500 underline"
            onClick={() => toast.info("Email Change Not Added")}
          >
            Change it
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
