-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'manager',
    "mc_token" TEXT DEFAULT null,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usecase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_creation" DATETIME NOT NULL DEFAULT null,
    "date_mep" DATETIME DEFAULT null,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN COURS'
);

-- CreateTable
CREATE TABLE "Api" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usecaseId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "producteur" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN COURS',
    "date_creation" DATETIME NOT NULL,
    "date_uat" DATETIME DEFAULT null,
    "date_prod" DATETIME DEFAULT null,
    CONSTRAINT "Api_usecaseId_fkey" FOREIGN KEY ("usecaseId") REFERENCES "Usecase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usecase_nom_key" ON "Usecase"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Api_nom_key" ON "Api"("nom");
