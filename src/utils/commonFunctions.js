import crypto from "crypto";

import { REACT_APP_IV, REACT_APP_SECRET_KEY } from "./constants";

const algorithm = "aes-256-cbc";
let key = REACT_APP_SECRET_KEY;
const iv = REACT_APP_IV;

export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties,
    };
  };


  export const getGMTTime = (after) => {
    let daysInMs = 1000 * 60 * 60 * 24 * after || 0;
    return new Date(Date.now() + daysInMs);
  };


  export const encrypt = (text) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
  };
  
  export const decrypt = (text) => {
    let iv = text.iv;
    let encryptedText = Buffer.from(text.encryptedData, "hex");
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  };