import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      className: 'sidebar-category intro',
      link: {
        type: 'doc',
        id: 'introduction/what-is-0g',
      },
      items: [
        'introduction/what-is-0g',
        'introduction/key-concepts',
        'introduction/vision-mission',
        'introduction/ecosystem',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      className: 'sidebar-category concepts',
      link: {
        type: 'doc',
        id: 'concepts/overview',
      },
      items: [
        'concepts/overview',
        'concepts/storage',
        'concepts/compute',
        'concepts/chain',
        'concepts/da',
      ],
    },
    {
      type: 'category',
      label: 'Developer Hub',
      className: 'sidebar-category developer-hub',
      link: {
        type: 'doc',
        id: 'developer-hub/getting-started',
      },
      items: [
        'developer-hub/getting-started',
        {
          type: 'category',
          label: 'Building on 0G',
          link: {
            type: 'doc',
            id: 'developer-hub/building-on-0g/introduction',
          },
          items: [
            'developer-hub/building-on-0g/introduction',
            {
              type: 'category',
              label: 'Storage',
              items: [
                'developer-hub/building-on-0g/storage-sdk',
                'developer-hub/building-on-0g/storage-cli',
              ],
            },
            {
              type: 'category',
              label: 'Compute Network',
              items: [
                'developer-hub/building-on-0g/compute-network/overview',
                'developer-hub/building-on-0g/compute-network/sdk',
                'developer-hub/building-on-0g/compute-network/cli',
                'developer-hub/building-on-0g/compute-network/inference-provider',
                'developer-hub/building-on-0g/compute-network/fine-tuning-provider',
              ],
            },
            {
              type: 'category',
              label: 'INFTs',
              items: [
                'developer-hub/building-on-0g/inft/overview',
                'developer-hub/building-on-0g/inft/erc7857',
                'developer-hub/building-on-0g/inft/integration',
              ],
            },
            {
              type: 'category',
              label: 'Data Availability',
              items: [
                'developer-hub/building-on-0g/da-integration',
                {
                  type: 'category',
                  label: 'Rollups and Appchains',
                  items: [
                    'developer-hub/building-on-0g/rollups-and-appchains/overview',
                    'developer-hub/building-on-0g/rollups-and-appchains/op-stack-on-0g-da',
                    'developer-hub/building-on-0g/rollups-and-appchains/arbitrum-nitro-on-0g-da',
                  ],
                },
                {
                  type: 'category',
                  label: 'Rollup-as-a-Service',
                  items: [
                    'developer-hub/building-on-0g/rollup-as-a-service/caldera-on-0g-da',
                  ],
                },
                {
                  type: 'category',
                  label: 'AVS',
                  items: [
                    'developer-hub/building-on-0g/avs/overview',
                    'developer-hub/building-on-0g/avs/eigenlayer-avs-on-0g-da',
                    'developer-hub/building-on-0g/avs/babylon-avs-on-0g-da',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Contracts on 0G',
              items: [
                'developer-hub/building-on-0g/contracts-on-0g/deploy-contracts',
                {
                  type: 'category',
                  label: 'Precompiles',
                  items: [
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/overview',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/wrappeda0gibase',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/staking',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/dasigners',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            'developer-hub/tools/explorer',
            'developer-hub/tools/faucet',
            'developer-hub/tools/marketplace',
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'developer-hub/tutorials/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Node Operations',
      className: 'sidebar-category node-operations',
      link: {
        type: 'doc',
        id: 'node-operations/overview',
      },
      items: [
        'node-operations/overview',
        'node-operations/validator-node',
        'node-operations/storage-node',
        'node-operations/da-node',
        'node-operations/testnet-information',
        'node-operations/community-docker-repo',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      className: 'sidebar-category resources',
      items: [
        'resources/whitepaper',
        'resources/security',
        'resources/contributing',
        'resources/glossary',
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
            'node-sale/intro/intro',
            'node-sale/intro/node-holder-benefits',
            'node-sale/intro/sale-structure',
            'node-sale/intro/eligibility',
          ],
        },
        {
          type: 'category',
          label: 'Node Sale Details',
          items: [
            'node-sale/details/purchasing-nodes',
            'node-sale/details/incentives-and-rewards',
            'node-sale/details/compliance-and-regulatory',
          ],
        },
        {
          type: 'category',
          label: 'Frequently Asked Questions',
          items: [
            'node-sale/faq/faq',
          ],
        },
        'node-sale/disclaimer',
      ],
    },
  ],
};

export default sidebars;