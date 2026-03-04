# 🔗 LinkX — URL Shortener with Analytics

LinkX is a modern full-stack URL shortening platform that enables users to generate short, shareable links and analyze their performance through comprehensive analytics dashboards.

The project was developed as a learning-focused initiative to explore scalable backend architecture, authentication systems, event-driven analytics, and modern frontend development practices.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Data Flow](#data-flow)
- [Challenges](#challenges)
- [Key Learnings](#key-learnings)
- [Future Improvements](#future-improvements)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

---

## 📌 Overview

LinkX allows users to:

- Convert long URLs into short links
- Share links easily
- Track link performance using analytics
- View engagement metrics through dashboards

Analytics features are available for authenticated users and provide insights such as click counts, referrer sources, and usage trends.

---

## ✨ Features

### Phase 1 — Core URL Shortening
- URL shortening using Base62 encoding
- Automatic redirection to original URLs
- Efficient unique link generation

### Phase 2 — Authentication & User Management
- User registration and login
- JWT-based authentication
- Guest and registered user support
- Secure password hashing using bcrypt
- User dashboard for managing links

### Phase 2.5 — UI & Analytics Foundation
- Improved UI and responsive design
- Event logging system
- Click tracking infrastructure
- Analytics aggregation framework
- Performance optimizations

### Phase 3 — Advanced Analytics (In Progress)
- Interactive analytics dashboard
- Real-time analytics updates
- Referrer analysis and performance metrics
- Advanced user management
- API rate limiting and security enhancements

---

## 🔄 Data Flow

1. User creates a short URL → Stored in MongoDB with ownership metadata.
2. Link visits generate click events → Logged in analytics collection.
3. Aggregation pipelines process analytics data.
4. Processed metrics are displayed in the analytics dashboard.
5. Scheduled cron jobs remove expired guest links.

---

## ⚙️ Challenges

### Complex Data Aggregation
Designing efficient MongoDB aggregation pipelines for time-based analytics, referrer tracking, and performance metrics required query optimization and schema refinement.

### Code Organization
As the application scaled, restructuring the project into modular components improved maintainability and separation of concerns.

### Secure Authentication
Implemented secure authentication practices including:
- HTTP-only cookies
- Token validation strategies
- Secure password hashing
- Proper CORS configuration

---

## 📚 Key Learnings

### Technical Concepts
- Base62 encoding for URL generation
- Event-driven analytics systems
- MongoDB aggregation pipelines
- Request object analysis in Express.js

### Development Practices
- Full-stack application design
- Secure authentication implementation
- REST API design principles
- Performance optimization techniques
- TypeScript integration across stack

### Tools & Workflow
- Modern React patterns (Hooks & Context)
- Database schema design
- Automated cron jobs
- Environment configuration & security practices

---

## 🚧 Future Improvements

- Link ownership transfer for guest users
- Custom (vanity) URLs
- Link expiration settings
- Bulk URL shortening
- Link tagging and categorization
- Analytics export functionality
- Developer API access
- Social media integrations
- Advanced rate limiting strategies

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/linkx.git

# Navigate into project
cd linkx
