"use client";

import { useAuth } from "@clerk/nextjs";
import SignInButton from "./signInButton";
import SignOutButton from "../signout/signOutButton";

export default function SignOnOrSignOutButton() {
  const { isSignedIn } = useAuth();

  return <>{isSignedIn ? <SignOutButton /> : <SignInButton />}</>;
}
