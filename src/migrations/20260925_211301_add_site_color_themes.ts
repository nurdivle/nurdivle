import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_site_settings_color_theme" AS ENUM('ink-mint', 'ocean-ink', 'graphite-sage', 'night-plum', 'warm-anthracite', 'pure-anthracite', 'smoky-blue', 'deep-petrol', 'dark-olive', 'burgundy-ink', 'coffee-ink', 'carbon-black', 'titanium', 'blue-anthracite', 'smoke-graphite', 'warm-graphite', 'lava-stone');
  CREATE TYPE "public"."enum__site_settings_v_version_color_theme" AS ENUM('ink-mint', 'ocean-ink', 'graphite-sage', 'night-plum', 'warm-anthracite', 'pure-anthracite', 'smoky-blue', 'deep-petrol', 'dark-olive', 'burgundy-ink', 'coffee-ink', 'carbon-black', 'titanium', 'blue-anthracite', 'smoke-graphite', 'warm-graphite', 'lava-stone');
  ALTER TABLE "site_settings" ADD COLUMN "color_theme" "enum_site_settings_color_theme" DEFAULT 'smoke-graphite';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_color_theme" "enum__site_settings_v_version_color_theme" DEFAULT 'smoke-graphite';`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings" DROP COLUMN "color_theme";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_color_theme";
  DROP TYPE "public"."enum_site_settings_color_theme";
  DROP TYPE "public"."enum__site_settings_v_version_color_theme";`)
}
