import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "education_locales" ADD COLUMN "institution" varchar;
  ALTER TABLE "_education_v_locales" ADD COLUMN "version_institution" varchar;
  UPDATE "education_locales" AS localized SET "institution" = education."institution" FROM "education" AS education WHERE localized."_parent_id" = education."id";
  UPDATE "_education_v_locales" AS localized SET "version_institution" = education."version_institution" FROM "_education_v" AS education WHERE localized."_parent_id" = education."id";
  ALTER TABLE "education" DROP COLUMN "institution";
  ALTER TABLE "_education_v" DROP COLUMN "version_institution";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "education" ADD COLUMN "institution" varchar;
  ALTER TABLE "_education_v" ADD COLUMN "version_institution" varchar;
  UPDATE "education" AS education SET "institution" = COALESCE((SELECT localized."institution" FROM "education_locales" AS localized WHERE localized."_parent_id" = education."id" AND localized."_locale" = 'tr'), (SELECT localized."institution" FROM "education_locales" AS localized WHERE localized."_parent_id" = education."id" AND localized."_locale" = 'en'));
  UPDATE "_education_v" AS education SET "version_institution" = COALESCE((SELECT localized."version_institution" FROM "_education_v_locales" AS localized WHERE localized."_parent_id" = education."id" AND localized."_locale" = 'tr'), (SELECT localized."version_institution" FROM "_education_v_locales" AS localized WHERE localized."_parent_id" = education."id" AND localized."_locale" = 'en'));
  ALTER TABLE "education_locales" DROP COLUMN "institution";
  ALTER TABLE "_education_v_locales" DROP COLUMN "version_institution";`)
}
