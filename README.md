A basic Rest API made with Node.js and Express.

## Getting Started

Create an '.env' file with the following variables:

```env
# Server Configuration
SERVER_PORT = 3000
SERVER_BASE_PATH = '/api'

# MYSQL Configuration
MYSQL_HOST = '127.0.0.1'
MYSQL_USER = 'root'
MYSQL_PASSWORD = ''
MYSQL_DATABASE = 'express_rest_api'
MYSQL_PORT = 3306

# JWT Configuration
JWT_SECRET = 'secret'
JWT_EXPIRATION = '1h'
```

Install the project dependancies using:

```bash
npm install
```

To run the server use:

```bash
npm run dev
```
