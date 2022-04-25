import create from "zustand";

const AdminAuth = create((set) => ({
  isLogin: false,
  setLogin: (login) => set((state) => ({ isLogin: login })),
}));

export default AdminAuth;
