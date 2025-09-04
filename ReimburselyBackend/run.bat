@echo off
echo Starting Reimbursely Backend...
echo.
echo Prerequisites:
echo - Java 11 or higher must be installed
echo - Maven must be installed
echo.
echo Building project...
call mvn clean install
if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check your Java and Maven installation.
    pause
    exit /b 1
)
echo.
echo Build successful! Starting application...
echo.
echo The backend will be available at: http://localhost:10253
echo H2 Console: http://localhost:10253/api/h2-console
echo.
echo Press Ctrl+C to stop the application
echo.
call mvn spring-boot:run
pause
