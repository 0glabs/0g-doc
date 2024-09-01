import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Introduction to 0G',
      items: ['intro', 'og-chain', 'og-storage', 'og-da', 'og-serving'],
    },
    {
      type: 'category',
      label: 'Run a Node',
      link: {
        type: 'doc',
        id: 'run-a-node/index',
      },
      items: ['run-a-node/testnet-information', 'run-a-node/storage', 'run-a-node/da', 'run-a-node/validator'],
    },
    {
      type: 'category',
      label: 'Developer Tooling',
      items: ['developer-tooling/faucet', 'developer-tooling/explorer', 'developer-tooling/bridge'],
    },
    {
      type: 'category',
      label: 'Learn More About 0G',
      items: ['learn-more/audits', 'learn-more/whitepaper', 'learn-more/how-to-contribute'],
    },
  ],
};

export default sidebars;