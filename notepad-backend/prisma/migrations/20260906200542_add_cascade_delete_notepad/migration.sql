-- DropForeignKey
ALTER TABLE "notepad" DROP CONSTRAINT "notepad_user_id_fkey";

-- AddForeignKey
ALTER TABLE "notepad" ADD CONSTRAINT "notepad_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
