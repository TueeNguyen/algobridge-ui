import Link from "next/link";
// const columns = [
//   {
//     title: "Platform",
//     links: [
//       { label: "Product roadmap", href: "/roadmap" },
//       { label: "Security", href: "/security" },
//       { label: "Integrations", href: "/integrations" },
//     ],
//   },
//   {
//     title: "Solutions",
//     links: [
//       { label: "Hedge funds", href: "/solutions/hedge-funds" },
//       { label: "Proprietary trading", href: "/solutions/prop" },
//       { label: "Digital assets", href: "/solutions/digital-assets" },
//     ],
//   },
//   {
//     title: "Company",
//     links: [
//       { label: "About", href: "/about" },
//       { label: "Careers", href: "/careers" },
//       { label: "Contact", href: "/contact" },
//     ],
//   },
// ];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950/80 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-white">AlgoBridge</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {/* {columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-gray-400">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AlgoBridge. All rights reserved.</p>
          {/* <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link
              href="https://www.linkedin.com"
              className="transition hover:text-white">
              LinkedIn
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
