import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import settings from './config/site/settings.json';

const navbarItems = [
  {type: 'docSidebar' as const, sidebarId: 'wikiSidebar', position: 'left' as const, label: 'Documentación'},
  ...settings.navbar.map((item) => ({
    label: item.label,
    href: item.href,
    position: item.position as 'left' | 'right',
  })),
];

const footerLinks = settings.footer.map((group) => ({
  title: group.title,
  items: group.items.map((item) => ({label: item.label, href: item.href})),
}));

const config: Config = {
  title: settings.title,
  tagline: settings.tagline,
  favicon: settings.favicon.replace(/^\//, ''),
  url: 'https://vicevil.wiki',
  baseUrl: '/',
  organizationName: 'vicevilz',
  projectName: 'vicevil-wiki',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  future: {v4: true},
  i18n: {defaultLocale: 'es', locales: ['es']},
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://vicevil.wiki/admin/',
          admonitions: {keywords: ['caution'], extendDefaults: true},
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: settings.socialCard.replace(/^\//, ''),
    colorMode: {
      defaultMode: settings.defaultColorMode as 'light' | 'dark',
      respectPrefersColorScheme: true,
    },
    metadata: [
      {name: 'theme-color', content: settings.primaryColor},
      {name: 'keywords', content: settings.keywords.join(', ')},
    ],
    announcementBar: settings.announcement.enabled ? {
      id: 'wiki-announcement',
      content: settings.announcement.content,
      backgroundColor: settings.announcement.backgroundColor,
      textColor: settings.announcement.textColor,
      isCloseable: settings.announcement.isCloseable,
    } : undefined,
    navbar: {
      title: settings.title,
      logo: {alt: `Logotipo de ${settings.title}`, src: settings.logo.replace(/^\//, '')},
      items: navbarItems,
    },
    footer: {
      style: 'dark',
      links: footerLinks,
      copyright: settings.copyright,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
