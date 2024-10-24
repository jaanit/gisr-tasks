-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Api" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usecaseId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "producteur" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN COURS',
    "date_creation" DATETIME NOT NULL,
    "date_uat" DATETIME DEFAULT null,
    "date_prod" DATETIME DEFAULT null,
    CONSTRAINT "Api_usecaseId_fkey" FOREIGN KEY ("usecaseId") REFERENCES "Usecase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Api" ("date_creation", "date_prod", "date_uat", "description", "id", "nom", "producteur", "statut", "usecaseId") SELECT "date_creation", "date_prod", "date_uat", "description", "id", "nom", "producteur", "statut", "usecaseId" FROM "Api";
DROP TABLE "Api";
ALTER TABLE "new_Api" RENAME TO "Api";
CREATE UNIQUE INDEX "Api_nom_key" ON "Api"("nom");
CREATE TABLE "new_Usecase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_creation" DATETIME NOT NULL DEFAULT null,
    "date_mep" DATETIME DEFAULT null,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN COURS'
);
INSERT INTO "new_Usecase" ("createdAt", "date_creation", "date_mep", "description", "id", "nom", "statut", "updatedAt") SELECT "createdAt", "date_creation", "date_mep", "description", "id", "nom", "statut", "updatedAt" FROM "Usecase";
DROP TABLE "Usecase";
ALTER TABLE "new_Usecase" RENAME TO "Usecase";
CREATE UNIQUE INDEX "Usecase_nom_key" ON "Usecase"("nom");
CREATE TABLE "new_User" (
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
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "mc_token", "name", "password", "role", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "mc_token", "name", "password", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
