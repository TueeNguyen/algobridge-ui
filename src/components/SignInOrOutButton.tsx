"use client";

import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

export default function SignInOrOutButton({}) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isLoaded) return;
  //   sign-in button
  //   different than clerk provided SignInButton
  const SignInButtonWrap = () => {
    return (
      <>
        <Button onClick={() => setToggle(true)}>Sign In</Button>

        {toggle &&
          mounted &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-black/50"
              onClick={(e) => {
                if (e.target === e.currentTarget) setToggle(false);
              }}>
              <div className="relative">
                <SignIn routing="hash" forceRedirectUrl={"/strategies"} />
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  };

  const SignOutButtonWrap = () => {
    return (
      <Button variant="destructive">
        <SignOutButton redirectUrl="/strategies" />
      </Button>
    );
  };
  return (
    <div className="relative">
      {!(isSignedIn && user) ? <SignInButtonWrap /> : <SignOutButtonWrap />}
    </div>
  );
}
