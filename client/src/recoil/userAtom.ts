import { atom, selector } from "recoil";

const userAtom = atom({
  key: "userState",
  default: { user: undefined, isUser: false },
});

export const isUser = selector({
  key: "isUser", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userData = get(userAtom);
    return userData.isUser;
  },
});

export default userAtom;
