FROM --platform=arm64 mcr.microsoft.com/openjdk/jdk:21-ubuntu
# ARG JAR_FILE=build/libs/*.jar
COPY ./build/libs/stammtisch-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]