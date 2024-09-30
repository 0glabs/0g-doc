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
        'build-with-0g/da-integration',
        'build-with-0g/storage-sdk',
        {
          type: 'category',
          label: 'Rollups and Appchains',
          items: [
            'build-with-0g/rollups-and-appchains/op-stack-on-0g-da',
            'build-with-0g/rollups-and-appchains/arbitrum-nitro-on-0g-da',
          ],
        },
        {
          type: 'category',
          label: 'Rollup as a Service',
          items: [
            'build-with-0g/rollup-as-a-service/caldera-on-0g-da',
          ],
        },
        {
          type: 'category',
          label: 'AVSs',
          items: [
            'build-with-0g/avss/eigenlayer-avs-on-0g-da',
            'build-with-0g/avss/babylon-avs-on-0g-da',
          ],
        },
        'build-with-0g/faucet',
        'build-with-0g/explorer',
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