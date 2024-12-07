import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: null, 
});
export const isUserThere = atom({
  key: "isUserThere",
  default: false
})