import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';



const config: Config = {
  title: '0G Documentation',
  tagline: 'The Next Generation Web3 Infrastructure',
  favicon: 'img/favicon.ico',
  url: 'https://shiny-starburst-7af89f.netlify.app',
  baseUrl: '/',
  organizationName: '0G Labs',
  projectName: '0g-docs',

  onBrokenLinks: 'warn',
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
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
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
    prism: {
      theme: require('prism-react-renderer').themes.vsDark,
      darkTheme: require('prism-react-renderer').themes.vsDark,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: 'docs/intro' },
            { label: 'Run a Node', to: 'docs/run-a-node/node-overview' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/0glabs'},
            { label: 'Telegram', href: 'https://t.me/zgcommunity' },
            { label: 'Twitter', href: 'https://twitter.com/0g_labs' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: 'https://0g.ai/blog' },
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
    } as Preset.ThemeConfig['footer'],
  } as Preset.ThemeConfig,
}
export default config;