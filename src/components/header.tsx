import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";
import * as React from "react";
import { Button } from "@/components/ui/button";
export function Header() {
  return (
    <>
      <header className="text-black p-3 shadow-sm fixed bg-white w-full z-10">
        <div className="flex justify-between items-center px-2 md:px-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="p-2 gradient rounded-lg text-white">
                <FaGraduationCap className="text-2xl" />
              </span>
              <span className="text-xl font-bold font-serif">
                CampusResolve
              </span>
            </Link>
          </div>
          <div>
            <Button className="gradient" asChild>
              <Link href="/login" className="font-serif text-lg font-bold">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
