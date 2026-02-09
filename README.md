# Fraud Detection Frontend

A React application for fraud detection and transaction monitoring. Built with TypeScript, React 19, and TailwindCSS, this application provides a comprehensive interface for managing and analyzing financial transactions.


## Overview

This application serves as the frontend for a fraud detection system, allowing users to:
- Monitor and analyze financial transactions in real-time
- View detailed transaction information and fraud risk assessments
- Manage bulk transaction uploads via CSV
- Visualize transaction summaries with interactive charts
- Authenticate securely with JWT-based authentication

## Features

### Authentication
- Secure JWT-based authentication
- User signup and login with form validation
- Automatic token refresh and session management
- Protected routes for authenticated users

### Transaction Management
- Transaction list with pagination support
- Detailed transaction view with fraud analysis
- Transaction summary dashboard with charts (Recharts)
- Bulk CSV upload for multiple transactions
- Currency formatting (INR support)


## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avirajkale50-pro/fraud_detection_frontend.git
   cd fraud_detection_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |

### API Integration

The application expects a backend API with the following endpoints:
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /api/transactions` - Fetch transactions (with pagination)
- `GET /api/transactions/:id` - Fetch single transaction
- `POST /api/transactions` - Create new transaction
- `POST /api/transactions/bulk` - Bulk upload via CSV
- `GET /api/transactions/summary` - Transaction summary statistics
- `DELETE /api/logout` - User logout

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Generate test coverage report |


## Testing

Run tests with:
```bash
npm run test
```

Generate coverage report:
```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage/` directory.


