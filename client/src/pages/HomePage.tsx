import ExploreMyResume from "@/components/ExploreMyResume";
import VerifyEmail from "@/components/VerifyEmail";
import userAtom from "@/recoil/userAtom";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const user = useRecoilValue(userAtom);

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
