import create from "zustand";

const Auth = create((set) => ({
  isLogin: false,
  setLogin: (login) => set((state) => ({ isLogin: login })),
}));

export default Auth;
