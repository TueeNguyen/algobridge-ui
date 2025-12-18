"use client";

import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";

export default function SignInOrOutButton({}) {
  const [toggle, setToggle] = useState<boolean>(false);
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) return;
  //   sign-in button
  //   different than clerk provided SignInButton
  const SignInButtonWrap = () => {
    return (
      <>
        <Button onClick={() => setToggle(true)}>Sign In</Button>

        {toggle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
            onClick={(e) => {
              if (e.target === e.currentTarget) setToggle(false);
            }}>
            {/* <Button
              className="absolute top-56 right-190 z-[60] bg-red-300 hover:bg-red-400"
              onClick={() => setToggle(false)}
              aria-label="Close dialog"
              size="icon">
              ✕
            </Button> */}

            <SignIn routing="hash" />
          </div>
        )}
      </>
    );
  };

  const SignOutButtonWrap = () => {
    return (
      <Button variant="destructive">
        <SignOutButton />
      </Button>
    );
  };
  return (
    <div className="relative">
      {!(isSignedIn && user) ? <SignInButtonWrap /> : <SignOutButtonWrap />}
    </div>
  );
}
