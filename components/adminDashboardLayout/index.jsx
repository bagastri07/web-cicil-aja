import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import API from "../../api";
import Auth from "../../auth/storeAuth";
import Seo from "../seo";

function AdminDashboardLayout({ page, children }) {
  const router = useRouter();
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);

  return (
    <>
      <Seo page={`${page[0].toUpperCase()}${page.slice(1)}`} />
      <header className="md:w-full md:z-20 flex flex-row flex-wrap items-center justify-between bg-white py-4 px-6 border-b border-gray-300">
        <div className="flex-none w-56 flex flex-row items-center">
          <strong className="ml-1 flex-1 text-2xl font-extrabold">
            CICILAJA
          </strong>
        </div>
        <Menu>
          <MenuButton
            textAlign="left"
            gap="4"
            _hover={{ bg: "purple.50" }}
            cursor="pointer"
            rounded="lg"
            p="2"
            ml="1"
          >
            <div className="flex gap-4">
              <Avatar size="sm" />
              <div>
                <p className="text-md leading-tight">Admin</p>
                <p className="text-xs leading-tight">Admin Utama</p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Pengaturan</MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
                setLogin(false);
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </header>
      <div className="flex">
        <aside className="w-[15%] border-r border-gray-300 h-[87vh] flex flex-col justify-between">
          <div className="flex items-center flex-col p-2 gap-2">
            <Button
              colorScheme="purple"
              variant={page === "menu" ? "solid" : "ghost"}
              w="full"
              onClick={() => router.push("/admin")}
            >
              Menu
            </Button>
            <Button
              colorScheme="purple"
              variant={page === "peminjam" ? "solid" : "ghost"}
              w="full"
              onClick={() => router.push("/admin/borrowers")}
            >
              Peminjam
            </Button>
            <Button
              colorScheme="purple"
              variant={page === "cicilan" ? "solid" : "ghost"}
              w="full"
              onClick={() => router.push("/admin/loan")}
            >
              Cicilan
            </Button>
            <Button
              colorScheme="purple"
              variant={page === "ambassador" ? "solid" : "ghost"}
              w="full"
              onClick={() => router.push("/admin/ambassador")}
            >
              Ambassador
            </Button>
          </div>
        </aside>
        <main className="p-5 max-h-[87vh] w-[85%] overflow-scroll">
          {children}
        </main>
      </div>
    </>
  );
}

export default AdminDashboardLayout;
