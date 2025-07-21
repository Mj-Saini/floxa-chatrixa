# Floxa Chatrixa - Frontend

A modern chat application built with React, TypeScript, and Tailwind CSS.

## Project Structure

```
floxa-chatrixa/
├── client/           # Frontend (React + TypeScript)
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── ui/           # UI components
├── public/           # Static assets
└── README.md         # This file
```

## Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Frontend will run on: `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Features

- ✅ Modern React with TypeScript
- ✅ Beautiful UI with Tailwind CSS
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Custom hooks for reusability
- ✅ UI components with Radix UI

## Pages

- **Home** - Landing page
- **Login** - User authentication
- **Chats** - Chat interface
- **Profile** - User profile management
- **Settings** - Application settings
- **Groups** - Group chat management
- **Stranger Chat** - Anonymous chat feature
- **Video Call** - Video calling interface
- **Wallet** - Digital wallet functionality
- **Community** - Community features
- **Help & Support** - Help pages

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run typecheck` - Type checking
- `npm run format.fix` - Format code with Prettier

### Code Structure

- **Components**: Reusable UI components in `client/components/`
- **Pages**: Page-level components in `client/pages/`
- **Contexts**: React contexts for state management in `client/contexts/`
- **Hooks**: Custom React hooks in `client/hooks/`
- **Utils**: Utility functions in `client/lib/`
- **UI Components**: Radix UI components in `client/components/ui/`

## Deployment

This is a frontend-only application. You can deploy it to any static hosting service:

- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for GitHub repositories
- **Firebase Hosting** - Google's hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request 