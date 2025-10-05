import Link from "next/link";
import { AddComposerButton } from "../ui/app/addComposerButton";
import { AvatarMenu } from "../ui/app/avatarMenu";
import { Button } from "../ui/button";
// Server Component - renders static parts
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-gray-200 dark:bg-stone-950 border-gray-500">
      <div className="flex gap-1 h-14 items-center px-4">
        <Link href="/" className="mr-2 flex items-center">
          <span className="font-bold">AlgoBridge</span>
        </Link>

        <Button variant="ghost" className="px-2">
          <Link href="/">Home</Link>
        </Button>

        <Button variant="ghost" className="px-2">
          <Link href="/saved">Saved</Link>
        </Button>

        <AddComposerButton />

        <div className="ml-auto">
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
