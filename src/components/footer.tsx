import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-8">
      <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-5">
        <div className=" flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5">
          <Link href="/" className="flex items-center space-x-2">
            <span className="p-2 gradient rounded-lg text-white">
              <FaGraduationCap className="text-2xl" />
            </span>
            <span className="text-xl font-bold font-serif">CampusResolve</span>
          </Link>
          <p className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-sm hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
