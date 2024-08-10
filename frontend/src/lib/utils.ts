import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatDateType = {
  day: number;
  date: number;
  hour: number;
};

export const formatDate = ( timeZone: number) => {
  
  const offsetMilliseconds = timeZone * 1000;
  const localTimeMilliseconds = new Date().toUTCString() + offsetMilliseconds;
  const localDate = new Date(localTimeMilliseconds);

  const day = localDate.getDay();
  const hour = localDate.getHours();
  const date = localDate.getDate();

  const data: FormatDateType = { day, date, hour };
  return data;
};