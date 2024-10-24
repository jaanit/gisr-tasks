# Install dependencies only when needed
FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps

# Production image, copy all the files and run the app
FROM node:16-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start"]
