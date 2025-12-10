// crypto-utils.ts

// ---- Types ----

export interface EncryptedPayload {
  cipherText: string; // base64
  iv: string;         // base64
  salt: string;       // base64
}

export interface MasterKeyHash {
  hash: string; // base64
  salt: string; // base64
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
  try {
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
  } catch (error) {
    console.error("deriveKey failed:", error);
    throw new Error("Failed to derive encryption key.");
  }
}

// ---- Master password hashing (for verification only) ----

export async function hashMasterPassword(
  masterPassword: string,
  saltBase64?: string
): Promise<MasterKeyHash> {
  try {
    const salt = saltBase64
      ? base64ToArrayBuffer(saltBase64)
      : crypto.getRandomValues(new Uint8Array(16)).buffer;

    // Import password for PBKDF2
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(masterPassword),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    // Derive raw bits (hash), NOT an encryption key
    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 100_000,
        hash: "SHA-256",
      },
      passwordKey,
      256 // bits
    );

    return {
      hash: bufferToBase64(hashBuffer),
      salt: bufferToBase64(salt),
    };
  } catch (error) {
    console.error("hashMasterPassword failed:", error);
    throw new Error("Failed to hash master password.");
  }
}

export async function verifyMasterPassword(
  inputPassword: string,
  storedHash: string,
  storedSalt: string
): Promise<boolean> {
  try {
    const { hash } = await hashMasterPassword(inputPassword, storedSalt);
    return hash === storedHash;
  } catch (error) {
    console.error("verifyMasterPassword failed:", error);
    // If hashing fails, treat as not verified
    return false;
  }
}

// ---- Encrypt with master password ----

export async function encryptPassword(
  plainText: string,
  masterPassword: string,
  userSaltBase64: string
): Promise<{ cipherText: string; iv: string }> {
  const saltBuffer = base64ToArrayBuffer(userSaltBase64);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(masterPassword, saltBuffer);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plainText)
  );

  return {
    cipherText: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv.buffer),
  };
}

// ---- Decrypt with master password ----

export async function decryptPassword(
  cipherTextBase64: string,
  masterPassword: string,
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
    const key = await deriveKey(masterPassword, saltBuffer);

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
    console.error("decryptPassword failed:", error);
    throw new Error("Decryption failed (wrong master password or corrupted data).");
  }
}

// ---- Example usage (remove in production) ----


/*
async function demo() {
  const masterPassword = "my-strong-master";
  const secret = "this is the password I want to protect";

  // 1) First time: hash master password and store (hash + salt) in DB
  const masterHash = await hashMasterPassword(masterPassword);
  console.log("Master hash:", masterHash);

  const salt = masterHash.salt
  // 2) Encrypt some secret
  const encrypted = await encryptPassword(secret, masterPassword,salt);
  console.log("Encrypted:", encrypted);

  // 3) Later: verify master password input
  const ok = await verifyMasterPassword(
    masterPassword,
    masterHash.hash,
    masterHash.salt
  );
  console.log("Master password OK?", ok);

  // 4) Decrypt
  const decrypted = await decryptPassword(
    encrypted.cipherText,
    masterPassword,
    encrypted.iv,
    salt
  );
  console.log("Decrypted:", decrypted);
}

demo();

*/