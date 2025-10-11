import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Examples from "@/components/landing/Examples";
import CallToAction from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Examples />
      <CallToAction />
    </div>
  );
}
