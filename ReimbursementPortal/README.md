# Reimbursement Portal

A web application for managing employee reimbursement requests with admin approval workflow.

## Features

- Employee registration and login
- Admin login and dashboard
- Reimbursement request submission
- Admin approval workflow
- User role management (Employee/Admin)

## Prerequisites

- Node.js (version 14 or higher)
- Angular CLI (version 13 or higher)
- Backend API running on `http://localhost:10253`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
ng serve
```

3. Open your browser and navigate to `http://localhost:4200`

## Backend API Requirements

The application expects a backend API with the following endpoints:

- `GET /api/Signup` - Retrieve all users
- `POST /api/Signup` - Create new user
- `GET /api/ReimbursementData` - Retrieve reimbursement data
- `POST /api/ReimbursementData` - Create reimbursement request
- `PUT /api/ReimbursementData/{id}` - Update reimbursement request
- `DELETE /api/ReimbursementData/{id}` - Delete reimbursement request

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**

   - Ensure your backend API is running on port 10253
   - Check the backend status indicator in the top-right corner
   - Verify the API endpoints are accessible

2. **Signup/Login Not Working**

   - Check browser console for error messages
   - Verify backend API is running and accessible
   - Check network tab for failed HTTP requests

3. **Form Validation Issues**

   - Ensure all required fields are filled
   - Password must be at least 8 characters with special characters, numbers, and letters
   - Confirm password must match the password field

4. **Routing Issues**
   - Check browser console for routing errors
   - Verify all components are properly declared in modules

### Development

- The application uses Angular 13 with Bootstrap 5
- HTTP client is configured with retry logic and error handling
- Forms use both template-driven and reactive approaches
- User authentication is handled through role-based routing

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin components and module
│   ├── employee/       # Employee components and module
│   ├── models/         # Data models
│   ├── shared/         # Shared services
│   └── app.module.ts   # Main application module
├── assets/             # Static assets
└── environments/       # Environment configuration
```

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify backend API connectivity
3. Check the backend status indicator
4. Review the troubleshooting section above
