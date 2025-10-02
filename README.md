# Quizzical

A modern quiz application built with React and Vite, featuring SCSS for styling and responsive design.

## Features

- ⚡ **Fast Development** - Vite for lightning-fast HMR
- 🎨 **Modern Styling** - SCSS with organized partials and mixins
- 📱 **Responsive Design** - Mobile-first approach with custom mixins
- 🔧 **Developer Experience** - ESLint for code quality
- 🎯 **Component Architecture** - Organized React components

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **SCSS** - Enhanced CSS with variables, mixins, and partials
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components
├── styles/             # SCSS styles
│   ├── partials/       # SCSS partials
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _globals.scss
│   └── main.scss       # Main SCSS file
├── App.jsx
└── main.jsx
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development

This project uses SCSS for styling with a well-organized structure:
- **Variables** - Colors, fonts, spacing, and other design tokens
- **Mixins** - Reusable CSS patterns and responsive breakpoints
- **Globals** - Base styles, resets, and global utilities
