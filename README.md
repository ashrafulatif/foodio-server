# Foodio Server

Welcome to Foodio Server, your ultimate backend solution for food delivery services. This server is built with Node.js and provides a robust API for managing orders, menu items, and user authentication.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Routes & Role Access](#api-routes--role-access)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

To install the Foodio Server, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ashrafulatif/foodio-server.git
   ```
2. Navigate to the project directory:
   ```
   cd foodio-server
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```bash
npm start
```

## API Routes & Role Access

| Route                       | Method | Role Required   |
|-----------------------------|--------|------------------|
| /api/v1/auth/login          | POST   | None             |
| /api/v1/auth/register       | POST   | None             |
| /api/v1/categories          | GET    | Admin/User       |
| /api/v1/categories          | POST   | Admin            |
| /api/v1/menu-items         | GET    | Admin/User       |
| /api/v1/menu-items         | POST   | Admin            |
| /api/v1/orders             | GET    | Admin/User       |
| /api/v1/orders             | POST   | User             |

## Contributing

We welcome contributions! Please open issues to discuss any changes or enhancements.

## License

This project is licensed under the MIT License.