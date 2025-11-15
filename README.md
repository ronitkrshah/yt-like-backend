# 🎥 Simple Video Uploading API Backend

A lightweight RESTful backend for user management, authentication, and video uploads.

## Installation & Run

Update `.env` file before run

```sh
git clone https://github.com/ronitkrshah/yt-like-backend.git

cd yt-like-backend

npm install

npx tsc && node build/main.js

```

## 🚀 User Endpoints

### ➕ Create User

`POST http://localhost:3000/users/create`

**Request Body**

```json
{
    "fullName": "John Doe",
    "email": "john@mail.com",
    "password": "123456"
}
```

**Response**

```json
{
    "id": "6918d65656aa5cdab016df0d",
    "fullName": "John Doe",
    "email": "john@mail.com"
}
```

---

### 🔍 Find User by Email or ID

`GET http://localhost:3000/users/find?email=john@mail.com`

`GET http://localhost:3000/users/find?userId=6918d65656aa5cdab016df0d`

**Response**

```json
{
    "id": "6918d65656aa5cdab016df0d",
    "fullName": "John Doe",
    "email": "john@mail.com"
}
```

---

## 🔐 Auth Endpoints

### 🔑 Sign In

`POST http://localhost:3000/auth/signIn`

**Request Body**

```json
{
    "email": "john@mail.com",
    "password": "123456"
}
```

**Response**

```json
{
    "id": "6918d65656aa5cdab016df0d",
    "fullName": "John Doe",
    "email": "john@mail.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎞 Video Endpoints

### 📋 Get All Videos

`GET http://localhost:3000/videos/all`

**Response**

```json
[
    {
        "id": "6918da7d56aa5cdab016df20",
        "title": "Abc",
        "description": "Optional",
        "url": "http://localhost:3000/f6233b1a-82d8-45c1-909c-640d7f5aa6ae.mp4",
        "uploadedBy": "6918d65656aa5cdab016df0d",
        "uploadedOn": "2025-11-15T19:54:37.660Z"
    }
]
```

---

### 🎬 Get Video by ID

`GET http://localhost:3000/videos/find/6918da7d56aa5cdab016df20`

**Response**

```json
{
    "id": "6918da7d56aa5cdab016df20",
    "title": "Abc",
    "description": "Optional",
    "url": "http://localhost:3000/f6233b1a-82d8-45c1-909c-640d7f5aa6ae.mp4",
    "uploadedBy": "6918d65656aa5cdab016df0d",
    "uploadedOn": "2025-11-15T19:54:37.660Z"
}
```

---

### ⬆️ Upload Video

`POST http://localhost:3000/videos/upload`

**Authorization Required**

**Request Body (Multipart FormData)**

| Field       | Type              | Description                     |
| ----------- | ----------------- | ------------------------------- |
| video       | File              | Actual video file from computer |
| title       | String            | Video title                     |
| description | String (optional) | Video description               |

**Response**

```json
{
    "id": "6918da7d56aa5cdab016df20",
    "title": "Abc",
    "description": "Optional",
    "url": "http://localhost:3000/f6233b1a-82d8-45c1-909c-640d7f5aa6ae.mp4",
    "uploadedBy": "6918d65656aa5cdab016df0d",
    "uploadedOn": "2025-11-15T19:54:37.660Z"
}
```

---

## 🧾 Notes

-   All `POST` endpoints expect `JSON` or `FormData` bodies.
-   Include authentication tokens in headers for protected routes.

---
