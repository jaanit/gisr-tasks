-- AlterTable
ALTER TABLE "Api" ALTER COLUMN "date_uat" SET DEFAULT null,
ALTER COLUMN "date_prod" SET DEFAULT null;

-- AlterTable
ALTER TABLE "Usecase" ALTER COLUMN "date_creation" SET DEFAULT null,
ALTER COLUMN "date_mep" SET DEFAULT null;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mc_token" SET DEFAULT null;
