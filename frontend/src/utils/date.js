import { format } from "date-fns";

/**
 * Format a date to "YYYY-MM-DD HH:mm"

 */
export const formatDateTime = (date) => {
  return format(new Date(date), "yyyy-MM-dd HH:mm");
};
