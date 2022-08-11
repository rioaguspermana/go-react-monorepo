export type SnackbarObject = {
  type: "" | "error" | "info" | "success";
  message: string;
  duration?: number;
};