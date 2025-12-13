import React from "react";
import { Button } from "@/components/ui/button";

import { IconMailFilled, IconMail } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

interface EmailButtonProps {
  isSubscribed: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipText?: string;
  className?: string;
  FilledIcon: React.ComponentType<any>;
  Icon: React.ComponentType<any>;
}

export const ToolButton = ({
  isSubscribed,
  onClick,
  tooltipText = "",
  className = "",
  FilledIcon,
  Icon,
}: EmailButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={className}
          onClick={onClick}>
          {isSubscribed ? <FilledIcon></FilledIcon> : <Icon></Icon>}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p >{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
