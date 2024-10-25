# Use the official Node.js image as the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# COPY prisma ./prisma
# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the Prisma schema file


# Copy the .env file
# COPY .env ./

# Generate Prisma client


# Run migrations

# Copy the rest of the application code
COPY . .
RUN npx prisma generate
# Expose the port Next.js runs on
EXPOSE 3000

# Run the app in development mode
CMD ["npm", "run", "dev"]

