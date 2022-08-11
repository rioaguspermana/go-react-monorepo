import { AxiosResponse } from "axios";
import React from "react";

interface AuthContextType {
  user: any;
  validate: () => Promise<AxiosResponse>;
  signin: (user: string, password: string) => Promise<AxiosResponse>;
  signout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;
