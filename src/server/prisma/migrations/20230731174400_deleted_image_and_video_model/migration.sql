/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `mediaId` on the `PostMedia` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `PostMedia` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `PostMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `PostMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Video";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    CONSTRAINT "PostMedia_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostMedia_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostMedia" ("id", "postId") SELECT "id", "postId" FROM "PostMedia";
DROP TABLE "PostMedia";
ALTER TABLE "new_PostMedia" RENAME TO "PostMedia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
