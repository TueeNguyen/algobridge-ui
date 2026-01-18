import Hero from "@/components/landingPageUi/Hero";

import Footer from "@/components/landingPageUi/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-200">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),_transparent_65%)]" />
      <div className="absolute left-1/2 top-[-12%] -z-10 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
      <main className="flex flex-col gap-2 pb-24">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
