import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'preface',
    {
      type: 'category',
      label: '🚀 Introduction',
      className: 'sidebar-category intro',
      link: {
        type: 'doc',
        id: 'intro',
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
      label: '💡 Concepts',
      className: 'sidebar-category concepts',
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
      label: '🛠️ Developer Hub',
      className: 'sidebar-category developer-hub',
      link: {
        type: 'doc',
        id: 'developer-hub/developer-hub-index',
      },
      items: [
        'developer-hub/getting-started',
        {
          type: 'category',
          label: '🔬 Testnet',
          items: [
            'developer-hub/testnet/testnet-configuration',
          ],
        },
        {
          type: 'category',
          label: 'Building on 0G',
          link: {
            type: 'doc',
            id: 'developer-hub/building-on-0g/introduction',
          },
          items: [
            {
              type: 'category',
              label: '0G Storage',
              items: [
                'developer-hub/building-on-0g/storage/sdk',
                'developer-hub/building-on-0g/storage/storage-cli',
              ],
            },
            {
              type: 'category',
              label: '0G Compute',
              items: [
                'developer-hub/building-on-0g/compute-network/overview',
                'developer-hub/building-on-0g/compute-network/sdk',
                'developer-hub/building-on-0g/compute-network/cli',
                'developer-hub/building-on-0g/compute-network/provider',
                'developer-hub/building-on-0g/compute-network/fine-tuning-provider',
              ],
            },
            {
              type: 'category',
              label: '0G Chain',
              items: [
                'developer-hub/building-on-0g/contracts-on-0g/deploy-contracts',
                {
                  type: 'category',
                  label: 'Precompiles',
                  items: [
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/precompiles-overview',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/precompiles-dasigners',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/precompiles-staking',
                    'developer-hub/building-on-0g/contracts-on-0g/precompiles/precompiles-wrappeda0gibase',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: '0G DA',
              items: [
                'developer-hub/building-on-0g/da-integration',
                {
                  type: 'category',
                  label: 'Rollups and Appchains',
                  items: [
                    'developer-hub/building-on-0g/rollups-and-appchains/op-stack-on-0g-da',
                    'developer-hub/building-on-0g/rollups-and-appchains/arbitrum-nitro-on-0g-da',
                  ],
                },
                {
                  type: 'category',
                  label: 'Rollup as a Service',
                  items: [
                    'developer-hub/building-on-0g/rollup-as-a-service/caldera-on-0g-da',
                  ],
                },
                {
                  type: 'category',
                  label: 'AVSs',
                  items: [
                    'developer-hub/building-on-0g/avs/babylon-avs-on-0g-da',
                    'developer-hub/building-on-0g/avs/eigenlayer-avs-on-0g-da',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'INFTs',
              items: [
                'developer-hub/building-on-0g/inft/inft-overview',
                'developer-hub/building-on-0g/inft/integration',
                'developer-hub/building-on-0g/inft/erc7857',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🖥️ Run a Node',
      className: 'sidebar-category run-node',
      items: [
        'run-a-node/overview',
        'run-a-node/testnet-information',
        'run-a-node/validator-node',
        'run-a-node/storage-node',
        'run-a-node/da-node',
        'run-a-node/community-docker-repo',
      ],
    },
    // Commenting out the old "Build with 0G" section as it's being replaced by Developer Hub
    /*
    {
      type: 'category',
      label: 'Build with 0G',
      className: 'sidebar-category build-with-0g',
      link: {
        type: 'doc',
        id: 'build-with-0g/introduction',
      },
      items: [
        {
          type: 'category',
          label: '0G Chain',
          items: [
            'build-with-0g/contracts-on-0g/deploy-contracts',
            {
              type: 'category',
              label: 'Precompiles',
              items: [
                'build-with-0g/contracts-on-0g/precompiles/precompiles-overview',
                'build-with-0g/contracts-on-0g/precompiles/precompiles-wrappeda0gibase',
                'build-with-0g/contracts-on-0g/precompiles/precompiles-staking',
                'build-with-0g/contracts-on-0g/precompiles/precompiles-dasigners',
              ],
            },
            'build-with-0g/inft',
          ],
        },
        {
          type: 'category',
          label: '0G Compute',
          items: [
            'build-with-0g/compute-network/overview',
            'build-with-0g/compute-network/provider',
            'build-with-0g/compute-network/sdk',
            'build-with-0g/compute-network/fine-tuning-provider',
            'build-with-0g/compute-network/cli',
            'build-with-0g/marketplace',
          ],
        },
        {
          type: 'category',
          label: '0G Storage',
          items: [
            'build-with-0g/storage-sdk',
            'build-with-0g/storage-cli',
          ],
        },
        {
          type: 'category',
          label: '0G DA',
          items: [
            'build-with-0g/da-integration',
            {
              type: 'category',
              label: 'Rollups and Appchains',
              items: [
                'build-with-0g/rollups-and-appchains/op-stack-on-0g-da',
                'build-with-0g/rollups-and-appchains/arbitrum-nitro-on-0g-da',
                {
                  type: 'category',
                  label: 'Rollup-as-a-Service (coming soon)',
                  items: [
                    'build-with-0g/rollup-as-a-service/caldera-on-0g-da',
                  ],
                },
              ],
            },
          ],
        },
        'build-with-0g/faucet',
        'build-with-0g/explorer',
      ],
    },
    */
    {
      type: 'category',
      label: '📚 Resources',
      className: 'sidebar-category resources',
      items: [
        'resources/whitepaper',
        'learn-more/security',
        'learn-more/how-to-contribute',
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
      label: '🔗 Node Sale',
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