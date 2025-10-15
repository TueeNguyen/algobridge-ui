import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  return (
    <Link href="/signup" passHref>
      <Button variant="default">Sign Up</Button>
    </Link>
  );
}
