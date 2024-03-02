#!/bin/bash
echo "Verifing docker demon has permissions" &&
sudo chmod 666 /var/run/docker.sock
echo "Building Project" &&
(./gradlew bootJar) &&
echo "Building container" &&
(docker build -t malibusparty/projects:stammtisch .) &&
echo "Pushing to remote" &&
(docker push malibusparty/projects:stammtisch) &&
echo "Done!"