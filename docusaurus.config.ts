import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '0G Documentation',
  tagline: 'The Next Generation Web3 Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://docs.0g.ai',
  baseUrl: '/',
  organizationName: '0G Labs',
  projectName: '0g-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
        docsRouteBasePath: "/",
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        hideSearchBarWithNoSearchContext: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: '0G Documentation',
      logo: {
        alt: '0G Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/0G-Labs/0g-docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://twitter.com/0g_labs',
          position: 'right',
          className: 'header-twitter-link',
          'aria-label': 'Twitter profile',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Run a Node', to: '/run-a-node/node-overview' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/0glabs' },
            { label: 'Telegram', href: 'https://t.me/zgcommunity' },
            { label: 'Twitter', href: 'https://twitter.com/0g_labs' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', href: 'https://0g.ai/blog' },
            { label: 'GitHub', href: 'https://github.com/0glabs' },
          ],
        },
      ],
      logo: {
        alt: '0G Labs Logo',
        src: 'img/logo.svg',
        href: 'https://0g.ai',
      },
      copyright: `Copyright © ${new Date().getFullYear()} 0G Labs, Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;