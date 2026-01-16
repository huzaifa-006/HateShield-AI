# Set the base image
FROM node:18-alpine AS build
# Set the working directory
WORKDIR /app
# Copy the package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
