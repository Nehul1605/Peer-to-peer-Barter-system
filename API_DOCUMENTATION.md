# API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

### Register
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`

### Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` (Returns token and user object)

### Google Login
- **Endpoint**: `/auth/google`
- **Method**: `GET`
- **Description**: Redirects to Google Login. After login, redirects to `http://localhost:5173/oauth/callback?token=...`

## Users

### Get Profile
- **Endpoint**: `/users/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

### Update Profile
- **Endpoint**: `/users/profile`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "bio": "I love coding",
    "skillsToTeach": ["React", "Node.js"],
    "skillsToLearn": ["Python"]
  }
  ```

## Skills / Matching

### Search Skills
- **Endpoint**: `/skills/search`
- **Method**: `GET`
- **Query Params**: 
  - `query`: String (e.g., "Python")
  - `type`: "TEACH" | "LEARN" (optional)
- **Response**: `200 OK` (Returns users offering/wanting this skill)

## Sessions

### Create Session Request
- **Endpoint**: `/sessions/request`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "teacherId": "uuid",
    "skillId": "uuid",
    "topic": "Intro to Python",
    "scheduledAt": "2023-12-25T10:00:00Z",
    "durationMinutes": 60
  }
  ```

### Get My Sessions
- **Endpoint**: `/sessions`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

### Update Session Status
- **Endpoint**: `/sessions/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "SCHEDULED" 
    // values: 'SCHEDULED' (Generates Meet Link), 'COMPLETED' (Transfers Credits), 'CANCELLED'
  }
  ```

### Add Review
- **Endpoint**: `/sessions/:sessionId/review`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "rating": 5,
    "comment": "Great session!"
  }
  ```
