import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringCompare = (
  a: string,
  b: string,
  caseInsensitive: boolean = true
) => {
  if (caseInsensitive) {
    return a.toLowerCase() === b.toLowerCase();
  }
  return a === b;
};

export const formatDate = (dateStringUTC?: string | null): string => {
  const unixTime = Date.parse(dateStringUTC || "");
  const date = new Date(unixTime);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate().toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
};
