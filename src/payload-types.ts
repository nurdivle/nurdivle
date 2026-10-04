/* tslint:disable */
/* eslint-disable */

export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    sections: Section;
    experiences: Experience;
    projects: Project;
    'skill-groups': SkillGroup;
    education: Education;
    hobbies: Hobby;
    'payload-kv': PayloadKv;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    sections: SectionsSelect<false> | SectionsSelect<true>;
    experiences: ExperiencesSelect<false> | ExperiencesSelect<true>;
    projects: ProjectsSelect<false> | ProjectsSelect<true>;
    'skill-groups': SkillGroupsSelect<false> | SkillGroupsSelect<true>;
    education: EducationSelect<false> | EducationSelect<true>;
    hobbies: HobbiesSelect<false> | HobbiesSelect<true>;
    'payload-kv': PayloadKvSelect<false> | PayloadKvSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  fallbackLocale: ('false' | 'none' | 'null') | false | null | ('tr' | 'en') | ('tr' | 'en')[];
  globals: {
    profile: Profile;
    'site-settings': SiteSetting;
  };
  globalsSelect: {
    profile: ProfileSelect<false> | ProfileSelect<true>;
    'site-settings': SiteSettingsSelect<false> | SiteSettingsSelect<true>;
  };
  locale: 'tr' | 'en';
  widgets: {
    collections: CollectionsWidget;
  };
  user: User;
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  resetPasswordRequestedAt?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
  collection: 'users';
}
export interface Media {
  id: number;
  alt?: string | null;
  prefix?: string | null;
  _objectKey?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
export interface Section {
  id: number;
    key?: string | null;
  type?: ('about' | 'experience' | 'projects' | 'skills' | 'education' | 'hobbies' | 'custom') | null;
  label?: string | null;
    anchor?: string | null;
    legacyAnchors?:
    | {
        value?: string | null;
        id?: string | null;
      }[]
    | null;
  intro?: string | null;
  enabled?: boolean | null;
  showInNavigation?: boolean | null;
  order?: number | null;
  customContent?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Experience {
  id: number;
  key?: string | null;
  company?: string | null;
  role?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean | null;
  summary?: string | null;
    image?: (number | null) | Media;
  technologies?:
    | {
        name?: string | null;
        id?: string | null;
      }[]
    | null;
  companyUrl?: string | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Project {
  id: number;
  key?: string | null;
  title?: string | null;
  summary?: string | null;
  role?: string | null;
    image?: (number | null) | Media;
    year?: number | null;
  technologies?:
    | {
        name?: string | null;
        id?: string | null;
      }[]
    | null;
  liveUrl?: string | null;
  repositoryUrl?: string | null;
    featured?: boolean | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface SkillGroup {
  id: number;
  key?: string | null;
  title?: string | null;
  iconKey?: ('code' | 'network' | 'cloud' | 'database' | 'shield' | 'activity' | 'sparkles') | null;
  colorKey?: ('cyan' | 'mint' | 'violet' | 'amber' | 'rose' | 'slate') | null;
  skills?:
    | {
        name?: string | null;
        colorKey?: ('cyan' | 'mint' | 'violet' | 'amber' | 'rose' | 'slate') | null;
        id?: string | null;
      }[]
    | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Education {
  id: number;
  key?: string | null;
  institution?: string | null;
  program?: string | null;
  degree?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  description?: string | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Hobby {
  id: number;
  key?: string | null;
  title?: string | null;
  description?: string | null;
  iconKey?: ('book' | 'camera' | 'gamepad' | 'music' | 'plane' | 'dumbbell' | 'coffee') | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface PayloadKv {
  id: number;
  key: string;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
}
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'sections';
        value: number | Section;
      } | null)
    | ({
        relationTo: 'experiences';
        value: number | Experience;
      } | null)
    | ({
        relationTo: 'projects';
        value: number | Project;
      } | null)
    | ({
        relationTo: 'skill-groups';
        value: number | SkillGroup;
      } | null)
    | ({
        relationTo: 'education';
        value: number | Education;
      } | null)
    | ({
        relationTo: 'hobbies';
        value: number | Hobby;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  resetPasswordRequestedAt?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  _objectKey?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
export interface SectionsSelect<T extends boolean = true> {
  key?: T;
  type?: T;
  label?: T;
  anchor?: T;
  legacyAnchors?:
    | T
    | {
        value?: T;
        id?: T;
      };
  intro?: T;
  enabled?: T;
  showInNavigation?: T;
  order?: T;
  customContent?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface ExperiencesSelect<T extends boolean = true> {
  key?: T;
  company?: T;
  role?: T;
  location?: T;
  startDate?: T;
  endDate?: T;
  isCurrent?: T;
  summary?: T;
  image?: T;
  technologies?:
    | T
    | {
        name?: T;
        id?: T;
      };
  companyUrl?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface ProjectsSelect<T extends boolean = true> {
  key?: T;
  title?: T;
  summary?: T;
  role?: T;
  image?: T;
  year?: T;
  technologies?:
    | T
    | {
        name?: T;
        id?: T;
      };
  liveUrl?: T;
  repositoryUrl?: T;
  featured?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface SkillGroupsSelect<T extends boolean = true> {
  key?: T;
  title?: T;
  iconKey?: T;
  colorKey?: T;
  skills?:
    | T
    | {
        name?: T;
        colorKey?: T;
        id?: T;
      };
  order?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface EducationSelect<T extends boolean = true> {
  key?: T;
  institution?: T;
  program?: T;
  degree?: T;
  startDate?: T;
  endDate?: T;
  location?: T;
  description?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface HobbiesSelect<T extends boolean = true> {
  key?: T;
  title?: T;
  description?: T;
  iconKey?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface PayloadKvSelect<T extends boolean = true> {
  key?: T;
  data?: T;
}
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface Profile {
  id: number;
  name?: string | null;
  jobTitle?: string | null;
  tagline?: string | null;
  aboutParagraphs?:
    | {
        text?: string | null;
        id?: string | null;
      }[]
    | null;
  socialLinks?:
    | {
        platform?: ('github' | 'linkedin' | 'instagram' | 'email' | 'website') | null;
                label?: string | null;
        url?: string | null;
        id?: string | null;
      }[]
    | null;
  resume?: (number | null) | Media;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface SiteSetting {
  id: number;
  defaultLanguage?: ('tr' | 'en') | null;
  languageSwitcherPosition?: ('top-right' | 'bottom-right') | null;
  backgroundEffect?: ('off' | 'gradient' | 'binary') | null;
    colorTheme?:
    | (
        | 'ink-mint'
        | 'ocean-ink'
        | 'graphite-sage'
        | 'night-plum'
        | 'warm-anthracite'
        | 'pure-anthracite'
        | 'smoky-blue'
        | 'deep-petrol'
        | 'dark-olive'
        | 'burgundy-ink'
        | 'coffee-ink'
        | 'carbon-black'
        | 'titanium'
        | 'blue-anthracite'
        | 'smoke-graphite'
        | 'warm-graphite'
        | 'lava-stone'
      )
    | null;
  siteTitle?: string | null;
  siteDescription?: string | null;
  defaultSectionKey?: string | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface ProfileSelect<T extends boolean = true> {
  name?: T;
  jobTitle?: T;
  tagline?: T;
  aboutParagraphs?:
    | T
    | {
        text?: T;
        id?: T;
      };
  socialLinks?:
    | T
    | {
        platform?: T;
        label?: T;
        url?: T;
        id?: T;
      };
  resume?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
export interface SiteSettingsSelect<T extends boolean = true> {
  defaultLanguage?: T;
  languageSwitcherPosition?: T;
  backgroundEffect?: T;
  colorTheme?: T;
  siteTitle?: T;
  siteDescription?: T;
  defaultSectionKey?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
export interface CollectionsWidget {
  data?: {
    [k: string]: unknown;
  };
  width: 'full';
}
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}