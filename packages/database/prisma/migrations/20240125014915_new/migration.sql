/*
  Warnings:

  - You are about to drop the column `opnenig_hours` on the `AttentionSchedule` table. All the data in the column will be lost.
  - Added the required column `opening_hours` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttentionSchedule" DROP COLUMN "opnenig_hours",
ADD COLUMN     "opening_hours" TEXT NOT NULL;
