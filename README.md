# Reimbursely — Reimbursement Management Portal

A full‑stack reimbursement management portal built with **ASP.NET MVC / C#** on the backend and **Angular (TypeScript + RxJS)** on the frontend, with **MySQL** as the data store. Designed to centralize request submission, approvals, and auditing while keeping the experience fast and secure.

> **Impact**
> - Centralized workflow reduced manual processing time by **60%** and enabled admins to handle **5×** more requests.  
> - Response times improved by **35%** with efficient API endpoints and client‑side caching.  
> - Implemented secure authentication with a **100% validation success rate** during verification tests.

---

## Tech Stack

- **Frontend:** Angular, TypeScript, RxJS
- **Backend:** C#, ASP.NET Core MVC (Web API style controllers)
- **Database:** MySQL (Entity Framework Core Migrations)
- **Auth:** Token‑based authentication (JWT or cookie‑based, depending on configuration)
- **Other:** RESTful APIs, CORS, environment‑based configs

---

## Repository Structure

```
/
├─ Controllers/                # ASP.NET Core controllers (API endpoints)
├─ Models/                     # EF Core entities / view models
├─ Migrations/                 # EF Core migrations for MySQL
├─ Properties/                 # ASP.NET configs
├─ ReimbursementPortal/        # Angular client app
├─ appsettings.json            # Production / default configuration (DB, auth, etc.)
├─ appsettings.Development.json
├─ Program.cs                  # Host bootstrap
├─ Startup.cs                  # Services, middleware, CORS, auth
├─ MainProject.csproj          # .NET project file
├─ MainProject.sln             # Solution
└─ README.md
```

> The screenshot in the repo shows the same structure. Names can vary slightly depending on your project template.

---

## Features

- **Request lifecycle** — submit, view status, add comments/attachments, and track history.
- **Role‑based access** — employee vs. admin actions (approve/reject).
- **Auditable decisions** — timestamps, actors, and notes tracked via the DB.
- **Fast, responsive UI** — Angular w/ RxJS streams and HttpClient.
- **Secure authentication** — server‑side validation and token/cookie protection.
- **Config‑driven** — environment files (Angular) and `appsettings*.json` (.NET).

> The exact feature set depends on your current controllers/models. The README is written to match typical reimbursement workflows for this stack.

---

## Getting Started

### Prerequisites
- **.NET 5+** (project uses `Startup.cs`, typical of .NET 5)
- **Node.js 18+** and **Angular CLI** (`npm i -g @angular/cli`)
- **MySQL 8+** (ensure you have a database and credentials)

### 1) Configure the Backend (ASP.NET Core)

1. **Set connection string** in `appsettings.Development.json` (or `appsettings.json`):
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Port=3306;Database=reimbursely;User=root;Password=<your-password>;TreatTinyAsBoolean=false;"
     },
     "Jwt": {
       "Issuer": "Reimbursely",
       "Audience": "ReimburselyClient",
       "Key": "<dev-secret-key>"
     }
   }
   ```

2. **Apply migrations & create the DB** (Entity Framework Core):
   ```bash
   dotnet tool install --global dotnet-ef   # if not already installed
   dotnet restore
   dotnet ef database update
   ```

3. **Run the API**:
   ```bash
   dotnet run
   ```
   By default, Kestrel runs on `http://localhost:5000` and/or `https://localhost:5001` (check your `launchSettings.json`).

> **CORS:** In `Startup.cs`, ensure a CORS policy allows the Angular dev host (`http://localhost:4200`) during development.

### 2) Configure the Frontend (Angular)

1. Go to the Angular app:
   ```bash
   cd ReimbursementPortal
   npm install
   ```

2. Set environment variables (`src/environments/environment.ts`):
   ```ts
   export const environment = {
     production: false,
     apiBaseUrl: 'https://localhost:5001/api' // or http://localhost:5000/api
   };
   ```

3. Run the dev server:
   ```bash
   ng serve
   ```
   Open `http://localhost:4200` in your browser.

---

## Example API Surface (adjust to your Controllers)

> Names here are typical for a reimbursement workflow—replace with your actual controller/action names.

```
POST   /api/auth/login                    # authenticate user
GET    /api/users/me                      # current user profile/roles

GET    /api/reimbursements                # list requests (by user or all if admin)
POST   /api/reimbursements                # create a request
GET    /api/reimbursements/{id}           # details
PUT    /api/reimbursements/{id}           # update
POST   /api/reimbursements/{id}/approve   # admin approve
POST   /api/reimbursements/{id}/reject    # admin reject
```

Angular consumes these via `HttpClient` with RxJS pipes for mapping and error handling.

---

## Database Notes (MySQL)

A minimal schema usually involves:
- `Users` (Id, Email, PasswordHash/ExternalId, Role, …)
- `Reimbursements` (Id, UserId, Amount, Category, Status, CreatedAt, UpdatedAt, …)
- `ReimbursementNotes` / `Attachments` (optional)

EF Core migrations live in `/Migrations`. Run `dotnet ef migrations add <Name>` to evolve the schema.

---

## Security

- Token or cookie authentication (configurable in `Startup.cs`).
- Input validation and model binding on the server.
- Optional rate limiting and HTTPS redirection (enable in middleware pipeline).
- CORS restricted to known origins in production.

> The project reported **100% validation success** during verification tests.

---

## Performance

- Lean controller endpoints and indexed SQL columns.
- Angular leverages RxJS for efficient state and network usage.
- Cached lookups and paginated queries reduce payload size.

**Results observed:** **35% response time reduction** and admins can process **5×** more requests after centralization and UI improvements.

---

## Scripts & Commands

**Backend**
```bash
# run dev
dotnet run

# create migration
dotnet ef migrations add AddSomething

# update database
dotnet ef database update

# publish release
dotnet publish -c Release -o ./publish
```

**Frontend**
```bash
# dev
ng serve

# production build
ng build --configuration production
```

---

## Deployment

- **Backend:** publish with `dotnet publish` and host on IIS, Azure App Service, Docker, or any Linux VM with Nginx/Apache as a reverse proxy.
- **Frontend:** `ng build --configuration production` and serve the built files from Nginx/Apache or via the .NET host as static files.
- **Environment variables:** keep secrets (DB password, JWT key) out of source control and inject via environment/KeyVault equivalents.

---

## Roadmap / Ideas

- Email notifications & export to CSV/PDF
- File attachments with anti‑virus scanning
- Role management UI
- Dashboard metrics & charts
- E2E tests (Cypress) and API test suite

---

## Contributing

PRs and issues are welcome! Please open an issue to discuss substantial changes first.

---

## License

Add a license of your choice (e.g., MIT) to clarify usage. Create a `LICENSE` file at the repo root.

---

## Screenshots

If you have UI screens, add them here (drag images into the README or host in `/docs`).

---

## Acknowledgements

- Angular, ASP.NET Core, EF Core, MySQL, RxJS
- The many open‑source contributors behind these frameworks.
