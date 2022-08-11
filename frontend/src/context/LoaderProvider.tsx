import { ReactNode, useState } from "react";

import LoaderContext from "./LoaderContext";

function LoaderProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string>("");
  let value = { message, setMessage };

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export default LoaderProvider;
