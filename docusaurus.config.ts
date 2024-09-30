import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: '0G Documentation',
  tagline: 'The Next Generation Web3 Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://docs.0g.ai', 
  baseUrl: '/',
  organizationName: '0G Labs',
  projectName: '0g-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Set docs as the root
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
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
          href: 'https://github.com/0G-Labs/0g-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/intro' }, // Updated path
            { label: 'Run a Node', to: '/run-a-node/node-overview' }, // Updated path
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
            { label: 'Blog', href: 'https://0g.ai/blog' }, // Changed to href
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
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,

  customFields: {
    authUsername: process.env.AUTH_USERNAME,
    authPassword: process.env.AUTH_PASSWORD,
  },
};

export default config;