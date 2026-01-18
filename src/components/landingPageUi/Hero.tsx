import Link from "next/link";
import Image from "next/image";

const stats = [
  {
    label: "Strategies imported",
    value: "1,200+",
    change: "From Composer.trade",
  },
  {
    label: "Visual diagrams generated",
    value: "3,840",
    change: "Mermaid code included",
  },
  {
    label: "Avg. import time",
    value: "< 5s",
    change: "Instant visualization",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-8 pb-20 text-center md:pt-12 md:pb-28">
      <div className="mx-auto flex max-w-3xl flex-col gap-2">
        <span className="mx-auto inline-flex items-center rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-1 text-xl font-semibold uppercase tracking-[0.3em] text-indigo-200">
          AlgoBridge
        </span>
        <h1 className="text-2xl font-semibold leading-tight text-white md:text-6xl">
          Import strategies from Composer.trade and visualize them instantly
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/strategies"
            className="inline-flex items-center rounded-full bg-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 hover:shadow-indigo-400/40">
            See strategies
          </Link>
          <Link
            href="#visuals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-white">
            View examples
            <span aria-hidden className="text-lg">
              →
            </span>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2" id="visuals">
        <div className="transition-transform duration-300 hover:scale-105">
          <Image
            src="/mermaid.png"
            alt="Strategy diagram example"
            width={900}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-col rounded-3xl border border-white/10 bg-gray-900/60 p-6 h-fit text-left shadow-2xl backdrop-blur">
          <h3 className="text-lg font-semibold text-white">How it works</h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/5 bg-gray-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white">Copy Strategy URL</p>
                  <p className="text-xs text-gray-400">From Composer.trade</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gray-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Paste in AlgoBridge
                  </p>
                  <p className="text-xs text-gray-400">Instant import</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gray-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  3
                </div>
                <div>
                  <p className="font-semibold text-white">Get Diagram & Code</p>
                  <p className="text-xs text-gray-400">
                    Visual + Mermaid export
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gray-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  4
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-400">
                    Get trading updates delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
