import React, { useState } from "react";

import req from "../services/request";

import AuthContext from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const validate = async () => {
    // send request to check if user login
    const res = await Auth.validate();
    // set user if login
    setUser(res.data.user);
    // return response
    return res.data.user;
  };

  const signin = async (username: string, password: string) => {
    // post login request
    const res = await Auth.signin(username, password);
    // set user is authenticated
    setUser(res.data.user);
    // return response
    return res.data.user;
  };

  const signout = async () => {
    // request logout
    await Auth.signout();
    // set user
    setUser(null);
  };

  const value = { user, validate, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const Auth = {
  async validate() {
    return await req.post("/api/auth/validate");
  },
  async signin(username: string, password: string) {
    return await req.post(
      "/api/auth/login",
      {},
      {
        auth: {
          username,
          password,
        },
      }
    );
  },
  async signout() {
    return await req.post("/api/auth/logout");
  },
};

export default AuthProvider;
