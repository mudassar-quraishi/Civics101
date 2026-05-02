# Stage 1: Build the application
FROM node:22-slim AS build
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:22-slim
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built frontend and server from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/index.js ./server/index.js

# Expose the port Cloud Run will use
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["npm", "start"]
