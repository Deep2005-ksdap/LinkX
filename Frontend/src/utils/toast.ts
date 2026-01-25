import { toast } from "react-toastify";

export const toastSuccess = (msg: string) =>
  toast.success(` LinkX: ${msg}`);

export const toastError = (msg: string) =>
  toast.error(`⚠️ LinkX: ${msg}`);

export const toastInfo = (msg: string) =>
  toast.info(`ℹ️ LinkX: ${msg}`);
