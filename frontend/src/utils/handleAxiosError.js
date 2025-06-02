import { toast } from "react-toastify";

export const handleAxiosError = (error) => {
  if (error.isAxiosError) {
    const status = error.status;

    switch (status) {
      case 401:
        toast.error("You are not authenticated. Please log in.");
        break;
      case 403:
        toast.error("You are not authorized to perform this action.");
        break;
      case 404:
        toast.error("Resource not found.");
        break;
      case 413:
        toast.error("File size too large.");
        break;
      case 429:
        toast.error("Too many requests - please slow down.");
        break;
      default:
        toast.error(error.message);
    }
  } else {
    toast.error(error.message || "An unknown error occurred");
  }

  throw error;
};

