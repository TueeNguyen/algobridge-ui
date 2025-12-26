import Link from "next/link";
import { AddComposerButton } from "../ui/app/addComposerButton";
import { AvatarMenu } from "../ui/app/avatarMenu";
import { Button } from "../ui/button";
import { SignIn } from "@clerk/nextjs";
import SignInOrOutButton from "../SignInOrOutButton";

// Server Component - renders static parts
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-200 dark:bg-stone-950 border-gray-500">
      <div className="flex gap-1 h-14 items-center px-4 justify-between">
        <div className="flex gap-2 items-center justify-between">
          <div>
            <Link href="/">
              <span className="font-bold">AlgoBridge</span>
            </Link>
          </div>

          <Button variant="ghost">
            <Link href="/">Home</Link>
          </Button>

          <Button variant="ghost">
            <Link href="/saved">Saved</Link>
          </Button>

          <AddComposerButton />
        </div>

        <div className="flex items-center gap-2 justify-between">
          <SignInOrOutButton />
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
