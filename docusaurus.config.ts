import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Vicevil Wiki',
  tagline: 'Documentación oficial de los plugins de Vicevil',
  favicon: 'img/favicon.svg',
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
          editUrl: 'https://github.com/vicevilz/vicevil-wiki/edit/main/',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    metadata: [
      {name: 'theme-color', content: '#6d5dfc'},
      {name: 'keywords', content: 'Vicevil, Minecraft, plugins, documentación'},
    ],
    navbar: {
      title: 'Vicevil Wiki',
      logo: {alt: 'Logotipo de Vicevil Wiki', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'pluginsSidebar', position: 'left', label: 'Plugins'},
        {to: '/docs/recursos', label: 'Recursos', position: 'left'},
        {href: 'https://vicevil.wiki/admin/', label: 'Editar', position: 'right'},
        {href: 'https://github.com/vicevilz/vicevil-wiki', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Plugins',
          items: [
            {label: 'vElevators', to: '/docs/velevators/'},
            {label: 'vCombat', to: '/docs/vcombat/'},
            {label: 'vLottery', to: '/docs/vlottery/'},
            {label: 'vStaff', to: '/docs/vstaff/'},
          ],
        },
        {
          title: 'Wiki',
          items: [
            {label: 'Recursos', to: '/docs/recursos'},
            {label: 'Panel de edición', href: 'https://vicevil.wiki/admin/'},
            {label: 'Repositorio', href: 'https://github.com/vicevilz/vicevil-wiki'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vicevil. Construido con Docusaurus.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;

