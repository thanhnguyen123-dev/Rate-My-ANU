-- CreateTable
CREATE TABLE "Course" (
    "courseCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "modeOfDelivery" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "prerequisites" TEXT[],
    "description" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseCode")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficultyRating" DOUBLE PRECISION NOT NULL,
    "workloadRating" DOUBLE PRECISION NOT NULL,
    "courseCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT,
    "userEmail" TEXT,
    "userAvatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teachingRating" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_courseCode_idx" ON "Review"("courseCode");

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE INDEX "Like_reviewId_idx" ON "Like"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_reviewId_userId_key" ON "Like"("reviewId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course"("courseCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
