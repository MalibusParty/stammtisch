#!/bin/bash
echo "Verifing docker demon has permissions" &&
sudo chmod 666 /var/run/docker.sock
# echo "Building Project" &&
# (cd ./stammtisch_backend && ./gradlew bootJar) &&
echo "Docker compose up" &&
(docker compose -f docker-compose.yml up)