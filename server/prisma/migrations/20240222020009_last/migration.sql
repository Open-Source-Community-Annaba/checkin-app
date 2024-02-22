/*
  Warnings:

  - You are about to alter the column `priority` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "occupation" TEXT,
    "priority" INTEGER,
    "checked" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("checked", "id", "name", "occupation", "priority") SELECT "checked", "id", "name", "occupation", "priority" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
