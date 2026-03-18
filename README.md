# Foodio Server

Backend API for **Foodio** — a food ordering / restaurant management system built with **NestJS** + **Prisma** + **PostgreSQL**.  
It provides authentication, role-based access control, category & menu management, and order management.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (stored in **HTTP-only cookies**) via Passport JWT strategy
- **Validation**: class-validator / class-transformer (Nest ValidationPipe)
- **File Uploads**: Multer + Cloudinary (multer-storage-cloudinary)
- **Package manager**: pnpm


---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/ashrafulatif/foodio-server
cd foodio-server
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Fill in your DATABASE_URL and other vars
```

### 3. Generate Prisma client

```bash
pnpm run generate
```

### 4. Run migrations

```bash
pnpm run migrate
```

### 5. Seed database

```bash
pnpm run seed
```

### 6. Start the server

```bash
pnpm run start:dev
```

## Default Credentials

| Role     | Email           | Password |
| -------- | --------------- | -------- |
| Admin    | lupin@gmail.com | 12345678 |
| Customer | lily@gmail.com  | 12345678 |

---

## Features

### Authentication & Authorization

- Register / Login / Logout endpoints
- JWT access token is set as an **httpOnly cookie** (`accessToken`)
- **Role-based access** using guards + `@Roles(...)` decorator
  - Roles: `ADMIN`, `CUSTOMER`

### Categories

- Admin can create/update/delete categories
- Public can list & view categories
- Pagination supported for list endpoint

### Menu Items

- Admin can create/update/delete menu items
- Supports filtering/searching by:
  - search term (`name`, `description`)
  - `categoryId`
  - `available`
- Image upload supported (stored in **Cloudinary**)

### Orders

- Customers can create orders and view their own orders
- Admin can list all orders, view any order by id, update order status, and delete orders
- Pagination supported for admin list endpoint
- Order creation validates menu item availability and calculates totals server-side

---

## Project Structure (High-level)

- `src/main.ts` — app bootstrap (CORS, cookie parser, validation, global prefix)
- `src/app.module.ts` — root module wiring
- `src/config/` — environment variables, Cloudinary, Multer configuration
- `src/common/` — guards, strategies, shared helpers (response wrapper, Prisma exception filter)
- `src/modules/` — domain modules:
  - `auth`
  - `categories`
  - `menu-item`
  - `orders`
  - `users`
- `prisma/` — Prisma schema + migrations + seed

---

## API Base URL

The server uses a global prefix:

- Base prefix: `/api/v1`

So if the server runs on `http://localhost:3000`, endpoints look like:

- `http://localhost:3000/api/v1/auth/login`

---

## API Routes & Role Access

Base prefix: `/api/v1`

### Auth (`/api/v1/auth`)

| Method | Route            | Auth required | Roles  | Notes                                       |
| ------ | ---------------- | ------------: | ------ | ------------------------------------------- |
| POST   | `/auth/register` |            No | Public | Creates a user (default role is `CUSTOMER`) |
| POST   | `/auth/login`    |            No | Public | Sets `accessToken` cookie (httpOnly)        |
| POST   | `/auth/logout`   |            No | Public | Clears `accessToken` cookie                 |

### Categories (`/api/v1/categories`)

| Method | Route             | Auth required | Roles   |
| ------ | ----------------- | ------------: | ------- |
| POST   | `/categories`     |           Yes | `ADMIN` |
| GET    | `/categories`     |            No | Public  |
| GET    | `/categories/:id` |            No | Public  |
| PATCH  | `/categories/:id` |           Yes | `ADMIN` |
| DELETE | `/categories/:id` |           Yes | `ADMIN` |

### Menu Items (`/api/v1/menu-item`)

