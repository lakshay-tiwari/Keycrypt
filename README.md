# 🔐 KeyCrypt

**KeyCrypt** is a secure password manager built as a monorepo using **Turborepo**.  
It allows users to store passwords safely using **strong encryption** — passwords are **encrypted before being saved to the database** and can **only be decrypted with the user’s master password**.

> 🔒 **Zero-knowledge design**: The server never stores or knows your master password.

---

## ✨ Features

- 🔐 Client-side encryption using the **Web Crypto API**
- 🧠 Master password–based encryption & decryption
- 🗄️ Encrypted passwords stored securely in the database
- 🚫 Passwords are **never stored in plain text**
- 📦 Monorepo architecture with shared packages
- ⚡ Fast builds & caching via Turborepo

---

## 📑 Table of Contents

- [Features](#-features)
- [Monorepo Structure](#monorepo-structure)
- [Security Model](#-security-model)
- [Installation](#-local-development-setup)
- [Build](#build)
- [License](#-license)


## 🏗️ Monorepo Structure<a id="monorepo-structure">

```text
.
├── app/
│   └── web/                # Next.js web application
│
├── packages/
│   ├── db/                 # Prisma database layer
│   ├── ui/                 # Shared UI components
│   └── typescript-config/  # Shared TypeScript configuration
│
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```


---

## 📦 Apps & Packages

### `app/web`
- **Framework:** Next.js
- **Purpose:** Main KeyCrypt web application
- Responsibilities:
  - User interface
  - Client-side encryption and decryption
  - Secure password management
  - Communication with the backend API

---

### `packages/db`
- **ORM:** Prisma
- **Purpose:** Database access layer
- Responsibilities:
  - Prisma schema and migrations
  - Database client
  - Secure storage of encrypted password data

---

### `packages/ui`
- Shared React UI components
- Used by the web app
- Ensures consistent design and reusable components

---

### `packages/typescript-config`
- Shared `tsconfig` presets
- Used across all apps and packages
- Keeps TypeScript configuration consistent

---

## 🔐 Security Model

- Passwords are encrypted **before** being saved to the database
- Encryption is handled using the **Web Crypto API**
- The **master password is never stored**
- Only the correct master password can decrypt stored data
- Database access alone cannot reveal user passwords

> ⚠️ If a master password is lost, encrypted data **cannot be recovered**

---

## 🛠️ Tech Stack

- **Monorepo:** Turborepo
- **Package Manager:** pnpm
- **Frontend:** Next.js (React)
- **Database:** Prisma
- **Encryption**: Web Crypto API
- **Language**: Typescript, JavaScript
- **Authentication**: Supabase


## 🚀 Local Development Setup

### Prerequisites
Node.js (v18 or later recommended)
pnpm (npm install -g pnpm)
A supported database (PostgreSQL / SQLite / MySQL)

### Clone the repository
```bash
git clone <>
```

### Install dependencies
```bash
pnpm install
```

### Set up environment Variable
Do this in **./apps/web** && **./packages/db package**
```bash
cp .env.example .env
```
Update database credentials and required secrets.

### Run Database Migration
Go inside **./packages/db/** folder
```bash
pnpm run db:migrate
```
Add the name of Migration

### Generate Prisma Client
Go inside **./packages/db/** folder
```bash
pnpm run db:generate
```

### Run the application 
From root directory
```bash
pnpm turbo dev
```

From Nextjs Directory
```bash
pnpm dev
```

### 🏗️ Build<a id="build">
Run this from Root directory
```bash
pnpm turbo run build
```


## ⚠️ Disclaimer
KeyCrypt is a security-focused project.
Always review and audit cryptographic implementations before using in production.


## 📄 License
MIT License © 2025 KeyCrypt
