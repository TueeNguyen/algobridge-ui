import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../button";
import { cn } from "@/lib/utils";
// Handling tools click (email, tool)
// const handleEmailClick = (e: React.MouseEvent, strategy: Strategy) => {
//   // TODO: implementing sending api request to backend to register user for sending
//   // email this strategy
//   e.stopPropagation();
//   if (emailStrategies.includes(strategy.composer_id)) {
//     setEmailStrategies((prev) =>
//       prev.filter((id) => id !== strategy.composer_id)
//     );
//     return;
//   }
//   setEmailStrategies((prev) => [...prev, strategy.composer_id]);
// };
// Handling tools click (email, tool)
const handleEmailClick = async (
  e: React.MouseEvent,
  token: string | null | undefined
) => {
  // TODO: implementing sending api request to backend to register user for sending
  // email this strategy
  e.stopPropagation();
  if (!token) {
    return;
  }

  const url = new URL(
    "/api/external/strategies/email/1",
    process.env.NEXT_PUBLIC_BASE_URL
  );
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ jwtToken: token }),
    });

    const data = await res.json();
  } catch (e) {
    console.error(e);
  }
};

export const EmailButton = ({
  className,
  variant,
  size,
  token,
  ...props
}: React.ComponentProps<"button"> & { token?: string | null } & VariantProps<
    typeof buttonVariants
  >) => {
  return (
    <Button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(e) => {
        handleEmailClick(e, token);
      }}
      {...props}></Button>
  );
};
