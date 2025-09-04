#!/bin/bash

echo "Starting Reimbursely Backend..."
echo ""
echo "Prerequisites:"
echo "- Java 11 or higher must be installed"
echo "- Maven must be installed"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed or not in PATH"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed or not in PATH"
    exit 1
fi

echo "Building project..."
mvn clean install
if [ $? -ne 0 ]; then
    echo "Build failed! Please check your Java and Maven installation."
    exit 1
fi

echo ""
echo "Build successful! Starting application..."
echo ""
echo "The backend will be available at: http://localhost:10253"
echo "H2 Console: http://localhost:10253/api/h2-console"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

mvn spring-boot:run
