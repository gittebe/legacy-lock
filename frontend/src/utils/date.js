import { format } from "date-fns";

export const formatDateTime = (date) => {
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate)) {
    return "Invalid date";
  }

  return format(parsedDate, "yyyy-MM-dd HH:mm");
};