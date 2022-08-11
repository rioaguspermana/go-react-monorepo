import { createContext, Dispatch, SetStateAction } from "react";

import { SnackbarObject } from "./Type";

let SnackbarContext = createContext<{
  notif: SnackbarObject;
  setNotif: Dispatch<SetStateAction<SnackbarObject>>;
}>(null!);

export default SnackbarContext;
