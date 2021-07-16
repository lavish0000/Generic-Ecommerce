import Cookies from "universal-cookie";
import { decrypt, encrypt, getGMTTime } from "./commonFunctions";

const cookies = new Cookies();


export const saveDataInCookie = (key, value, timeInDays = 1) => {
  const date = getGMTTime(timeInDays);
  const data = value ? encrypt(JSON.stringify(value)) : null;
  cookies.set(key, data, { expires: date, secure: process.env.NODE_ENV === "production",});
};

export const getDataFromCookie = async (key) => {
  let data = await cookies.get(key);
  data = data ? JSON.parse(decrypt(data)) : null;
  return data;
};

export const deleteDataFromCookie = (key) => {
  cookies.remove(key);
};
