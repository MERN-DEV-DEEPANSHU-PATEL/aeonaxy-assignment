import ExploreMyResume from "@/components/ExploreMyResume";
import VerifyEmail from "@/components/VerifyEmail";
import userAtom from "@/recoil/userAtom";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div>{!user?.user?.isVerifyed ? <VerifyEmail /> : <ExploreMyResume />}</div>
  );
};

export default HomePage;
