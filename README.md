# NexGen Fitness

## Introduction

Welcome to the Project repository!.
NexGen Fitness's application enables users to manage products by creating, editing, and deleting them. Users can filter products by category, set minimum and maximum price ranges, and search for products by title. Additionally, users can add items to their cart and seamlessly proceed to checkout directly from the cart.

This README file will guide you through the steps required to set up and run the project on your local computer.

## Features

- Api debouncing for the search functionality to reduce the number of API calls
- Cart management system
- Reload alert
- Stripe

## Technology Stack

- React js
- Typescript
- Shadcn
- tailwind CSS
- Redux toolkit & query

## Getting Started

To get started with the project, follow the instructions below:

### Prerequisites

Make sure you have the following software installed on your machine:

- Git
- Node.js (v20.9.0 recommended)
- npm or any package installer

### Cloning the Repository

First, clone the repository using the following command:

```
git clone https://github.com/syedfarhanreza/NexGen-Fitness-client.git

```

### Installing Dependencies

Open the project file in terminal and run `npm install`

```
npm install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
VITE_IMGBB_KEY=imgbb api key
VITE_BASE_API=https://nexgen-fitness-server.vercel.app/api/v1/
VITE_STRIPE_PUBLISHABLE_KEY=your Stripe Publish key
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
npm run dev

```

### Accessing the Project

```
http://localhost:5173
```
