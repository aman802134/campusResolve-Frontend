import AutomatedEscalationSystem from "@/components/automated-escalation-system";
import EverythingAboutUs from "@/components/evreything-about-us";
import HeroSection from "@/components/hero-section";
import SubscribeToJoin from "@/components/subscribe-to-join";
import ThreeStepProcess from "@/components/three-step-process";

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
