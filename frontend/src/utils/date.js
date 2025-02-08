import { format } from "date-fns";

/**
 * Format a date to "YYYY-MM-DD HH:mm"

 */
export const formatDateTime = (date) => {
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate)) {
    console.error("Invalid date provided to formatDateTime:", date);
    return "Invalid date";
  }

  return format(parsedDate, "yyyy-MM-dd HH:mm");
};
