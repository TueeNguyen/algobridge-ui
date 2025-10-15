"use client";

import * as React from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUpForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState("");
  const { signUp, isLoaded } = useSignUp();
  const { isSignedIn } = useUser();

  React.useEffect(() => {
    if (verified || isSignedIn) {
      redirect("/");
    }
  }, [verified, isSignedIn]);
  if (!isLoaded) return null;

  const { startEmailLinkFlow } = signUp.createEmailLinkFlow();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Reset states in case user resubmits form mid signup
    setVerified(false);
    setError("");

    setVerifying(true);

    if (!isLoaded && !signUp) return null;

    // Start the signup process using the email provided
    try {
      await signUp.create({
        emailAddress,
      });

      // Dynamically set the host domain for dev and prod
      // You could instead use an environment variable or other source for the host domain
      const protocol = window.location.protocol;
      const host = window.location.host;

      // Send the user an email with the email link
      const signUpAttempt = await startEmailLinkFlow({
        // URL to navigate to after the user visits the link in their email
        redirectUrl: `${protocol}//${host}/signup/verify`,
      });

      // Check the verification result
      const verification = signUpAttempt.verifications.emailAddress;

      // Handle if user visited the link and completed signup from /signup/verify
      if (verification.verifiedFromTheSameClient()) {
        setVerifying(false);
        setVerified(true);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));

      if (err.errors?.[0]?.longMessage) {
        console.log("Clerk error:", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      } else {
        setError("An error occurred.");
      }
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
    return <div>Signed up successfully!</div>;
  }

  return (
    <div className="flex min-h-screen  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Sign up to your account</CardTitle>
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
                  <FieldDescription className="text-center">
                    Already have an account? <Link href="/signin">Sign in</Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
