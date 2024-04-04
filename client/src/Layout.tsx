import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom, { isUser } from "./recoil/userAtom";
import makeRequest from "./hooks/usePrivateAxios";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const ProtectedRoute = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setUser] = useRecoilState(userAtom);
  const getUser = async () => {
    try {
      const { data } = await makeRequest.get("/auth/user");
      console.log(data);
      setUser({ user: data.user, isUser: true });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser({ user: null, isUser: false });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userState.isUser) {
      getUser();
    }

    return () => {
      if (userState.isUser) {
        setIsLoading(false);
      }
    };
  }, []);

  return isLoading ? (
    <Spinner />
  ) : userState?.isUser ? (
    children
  ) : (
    <Navigate to={"/auth"} />
  );
};

const AuthLayout = () => {
  const userPresent = useRecoilValue(isUser);
  return (
    <ProtectedRoute>
      <header>
        <Header isLoggedIn={userPresent} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </ProtectedRoute>
  );
};

export default AuthLayout;

export const UnAuthLayout = () => {
  return (
    <main>
      <Outlet />
      <ToastContainer />
    </main>
  );
};