| Method | Route            | Auth required | Roles   | Notes                                        |
| ------ | ---------------- | ------------: | ------- | -------------------------------------------- |
| POST   | `/menu-item`     |           Yes | `ADMIN` | multipart/form-data, file field name: `file` |
| GET    | `/menu-item`     |            No | Public  | List / search / filter + pagination          |
| GET    | `/menu-item/:id` |            No | Public  |                                              |
| PATCH  | `/menu-item/:id` |           Yes | `ADMIN` |                                              |
| DELETE | `/menu-item/:id` |           Yes | `ADMIN` |                                              |

### Orders (`/api/v1/orders`)

All `/orders` routes require auth (controller-level JWT guard).

| Method | Route                | Auth required | Roles               |
| ------ | -------------------- | ------------: | ------------------- |
| POST   | `/orders`            |           Yes | `ADMIN`, `CUSTOMER` |
| GET    | `/orders`            |           Yes | `ADMIN`             |
| GET    | `/orders/my-orders`  |           Yes | `CUSTOMER`          |
| GET    | `/orders/:id`        |           Yes | `ADMIN`             |
| PATCH  | `/orders/status/:id` |           Yes | `ADMIN`             |
| DELETE | `/orders/:id`        |           Yes | `ADMIN`             |

---

## Getting Started (Detailed)

### Prerequisites

- Node.js installed
- pnpm installed
- PostgreSQL running and reachable

### Install dependencies

```bash
pnpm install
```

### Create a `.env` file

```env
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

JWT_SECRET="your_jwt_secret"
ACCESS_TOKEN_EXPIRES_IN="15m"

FRONTEND_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME="xxxx"
CLOUDINARY_API_KEY="xxxx"
CLOUDINARY_API_SECRET="xxxx"

ADMIN_EMAIL="admin@foodio.com"
ADMIN_PASSWORD="Admin@123"
ADMIN_NAME="Super Admin"
```

---

## Database & Prisma

### Generate Prisma client

```bash
pnpm run generate
```

### Run migrations

```bash
pnpm run migrate
```

### Seed database

```bash
pnpm run seed:db
```

---

## Running the Server

### Development

```bash
pnpm run start:dev
```

### Production build & run

```bash
pnpm run build
pnpm run start:prod
```

---

## Scripts

From `package.json`:

- `pnpm run start` — start Nest
- `pnpm run start:dev` — start in watch mode
- `pnpm run build` — compile TypeScript
- `pnpm run lint` — eslint (auto-fix)
- `pnpm run format` — prettier format
- `pnpm run test` / `test:e2e` / `test:cov` — Jest tests
- `pnpm run migrate` — `prisma migrate dev`
- `pnpm run generate` — `prisma generate`
- `pnpm run seed:db` — seed database with sample data
- `pnpm run seed:admin` — seed admin with data in env

---

## Authentication Flow (How it works)

- `POST /api/v1/auth/login`
  - Validates email/password
  - Generates a JWT access token
  - Sets cookie: `accessToken` (httpOnly)
- Protected routes use `JwtAuthGuard`
  - JWT is extracted from cookies (`accessToken`)
- Role-protected routes also use `RolesGuard`

---

## Common Response Format

Controllers return a consistent structure via `sendResponse(...)`:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "....",
  "data": {},
  "meta": {}
}
```

`meta` is used for paginated list endpoints.

---

## Error Handling

A global Prisma exception filter is applied:

- Prisma `P2002` → `409 Conflict` (duplicate unique constraint)
- Prisma `P2025` → `404 Not Found` (record not found)
- otherwise → `500` database error

---

## Data Model (Prisma)

Key entities:

- `User` (role: `ADMIN` / `CUSTOMER`)
- `Category`
- `MenuItem` (belongs to Category, can be marked `available`)
- `Order`
- `OrderItem` (join between Order and MenuItem)

Enums:

- `UserRole`: `CUSTOMER`, `ADMIN`
- `OrderStatus`: `PENDING`, `PREPARING`, `READY`, `COMPLETED`
- `PaymentMethod`: `CASH`, `CARD`, `ONLINE`

---
