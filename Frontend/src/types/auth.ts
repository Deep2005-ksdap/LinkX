import type { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  email: string;
  fullname: {
    firstname: string;
    lastname?: string;
  };
}

export interface registerationDataTypes {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
}

export interface validatingErrorType {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  error: string | Partial<validatingErrorType>[] | null;
  loading: boolean;

  setError: Dispatch<
    SetStateAction<string | Partial<validatingErrorType>[] | null>
  >;
  login: (email: string, password: string) => Promise<void>;
  register: (registerationData: registerationDataTypes) => Promise<void>;
  logout: () => void;
}
