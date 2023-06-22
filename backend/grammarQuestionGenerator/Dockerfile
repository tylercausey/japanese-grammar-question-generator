# Start with a base image containing Java runtime
FROM eclipse-temurin:17-jdk as build


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
FROM eclipse-temurin:17-jdk as runtime

ARG DEPENDENCY=/app/target/dependency

# Copy the project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Set the environment variables for connecting to the PostgreSQL container
# ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/grammar-question-generator
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/grammar-question-generator
ENV SPRING_DATASOURCE_USERNAME=tylercausey
ENV SPRING_DATASOURCE_PASSWORD=alpaca

# Run the application
ENTRYPOINT ["java","-cp","app:app/lib/*","com.ltp.grammarQuestionGenerator.GrammarQuestionGeneratorApplication"]
