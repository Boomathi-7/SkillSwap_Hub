# 🌟 Skill Swap Hub

A modern web application that connects learners and experts to exchange skills and knowledge through peer-to-peer learning.

## 📸 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Skill Matching**: AI-powered algorithm to match users based on complementary skills
- **Invitations**: Send and manage skill swap invitations
- **Notifications**: Real-time notifications for accepted invites
- **User Dashboard**: View profile, skills, and recommendations
- **Email Notifications**: Get notified via email when invites are accepted

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS-in-JS** - Custom styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL database
- Git

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Create a .env file with the following:
# DATABASE_URL=postgresql://user:password@localhost:5432/skillswap
# PORT=5000

# Run Prisma migrations
npx prisma migrate dev

# Seed the database with test data
node seed.js

# Start the server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
skillswaphub/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── data/            # Data store
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   └── seed.js              # Database seeder
│
└── frontend/
    ├── src/
    │   ├── pages/           # React pages
    │   ├── services/        # API services
    │   ├── styles/          # Style utilities
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔧 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/skillswap
PORT=5000
NODE_ENV=development

# Email configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🗄️ Database Schema

### User
- id (Primary Key)
- name
- email (Unique)
- qualification
- mobile
- password (hashed)
- skillsHave (Array)
- skillsNeed (Array)

### Invite
- id (Primary Key)
- senderId (Foreign Key)
- receiverId (Foreign Key)
- status (PENDING/ACCEPTED)
- senderName
- senderEmail
- senderSkills (Array)
- createdAt

### Notification
- id (Primary Key)
- userId (Foreign Key)
- message
- createdAt

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Reset password

### User
- `GET /api/user/me` - Get current user profile

### Matches
- `GET /api/matches` - Get skill matches

### Invites
- `POST /api/invites/send` - Send invite
- `GET /api/invites` - Get pending invites
- `POST /api/invites/accept/:inviteId` - Accept invite

### Notifications
- `GET /api/notifications` - Get user notifications

## 💡 Usage

1. **Register**: Create a new account with your skills
2. **Explore**: Browse other users with complementary skills
3. **Connect**: Send invites to users you want to learn from
4. **Accept**: Accept invites from other learners
5. **Learn**: Start your skill swap journey!

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by peer-to-peer learning platforms

## 📞 Support

For support, email support@skillswaphub.com or open an issue on GitHub.

---

**Happy Learning! 🚀**
