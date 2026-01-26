# LinkX - URL Shortener with Analytics

## What is LinkX?

LinkX is a modern URL shortener service with comprehensive analytics features available exclusively for logged-in users. It allows users to create short, shareable links from long URLs and provides detailed insights into link performance through interactive dashboards and real-time data visualization.

## Why I Built It

I built LinkX primarily to enhance my knowledge over various technologies and concepts I was previously unaware of. This project served as a practical learning experience to deepen my understanding of full-stack development, data aggregation, authentication systems, and modern web development practices.

## Key Features (Phase-wise Development)

### Phase 1: Core URL Shortening

- Basic URL shortening functionality
- Automatic redirection from short links to original URLs
- Simple and efficient link generation

### Phase 2: Authentication & User Management

- User registration and login system with JWT authentication
- Support for both guest users and registered owners
- Frontend built with modern React and responsive design
- Basic user dashboard for managing links

### Phase 2.5: Enhanced UI & Analytics Foundation

- Updated UI with improved design and user experience
- Core logic refinements and performance optimizations
- Event logging system for tracking link interactions
- Data aggregation framework for analytics processing
- Foundation for displaying analytics data on the UI
- Click tracking, referrer analysis, and performance metrics
- Real-time analytics updates

### Phase 3: Advanced Analytics & Future Enhancements (In Progress)

- Advanced user management features
- Comprehensive analytics dashboard with charts and graphs
- API rate limiting and security enhancements

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework for API development
- **TypeScript** - Type safety and better development experience
- **MongoDB** - NoSQL database for storing URLs and analytics data
- **Mongoose** - ODM for MongoDB interactions
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcrypt** - Password hashing for security
- **express-validator** - Input validation and sanitization
- **node-cron** - Scheduled tasks for cleanup operations
- **CORS** - Cross-origin resource sharing configuration

### Frontend

- **React** - Component-based UI library
- **TypeScript** - Type safety in frontend code
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **React Icons** - Icon library for UI elements
- **Recharts** - Data visualization library for analytics charts
- **React Context API** - State management for authentication and URL data

## Architecture (High Level)

LinkX follows a modern full-stack architecture with clear separation of concerns:

### Backend Architecture

- **RESTful API** design with Express.js
- **MVC pattern** (Models, Views/Controllers, Routes)
- **Middleware-based** authentication and validation
- **Event-driven** analytics logging system
- **Scheduled cleanup** jobs using cron
- **Modular structure** with separate concerns (auth, URLs, analytics)

### Frontend Architecture

- **Component-based** React application
- **Context API** for global state management
- **Protected routes** with authentication guards
- **Responsive design** with mobile-first approach
- **Real-time updates** for analytics data
- **Theme support** (dark/light mode)

### Data Flow

1. User creates short URL → Stored in MongoDB with ownership
2. Link clicks generate events → Logged in separate collection
3. Analytics queries aggregate event data → Displayed in dashboard
4. Scheduled cleanup removes expired guest links

## Challenges Faced

### Complex Data Aggregation

Implementing efficient MongoDB aggregation pipelines for analytics data was challenging. The need to aggregate click events by time periods, referrers, and various metrics required careful query optimization and understanding of MongoDB's aggregation framework.

### File Structure & Code Organization

Maintaining a clean, scalable file structure across both frontend and backend was initially challenging. As the project grew, I had to refactor and reorganize code to maintain separation of concerns and improve maintainability.

### Proper Token-Based Authentication

Implementing secure authentication that prevents various types of attacks (XSS, CSRF, etc.) required deep understanding of:

- HTTP-only cookies for token storage
- CORS configuration for cross-origin requests
- Proper token validation and refresh mechanisms
- Secure password handling and validation

## What I Learned

Through building LinkX, I gained valuable knowledge in several areas:

### Technical Skills

- **Base62 Encoding**: Implementing custom URL shortening algorithm using base62 encoding for generating short, unique identifiers
- **Event Logging & Analytics**: Designing and implementing an event-driven system for tracking user interactions and aggregating data for insights
- **MongoDB Aggregation**: Advanced querying techniques for data analysis, including grouping, filtering, and time-based aggregations
- **Request Object Analysis**: Deep understanding of Express.js request objects, including headers, cookies, user agents, and referrer information

### Development Practices

- **Full-Stack Development**: End-to-end development experience from database design to UI implementation
- **Authentication Security**: Best practices for implementing secure user authentication and authorization
- **API Design**: Creating RESTful APIs with proper error handling and validation
- **Performance Optimization**: Database query optimization and efficient data processing
- **TypeScript Integration**: Using TypeScript for better code quality and developer experience

### Tools & Technologies

- Modern React development with hooks and context
- MongoDB schema design and relationships
- Cron job scheduling for automated tasks
- Environment configuration and security best practices

# LinkX - URL Shortener with Analytics

## What is LinkX?

LinkX is a modern URL shortener service with comprehensive analytics features available exclusively for logged-in users. It allows users to create short, shareable links from long URLs and provides detailed insights into link performance through interactive dashboards and real-time data visualization.

## Why I Built It

