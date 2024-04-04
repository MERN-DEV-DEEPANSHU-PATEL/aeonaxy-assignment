import ExploreMyResume from "@/components/ExploreMyResume";
import VerifyEmail from "@/components/VerifyEmail";
import userAtom from "@/recoil/userAtom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (user.user && user.isUser) {
      console.log("first");
    }
  }, [user]);

  return (
    <div>
      {!user?.user?.isVerifyed ? (
        <VerifyEmail email={user.user?.email} />
      ) : (
        <ExploreMyResume />
      )}
    </div>
  );
};

export default HomePage;
