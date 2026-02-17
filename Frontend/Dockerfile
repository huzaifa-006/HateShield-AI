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

# Use Nginx to serve the built application
FROM nginx:alpine
# Copy the built application to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html
