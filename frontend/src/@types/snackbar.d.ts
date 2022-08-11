declare type TSnackbarObject = {
  type: "" | "error" | "info" | "success";
  message: string;
  duration?: number;
};