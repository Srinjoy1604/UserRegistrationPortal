# User Registration Portal

A full-stack User Registration Portal with features to register, view, update, and delete users. Built using the MERN stack (MongoDB, Express, React, Node.js).

---

## 📁 Folder Structure

```
UserRegistrationPortal/
├── backend/
└── frontend/
```

---

## 🚀 Getting Started

### 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Srinjoy1604/UserRegistrationPortal.git
cd UserRegistrationPortal
```

2. **Install Dependencies**

For both frontend and backend, run:

```bash
cd frontend
npm install
cd backend
npm install
```

3. **Environment Variables**

Create a `.env` file in **both frontend and backend** directories.

#### 👉 Backend `.env` format:

```
PORT="<PORT>"
MONGO_URI="<Your MongoDB cluster URI>"
```

#### 👉 Frontend `.env` format:

```
VITE_BASE_URL="<Your backend URL>"
```

> Example: `http://localhost:8000` if backend runs on port 8000.

4. **Run the Application**

In two separate terminals:

```bash
cd frontend
npm run dev
```

```bash
cd backend
npm run dev
```

---

## ⚙️ Backend Routes (Express)

Base URL: `/user`

### 1. **Register User**
- **POST** `/user/register`
- **Request Body:**

```json
{
  "name": "John Doe",
  "age": 25,
  "dateOfBirth": "1999-01-01",
  "gender": "Male",
  "about": "A software developer",
  "password": "securePassword123"
}
```

- **Response:**

```json
{
  "message": "User registered successfully",
  "success": true
}
```

### 2. **Get All Users**
- **GET** `/user/usersData`

- **Response:**

```json
{
  "success": true,
  "users": [
    {
      "_id": "abc123",
      "name": "John Doe",
      "age": 25,
      "dateOfBirth": "1999-01-01T00:00:00.000Z",
      "gender": "Male",
      "about": "A software developer",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 3. **Update User**
- **PUT** `/user/:id`

- **Request Body:**

```json
{
  "name": "John Smith",
  "age": 26,
  "dateOfBirth": "1998-12-01",
  "gender": "Male",
  "about": "Updated description",
  "password": "securePassword123"
}
```

- **Response:**

```json
{
  "message": "User updated successfully",
  "success": true,
  "user": {
    "_id": "abc123",
    "name": "John Smith",
    "age": 26,
    "dateOfBirth": "1998-12-01T00:00:00.000Z",
    "gender": "Male",
    "about": "Updated description"
  }
}
```

### 4. **Delete User**
- **DELETE** `/user/:id`

- **Response:**

```json
{
  "message": "User deleted successfully",
  "success": true
}
```

### 5. **Get Gender Options**
- **GET** `/user/genders`

- **Response:**

```json
["Male", "Female", "Other"]
```

---

## 💡 Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js, Node.js, MongoDB
- **Database:** MongoDB (Mongoose)
- **Others:** bcrypt (password hashing), dotenv, CORS

> 📦 Axios is used for API requests and all responses are in JSON format.

---

## 📬 API Health Check

- **GET** `/health` → Returns `"Server ON"` if backend is running.

---

## 📝 Assumptions

- As no email field was specified in the requirements, the user's `name` is used to check for duplicate registrations.
- Since no login page or authentication flow was mentioned, the update route requires the user to re-enter their **password** to confirm their identity before making changes.

