1. CREATE DATABASE building_management;
2. Run migration:  npx knex migrate:latest
3. Create network: docker network create mysql-network
4. docker run -d --name mysql-container --network mysql-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=building_management -p 3306:3306 mysql:8
3. Build docker image: docker build -t building-management:<TAG> .
4. Run:  docker run -d -p 3000:3000 --name building-management-container --network mysql-network --env-file .env  building-management:<TAG>
