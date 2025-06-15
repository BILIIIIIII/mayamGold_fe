// src/components/Navigation.js
import React from "react";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

const Navigation = () => {
  return (
    <nav className=" flex justify-between items-center gap-6 px-10 py-8 transition-colors ">
      <Link
        className="hover:text-gray-300 flex gap-1 mr-auto  transition-colors duration-150"
        href="/"
      >
        <Boxes />
        {/* Dashboard */}
      </Link>

      <DarkModeToggle />

      <Link
        className="hover:text-gray-500 transition-colors duration-150"
        href="/banda-aceh"
      >
        Banda Aceh
      </Link>
      <Link
        className="hover:text-gray-500 transition-colors duration-150"
        href="/lhokseumawe"
      >
        Lhokseumawe
      </Link>
      <Link
        className="hover:text-gray-500 transition-colors duration-150"
        href="/langsa"
      >
        Langsa
      </Link>
    </nav>
  );
};

export default Navigation;
