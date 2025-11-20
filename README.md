# 🚀 MERN Stack Real-Time Chat Application

A full-stack chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time messaging, user authentication, and modern UI design.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 **User Authentication** - Secure login/signup with Clerk
- 💬 **Real-time Messaging** - Instant message delivery with Socket.IO
- 👥 **Multi-user Chat** - Support for multiple chat conversations
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Live Updates** - Real-time message synchronization
- 🗄️ **MongoDB Integration** - Persistent data storage
- 🚀 **Production Ready** - Optimized for deployment

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Socket.IO Client** - Real-time communication
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database

## 📁 Project Structure

```
deployment-and-devops-essentials-Jigishas/
├── Backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chats.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── chat/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   ├── Message.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
├── README.md
└── Week7-Assignment.md
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (for database)
- **Clerk** account (for authentication)

## 🚀 Installation

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend Setup

1. Navigate to the chat directory:
   ```bash
   cd ../chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🔧 Environment Setup

### Backend Environment Variables

Create a `.env` file in the `Backend` directory:

```env
PORT=3001
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/chatapp
JWT_SECRET=your-super-secret-jwt-key
CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
CLERK_SECRET_KEY=sk_test_your-clerk-secret-key
```

### Frontend Environment Variables

Create a `.env` file in the `chat` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
```

## ▶️ Running the Application

### Development Mode

1. **Start the Backend:**
   ```bash
   cd Backend
   npm run dev
   ```
   Backend will run on `http://localhost:3001`

2. **Start the Frontend:**
   ```bash
   cd chat
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend:**
   ```bash
   cd chat
   npm run build
   ```

2. **Start the Backend:**
   ```bash
   cd Backend
   npm start
   ```

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Chat Endpoints

#### GET /api/chats
Get all chats for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### GET /api/chats/:id/messages
Get all messages for a specific chat.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### POST /api/chats/:id/messages
Send a message to a chat.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "content": "Hello, world!"
}
```

### Socket.IO Events

#### Client Events
- `send-message` - Send a message to a chat
- `join-chat` - Join a chat room

#### Server Events
- `receive-message` - Receive a new message
- `user-joined` - User joined the chat
- `user-left` - User left the chat

## 🚀 Deployment

### Backend Deployment

The backend is deployed on **Render** at:
```
https://deployment-and-devops-essentials-jigishas.onrender.com
```

### Frontend Deployment

The frontend can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Environment Variables for Production

Make sure to set the following environment variables in your deployment platform:

**Backend:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - A secure random string
- `CLERK_PUBLISHABLE_KEY` - From your Clerk dashboard
- `CLERK_SECRET_KEY` - From your Clerk dashboard

**Frontend:**
- `VITE_CLERK_PUBLISHABLE_KEY` - From your Clerk dashboard

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd chat
npm test
```

### Manual Testing

1. **Authentication Flow:**
   - Sign up a new user
   - Log in with existing credentials
   - Verify JWT token generation

2. **Chat Functionality:**
   - Create a new chat
   - Send messages
   - Receive real-time messages
   - Test with multiple users

3. **UI Responsiveness:**
   - Test on different screen sizes
   - Verify mobile compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com/) for authentication
- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Week 7 Assignment: Deployment and DevOps Essentials**
This project demonstrates the deployment of a full MERN stack application with CI/CD pipelines, environment configuration, and production monitoring.
