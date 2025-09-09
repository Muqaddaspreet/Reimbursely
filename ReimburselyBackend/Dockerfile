# Use OpenJDK 11 with Maven as base image
FROM openjdk:11-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY ReimburselyBackend/pom.xml .

# Copy source code
COPY ReimburselyBackend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a smaller runtime image
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=0 /app/target/reimbursely-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
