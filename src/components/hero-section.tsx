import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 py-20 px-6 md:px-10 gap-5">
        <div className="flex flex-col justify-center space-y-7">
          <div>
            <span className="rounded-full py-1 px-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-black font-medium text-sm tracking-wide border-[1px] border-gray-300 shadow-sm whitespace-nowrap">
              🎓Trusted by Universities Worldwide
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl text-gray-800 font-serif font-bold w-full">
            <span>Resolve Campus issues </span>
            <span className="bg-gradient-to-bl from-cyan-400 to-blue-900 text-transparent bg-clip-text">
              Effieciently
            </span>
          </h1>
          <p className="text-gray-700 text-lg font-serif font-medium">
            A transparent platform where every member of a campus
            community—students, staff, and faculty—can raise grievances
            directly, track progress in real time, and hold the system
            accountable until resolution
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Button className="gradient" asChild>
              <Link
                href="/dashboard/complaints"
                className=" text-white text-lg font-serif"
              >
                Submit your complaint
              </Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link
                href="/dashboard/me"
                className="text-gray-800 text-lg font-serif"
              >
                Visit your dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            src="/campus.jpg"
            alt="Hero Image"
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-md md:rounded-tl-full shadow-lg"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
