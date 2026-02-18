//'use server';
import CryptoJS from 'crypto-js';

const PASSWORD_STRING = "560A18CD-6346-4C";
const IV_STRING = "927C6C5C-43E1-48";

/**
 * Decrypts text using AES-128-CBC.
 * The key is derived by hashing the Password with MD5.
 * The IV is used directly.
 * 
 * @param encryptedText Base64 encoded or Hex encoded string
 * @returns Decrypted plaintext
 */
export async function decryptText(encryptedText: string): Promise<string> {
    try {
        // Derive key using MD5
        const key = CryptoJS.MD5(PASSWORD_STRING);

        // IV is the Utf8 parsing of the string
        const iv = CryptoJS.enc.Utf8.parse(IV_STRING);

        // Determine if input is valid hex, otherwise assume Base64
        // Logic: if it only contains hex chars, treat as hex. But Base64 can also look like hex sometimes.
        // However, the previous logic checked /^[0-9a-fA-F]+$/.
        const isHex = /^[0-9a-fA-F]+$/.test(encryptedText);

        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: isHex
                ? CryptoJS.enc.Hex.parse(encryptedText)
                : CryptoJS.enc.Base64.parse(encryptedText)
        });

        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Failed to fetch your data. Try again later");
    }
}

export async function encryptText(text: string): Promise<string> {
    try {
        const key = CryptoJS.MD5(PASSWORD_STRING);
        const iv = CryptoJS.enc.Utf8.parse(IV_STRING);

        const encrypted = CryptoJS.AES.encrypt(
            text,
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        // Return Base64 string
        return encrypted.toString();
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Failed to encrypt your data. Try again later");
    }
}