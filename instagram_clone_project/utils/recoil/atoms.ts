import { atom } from "recoil";

export const selectedUserIdState = atom({
  key: "selectedUserIdState",
  default: null,
});

export const selectedUserIndexState = atom({
  key: "selectedIndex",
  default: null,
});
