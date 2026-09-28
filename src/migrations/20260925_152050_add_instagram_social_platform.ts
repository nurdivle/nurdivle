import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TYPE "public"."enum_profile_social_links_platform" ADD VALUE IF NOT EXISTS 'instagram' BEFORE 'email';
  ALTER TYPE "public"."enum__profile_v_version_social_links_platform" ADD VALUE IF NOT EXISTS 'instagram' BEFORE 'email';`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  UPDATE "profile_social_links" SET "platform" = 'website' WHERE "platform" = 'instagram';
  UPDATE "_profile_v_version_social_links" SET "platform" = 'website' WHERE "platform" = 'instagram';
  ALTER TABLE "profile_social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_profile_social_links_platform";
  CREATE TYPE "public"."enum_profile_social_links_platform" AS ENUM('github', 'linkedin', 'email', 'website');
  ALTER TABLE "profile_social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_profile_social_links_platform" USING "platform"::"public"."enum_profile_social_links_platform";
  ALTER TABLE "_profile_v_version_social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum__profile_v_version_social_links_platform";
  CREATE TYPE "public"."enum__profile_v_version_social_links_platform" AS ENUM('github', 'linkedin', 'email', 'website');
  ALTER TABLE "_profile_v_version_social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum__profile_v_version_social_links_platform" USING "platform"::"public"."enum__profile_v_version_social_links_platform";`)
}
