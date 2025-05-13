# 0G Documentation Restructuring Plan

## Overview

This restructuring plan organizes the 0G documentation to better serve both general users and developers. The plan preserves all existing technical content while improving navigation, discoverability, and user experience.

## Target Structure

```
docs/
├── 1-introduction/
│   ├── what-is-0g.md         # Overview of the platform and value proposition
│   ├── key-concepts.md       # Essential terminology and foundational ideas
│   ├── vision-mission.md     # Long-term goals and project philosophy
│   └── ecosystem.md          # Overview of components and how they interact
│
├── 2-concepts/
│   ├── overview.md           # How components work together
│   ├── storage.md            # Decentralized storage architecture
│   ├── compute.md            # AI compute network architecture
│   ├── chain.md              # Blockchain architecture
│   └── da.md                 # Data availability layer architecture
│
├── 3-developer-hub/
│   ├── getting-started.md    # Developer onboarding and environment setup
│   ├── building-on-0g/
│   │   ├── introduction.md   # General developer introduction
│   │   ├── storage-sdk.md    # Storage integration (TypeScript and Go)
│   │   ├── storage-cli.md    # Storage command-line tools
│   │   ├── compute-network/
│   │   │   ├── overview.md   # Compute network introduction
│   │   │   ├── sdk.md        # Compute network SDK
│   │   │   ├── cli.md        # Compute network CLI
│   │   │   ├── inference-provider.md # Inference provider guide
│   │   │   └── fine-tuning-provider.md # Fine-tuning provider guide
│   │   ├── inft/
│   │   │   ├── overview.md   # INFT introduction and use cases
│   │   │   ├── erc7857.md    # ERC-7857 standard details
│   │   │   └── integration.md # Integrating INFTs with applications
│   │   ├── da-integration.md # Data availability integration
│   │   ├── contracts-on-0g/
│   │   │   ├── deploy-contracts.md # Deploying contracts on 0G Chain
│   │   │   └── precompiles/
│   │   │       ├── overview.md    # Precompiles overview
│   │   │       ├── dasigners.md   # DA signers precompile
│   │   │       ├── staking.md     # Staking precompile
│   │   │       └── wrappeda0gibase.md # Wrapped A0G base precompile
│   │   ├── rollups-and-appchains/
│   │   │   ├── overview.md   # Rollups and appchains introduction
│   │   │   ├── op-stack-on-0g-da.md # OP Stack integration
│   │   │   └── arbitrum-nitro-on-0g-da.md # Arbitrum Nitro integration
│   │   ├── rollup-as-a-service/
│   │   │   └── caldera-on-0g-da.md # Caldera integration
│   │   └── avs/
│   │       ├── overview.md   # AVS integration introduction
│   │       ├── eigenlayer-avs-on-0g-da.md # EigenLayer AVS integration
│   │       └── babylon-avs-on-0g-da.md # Babylon AVS integration
│   ├── tools/
│   │   ├── explorer.md       # Blockchain explorer usage
│   │   ├── faucet.md         # Testnet token acquisition
│   │   └── marketplace.md    # Platform marketplace guide
│   └── tutorials/
│       └── placeholder.md    # Reserved for future tutorials
│
├── 4-node-operations/
│   ├── overview.md           # General node requirements and comparison
│   ├── validator-node.md     # Validator setup and operation
│   ├── storage-node.md       # Storage node setup and operation
│   ├── da-node.md            # DA node setup and operation
│   ├── testnet-information.md # Testnet-specific details
│   └── community-docker-repo.md # Community resources
│
├── 5-resources/
│   ├── whitepaper.md         # Technical foundation document
│   ├── security.md           # Security model and audits
│   ├── blog.md               # Updates and technical articles
│   ├── contributing.md       # Contribution guidelines
│   └── glossary.md           # Terminology reference
│
└── 6-node-sale/
    ├── node-sale-landing.md  # Sale overview
    ├── intro/
    │   ├── intro.md          # Introduction to node sale
    │   ├── eligibility.md    # Eligibility requirements
    │   ├── node-holder-benefits.md # Benefits for node holders
    │   └── sale-structure.md # Structure of the sale
    ├── details/
    │   ├── purchasing-nodes.md # How to purchase nodes
    │   ├── incentives-and-rewards.md # Incentives and rewards
    │   └── compliance-and-regulatory.md # Compliance information
    ├── faq/
    │   └── faq.md            # Frequently asked questions
    └── disclaimer.md         # Legal information
```

## Content Migration Strategy

### INFT Improvement

The INFT documentation will be elevated to its own subsection under the Developer Hub to increase visibility and importance. The content will be expanded into multiple files:

1. **overview.md** - Introduction to INFTs and their significance
2. **erc7857.md** - Detailed explanation of the ERC-7857 standard (enriched from existing content)
3. **integration.md** - Practical guide for integrating INFTs with applications

This structure gives INFTs equal prominence to other major components while providing a more comprehensive treatment.

### Developer Hub Organization

The Developer Hub section places all developer resources together with clear subcategories:

1. **Getting Started** - Entry point for all developers
2. **Building on 0G** - Comprehensive integration guides by component
3. **Tools** - Supporting utilities for development
4. **Tutorials** - Step-by-step learning resources

Each component within "Building on 0G" has its own section with consistent structure.

### Content Preservation Rules

1. **Technical accuracy** - All technical details, code examples, and configuration instructions will be preserved exactly
2. **Content enrichment** - Existing content will be enriched with additional context and cross-references
3. **Content splitting** - Large documents will be split into focused topic-specific pages
4. **Consistent formatting** - All pages will follow a standardized format with proper headings
5. **Metadata enhancement** - Each page will include appropriate metadata for search optimization

## Implementation Steps

### Phase 1: Structure Setup

1. Create the new directory structure
2. Set up placeholder files with proper frontmatter
3. Update sidebar configuration to reflect new organization

### Phase 2: Content Migration

1. Migrate introduction and concept content
2. Migrate developer hub content with special attention to INFTs
3. Migrate node operations content
4. Migrate resources and node sale content

### Phase 3: Navigation Enhancement

1. Add proper next/previous links between related pages
2. Implement consistent breadcrumb navigation
3. Add "See Also" sections to connect related content

### Phase 4: Content Enrichment

1. Add overview pages where missing
2. Standardize page structures
3. Enhance cross-referencing between related topics
4. Add visual indicators of content type and technical level

## Recommended Sidebars Configuration

The sidebar configuration should match the directory structure, with each major section collapsible but initially expanded. All subsections should be collapsed by default except the active section.

## Content Standards

Each document should follow a consistent structure:

1. **Title** - Clear descriptor of the content
2. **Introduction** - Brief overview of the topic and its importance
3. **Prerequisites** - Any required knowledge or setup
4. **Main Content** - The primary technical material
5. **Examples** - Code samples and practical usage
6. **Next Steps** - Related topics or logical progression
7. **References** - Links to related documentation or external resources

Technical level should be indicated visually at the top of each page.

## Testing Plan

1. Regular content quality checks during migration
2. Navigation testing with simulated user journeys
3. Technical accuracy verification by subject matter experts
4. Accessibility and readability verification