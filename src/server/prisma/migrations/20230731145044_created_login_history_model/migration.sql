-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "isMobile" BOOLEAN,
    "ipAddress" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
