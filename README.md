# Clarion - Deployed on Render

A full-stack JavaScript application with a React frontend and Node.js/Express backend, deployed and running on Render.

## 📋 Project Overview

**Clarion** is a modern web application built with:
- **Frontend**: React 19 with Vite, Redux Toolkit, and Tailwind CSS
- **Backend**: Express.js with Socket.io, LangChain integration, and MongoDB
- **Deployment**: Render.com platform

### Repository Structure

```
Clarion/
├── Backend/                 # Node.js Express server
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Entry point with Socket.io initialization
│   └── src/
│       ├── app.js          # Express application setup
│       ├── config/         # Configuration files (database, etc.)
│       └── sockets/        # WebSocket handlers
├── Frontend/               # React application
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite bundler configuration
│   └── src/                # React components and logic
└── .gitignore             # Git ignore rules
```

## 🔧 Technology Stack

### Frontend (93.5% JavaScript, 5.3% CSS, 1.2% HTML)

- **React** 19.2.8 - UI framework
- **Vite** 8.2.0 - Build tool and dev server
- **Redux Toolkit** 2.12.0 - State management
- **React Router** 8.3.0 - Client-side routing
- **Tailwind CSS** 4.3.3 - Utility-first CSS framework
- **Axios** 1.19.0 - HTTP client
- **Socket.io Client** 4.8.3 - Real-time communication
- **React Markdown** 10.1.0 - Markdown rendering with GitHub Flavored Markdown support

**Dev Dependencies:**
- ESLint with React plugins for code quality
- TypeScript types for React

### Backend

- **Node.js** with ES modules support
- **Express** 5.2.1 - Web framework
- **Socket.io** 4.8.3 - WebSocket library for real-time features
- **MongoDB/Mongoose** 9.9.1 - Database and ODM
- **LangChain** - AI/ML integration
  - `@langchain/core` 1.2.8
  - `@langchain/google-genai` 2.2.0 - Google Generative AI integration
  - `@langchain/mistralai` 1.2.0 - MistralAI integration
  - `@tavily/core` 0.7.7 - Search/research tool
- **Authentication**:
  - JWT (jsonwebtoken) 9.0.3
  - Bcrypt 6.0.0 & bcryptjs 3.0.3 - Password hashing
- **Validation**:
  - Express Validator 7.3.2
  - Zod 4.4.3 - Schema validation
- **Utilities**:
  - Nodemailer 9.0.5 - Email sending
  - CORS 2.8.6 - Cross-origin resource sharing
  - Cookie Parser 1.4.7 - Cookie middleware
  - Morgan 1.11.0 - HTTP request logger
  - Dotenv 17.4.2 - Environment variable management

## 🚀 Render Deployment Analysis

### Branch: `render`

The `render` branch contains production-ready code optimized for deployment on Render.

#### Server Configuration

**Backend Server** (`Backend/server.js`):
- Entry point runs on configurable port (default: 3000, uses `process.env.PORT` from Render)
- Initializes Socket.io for real-time communication
- Connects to MongoDB database with error handling
- Uses Cloudflare DNS (1.1.1.1) and Google DNS (8.8.8.8) for reliable DNS resolution

#### Environment Setup

The backend relies on environment variables managed through Render's configuration:
- `PORT` - Server port (Render assigns automatically)
- Database connection string (MongoDB)
- API keys for LangChain integrations (Google Generative AI, MistralAI)
- Tavily search API credentials
- JWT secrets for authentication
- Email configuration (Nodemailer)

#### Frontend Build & Deployment

**Vite Configuration** (`Frontend/vite.config.js`):
- Optimized production build with Vite's tree-shaking
- Tailwind CSS v4 integration for optimized styling
- React Fast Refresh for development

**Build Scripts**:
```bash
npm run dev    # Development server with HMR
npm run build  # Optimized production build
npm run preview # Preview production build
npm run lint   # ESLint code quality checks
```

### Render Deployment Setup

#### Backend Service
- **Language**: Node.js
- **Build Command**: Likely `npm install` in Backend directory
- **Start Command**: `npm start` (configured via server.js)
- **Environment**: Production
- **Monitoring**: Morgan HTTP logger for request tracking

#### Frontend Service
- **Build**: `npm run build` produces optimized static files
- **Deploy**: Static site hosting or served through backend
- **Performance**: Vite's optimized bundles with CSS/JS minification

## 🔐 Key Features Enabled by Stack

### Real-Time Communication
- **Socket.io** enables real-time updates between frontend and backend
- Bidirectional communication for instant data synchronization

### AI/ML Integration
- **LangChain** orchestrates AI workflows
- Multiple AI provider support (Google Generative AI, MistralAI)
- **Tavily** integration for web search and research capabilities

### Authentication & Security
- JWT-based authentication
- Bcrypt password hashing (dual implementation for compatibility)
- CORS configuration for secure cross-origin requests
- Environment-based credential management

### Data Persistence
- MongoDB integration for scalable data storage
- Mongoose ODM for schema validation and querying

### Code Quality
- ESLint configuration for consistent code standards
- Validation layers (Express Validator, Zod) for input sanitization

## 📊 Deployment Monitoring

The application is production-monitored via:
- **Morgan**: HTTP request logging for debugging and monitoring
- **Socket.io**: Connection tracking and event logging
- **Environment Variables**: Secure credential management through Render
- **Database Logging**: Mongoose connection status and errors

## 🔄 Development Workflow

### Local Development
```bash
# Backend
cd Backend
npm install
npm run dev  # Runs with nodemon auto-reload

# Frontend (separate terminal)
cd Frontend
npm install
npm run dev  # Starts Vite dev server
```

### Production Deployment (via Render)
1. Push changes to `render` branch
2. Render automatically detects changes
3. Backend: Installs dependencies and runs server
4. Frontend: Builds optimized bundle
5. Services communicate via configured URLs

## 📝 Notes on Render Deployment

### DNS Configuration
The backend explicitly configures DNS servers (Cloudflare & Google) to ensure reliable DNS resolution in Render's environment, important for:
- Database connectivity
- External API calls (LangChain providers)
- Email service access (Nodemailer)

### Port Management
The server dynamically uses the port assigned by Render via environment variables, allowing multiple service instances if needed.

### Real-Time Features
Socket.io is fully functional on Render, enabling:
- Live notifications
- Real-time data updates
- Collaborative features

## 🛠️ Configuration Best Practices

When deploying on Render, ensure:
1. All API keys and secrets are set as Render environment variables
2. MongoDB connection string is configured in environment
3. Frontend API endpoints point to the correct backend URL
4. CORS settings match your frontend domain
5. Email configuration (if using Nodemailer) is properly set up

## 📚 Related Documentation

- **Vite**: https://vite.dev/
- **React**: https://react.dev/
- **Express**: https://expressjs.com/
- **Socket.io**: https://socket.io/
- **LangChain**: https://langchain.com/
- **Render**: https://render.com/docs

---

**Branch**: `render` - Production deployment branch  
**Status**: Deployed and running on Render.com
