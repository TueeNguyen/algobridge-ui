"use client";

import * as React from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  EmailLinkErrorCodeStatus,
  isEmailLinkError,
} from "@clerk/nextjs/errors";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function VerifySignUpEmailLink() {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");

  const { handleEmailLinkVerification, loaded } = useClerk();
  const { isSignedIn } = useUser();

  React.useEffect(() => {
    if (isSignedIn) {
      redirect("/");
    }
  }, [isSignedIn]);
  async function verify() {
    try {
      // Dynamically set the host domain for dev and prod
      // You could instead use an environment variable or other source for the host domain
      const protocol = window.location.protocol;
      const host = window.location.host;

      await handleEmailLinkVerification({
        // URL to navigate to if signup flow needs more requirements, such as MFA
        redirectUrl: `${protocol}//${host}/signup`,
      });

      // If not redirected at this point,
      // the flow has completed
      setVerificationStatus("verified");
    } catch (err: any) {
      let status = "failed";

      if (isEmailLinkError(err)) {
        // If link expired, set status to expired
        if (err.code === EmailLinkErrorCodeStatus.Expired) {
          status = "expired";
        } else if (err.code === EmailLinkErrorCodeStatus.ClientMismatch) {
          // OPTIONAL: This check is only required if you have
          // the 'Require the same device and browser' setting
          // enabled in the Clerk Dashboard
          status = "client_mismatch";
        }
      }

      setVerificationStatus(status);
    }
  }

  React.useEffect(() => {
    if (!loaded) return;

    verify();
  }, [handleEmailLinkVerification, loaded]);

  if (verificationStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (verificationStatus === "failed") {
    return (
      <div>
        <h1>Verify your email</h1>
        <p>The email link verification failed.</p>
        <Link href="/signup">Sign up</Link>
      </div>
    );
  }

  if (verificationStatus === "expired") {
    return (
      <div>
        <h1>Verify your email</h1>
        <p>The email link has expired.</p>
        <Link href="/signup">Sign up</Link>
      </div>
    );
  }

  // // OPTIONAL: This check is only required if you have
  // // the 'Require the same device and browser' setting
  // // enabled in the Clerk Dashboard
  // if (verificationStatus === "client_mismatch") {
  //   return (
  //     <div>
  //       <h1>Verify your email</h1>
  //       <p>
  //         You must complete the email link signup on the same device and browser
  //         that you started it on.
  //       </p>
  //       <Link href="/signup">Sign up</Link>
  //     </div>
  //   );
  // }
  redirect("/");
}
