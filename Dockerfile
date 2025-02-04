# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-11 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code
COPY . /app/

# Make sure mvnw is executable
#RUN chmod +x mvnw

# Run Maven with debug logging
#RUN chmod +x mvnw && ./mvnw clean package -DskipTests -X


# Use a base image with OpenJDK 17 for running the app
#FROM openjdk:17-jdk-slim

# Set the working directory for the app
#WORKDIR /app

# Copy the JAR file from the build stage
#COPY --from=build /app/target/my-app.jar /app/my-app.jar

# Run the application
#CMD ["java", "-jar", "/app/my-app.jar"]

#RUN java -version

FROM openjdk:17-jdk-alpine
COPY . /app
WORKDIR /app
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests
CMD ["java", "-jar", "/app/target/splitwisedb-0.0.1-SNAPSHOT.jar"]

