# LinkX - URL Shortener

A modern, full-stack URL shortening service built with React, Node.js, Express, and MongoDB. Features user authentication, analytics, and a responsive UI with dark/light theme support.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Secure registration and login with JWT tokens
- **Dashboard**: Manage your shortened URLs with an intuitive interface
- **Analytics**: Track click counts, view detailed analytics with charts for clicks over time, referrer data, and individual link performance
- **Real-time Analytics**: Dashboard updates automatically every 30 seconds with latest click data
- **Overall Analytics**: View comprehensive analytics across all your links including total clicks, unique visitors, and top performing links
- **URL Management**: Edit and delete your shortened URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Secure**: Password hashing, HTTP-only cookies, and CORS protection

## 🛠 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation

### Frontend

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Recharts** - Chart library for data visualization

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd LinkX
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Variables**

   Create a `.env` file in the Backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/linkx
   JWT_SECRET=your-super-secret-jwt-key
   ```

## 🚀 Running the Application

1. **Start the Backend**

   ```bash
   cd Backend
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📖 Usage

1. **Visit the landing page** at `http://localhost:5173`
2. **Register** a new account or **login** if you already have one
3. **Shorten URLs** using the dashboard
4. **View analytics** for your shortened links, including real-time charts for click trends, referrer data, and overall performance
5. **Monitor real-time updates** - analytics data refreshes automatically every 30 seconds
6. **Manage your URLs** - edit or delete as needed

## 🔌 API Endpoints

### Authentication

- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user info

### URLs

- `POST /shortURL` - Create a shortened URL
- `GET /my-url` - Get all URLs for authenticated user
- `GET /:shortID` - Redirect to original URL
- `DELETE /:shortID` - Delete a shortened URL

### Analytics

- `GET /analytics/over-all` - Get overall analytics for all user URLs (requires authentication)
- `GET /analytics/:shortID` - Get click analytics for a specific URL (requires authentication)

## 🏗 Project Structure

```
LinkX/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database and JWT config
│   │   ├── controller/      # Route handlers
│   │   ├── middleware/      # Authentication and error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Main server file
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **DEEPANSHU** - _Initial work_ - [Your GitHub](https://github.com/Deep2005-ksdap)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Inspired by popular URL shortening services like Bitly and TinyURL
