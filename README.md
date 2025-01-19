# Reflect Backend - README

Welcome to the Reflect Backend! This document provides an overview of the backend services that power the Journal App, enabling secure, efficient, and scalable journaling experiences.

---

## Table of Contents
1. [About the Backend](#about-the-backend)
2. [Features](#features)
3. [Core Components](#core-components)
4. [Authentication](#authentication)
5. [Storage and Caching](#storage-and-caching)
6. [End-to-End Encryption (E2EE)](#end-to-end-encryption-e2ee)
7. [Technologies Used](#technologies-used)
8. [Setup and Installation](#setup-and-installation)

---

## About the Backend
The Reflect App Backend provides a robust infrastructure for managing user data, synchronizing entries, and enabling features such as end-to-end encryption, cloud storage, and caching. Built with scalability and security in mind, it integrates AWS S3 for file storage, a caching mechanism for offline access, and Firebase for user authentication.

---

## Features
- **User Authentication:** Secure sign-in using Firebase (Google OAuth and email-password support).
- **Encrypted Data Management:** End-to-end encryption (E2EE) for sensitive data.
- **Cloud File Storage:** AWS S3 integration for storing images and large files.
- **Efficient Caching:** Separate caching layers for users and chapters.
- **Scalable Architecture:** Designed to handle multiple users with efficient database querying and API handling.

---

## Core Components
### User Management
- Handles user authentication via Firebase.
- Links users to their respective data, ensuring multi-device support.

### Entries and Chapters
- Supports CRUD operations for chapters and entries.
- Hierarchical organization of entries under chapters.

### File Uploads
- Integrates with AWS S3 for storing images.
- Generates pre-signed URLs for secure and direct file access.

### Encryption
- Implements AES encryption for sensitive user data.
- Encryption keys are derived and managed securely for each user.

---

## Authentication
- **Firebase Authentication:** Supports Google OAuth and email-password login.

---

## Storage and Caching
### AWS S3
- **File Storage:** Stores images and files uploaded by users.
- **Public and Private Access:** Files can be made public or restricted as needed.
- **Pre-signed URLs:** Ensures secure access without exposing credentials.

### Caching Mechanism
- **User-Level Caching:** Data is cached separately for each user.
- **Chapter-Level Caching:** Enhances performance by caching data for individual chapters.
- **Offline Access:** Cached data is available offline, with seamless syncing upon connectivity restoration.

---

## End-to-End Encryption (E2EE)
- **AES Encryption:** Ensures that user data is encrypted before storage and decrypted only on the client-side.
- **Encryption Keys:** Derived from user credentials, ensuring secure and unique keys.
- **Secure Syncing:** Encrypted data is synced across devices via the backend without compromising security.

---

## Technologies Used
### Core Frameworks
- **Node.js:** Backend runtime environment.
- **Express.js:** Web framework for building RESTful APIs.

### Storage and Authentication
- **MongoDB:** Database for managing user data, entries, and chapters.
- **AWS S3:** File storage for images and other assets.
- **Firebase Authentication:** Handles user authentication securely.

### Server Hosting
- **AWS EC2:** Enables to host server 24/7

---

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://https://github.com/FrostyCake47/reflect-backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

---
