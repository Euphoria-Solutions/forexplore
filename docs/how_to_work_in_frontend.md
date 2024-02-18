# Frontend Project Documentation

Welcome to our Next.js frontend project documentation. This guide will help you set up your development environment and provide an overview of our project structure, including our use of Apollo Client for backend communication.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [Running the Development Server](#running-the-development-server)
  - [Using Apollo Client](#using-apollo-client)
- [Coding Standards](#coding-standards)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Husky](#husky)
  - [Commitizen](#commitizen)
- [Contributing](#contributing)

## Project Structure

The project is structured to facilitate ease of development and scalability. Here's an overview:

```
projects/frontend/
            ├── app/        # Next.js pages and routing
            ├── components/   # Reusable UI components
            ├── styles/       # Global styles and component styles 
            └── ...           # Other configuration files and directories
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (version 14.x or above recommended)
- npm (comes with Node.js) or Yarn

### Installation

1. Install the root project dependencies

   ```bash
   yarn install
   ```


2. Navigate to the frontend directory:

   ```bash
   cd projects/front
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

## Development Workflow

### Running the Development Server

To start the Next.js development server, run:

```bash
npm run dev
```

or with Yarn:

```bash
yarn dev
```

This will start the server on [http://localhost:3000](http://localhost:3000). The site will automatically reload as you make changes to the code.

### Using Apollo Client

We use Apollo Client to communicate with the backend GraphQL service. The Apollo setup is located in `components/layouts/main-layout.tsx`. To query or mutate data, import `useQuery` or `useMutation` from `@apollo/client` and use them within your components.

## Coding Standards

To ensure code quality and consistency, we follow strict coding standards enforced by ESLint, Prettier, Husky, and Commitizen.

### ESLint

We use ESLint to enforce coding standards. Run the following command to check your code for linting issues:

```bash
npm run lint
```

or with Yarn:

```bash
yarn lint
```

### Prettier

Prettier is configured to format our code. To format your code, run:

```bash
npm run format
```

or with Yarn:

```bash
yarn format
```

### Husky

Husky is set up with pre-commit hooks to enforce coding standards. These hooks run ESLint and Prettier checks before allowing commits.

### Commitizen

Use Commitizen for structured commit messages. Instead of using `git commit`, stage your changes and run:

```bash
npx cz
```

Follow the prompts to generate a standardized commit message.

## Contributing

We welcome contributions! Please follow our coding standards and use Commitizen for commit messages. For substantial changes, open an issue first to discuss your ideas.

