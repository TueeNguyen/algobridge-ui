"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../../ui/button";

export default function SignOutBtn() {
  return (
    <SignOutButton>
      <Button variant="destructive"> Sign out</Button>
    </SignOutButton>
  );
}
