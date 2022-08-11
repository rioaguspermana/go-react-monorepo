import { createContext, Dispatch, SetStateAction } from "react";

let LoaderContext = createContext<{
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}>(null!);

export default LoaderContext;
