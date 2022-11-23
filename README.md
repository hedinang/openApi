## Hello everyone! This is open api system 
## Type of user: 
    1 Guest: just only try api 
    2 User: allow to create, update, delete service and api as well
## How to run system:
    1. Pull down total of project
    2. Install openjdk:18
    3. Build java folder to jar file by command "mvn clean install"
    4. Go to fe_open_api
    5. Execute this command on terminal: " sudo docker-compose -f docker-compose.yaml up --build " 
## How to use:
    1. Go to website as google chrome
    2. Go to url: http://localhost:4100/system-service/service-list
    3. Login if wanna create something
    4. Username/Password: admin/admin
## Where is the database:
    1. Login gmail: openapihypersms@gmail.com with password: 123@123a
    2. Go to url: https://cloud.mongodb.com/v2#/org/632a640f624adf056117014b
    3. Login with google button on atlas screen
    4. Change database url in backend: Go to application-cloud.properties in resources of be_open_api