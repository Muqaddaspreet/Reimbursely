# Reimbursely - Employee Reimbursement Management System

A full-stack web application for managing employee reimbursement requests with admin approval workflow.

## 🚀 Features

- **Employee Portal**

  - User registration and login
  - Submit reimbursement requests
  - View request status and history
  - Update profile information

- **Admin Portal**

  - Approve/reject reimbursement requests
  - View all employee requests
  - Manage user accounts
  - Dashboard with analytics

- **Backend API**
  - RESTful API endpoints
  - H2 database with persistent storage
  - JPA/Hibernate for data management
  - CORS enabled for frontend integration

## 🛠️ Tech Stack

### Frontend (Angular)

- Angular 13
- Bootstrap 5
- TypeScript
- NgBootstrap components

### Backend (Spring Boot)

- Spring Boot 2.7.0
- Spring Data JPA
- H2 Database
- Maven build tool
- Java 11

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Java 11** or higher
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Maven** (for backend)
- **Angular CLI** (install with `npm install -g @angular/cli`)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Reimbursely
```

### 2. Backend Setup

Navigate to the backend directory and run:

```bash
cd ReimburselyBackend

# Install dependencies (if needed)
mvn clean install

# Run the application
mvn spring-boot:run
```

**Alternative ways to run backend:**

- Use the provided scripts:
  - Windows: `run.bat`
  - Linux/Mac: `./run.sh`
- Or run the JAR file directly

The backend will start on **http://localhost:10253**

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd ReimbursementPortal

# Install dependencies
npm install

# Start the development server
npm start
# or
ng serve
```

The frontend will start on **http://localhost:4200**

## 🔐 Default Login Credentials

### Admin Access

- **Email:** `admin@reimbursely.com`
- **Password:** `Admin@123`

### Employee Access

- **Email:** `john.doe@reimbursely.com`
- **Password:** `John@123`
- **Email:** `jane.smith@reimbursely.com`
- **Password:** `Jane@123`

## 📊 Database Access

You can access the H2 database console at:
**http://localhost:10253/api/h2-console**

- **JDBC URL:** `jdbc:h2:file:./data/reimburselydb`
- **Username:** `sa`
- **Password:** `password`

## 🏗️ Project Structure

```
Reimbursely/
├── ReimburselyBackend/          # Spring Boot Backend
│   ├── src/main/java/com/reimbursely/
│   │   ├── controller/          # REST Controllers
│   │   ├── entity/             # JPA Entities
│   │   ├── repository/         # Data Repositories
│   │   └── config/             # Configuration classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── ReimbursementPortal/         # Angular Frontend
│   ├── src/app/
│   │   ├── admin/              # Admin module
│   │   ├── employee/           # Employee module
│   │   ├── models/             # TypeScript models
│   │   └── shared/             # Shared services
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Backend Configuration

The backend configuration is in `ReimburselyBackend/src/main/resources/application.properties`:

- **Server Port:** 10253
- **Database:** H2 file-based database (persistent)
- **CORS:** Enabled for localhost:4200

### Frontend Configuration

The frontend configuration is in `ReimbursementPortal/src/environments/`:

- **API Base URL:** http://localhost:10253/api

## 📱 Usage Guide

### For Employees

1. **Sign Up:** Create a new account with your details
2. **Login:** Use your credentials to access the employee dashboard
3. **Submit Request:** Add new reimbursement requests with receipts
4. **Track Status:** Monitor your request status (Pending/Approved/Rejected)
5. **Update Profile:** Modify your personal and bank details

### For Admins

1. **Login:** Use admin credentials to access the admin dashboard
2. **Review Requests:** View all pending reimbursement requests
3. **Approve/Reject:** Make decisions on employee requests
4. **Manage Users:** View and manage employee accounts
5. **Analytics:** Monitor system usage and request statistics

## 🚀 Deployment

### Backend Deployment

1. Build the JAR file:
   ```bash
   mvn clean package
   ```
2. Run the JAR:
   ```bash
   java -jar target/reimbursely-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment

1. Build for production:
   ```bash
   ng build --prod
   ```
2. Deploy the `dist/reimbursement-portal` folder to your web server

## 🔍 API Endpoints

### User Management

- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/{id}` - Update user details

### Reimbursement Management

- `POST /api/reimbursements` - Submit new request
- `GET /api/reimbursements` - Get all requests
- `GET /api/reimbursements/user/{email}` - Get user's requests
- `PUT /api/reimbursements/{id}/approve` - Approve request
- `PUT /api/reimbursements/{id}/reject` - Reject request

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start:**

   - Check if port 10253 is available
   - Ensure Java 11+ is installed
   - Verify Maven dependencies

2. **Frontend won't start:**

   - Check if port 4200 is available
   - Run `npm install` to install dependencies
   - Ensure Angular CLI is installed globally

3. **Database connection issues:**

   - Check if the `data` folder exists in backend directory
   - Verify H2 console access at http://localhost:10253/api/h2-console

4. **CORS errors:**
   - Ensure backend is running on port 10253
   - Check CORS configuration in application.properties

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Angular team for the robust frontend framework
- Bootstrap for the UI components
- H2 Database for the lightweight database solution

---

**Note:** This application is configured with persistent data storage. Your data will be preserved between application restarts. The database files are stored in the `ReimburselyBackend/data/` directory.
