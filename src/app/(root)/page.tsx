import AutomatedEscalationSystem from "@/components/root/automated-escalation-system";
import EverythingAboutUs from "@/components/root/evreything-about-us";
import HeroSection from "@/components/root/hero-section";
import SubscribeToJoin from "@/components/root/subscribe-to-join";
import ThreeStepProcess from "@/components/root/three-step-process";

export default function Home() {
  return (
    <>
      <main className="w-full h-full py-5">
        <HeroSection />
        <EverythingAboutUs />
        <ThreeStepProcess />
        <AutomatedEscalationSystem />
        <SubscribeToJoin />
      </main>
    </>
  );
}