I built LinkX primarily to enhance my knowledge over various technologies and concepts I was previously unaware of. This project served as a practical learning experience to deepen my understanding of full-stack development, data aggregation, authentication systems, and modern web development practices.

## Key Features (Phase-wise Development)

### Phase 1: Core URL Shortening

- Basic URL shortening functionality
- Automatic redirection from short links to original URLs
- Simple and efficient link generation

### Phase 2: Authentication & User Management

- User registration and login system with JWT authentication
- Support for both guest users and registered owners
- Frontend built with modern React and responsive design
- Basic user dashboard for managing links

### Phase 2.5: Enhanced UI & Analytics Foundation

- Updated UI with improved design and user experience
- Core logic refinements and performance optimizations
- Event logging system for tracking link interactions
- Data aggregation framework for analytics processing
- Foundation for displaying analytics data on the UI

### Phase 3: Advanced Analytics & Future Enhancements (In Progress)

- Comprehensive analytics dashboard with charts and graphs
- Real-time analytics updates
- Click tracking, referrer analysis, and performance metrics
- Advanced user management features
- API rate limiting and security enhancements

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework for API development
- **TypeScript** - Type safety and better development experience
- **MongoDB** - NoSQL database for storing URLs and analytics data
- **Mongoose** - ODM for MongoDB interactions
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcrypt** - Password hashing for security
- **express-validator** - Input validation and sanitization
- **node-cron** - Scheduled tasks for cleanup operations
- **CORS** - Cross-origin resource sharing configuration

### Frontend

- **React** - Component-based UI library
- **TypeScript** - Type safety in frontend code
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **React Icons** - Icon library for UI elements
- **Recharts** - Data visualization library for analytics charts
- **React Context API** - State management for authentication and URL data

## Architecture (High Level)

LinkX follows a modern full-stack architecture with clear separation of concerns:

### Backend Architecture

- **RESTful API** design with Express.js
- **MVC pattern** (Models, Views/Controllers, Routes)
- **Middleware-based** authentication and validation
- **Event-driven** analytics logging system
- **Scheduled cleanup** jobs using cron
- **Modular structure** with separate concerns (auth, URLs, analytics)

### Frontend Architecture

- **Component-based** React application
- **Context API** for global state management
- **Protected routes** with authentication guards
- **Responsive design** with mobile-first approach
- **Real-time updates** for analytics data
- **Theme support** (dark/light mode)

### Data Flow

1. User creates short URL → Stored in MongoDB with ownership
2. Link clicks generate events → Logged in separate collection
3. Analytics queries aggregate event data → Displayed in dashboard
4. Scheduled cleanup removes expired guest links

## Challenges Faced

### Complex Data Aggregation

Implementing efficient MongoDB aggregation pipelines for analytics data was challenging. The need to aggregate click events by time periods, referrers, and various metrics required careful query optimization and understanding of MongoDB's aggregation framework.

### File Structure & Code Organization

Maintaining a clean, scalable file structure across both frontend and backend was initially challenging. As the project grew, I had to refactor and reorganize code to maintain separation of concerns and improve maintainability.

### Proper Token-Based Authentication

Implementing secure authentication that prevents various types of attacks (XSS, CSRF, etc.) required deep understanding of:

- HTTP-only cookies for token storage
- CORS configuration for cross-origin requests
- Proper token validation and refresh mechanisms
- Secure password handling and validation

## What I Learned

Through building LinkX, I gained valuable knowledge in several areas:

### Technical Skills

- **Base62 Encoding**: Implementing custom URL shortening algorithm using base62 encoding for generating short, unique identifiers
- **Event Logging & Analytics**: Designing and implementing an event-driven system for tracking user interactions and aggregating data for insights
- **MongoDB Aggregation**: Advanced querying techniques for data analysis, including grouping, filtering, and time-based aggregations
- **Request Object Analysis**: Deep understanding of Express.js request objects, including headers, cookies, user agents, and referrer information

### Development Practices

- **Full-Stack Development**: End-to-end development experience from database design to UI implementation
- **Authentication Security**: Best practices for implementing secure user authentication and authorization
- **API Design**: Creating RESTful APIs with proper error handling and validation
- **Performance Optimization**: Database query optimization and efficient data processing
- **TypeScript Integration**: Using TypeScript for better code quality and developer experience

### Tools & Technologies

- Modern React development with hooks and context
- MongoDB schema design and relationships
- Cron job scheduling for automated tasks
- Environment configuration and security best practices

## Future Improvements

### Link Ownership Transfer

- Allow guest users to claim ownership of their created links after registering/logging in
- Implement link migration system to transfer anonymous links to user accounts

### API Rate Limiting

- Implement rate limiting for both guest and registered users
- Different limits based on user type (stricter for guests, more generous for registered users)
- Prevent abuse and ensure fair usage of the service

### Additional Planned Features

- Link expiration settings for users
- Custom short URLs (vanity URLs)
- Link tagging and categorization
- Bulk URL shortening
- Export analytics data
- Social media integration
- API access for developers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Inspired by popular URL shortening services like Bitly and TinyURL
