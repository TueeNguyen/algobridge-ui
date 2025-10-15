"use client";

import * as React from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { EmailLinkFactor, SignInFirstFactor } from "@clerk/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function SignInForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState("");
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  React.useEffect(() => {
    if (verified || isSignedIn) {
      redirect("/");
    }
  }, [verified, isSignedIn]);
  if (!isLoaded) return null;

  const { startEmailLinkFlow } = signIn.createEmailLinkFlow();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Reset states in case user resubmits form mid signin
    setVerified(false);
    setError("");

    if (!isLoaded && !signIn) return null;

    // Start the signin process using the email provided
    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: emailAddress,
      });

      setVerifying(true);

      // Filter the returned array to find the 'email_link' entry
      const isEmailLinkFactor = (
        factor: SignInFirstFactor
      ): factor is EmailLinkFactor => {
        return factor.strategy === "email_link";
      };
      const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor);

      if (!emailLinkFactor) {
        setError("Email link factor not found");
        return;
      }

      const { emailAddressId } = emailLinkFactor;

      // Dynamically set the host domain for dev and prod
      // You could instead use an environment variable or other source for the host domain
      const protocol = window.location.protocol;
      const host = window.location.host;

      // Send the user an email with the email link
      const signInAttempt = await startEmailLinkFlow({
        emailAddressId,
        redirectUrl: `${protocol}//${host}/signin/verify`,
      });

      // Check the verification result
      const verification = signInAttempt.firstFactorVerification;

      // Handle if verification expired
      if (verification.status === "expired") {
        setError("The email link has expired.");
      }

      // Handle if user visited the link and completed signin from /signin/verify
      if (verification.verifiedFromTheSameClient()) {
        setVerifying(false);
        setVerified(true);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setError("An error occurred.");
    }
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(false);
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError("")}>Try again</button>
      </div>
    );
  }

  if (verifying) {
    return (
      <div>
        <p>Check your email and visit the link that was sent to you.</p>
        <form onSubmit={reset}>
          <button type="submit">Restart</button>
        </form>
      </div>
    );
  }

  if (verified) {
    return <div>Signed in successfully!</div>;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </Field>
              <Button type="submit">Continue</Button>
            </FieldGroup>
            <FieldDescription className="text-center">
              Don't have an account? <Link href="/signup">Sign in</Link>
            </FieldDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
