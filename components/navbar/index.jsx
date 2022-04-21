import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Auth from "../../auth/storeAuth";
import API from "../../api";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [isLogin, setLogin] = Auth((state) => [state.isLogin, state.setLogin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setUser(resp));
  }, []);

  return (
    <header className="flex w-full justify-center py-5 px-14">
      <div className="flex w-full max-w-6xl justify-between items-center">
        <strong className="text-2xl font-extrabold">CICILAJA</strong>
        {/* <navbar className="flex gap-5 font-medium items-center">
          <a href="" className="hover:opacity-80 transition">
            Produk
          </a>
          <a href="" className="hover:opacity-80 transition">
            Template
          </a>
          <a href="" className="hover:opacity-80 transition">
            Blog
          </a>
          <a href="" className="hover:opacity-80 transition">
            Pricing
          </a>
        </navbar> */}
        {isLogin ? (
          <Menu>
            <MenuButton
              textAlign="left"
              gap="4"
              bg="white"
              _hover={{ bg: "purple.50" }}
              cursor="pointer"
              rounded="lg"
              p="2"
              ml="1"
            >
              <div className="flex gap-4">
                <Avatar name={`${user.name}`} size="sm" />
                <div>
                  <p className="text-md leading-tight">{user.name}</p>
                  <p className="text-xs leading-none">{user.university}</p>
                </div>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => router.push("/dashboard/profile")}>
                Profile
              </MenuItem>
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
        ) : (
          <div className="flex gap-5 font-medium items-center">
            <Link href="/login">
              <a className="hover:opacity-80 transition">Sign In</a>
            </Link>
            <Button
              onClick={() => router.push("/register")}
              colorScheme="purple"
              size="md"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
