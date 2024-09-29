import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';


const sidebars: SidebarsConfig = {
  docs: [
    'preface',
    {
      type: 'category',
      label: 'Introduction to 0G',
      className: 'sidebar-category intro',
      link: {
        type: 'doc',
        id: 'intro',
      },
    items: ['og-storage', 'og-da', 'og-serving','og-chain'],
    },
    {
      type: 'category',
      label: 'Run a Node',
      className: 'sidebar-category run-node',
      link: {
        type: 'doc',
        id: 'run-a-node/index',
      },
      items: [
        'run-a-node/node-overview',
        'run-a-node/testnet-information',
        'run-a-node/storage',
        'run-a-node/da',
        'run-a-node/validator',
        'run-a-node/test',
      ],
    },
    {
      type: 'category',
      label: 'Build with 0G',
      className: 'sidebar-category build-with-0g',
      link:{
        type: 'doc',
        id: 'build-with-0g/build-with-0g',
      },
      items: [
        'build-with-0g/storage-sdk',
        'build-with-0g/da-integration',
        'build-with-0g/rollups',
      ],
    },
    {
      type: 'category',
      label: 'Developer Tooling',
      className: 'sidebar-category dev-tools',
      items: [
        'developer-tooling/faucet',
        'developer-tooling/explorer',
      ],
    },
    {
      type: 'category',
      label: 'Learn More About 0G',
      className: 'sidebar-category learn-more',
      items: ['learn-more/security', 'learn-more/whitepaper', 'learn-more/how-to-contribute',
        {
          type: 'link',
          label: 'Blog',
          href: 'https://0g.ai/blog',
          className: 'external-link',
        },

      ],
    },
  ],
};

export default sidebars;