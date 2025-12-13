import { CircleAlertIcon, XIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../alert";
import { SetStateAction } from "react";
export const EmailAlert = ({
  strategies,
  setAlertEmailList,
}: {
  strategies: Strategy[];
  setAlertEmailList: React.Dispatch<SetStateAction<Strategy[]>>;
}) => {
  return (
    <>
      {strategies.map((strategy) => {
        return (
          <Alert key={strategy.composer_id} className="flex justify-between mt-2 border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
            <CircleAlertIcon />
            <div className="flex-1 flex-col justify-center gap-1">
              <AlertTitle>you have subscribe for {strategy.name}</AlertTitle>
              <AlertDescription>
                Information about {strategy.name} will be sent
              </AlertDescription>
            </div>
            <button
              className="cursor-pointer"
              onClick={() =>
                setAlertEmailList((prev) => prev.filter((s) => s.composer_id !== strategy.composer_id))
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
