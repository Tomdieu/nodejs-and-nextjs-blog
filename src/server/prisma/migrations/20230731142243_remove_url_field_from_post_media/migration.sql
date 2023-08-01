/*
  Warnings:

  - You are about to drop the column `url` on the `PostMedia` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "mediaType" TEXT NOT NULL,
    CONSTRAINT "PostMedia_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostMedia" ("id", "mediaId", "mediaType", "postId") SELECT "id", "mediaId", "mediaType", "postId" FROM "PostMedia";
DROP TABLE "PostMedia";
ALTER TABLE "new_PostMedia" RENAME TO "PostMedia";
CREATE UNIQUE INDEX "PostMedia_mediaId_key" ON "PostMedia"("mediaId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
