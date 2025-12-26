"use client";
import { CircleAlertIcon, XIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../alert";
import { SetStateAction, useEffect } from "react";
import { useTimeout } from "usehooks-ts";

export const EmailSubscriptionAlert = ({
  alertSubscriptionNotification,
  setAlertSubscriptionNotification,
}: {
  alertSubscriptionNotification: AlertSubscriptionNotification[];
  setAlertSubscriptionNotification: React.Dispatch<
    SetStateAction<AlertSubscriptionNotification[]>
  >;
}) => {
  // auto close after 5 secs
  useEffect(() => {
    if (alertSubscriptionNotification.length === 0) {
      return;
    }
    const timeout = setTimeout(() => {
      setAlertSubscriptionNotification([]);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [alertSubscriptionNotification, setAlertSubscriptionNotification]);

  return (
    <>
      {alertSubscriptionNotification.map((notification) => {
        const { strategy, subscribe } = notification;
        return (                 
          <Alert
            key={strategy.composer_id + subscribe}
            className="relative flex justify-between mt-2 border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
            <CircleAlertIcon />

            {/* ui feedbacks for auto close */}
            <div className="alert-progress absolute bottom-0 left-0 h-1 bg-green-600 dark:bg-green-400" />

            <div className="flex-1 flex-col justify-center gap-1">
              <AlertTitle>
                you have {subscribe ? "subscribe" : "unsubscribe"} for{" "}
                {strategy.name}
              </AlertTitle>
              <AlertDescription>
                Information about{" "}
                <span className="font-bold">{strategy.name}</span> will be sent
              </AlertDescription>
            </div>
            <button
              className="cursor-pointer"
              onClick={() =>
                setAlertSubscriptionNotification((prev) =>
                  prev.filter(
                    (s) => s.strategy.composer_id !== strategy.composer_id
                  )
                )
              }>
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </button>
          </Alert>
        );
      })}
    </>
  );
};
