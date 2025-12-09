// cryptoHelpers.ts

// ---- Types ----

export interface EncryptedPayload {
  cipherText: string; // base64
  iv: string;         // base64
  salt: string;       // base64
}

// ---- Text encoder / decoder ----

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// ---- Base64 helpers ----

// ArrayBuffer -> base64
export function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

// base64 -> ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// ---- Key derivation (PBKDF2 -> AES-GCM key) ----

async function deriveKey(password: string, salt: ArrayBuffer): Promise<CryptoKey> {
  // 1. Import the password as a raw key for PBKDF2
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  // 2. Derive an AES-GCM key
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      // salt must be a BufferSource; ArrayBuffer is fine
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    } as Pbkdf2Params,
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );

  return key;
}

// ---- Encrypt ----

export async function encryptPassword(
  plainText: string,
  password: string
): Promise<EncryptedPayload> {
  // 1. Generate random salt (as ArrayBuffer) and IV (as Uint8Array)
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const saltBuffer: ArrayBuffer = saltBytes.buffer;

  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM standard IV size

  // 2. Derive key from password + salt
  const key = await deriveKey(password, saltBuffer);

  // 3. Encrypt the plaintext
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv, // Uint8Array is also a BufferSource
    },
    key,
    textEncoder.encode(plainText)
  );

  // 4. Return everything as base64
  return {
    cipherText: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv.buffer),
    salt: bufferToBase64(saltBuffer),
  };
}

// ---- Decrypt ----

export async function decryptPassword(
  cipherTextBase64: string,
  password: string,
  ivBase64: string,
  saltBase64: string
): Promise<string> {
  try {
    // 1. Decode base64 -> ArrayBuffer / Uint8Array
    const saltBuffer = base64ToArrayBuffer(saltBase64);
    const ivBuffer = base64ToArrayBuffer(ivBase64);
    const cipherBuffer = base64ToArrayBuffer(cipherTextBase64);

    const iv = new Uint8Array(ivBuffer); // needed as typed array for AES-GCM

    // 2. Derive the same key from password + salt
    const key = await deriveKey(password, saltBuffer);

    // 3. Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      cipherBuffer
    );

    // 4. Decode to string
    return textDecoder.decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed (wrong password or corrupted data).");
  }
}

// ---- Example usage (optional) ----
// (Remove or comment this out if you don't want it in the file)
/*
async function demo() {
  const password = "my-strong-password";
  const secret = "this is the password I want to protect";

  const encrypted = await encryptPassword(secret, password);
  console.log("Encrypted:", encrypted);

  const decrypted = await decryptPassword(
    encrypted.cipherText,
    password,
    encrypted.iv,
    encrypted.salt
  );
  console.log("Decrypted:", decrypted);
}

demo();
*/
