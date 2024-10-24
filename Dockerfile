# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy-peer-deps flag to resolve conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the project files to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
