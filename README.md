# Url Shortener API

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- npm (v9+)
- Postman or curl for testing

## Setup Instructions

### 1. Database Setup (Local Development)

```bash
# Install PostgreSQL
# Create database
createdb Url

# Create .env file
cp .env.example .env

Update .env with your credentials:

DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=Url
DB_HOST=localhost
PORT=3000
NODE_ENV=development

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Migrations

```bash

npm run migrate
```

### 4. Start the Server
```bash

npm run dev

```

### 5. How to run with docker-compose 

```bash

docker-compose up --build

```

### API Endpoints
```bash
Base URL: https://url-shortener-v.up.railway.app/api
```
