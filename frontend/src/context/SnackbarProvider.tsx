import { ReactNode, useState } from "react";
import Snackbar from "../components/Snackbar";

import SnackbarContext from "./SnackbarContext";
import { SnackbarObject } from "./Type";

function SnackbarProvider({ children }: { children: ReactNode }) {
  const [notif, setNotif] = useState<SnackbarObject>({
    type: "",
    message: "",
    duration: 0,
  });
  let value = { notif, setNotif };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar type={notif.type} message={notif.message} duration={notif.duration}></Snackbar>
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
