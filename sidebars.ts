import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'preface',
    {
      type: 'category',
      label: '0G Overview',
      className: 'sidebar-category intro',
      link: {
        type: 'doc',
        id: 'intro',
      },
      items: [
        'og-storage', 
        {
          type: 'category',
          label: '0G DA',
          items: [
            'da/og-da',
            'da/og-da-deep-dive',
          ],
        },
        'og-serving',
        'og-chain',
      ],
    },
    {
      type: 'category',
      label: 'Run a Node',
      className: 'sidebar-category run-node',
      items: [
        'run-a-node/overview',
        'run-a-node/testnet-information',
        'run-a-node/storage-node',
        'run-a-node/da-node',
        'run-a-node/validator-node',
        'run-a-node/community-docker-repo',
      ],
    },
    {
      type: 'category',
      label: 'Build with 0G',
      className: 'sidebar-category build-with-0g',
      items: [

        'build-with-0g/storage-sdk',
        'build-with-0g/storage-cli',
        'build-with-0g/da-integration',
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
          label: 'Rollup-as-a-Service (coming soon)',
          items: [
            'build-with-0g/rollup-as-a-service/caldera-on-0g-da',
          ],
        },
        'build-with-0g/faucet',
        'build-with-0g/explorer',
        {
          type: 'category',
          label: 'Serving Network',
          items: [
            'build-with-0g/serving-network/overview',
            'build-with-0g/serving-network/provider',
            'build-with-0g/serving-network/sdk',
            'build-with-0g/serving-network/marketplace',
          ],
        },
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
    {
      type: 'category',
      label: 'Node Sale',
      className: 'sidebar-category node-sale',
      link: {
        type: 'doc',
        id: 'node-sale/node-sale-landing',
      },
      items: [
        {
          type: 'category',
          label: 'Introduction',
          items: [
            'node-sale/intro/what-is-an-ai-alignment-node',
            'node-sale/intro/why-run-a-node',
            'node-sale/intro/node-rewards',
          ],
          link: {
            type: 'doc',
            id: 'node-sale/intro/intro',
          },
        },
        {
          type: 'category',
          label: 'Node Sale Details',
          items: [
            'node-sale/details/details',
            'node-sale/details/how-to-purchase-nodes',
            'node-sale/details/whats-next',
            'node-sale/details/user-discounts-and-referrals',
          ],
        },
        {
          type: 'category',
          label: 'Node Sale FAQ',
          items: [
            'node-sale/faq/node-overview',
            'node-sale/faq/whitelist-and-node-sale',
            'node-sale/faq/payment-and-licenses',
            'node-sale/faq/node-operations',
          ],
        },
        'node-sale/disclaimer', 
      ],
    },
  ],
};

export default sidebars;
