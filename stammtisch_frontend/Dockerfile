# stage 1 as builder
FROM --platform=arm64 node:20-alpine as builder
# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the files
COPY . .
RUN npm run build

FROM --platform=arm64 nginx:alpine as production-build
COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# copy from the stage 1
COPY --from=builder /dist /usr/share/nginx/html/stammtisch-frontend
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]