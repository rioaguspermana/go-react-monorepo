import { createContext, Dispatch, SetStateAction } from "react";

let SnackbarContext = createContext<{
  notif: TSnackbarObject;
  setNotif: Dispatch<SetStateAction<TSnackbarObject>>;
}>(null!);

export default SnackbarContext;
