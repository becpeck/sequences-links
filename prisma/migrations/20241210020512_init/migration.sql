-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "publishedDate" DATETIME,
    "sequenceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalUrl" TEXT NOT NULL,
    "finalUrl" TEXT NOT NULL,
    "siteType" TEXT NOT NULL,
    "isCanonical" BOOLEAN NOT NULL DEFAULT false,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PostUrl_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkText" TEXT,
    "originalUrl" TEXT NOT NULL,
    "fromPostId" TEXT NOT NULL,
    "toPostId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PostLink_fromPostId_fkey" FOREIGN KEY ("fromPostId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostLink_toPostId_fkey" FOREIGN KEY ("toPostId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sequence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_id_key" ON "Sequence"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_url_key" ON "Sequence"("url");
