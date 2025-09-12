import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
// Server Component - renders static parts
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-green-700">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">AlgoBridge</span>
        </Link>

        <Button variant="ghost">
          <Link href="/">Home</Link>
        </Button>

        <div className="ml-auto">
          <Avatar>
            <AvatarImage src="/path/to/image.jpg" alt="Profile Picture" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
