# ANJUSA WEB

A web application for managing artwork submissions, notices, and user authentication with role-based access control.

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Most endpoints require authentication via JWT token sent as a cookie or in the Authorization header.

### User Roles
- `user` - Default role for registered users
- `artist` - Can create and manage their own artworks
- `admin` - Full access to all features including user management

---

## Auth Routes (`/api/auth`)

### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "user" // optional, defaults to "user"
}
```

**Response (201):**
```json
{
  "message": "User created",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

### POST `/auth/logout`
Logout the current user. **Requires Authentication**

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### GET `/auth/verify`
Verify current user token. **Requires Authentication**

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "role": "user",
    "email": "john@example.com",
    "artworks": [],
    "profile": null
  }
}
```

---

## Artwork Routes (`/api/artwork`)

### GET `/artwork`
Get all approved artworks (public access).

**Response (200):**
```json
[
  {
    "_id": "artwork_id",
    "title": "Beautiful Painting",
    "artist": "artist_id",
    "image": {
      "secureUrl": "https://cloudinary.../image.jpg",
      "publicId": "artworks/xyz123"
    },
    "description": "A beautiful landscape painting",
    "status": "approved"
  }
]
```

### GET `/artwork/artist/:artistId`
Get all artworks by a specific artist.

**Response (200):**
```json
[
  {
    "_id": "artwork_id",
    "title": "Artist's Work",
    "artist": "artist_id",
    "image": {...},
    "description": "Description here",
    "status": "approved"
  }
]
```

### GET `/artwork/:id`
Get a single artwork by ID.

**Response (200):**
```json
{
  "_id": "artwork_id",
  "title": "Artwork Title",
  "artist": "artist_id",
  "image": {...},
  "description": "Artwork description",
  "status": "approved"
}
```

### POST `/artwork`
Create a new artwork. **Requires Authentication (Artist role)**

**Request Body:**
```json
{
  "title": "My New Artwork",
  "imageUrl": "base64_image_data_or_url",
  "description": "Description of the artwork",
  "price": "price of the artwork",
  "height": "height of the artwork",
  "width": "width of the artwork"
}
```

**Response (201):**
```json
{
  "_id": "artwork_id",
  "title": "My New Artwork",
  "artist": "artist_id",
  "image": {
    "secureUrl": "https://cloudinary.../image.jpg",
    "publicId": "artworks/xyz123"
  },
  "price": 500,
  "dimensions": {
    "height": "24",
    "width": "24"
  },
  "description": "Description of the artwork",
  "status": "pending"
}
```

### PUT `/artwork/:id`
Update an artwork. **Requires Authentication (Artist/Admin)**

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "price": 500,
  "dimensions": "24x36 inches"
}
```

**Response (200):**
```json
{
  "_id": "artwork_id",
  "title": "Updated Title",
  "description": "Updated description",
  "price": 500,
  "dimensions": "24x36 inches"
}
```

### DELETE `/artwork/:id`
Delete an artwork. **Requires Authentication (Artist/Admin)**

**Response (204):** No content

---

## Notice Routes (`/api/notice`)

### GET `/notice`
Get all notices (public access).

**Response (200):**
```json
[
  {
    "_id": "notice_id",
    "title": "Important Notice",
    "content": "Notice content here",
    "type": "general",
    "priority": "medium",
    "status": "active",
    "image": {
      "public_id": "anjusa/noticesImages/xyz123",
      "secure_url": "https://cloudinary.../image.jpg"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST `/notice`
Create a new notice. **Requires Authentication (Admin only)**

**Request Body:**
```json
{
  "title": "New Notice",
  "content": "Notice content",
  "type": "general", // optional, defaults to "general"
  "priority": "high", // optional, defaults to "medium"
  "status": "active", // optional, defaults to "active"
  "image": "base64_image_data" // optional
}
```

**Response (201):**
```json
{
  "message": "Notice created successfully",
  "notice": {
    "_id": "notice_id",
    "title": "New Notice",
    "content": "Notice content",
    "type": "general",
    "priority": "high",
    "status": "active"
  }
}
```

### PUT `/notice/:id`
Update a notice. **Requires Authentication (Admin only)**

**Request Body:**
```json
{
  "title": "Updated Notice Title",
  "content": "Updated content",
  "status": "inactive"
}
```

**Response (200):**
```json
{
  "message": "Notice updated successfully",
  "notice": {
    "_id": "notice_id",
    "title": "Updated Notice Title",
    "content": "Updated content",
    "status": "inactive"
  }
}
```

### DELETE `/notice/:id`
Delete a notice. **Requires Authentication (Admin only)**

**Response (200):**
```json
{
  "message": "Notice deleted successfully"
}
```

---

## Admin Routes (`/api/admin`)

All admin routes require Authentication with Admin role.

### GET `/admin/artworks/pending`
Get all pending artworks for approval.

**Response (200):**
```json
[
  {
    "_id": "artwork_id",
    "title": "Pending Artwork",
    "artist": "artist_id",
    "status": "pending",
    "image": {...},
    "description": "Artwork description"
  }
]
```

### PUT `/admin/artworks/:id/approve`
Approve a pending artwork.

**Response (200):**
```json
{
  "message": "Artwork approved successfully",
  "artwork": {
    "_id": "artwork_id",
    "status": "approved"
  }
}
```

### PUT `/admin/artworks/:id/reject`
Reject a pending artwork.

**Response (200):**
```json
{
  "message": "Artwork rejected successfully",
  "artwork": {
    "_id": "artwork_id",
    "status": "rejected"
  }
}
```

### GET `/admin/users`
Get all users.

**Response (200):**
```json
[
  {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890"
  }
]
```

### PUT `/admin/users/:id/role`
Update a user's role.

**Request Body:**
```json
{
  "role": "artist"
}
```

**Response (200):**
```json
{
  "message": "User role updated successfully",
  "user": {
    "_id": "user_id",
    "role": "artist"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error description here"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Start the server: `npm start`

The server will run on `http://localhost:3000` by default.