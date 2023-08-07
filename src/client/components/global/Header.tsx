import React from "react";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { ButtonBase } from "@mui/material";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full flex space-x-2 items-center justify-between bg-slate-700 text-white py-4 px-3">
      <div>
        <Link href="/">
          <span className="text-3xl font-sans font-semibold">Nv Blog</span>
        </Link>
        <div className="hidden sm:flex space-x-3 items-start justify-between">
          <Link
            href="/"
            className="text-white font-sans font-base hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-white font-sans font-normal hover:text-blue-400"
          >
            Blog
          </Link>
          <Link
            href="/portfolio"
            className="text-white font-sans font-normal hover:text-blue-400"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="text-white font-sans font-normal hover:text-blue-400"
          >
            About
          </Link>
        </div>
      </div>

      <div className="flex space-x-2">
        <div className="rounded-[30px] border bg-slate-400 py-1 px-4 active:bg-blue-500">
          <Link href="/login" className="sm:text-xs">
            Login
          </Link>
          {/* <Button>Login</Button> */}
        </div>
        <div className="rounded-[30px] border bg-yellow-400 py-1 px-4 active:bg-yellow-500">
          <Link href="/register" className="sm:text-xs">
            Register
          </Link>
        </div>
      </div>
      <ButtonBase>
      <AlignJustify />
      </ButtonBase>
    </div>
  );
};

export default Header;
