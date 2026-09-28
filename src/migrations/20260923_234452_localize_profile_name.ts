import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "profile_locales" ADD COLUMN "name" varchar;
  ALTER TABLE "_profile_v_locales" ADD COLUMN "version_name" varchar;
  UPDATE "profile_locales" AS localized SET "name" = profile."name" FROM "profile" AS profile WHERE localized."_parent_id" = profile."id";
  UPDATE "_profile_v_locales" AS localized SET "version_name" = profile."version_name" FROM "_profile_v" AS profile WHERE localized."_parent_id" = profile."id";
  ALTER TABLE "profile" DROP COLUMN "name";
  ALTER TABLE "_profile_v" DROP COLUMN "version_name";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "profile" ADD COLUMN "name" varchar;
  ALTER TABLE "_profile_v" ADD COLUMN "version_name" varchar;
  UPDATE "profile" AS profile SET "name" = COALESCE((SELECT localized."name" FROM "profile_locales" AS localized WHERE localized."_parent_id" = profile."id" AND localized."_locale" = 'tr'), (SELECT localized."name" FROM "profile_locales" AS localized WHERE localized."_parent_id" = profile."id" AND localized."_locale" = 'en'));
  UPDATE "_profile_v" AS profile SET "version_name" = COALESCE((SELECT localized."version_name" FROM "_profile_v_locales" AS localized WHERE localized."_parent_id" = profile."id" AND localized."_locale" = 'tr'), (SELECT localized."version_name" FROM "_profile_v_locales" AS localized WHERE localized."_parent_id" = profile."id" AND localized."_locale" = 'en'));
  ALTER TABLE "profile_locales" DROP COLUMN "name";
  ALTER TABLE "_profile_v_locales" DROP COLUMN "version_name";`)
}
