
# Waitlist API

## 🌐 Live Deployment

You can access the deployed API here: [https://refycl-waitlist-api.pxxl.click](https://refycl-waitlist-api.pxxl.click)


## 🚀 Features

- **TypeScript**: Full type safety and modern JavaScript features
- **TypeORM**: Object-Relational Mapping for PostgreSQL database
- **Express.js**: Fast and minimalist web framework
- **Data Validation**: Input validation using Joi
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management
- **Database Integration**: PostgreSQL with TypeORM entities
- **Error Handling**: Comprehensive error handling and status codes

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud-hosted like Neon)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waitlist-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   PORT=5000
   NODE_ENV=development
   ```

4. **Database Setup**
   
   The application uses TypeORM with automatic synchronization enabled for development. The database tables will be created automatically when you start the server.

## 🚦 Getting Started

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Join Waitlist
**POST** `/api/waitlist`

Adds a new entry to the waitlist.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "location": "New York, NY",
  "primaryNeeds": ["Petrol for Vehicle", "Generator Fuel"],
  "vehicleType": "Car" // Optional
}
```

**Validation Rules:**
- `fullName`: Required, minimum 3 characters
- `email`: Required, valid email format
- `phoneNumber`: Required, 10-15 characters
- `location`: Required
- `primaryNeeds`: Required array with at least one item from:
  - "Petrol for Vehicle"
  - "Generator Fuel"
  - "Cooking Gas"
- `vehicleType`: Optional field

**Success Response (201):**
```json
{
  "message": "Successfully joined the waitlist!",
  "data": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "location": "New York, NY",
    "primaryNeeds": ["Petrol for Vehicle", "Generator Fuel"],
    "vehicleType": "Car",
    "createdAt": "2025-10-20T10:30:00.000Z",
    "updatedAt": "2025-10-20T10:30:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request**: Validation failed
  ```json
  {
    "message": "Validation failed",
    "details": "\"email\" must be a valid email"
  }
  ```

- **409 Conflict**: Email already exists
  ```json
  {
    "message": "This email is already on the waitlist."
  }
  ```

- **500 Internal Server Error**: Server error
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### Health Check
**GET** `/health`

Returns the server status.

**Response (200):**
```json
{
  "status": "UP"
}
```

## 🗃️ Database Schema

The application uses a single table `waitlist_entries` with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Auto-incrementing ID |
| full_name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) UNIQUE | User's email address |
| phone_number | VARCHAR(15) | User's phone number |
| location | VARCHAR(255) | User's location |
| primary_needs | JSON | Array of selected needs |
| vehicle_type | VARCHAR(100) | Optional vehicle type |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Record last update time |

## 🏗️ Project Structure

```
waitlist-api/
├── src/
│   ├── config/
│   │   └── db.ts                 # TypeORM DataSource configuration
│   ├── controllers/
│   │   └── waitlist.controller.ts # Request handlers
│   ├── entities/
│   │   ├── WaitlistEntry.ts      # TypeORM entity
│   │   └── index.ts              # Entity exports
│   ├── routes/
│   │   └── routes.ts             # API route definitions
│   ├── validators/
│   │   └── waitlist.validator.ts # Joi validation schemas
│   └── server.ts                 # Application entry point
├── dist/                         # Compiled JavaScript (after build)
├── .env                          # Environment variables
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🧪 Testing

### Manual Testing with cURL

**Join Waitlist:**
```bash
curl -X POST http://localhost:5000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "+1987654321",
    "location": "Los Angeles, CA",
    "primaryNeeds": ["Cooking Gas", "Generator Fuel"],
    "vehicleType": "SUV"
  }'
```

**Health Check:**
```bash
curl http://localhost:5000/health
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |

### TypeORM Configuration

The TypeORM configuration is located in `src/config/db.ts`:

- **Synchronize**: Enabled for development (automatically creates/updates tables)
- **Logging**: Enabled in development mode
- **SSL**: Configured for cloud databases
- **Entities**: Auto-loaded from the entities directory

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Set `synchronize: false` in TypeORM config for production
3. Use database migrations instead of synchronization
4. Configure proper SSL certificates

### Build and Deploy
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using Node.js, TypeScript, and TypeORM**