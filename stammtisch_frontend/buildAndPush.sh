#!/bin/bash
echo "Verifing docker demon has permissions" &&
sudo chmod 666 /var/run/docker.sock
echo "Building Project" &&
(npm run build) &&
echo "Building container" &&
(docker buildx build --platform linux/arm64/v8 --tag malibusparty/projects:stammtisch-frontend .) &&
echo "Pushing to remote" &&
(docker push malibusparty/projects:stammtisch-frontend) &&
echo "Done!"