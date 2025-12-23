# Spur AI Live Chat Agent

A full-stack AI chat widget built for the Spur Founding Full-Stack Engineer Take-Home assignment.

## Features
- **Live Chat Widget**: Embeddable chat interface using React + TailwindCSS.
- **AI Integration**: Powered by OpenAI (via Node.js backend).
- **Persistence**: All conversations and messages are stored in SQLite.
- **Robustness**: Handles API errors and connection issues gracefully.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript, Prisma, SQLite
- **AI**: OpenAI API

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install
```bash
# Clone the repository (if applicable)
# cd spur-chat-agent
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with Gemini_Key
echo "Gemini_Key=your_key_here" > .env
# Initialize Database
npx prisma migrate dev --name init
# Start Server
npm start
```
Server runs on `http://localhost:3000`.

### 3. Frontend Setup
```bash
cd client_app
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Architecture
- **Monorepo**: Separate `server` and `client_app` directories.
- **Services**: Backend logic separated into `chatService` (DB) and `llmService` (AI).
- **Database**: SQLite used for simplicity; schema includes `Conversation` and `Message` models.

## Trade-offs & Future Improvements
- **Security**: No authentication is implemented (as per requirements).
- **Cleanup**: `client` directory was renamed to `client_app` due to local environment file lock issues during setup.
- **Testing**: Added basic verification; unit tests (Jest/Vitest) could be added for better coverage.
- **Deployment**: Ready for deployment on Vercel (Frontend) and Render (Backend).
