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

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Set docs as the root
        },
        blog: false, // Disable the blog plugin
        pages: false, // Disable the pages plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Documentation',
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
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/0GLabs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/0GLabs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/0G-Labs/0g-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 0G Labs. Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;