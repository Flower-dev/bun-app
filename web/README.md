# Modern React Application with TypeScript and Vite

This project is a modern web application built with React, TypeScript, and Vite, featuring a robust development environment and a comprehensive set of tools and libraries.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS with animations
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling with shadcn
- **Rich Text Editor**: BlockNote
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Date Handling**: date-fns
- **Code Quality**: ESLint, Prettier, and Husky for Git hooks

## 🛠️ Development Setup

1. **Prerequisites**

    - Node.js (latest LTS version recommended)
    - Bun (for faster development experience)

2. **Installation**

    ```bash
    # Install dependencies
    bun install
    ```

3. **Available Scripts**

    ```bash
    # Start development server
    bun run dev

    # Build for production
    bun run build

    # Preview production build
    bun run preview

    # Lint code
    bun run lint

    # Format code with Prettier
    bun run prettier:write

    # Check code formatting
    bun run prettier:check
    ```

## 🔧 Configuration

The project includes several configuration files:

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `postcss.config.js` - PostCSS configuration

## 🎨 UI Components

The project uses a combination of:

- Radix UI primitives for accessible components with shadcn
- Custom styled components using Tailwind CSS
- Lucide React for icons

## 🌐 Internationalization

The application supports multiple languages using i18next and react-i18next.

## 📦 Dependencies

The project uses modern versions of all dependencies, including:

- React 18.3
- TypeScript 5.6
- Vite 6
- Tailwind CSS 3.4
- React Query 5.67
- React Hook Form 7.56
- Zod 3.24

## 🔍 Code Quality

The project maintains high code quality through:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Lint-staged for staged file processing

## 📝 Development Guidelines

1. **Type Safety**: Always use TypeScript types and interfaces
2. **Component Structure**: Follow React best practices for component organization
3. **Styling**: Use Tailwind CSS classes for styling
4. **Form Handling**: Use React Hook Form with Zod validation
5. **State Management**: Use React Query for server state and React Context for local state
6. **Accessibility**: Follow WCAG guidelines using Radix UI primitives

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
