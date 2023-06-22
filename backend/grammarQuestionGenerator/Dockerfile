# Start with a base image containing Java runtime
FROM adoptopenjdk:17-jdk-hotspot as build

# Make the project directory in the Docker image
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Build all the dependencies in preparation to go offline. 
# This is a separate step so the dependencies will be cached unless 
# the pom.xml file has changed.
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Second stage, based on OpenJDK, smaller than the build one
FROM adoptopenjdk:17-jdk-hotspot as runtime

ARG DEPENDENCY=/app/target/dependency

# Copy the project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-cp","app:app/lib/*","com.ltp.grammarquestiongenerator.main"]