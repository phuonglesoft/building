# Building Management System API

A comprehensive REST API for managing buildings, units, tenants, and maintenance requests built with TypeScript, MySQL, and Knex.js.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Building Management**: CRUD operations for buildings with manager assignments
- **Unit Management**: Manage individual units with tenant assignments
- **Tenant Management**: User management for tenants with unit assignments
- **Maintenance Requests**: Complete maintenance request lifecycle management
- **Role-based Access Control**: Admin, Manager, and Tenant roles with different permissions
- **TypeScript**: Full type safety and modern development experience
- **Database Migrations**: Version-controlled database schema with Knex.js

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Knex.js** - SQL query builder with migrations
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd building-management
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=building_management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

5. Set up MySQL database:
```sql
CREATE DATABASE building_management;
```

6. Run database migrations:
```bash
npm run migrate
```

7. (Optional) Seed the database with sample data:
```bash
npm run seed
```

8. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Management

### Migrations
```bash
# Run all pending migrations
npm run migrate

# Create a new migration
npm run migrate:make migration_name

# Rollback last migration
npm run migrate:rollback
```

### Seeds
```bash
# Run all seed files
npm run seed

# Create a new seed file
npm run seed:make seed_name
```

## Database Schema

The database schema is managed through Knex.js migrations:

- **001_create_users_table.ts** - Users table with authentication
- **002_create_buildings_table.ts** - Buildings table with JSON fields
- **003_create_units_table.ts** - Units table with relationships
- **004_create_maintenance_table.ts** - Maintenance table with complex relationships

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Buildings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/buildings` | Get all buildings | Private |
| GET | `/api/buildings/:id` | Get building by ID | Private |
| POST | `/api/buildings` | Create new building | Admin/Manager |
| PUT | `/api/buildings/:id` | Update building | Admin/Manager |
| DELETE | `/api/buildings/:id` | Delete building | Admin |

### Units

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/units` | Get all units | Private |
| GET | `/api/units/:id` | Get unit by ID | Private |
| POST | `/api/units` | Create new unit | Admin/Manager |
| PUT | `/api/units/:id` | Update unit | Admin/Manager |
| PUT | `/api/units/:id/assign-tenant` | Assign tenant to unit | Admin/Manager |
| PUT | `/api/units/:id/remove-tenant` | Remove tenant from unit | Admin/Manager |
| DELETE | `/api/units/:id` | Delete unit | Admin |

### Tenants

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/tenants` | Get all tenants | Admin/Manager |
| GET | `/api/tenants/:id` | Get tenant by ID | Private |
| PUT | `/api/tenants/:id` | Update tenant | Private |
| DELETE | `/api/tenants/:id` | Deactivate tenant | Admin/Manager |
| GET | `/api/tenants/:id/units` | Get tenant's units | Private |

### Maintenance

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/maintenance` | Get all maintenance requests | Private |
| GET | `/api/maintenance/:id` | Get maintenance by ID | Private |
| POST | `/api/maintenance` | Create maintenance request | Private |
| PUT | `/api/maintenance/:id` | Update maintenance request | Private |
| DELETE | `/api/maintenance/:id` | Cancel maintenance request | Private |

## User Roles

### Admin
- Full access to all features
- Can manage buildings, units, tenants, and maintenance
- Can assign managers to buildings
- Can delete buildings and units

### Manager
- Can manage buildings assigned to them
- Can manage units in their buildings
- Can assign tenants to units
- Can manage maintenance requests for their buildings
- Cannot delete buildings or units

### Tenant
- Can view their assigned units
- Can create and manage their own maintenance requests
- Can update their profile
- Cannot access other tenants' data

## TypeScript Features

- **Strict Type Checking** - Compile-time error detection
- **Interface Definitions** - Type safety for all models
- **Knex.js Integration** - Type-safe database operations
- **Express Extensions** - Request/Response with user property

## Development

### Running Tests
```bash
npm test
```

### Build
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Database Commands
```bash
# Run migrations
npm run migrate

# Create migration
npm run migrate:make migration_name

# Rollback migration
npm run migrate:rollback

# Run seeds
npm run seed

# Create seed
npm run seed:make seed_name
```

## License

ISC 