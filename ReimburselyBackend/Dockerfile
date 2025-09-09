# Use OpenJDK 11 as base image
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/reimbursely-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
