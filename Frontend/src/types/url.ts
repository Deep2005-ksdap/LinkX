import type { Dispatch, SetStateAction } from "react";

export interface ShortUrl {
  id?: string;
  shortID: string;
  shortUrl?: string;
  owner?: string;
  fullUrl: string;
  msg?:string;
  isAlreadyExist: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface UrlContextType {
  urls: ShortUrl[];
  loading: boolean;
  error: string | null;
  refreshFlag: boolean;

  setError: Dispatch<SetStateAction<string| null>>;
  setRefreshFlag: Dispatch<SetStateAction<boolean>>;
  deleteUrl: (shortID: string) => Promise<void>;
  createShortUrl: (fullUrl: string) => Promise<ShortUrl | null>;
  getMyUrls: () => Promise<void>;
}
