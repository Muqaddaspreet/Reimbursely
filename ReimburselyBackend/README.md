# Reimbursely Backend

A Spring Boot REST API backend for the Reimbursement Portal application built with Java 11, Spring Boot 2.7.0, and Spring Data JPA.

## Features

- **User Management**: Employee and admin registration, authentication, and role management
- **Reimbursement Management**: Create, read, update, and delete reimbursement requests
- **Approval Workflow**: Admin approval/rejection of reimbursement requests
- **RESTful API**: Complete CRUD operations with proper HTTP status codes
- **Data Validation**: Input validation using Bean Validation annotations
- **CORS Support**: Configured for Angular frontend integration
- **H2 Database**: In-memory database with sample data initialization

## Technology Stack

- **Java**: 11
- **Spring Boot**: 2.7.0
- **Spring Data JPA**: For database operations
- **H2 Database**: In-memory database
- **Maven**: Build tool and dependency management
- **Bean Validation**: Input validation

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── reimbursely/
│   │           ├── config/          # Configuration classes
│   │           ├── controller/      # REST controllers
│   │           ├── entity/          # JPA entities
│   │           ├── repository/      # Data access layer
│   │           ├── service/         # Business logic layer
│   │           └── ReimburselyBackendApplication.java
│   └── resources/
│       └── application.properties   # Application configuration
└── test/                           # Test classes
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ReimburselyBackend
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:10253`

## API Endpoints

### User Management (`/api/Signup`)

| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| POST   | `/api/Signup`                     | Create new user (signup)    |
| GET    | `/api/Signup`                     | Get all users               |
| GET    | `/api/Signup/{id}`                | Get user by ID              |
| GET    | `/api/Signup/email/{email}`       | Get user by email           |
| PUT    | `/api/Signup/{id}`                | Update user                 |
| DELETE | `/api/Signup/{id}`                | Delete user                 |
| GET    | `/api/Signup/check-email/{email}` | Check if email exists       |
| GET    | `/api/Signup/admins`              | Get all admin users         |
| GET    | `/api/Signup/employees`           | Get all employee users      |
| PUT    | `/api/Signup/{id}/role`           | Change user role            |
| POST   | `/api/Signup/login`               | User authentication (login) |

### Reimbursement Management (`/api/ReimbursementData`)

| Method | Endpoint                                     | Description                          |
| ------ | -------------------------------------------- | ------------------------------------ |
| POST   | `/api/ReimbursementData`                     | Create new reimbursement request     |
| GET    | `/api/ReimbursementData`                     | Get all reimbursements               |
| GET    | `/api/ReimbursementData/{id}`                | Get reimbursement by ID              |
| GET    | `/api/ReimbursementData/employee/{email}`    | Get reimbursements by employee email |
| GET    | `/api/ReimbursementData/status/{status}`     | Get reimbursements by status         |
| GET    | `/api/ReimbursementData/pending`             | Get pending reimbursements           |
| PUT    | `/api/ReimbursementData/{id}`                | Update reimbursement                 |
| PUT    | `/api/ReimbursementData/{id}/approve`        | Approve reimbursement                |
| PUT    | `/api/ReimbursementData/{id}/reject`         | Reject reimbursement                 |
| DELETE | `/api/ReimbursementData/{id}`                | Delete reimbursement                 |
| GET    | `/api/ReimbursementData/date-range`          | Get reimbursements by date range     |
| GET    | `/api/ReimbursementData/expense-type/{type}` | Get reimbursements by expense type   |
| GET    | `/api/ReimbursementData/statistics`          | Get reimbursement statistics         |

## Sample Data

The application automatically initializes with sample data:

### Users

- **Admin**: `admin@reimbursely.com` / `Admin@123`
- **Employee 1**: `john.doe@reimbursely.com` / `John@123`
- **Employee 2**: `jane.smith@reimbursely.com` / `Jane@123`

### Sample Reimbursements

- Travel expense (Pending)
- Office supplies (Approved)
- Client meals (Rejected)

## Database Schema

### Users Table

- `sign_up_id` (Primary Key)
- `email` (Unique)
- `password`
- `full_name`
- `pan_number`
- `bank`
- `bank_account_number`
- `is_approver` (0 = Employee, 1 = Admin)

### Reimbursement_Data Table

- `id` (Primary Key)
- `employee_name`
- `employee_email`
- `expense_type`
- `amount`
- `description`
- `expense_date`
- `submission_date`
- `status` (PENDING, APPROVED, REJECTED)
- `approved_by`
- `approval_date`
- `rejection_reason`
- `user_id` (Foreign Key to Users)

## Configuration

### Application Properties

- **Server Port**: 10253
- **Context Path**: `/api`
- **Database**: H2 in-memory
- **CORS**: Enabled for `http://localhost:4200`

### H2 Console

Access the H2 database console at: `http://localhost:10253/api/h2-console`

- JDBC URL: `jdbc:h2:mem:reimburselydb`
- Username: `sa`
- Password: `password`

## Testing the API

### 1. Test User Signup

```bash
curl -X POST http://localhost:10253/api/Signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "fullName": "Test User",
    "panNumber": "TEST123456A",
    "bank": "SBI",
    "bankAccountNumber": "123456789012"
  }'
```

### 2. Test User Login

```bash
curl -X POST http://localhost:10253/api/Signup/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@reimbursely.com",
    "password": "Admin@123"
  }'
```

### 3. Test Reimbursement Creation

```bash
curl -X POST http://localhost:10253/api/ReimbursementData \
  -H "Content-Type: application/json" \
  -d '{
    "employeeName": "Test User",
    "employeeEmail": "test@example.com",
    "expenseType": "Travel",
    "amount": 1000.00,
    "description": "Business trip",
    "expenseDate": "2024-01-15"
  }'
```

## Development

### Adding New Features

1. Create entity classes in the `entity` package
2. Create repository interfaces in the `repository` package
3. Create service classes in the `service` package
4. Create controller classes in the `controller` package
5. Add appropriate validation annotations
6. Update tests if applicable

### Database Changes

- Modify entity classes with new fields
- Update validation annotations
- The application will automatically update the schema (H2 in-memory)

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Change the port in `application.properties`
   - Kill the process using the port

2. **CORS Issues**

   - Verify CORS configuration in `CorsConfig.java`
   - Check if frontend URL matches allowed origins

3. **Database Connection Issues**

   - Verify H2 dependency in `pom.xml`
   - Check database configuration in `application.properties`

4. **Validation Errors**
   - Check entity validation annotations
   - Verify request body format

### Logs

- Application logs are displayed in the console
- Set logging level in `application.properties` for debugging

## Deployment

### Production Considerations

- Replace H2 with a production database (MySQL, PostgreSQL)
- Configure proper security measures
- Set up environment-specific configurations
- Implement proper logging and monitoring

### Docker Support

```dockerfile
FROM openjdk:11-jre-slim
COPY target/reimbursely-backend-*.jar app.jar
EXPOSE 10253
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Support

For issues and questions:

1. Check the application logs
2. Verify API endpoint documentation
3. Test with sample data
4. Review configuration files
