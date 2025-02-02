# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-11 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code
COPY . /app/

# Install the dependencies and build the project
RUN mvn clean install

# Create the final image based on the OpenJDK image
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/my-app.jar /app/my-app.jar

# Run the application
CMD ["java", "-jar", "my-app.jar"]
