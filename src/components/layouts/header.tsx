import Link from "next/link";
import { AvatarMenu } from "../ui/app/avatarMenu";
import SignInOrOutButton from "../SignInOrOutButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/strategies", label: "strategies" },
  { href: "/saved", label: "Saved" },
];

// Server Component - renders static parts
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-900/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span className="font-bold">AlgoBridge</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 transition text-lg hover:text-white hover:bg-white/10 rounded-md before:absolute before:inset-0 before:rounded-md before:border before:border-transparent hover:before:border-indigo-400/50">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-between">
          <SignInOrOutButton />
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
