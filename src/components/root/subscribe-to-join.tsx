import Link from "next/link";
import { Button } from "../ui/button";

export default function SubscribeToJoin() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-gradient-to-l from-chart-3 to-chart-2/80 p-14">
      <div className="text-center p-8 space-y-4">
        <h1 className=" text-4xl tracking-wide font-bold  text-white">
          Ready To Transform Your Campus Experience ?
        </h1>
        <p className="text-lg text-white/90">
          Join thousands of students and staff who trust CampusResolve for
          efficient issue resolution.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <Button className="gradient px-10 py-6" asChild>
          <Link href="/dashboard/complaints" className="text-white text-lg ">
            Start Resolving Today..
          </Link>
        </Button>
        <Button variant={"outline"} className=" px-10 py-6" asChild>
          <Link href="/dashboard/me" className="text-gray-800 text-lg ">
            I am already a member
          </Link>
        </Button>
      </div>
    </div>
  );
}
