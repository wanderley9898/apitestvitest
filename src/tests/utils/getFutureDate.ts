import { parseISO, setYear } from "date-fns";

/**
 * Returns a date 1 year in the future
 * @returns Date
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}