import * as migration_20260923_232411_initial_schema from './20260923_232411_initial_schema';
import * as migration_20260923_234452_localize_profile_name from './20260923_234452_localize_profile_name';
import * as migration_20260925_152050_add_instagram_social_platform from './20260925_152050_add_instagram_social_platform';
import * as migration_20260925_211301_add_site_color_themes from './20260925_211301_add_site_color_themes';
import * as migration_20260925_213349_localize_education_institution from './20260925_213349_localize_education_institution';
import * as migration_20260926_185823_add_project_archive_and_experience_images from './20260926_185823_add_project_archive_and_experience_images';
import * as migration_20260927_005222_neon_object_storage from './20260927_005222_neon_object_storage';
import * as migration_20261004_145021_make_content_fields_optional from './20261004_145021_make_content_fields_optional';

export const migrations = [
  {
    up: migration_20260923_232411_initial_schema.up,
    down: migration_20260923_232411_initial_schema.down,
    name: '20260923_232411_initial_schema',
  },
  {
    up: migration_20260923_234452_localize_profile_name.up,
    down: migration_20260923_234452_localize_profile_name.down,
    name: '20260923_234452_localize_profile_name',
  },
  {
    up: migration_20260925_152050_add_instagram_social_platform.up,
    down: migration_20260925_152050_add_instagram_social_platform.down,
    name: '20260925_152050_add_instagram_social_platform',
  },
  {
    up: migration_20260925_211301_add_site_color_themes.up,
    down: migration_20260925_211301_add_site_color_themes.down,
    name: '20260925_211301_add_site_color_themes',
  },
  {
    up: migration_20260925_213349_localize_education_institution.up,
    down: migration_20260925_213349_localize_education_institution.down,
    name: '20260925_213349_localize_education_institution',
  },
  {
    up: migration_20260926_185823_add_project_archive_and_experience_images.up,
    down: migration_20260926_185823_add_project_archive_and_experience_images.down,
    name: '20260926_185823_add_project_archive_and_experience_images',
  },
  {
    up: migration_20260927_005222_neon_object_storage.up,
    down: migration_20260927_005222_neon_object_storage.down,
    name: '20260927_005222_neon_object_storage',
  },
  {
    up: migration_20261004_145021_make_content_fields_optional.up,
    down: migration_20261004_145021_make_content_fields_optional.down,
    name: '20261004_145021_make_content_fields_optional'
  },
];
