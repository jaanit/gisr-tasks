# gisr-tasks

GISR Tasks is a web application that manages the integration process of data . Built with Next.js, Prisma, PostgreSQL, and Docker.

## Project Structure

```plaintext
.
├── Dockerfile               # Docker image configuration
├── docker-compose.yml       # Defines Docker services
├── prisma/                  # Prisma schema and database setup
├── src/                     # Application source code
└── README.md                # Project documentation
```

# Configure Environment Variables
```plaintext

# Database configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mydb
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
NEXTAUTH_SECRET=be605dd0bfe0a2fb15c7ba13fbdefd62a61c0f58614b2f23fe71dd367d846506
```
# Run with Docker
```plaintext
docker-compose up --build
```
# Open Prisma Studio
```plaintext
npx prisma studio
```


# Login with Email and password
```plaintext
rjaanit@gmail.com
123456
```

