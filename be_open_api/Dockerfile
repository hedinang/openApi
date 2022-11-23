# backend side
FROM openjdk:18
VOLUME /backend
ADD target/openapi-0.0.1-SNAPSHOT.jar app.jar
CMD ["java","-jar","/app.jar"]