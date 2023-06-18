# Next.js Book Search App

This is a Next.js application that allows users to search for books using the Google Books API and add them to their personal book list. It consists of two pages: the home page, where users can search for books, and a view-only page that displays all the books added to a user's list.

## Features

- Search for books using the Google Books API
- Add books from the search results to your personal book list
- View all books in your personal book list

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites.
- TypeScript: A statically typed superset of JavaScript that helps improve developer productivity and code quality.
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- Cypress: A JavaScript end-to-end testing framework for web applications.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org)
- Yarn: Visit the official Yarn website at <https://yarnpkg.com>.

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/CeoFred/google-books-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd google-books-app
   ```

3. Create a new environment variable:

   ```shell
   cp .env.example .env.local
   ```

4. Install the dependencies:

   ```shell
   yarn
   ```

5. Start the development server:

   ```shell
   yarn dev
   ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Available Scripts

In the project directory, you can run the following scripts:

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `npm start`: Starts the production server.
- `yarn lint`: Runs linting checks on the code.
- `yarn prepare`: Installs Husky, a Git hooks manager, for running tasks on Git events.
- `yarn format`: Formats the code using Prettier.
- `yarn format:check`: Checks if the code is formatted correctly.
- `yarn test`: Opens the Cypress test runner.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cypress](https://www.cypress.io)
