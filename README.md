# DailyDone - Neighborhood Helper Platform

A modern, full-stack React application for connecting neighbors who need help with those who can provide it. Built with JWT authentication, TypeScript, and a beautiful UI powered by Tailwind CSS and Radix UI.

## 🚀 Features

### Frontend
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **JWT Authentication**: Secure login/logout with token-based authentication
- **Role-based Access**: Separate interfaces for users and helpers
- **Responsive Design**: Mobile-first design that works on all devices
- **Beautiful UI**: Modern interface using Tailwind CSS and Radix UI components
- **Real-time Updates**: Dynamic task management and status updates
- **Multi-step Forms**: Comprehensive signup process with validation

### Backend
- **Express.js API**: RESTful API with JWT authentication
- **Password Security**: Bcrypt password hashing
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error handling and logging
- **Mock Data**: Demo users and data for testing

### User Roles

#### Regular Users (Task Requesters)
- Request help with daily tasks
- Set budget and urgency levels
- Track task progress
- Rate helpers
- Manage task history

#### Helpers (Service Providers)
- Browse available tasks nearby
- Accept and complete tasks
- Earn money helping neighbors
- Track earnings and ratings
- Manage availability status

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Express.js, Node.js
- **Authentication**: JWT with bcrypt password hashing
- **Routing**: React Router 6 (SPA mode)
- **State Management**: React Context + Hooks
- **HTTP Client**: Fetch API with custom error handling
- **Icons**: Lucide React
- **Build Tool**: Vite with SWC
- **Package Manager**: PNPM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailydone-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

   This starts both the frontend (React) and backend (Express) servers concurrently.

## 🚦 Getting Started

### Demo Credentials

The application comes with pre-configured demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| User | `demo@dailydone.com` | `Demo123!` | Regular user account |
| User | `user@example.com` | `Password123!` | Another user account |
| Helper | `admin@dailydone.com` | `Admin123!` | Helper account |

### Navigation

- **Landing Page**: `/` - Public homepage with task request form
- **Login**: `/login` - Authentication page
- **Signup**: `/signup` - Multi-step registration process
- **User Dashboard**: `/dashboard` - Protected user interface
- **Helper Dashboard**: `/helper-dashboard` - Protected helper interface
- **Helper Signup**: `/helper-signup` - Public helper registration page

## 🔐 Authentication Flow

1. **Registration**: Users provide email, username, password, and personal details
2. **Login**: Email/password authentication with JWT token generation
3. **Token Storage**: JWT stored in localStorage with automatic expiration handling
4. **Protected Routes**: Automatic redirection based on authentication status
5. **Role-based Access**: Different dashboards for users vs helpers

## 🏗 Project Structure

```
dailydone-app/
├── client/                     # Frontend React application
│   ├── components/ui/          # Reusable UI components (Radix)
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.tsx    # Authentication management
│   ├── pages/                 # Route components
│   │   ├── Index.tsx          # Landing page
│   │   ├── Login.tsx          # Login page
│   │   ├── Signup.tsx         # Multi-step signup
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── HelperDashboard.tsx # Helper dashboard
│   │   ├── HelperSignup.tsx   # Helper registration
│   │   └── NotFound.tsx       # 404 page
│   ├── App.tsx               # Main app with routing
│   └── global.css            # Global styles and theme
├── server/                    # Backend Express application
│   ├── routes/               # API route handlers
│   │   ├── auth.ts           # Authentication endpoints
│   │   └── demo.ts           # Demo endpoints
│   └── index.ts              # Express server setup
├── shared/                   # Shared types and utilities
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

The application uses a comprehensive design system built on:

- **Colors**: Blue-based palette for trust and reliability
- **Typography**: Inter font family for modern readability
- **Spacing**: Consistent 4px grid system
- **Components**: Radix UI primitives with custom styling
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first approach with breakpoints

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server (frontend + backend)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests

### Adding New Features

1. **New Pages**: Add components to `client/pages/` and update routes in `App.tsx`
2. **API Endpoints**: Add handlers to `server/routes/` and register in `server/index.ts`
3. **UI Components**: Extend the component library in `client/components/ui/`
4. **Authentication**: Use the `useAuth` hook for protected functionality

### Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: Token expiration time (default: 7d)
- `NODE_ENV`: Environment mode (development/production)

## 🚀 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Setup

1. Set production environment variables
2. Configure CORS for production domains
3. Use secure JWT secrets
4. Set up proper database (replace mock data)
5. Configure SSL/HTTPS

### Recommended Hosting

- **Frontend**: Netlify, Vercel, or any static hosting
- **Backend**: Railway, Render, or any Node.js hosting
- **Database**: PostgreSQL, MongoDB, or your preferred database

## 🔒 Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Passwords are hashed with bcrypt
- CORS is configured for specific origins
- Input validation on both frontend and backend
- Rate limiting should be added for production
- HTTPS is required for production

## 🧪 Testing

The application includes:
- Form validation testing
- Authentication flow testing
- Component interaction testing
- API endpoint testing

Run tests with: `pnpm test`

## 📱 Mobile Experience

- Responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized forms for mobile input
- Progressive Web App features ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions, issues, or feature requests:
- Create an issue in the repository
- Check the documentation
- Review the demo credentials and features

## 🎯 Future Enhancements

- Real-time messaging between users and helpers
- Payment integration (Stripe/PayPal)
- Push notifications
- GPS tracking for helpers
- Photo uploads for task completion
- Advanced search and filtering
- Helper verification system
- Rating and review system
- Task history and analytics

---

Built with ❤️ for connecting communities and helping neighbors help each other.
