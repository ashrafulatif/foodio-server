# Foodio Server

Welcome to the Foodio Server! This is the backend service for the Foodio application, built with NestJS. This README will guide you through the setup, usage, and available API routes.

## API Base URL

The base URL for the API is `/api/v1`.

## API Routes & Role Access

| Route                          | Method | Access Level              |
|--------------------------------|--------|---------------------------|
| `/api/v1/auth/login`          | POST   | Public                    |
| `/api/v1/auth/register`       | POST   | Public                    |
| `/api/v1/categories`          | GET    | Admin, User               |
| `/api/v1/categories/:id`      | GET    | Admin, User               |
| `/api/v1/menu-items`          | GET    | Admin, User               |
| `/api/v1/menu-items`          | POST   | Admin                     |
| `/api/v1/menu-items/:id`      | GET    | Admin, User               |
| `/api/v1/menu-items/:id`      | PUT    | Admin                     |
| `/api/v1/menu-items/:id`      | DELETE | Admin                     |
| `/api/v1/orders`              | GET    | Admin, User               |
| `/api/v1/orders`              | POST   | User                      |
| `/api/v1/orders/:id`          | GET    | Admin, User               |
| `/api/v1/orders/:id`          | PUT    | User                      |
| `/api/v1/orders/:id`          | DELETE | Admin                     |

Make sure to replace the placeholder data here with appropriate data specific to your application's requirements.
