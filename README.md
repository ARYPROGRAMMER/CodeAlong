# CodeAlong

CodeAlong is an interactive platform for conducting technical interviews with real-time code collaboration, video meetings, and scheduling capabilities.

## Features

- **Video Interviews**: Start instant calls or join scheduled interviews
- **Code Collaboration**: Real-time code editor with support for multiple programming languages
- **Interview Scheduling**: Plan and manage upcoming interviews
- **Recording Access**: Review past interviews and coding sessions
- **Dashboard Management**: Comprehensive admin dashboard

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [Convex](https://www.convex.dev/) - Backend database and real-time state management
- [Stream Video](https://getstream.io/video/) - Video call functionality
- [Clerk](https://clerk.com/) - Authentication and user management
- [Tailwind CSS](https://tailwindcss.com/) - Styling with Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, pnpm, or bun
- Convex account
- Clerk account
- Stream account

### Environment Setup

1. Clone this repository
2. Copy the `.env.example` file to `.env.local` and fill in the required values:
   ```bash
   cp env.example .env.local
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Convex Setup

This project uses Convex for the backend. To set up Convex:

1. Initialize Convex (if not already done):
   ```bash
   npx convex dev
   ```

2. Use the Convex functions in your components as shown in the example:
   ```tsx
   // Query example
   const data = useQuery(api.functions.myQueryFunction, {
     first: 10,
     second: "hello",
   });

   // Mutation example
   const mutation = useMutation(api.functions.myMutationFunction);
   
   function handleButtonPress() {
     mutation({ first: "Hello!", second: "me" });
   }
   ```

## Deployment

The recommended way to deploy this application is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Configure environment variables
4. Deploy

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Stream Video Documentation](https://getstream.io/video/docs/)
