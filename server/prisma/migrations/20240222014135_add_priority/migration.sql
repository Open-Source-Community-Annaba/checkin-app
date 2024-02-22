/*
  Warnings:

  - Added the required column `priority` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "occupation" TEXT,
    "priority" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("checked", "id", "name", "occupation") SELECT "checked", "id", "name", "occupation" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
