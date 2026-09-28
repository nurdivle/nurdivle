import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "experiences" ADD COLUMN "image_id" integer;
  ALTER TABLE "_experiences_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "year" numeric;
  ALTER TABLE "_projects_v" ADD COLUMN "version_year" numeric;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "experiences_image_idx" ON "experiences" USING btree ("image_id");
  CREATE INDEX "_experiences_v_version_version_image_idx" ON "_experiences_v" USING btree ("version_image_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "experiences" DROP CONSTRAINT "experiences_image_id_media_id_fk";
  ALTER TABLE "_experiences_v" DROP CONSTRAINT "_experiences_v_version_image_id_media_id_fk";
  DROP INDEX "experiences_image_idx";
  DROP INDEX "_experiences_v_version_version_image_idx";
  ALTER TABLE "experiences" DROP COLUMN "image_id";
  ALTER TABLE "_experiences_v" DROP COLUMN "version_image_id";
  ALTER TABLE "projects" DROP COLUMN "year";
  ALTER TABLE "_projects_v" DROP COLUMN "version_year";`)
}
