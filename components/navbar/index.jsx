import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  return (
    <header className="flex w-full justify-center py-5 px-14">
      <div className="flex w-full max-w-6xl justify-between items-center">
        <h1 className="text-2xl font-extrabold">CICILAJA</h1>
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
      </div>
    </header>
  );
}

export default Navbar;
