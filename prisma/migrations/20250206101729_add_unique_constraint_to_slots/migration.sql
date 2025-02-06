/*
  Warnings:

  - A unique constraint covering the columns `[carpenterId,startTime,endTime]` on the table `slots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "slots_carpenterId_startTime_endTime_key" ON "slots"("carpenterId", "startTime", "endTime");
