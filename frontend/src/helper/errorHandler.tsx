import axios from "axios";

function errorHandler(error: any): string {
  console.log(error);
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 403) {
      window.location.reload();
      return "Session End";
    } else {
      return error.response.data.message || "Unknown Error";
    }
  } else {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "Unknown Error";
    }
  }
}

export default errorHandler;
