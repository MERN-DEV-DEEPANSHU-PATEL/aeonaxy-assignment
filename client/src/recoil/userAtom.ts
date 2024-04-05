import { atom, selector } from "recoil";

interface User {
  user: {
    fullName: string;
    email: string;
    username: string;
    password: string;
    isVerifyed: boolean; // Note the correct spelling of 'isVerified'
    location: string;
    imageUrl: string;
  } | null; // Use 'null' to handle initial state when user is not available
  isUser: boolean;
}

export const userAtom = atom<User>({
  key: "userState",
  default: {
    user: null,
    isUser: false,
  },
});

export const isUser = selector({
  key: "isUser", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userData = get(userAtom);
    return userData.isUser;
  },
});

export const profilePic = selector({
  key: "profilePic", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userData = get(userAtom);
    return userData.user?.imageUrl;
  },
});

export default userAtom;
