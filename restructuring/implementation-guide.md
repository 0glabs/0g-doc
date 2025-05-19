# 0G Documentation Restructuring Implementation Guide

This implementation guide provides a step-by-step approach for executing the documentation restructuring plan. It includes specific tasks, considerations, and a timeline to ensure a smooth transition to the new structure while preserving all existing content.

## Implementation Phases

The restructuring will be implemented in several phases to minimize disruption and ensure content consistency.

### Phase 1: Setup and Configuration (Estimated time: 1-2 days)

1. **Create New Directory Structure**
   - ✅ Create main section directories (introduction, concepts, developer-hub, etc.)
   - ✅ Create required subdirectories for each section
   - ✅ Set up placeholder files with correct frontmatter

2. **Configure Navigation**
   - ✅ Update sidebar.ts with new navigation structure
   - Update next/previous page links
   - Configure custom document classes for styling

3. **Set Up Redirects**
   - Create redirection map from old URLs to new URLs
   - Implement URL redirects in docusaurus.config.ts
   - Test redirect functionality

### Phase 2: Core Content Migration (Estimated time: 3-5 days)

1. **Migrate Introduction Content**
   - ✅ Create what-is-0g.md from existing intro.md
   - ✅ Create key-concepts.md from intro.md and other sources
   - ✅ Create vision-mission.md from preface.md and intro.md
   - ✅ Create ecosystem.md as a new overview document

2. **Migrate Concept Content**
   - ✅ Create concepts/overview.md as a new document
   - ✅ Migrate 0g-storage.md to concepts/storage.md with independence clarification
   - ✅ Migrate 0g-compute.md to concepts/compute.md with independence clarification
   - ✅ Migrate 0g-chain.md to concepts/chain.md with independence clarification
   - ✅ Migrate da/0g-da.md and da/0g-da-deep-dive.md to concepts/da.md with independence clarification

3. **Migrate Developer Hub Content**
   - Create getting-started.md as a new developer entry point
   - Migrate build-with-0g/introduction.md to developer-hub/building-on-0g/introduction.md
   - ✅ Enhance INFT documentation by splitting into overview, erc7857, and integration
   - Migrate storage documentation to developer-hub/building-on-0g/
   - Migrate compute-network documentation to developer-hub/building-on-0g/compute-network/
   - Migrate contracts documentation to developer-hub/building-on-0g/contracts-on-0g/
   - Migrate DA and rollups documentation to developer-hub/building-on-0g/
   - Migrate tools documentation to developer-hub/tools/

4. **Migrate Node Operations Content**
   - Migrate run-a-node/overview.md to node-operations/overview.md
   - Migrate node setup guides to node-operations/
   - Migrate testnet information to node-operations/
   - Migrate community resources to node-operations/

### Phase 3: Secondary Content Migration (Estimated time: 2-3 days)

1. **Migrate Resources Content**
   - Migrate learn-more/ content to resources/
   - Create new glossary.md document
   - Update external links

2. **Migrate Node Sale Content**
   - Migrate node-sale/ content to restructured node-sale/
   - Ensure all subpages maintain their organization

3. **Create New Tutorial Content**
   - Create placeholder for future tutorials
   - Set up tutorial template for consistent formatting

### Phase 4: Quality Assurance (Estimated time: 2-3 days)

1. **Content Review**
   - Verify all content migrated correctly
   - Check for broken links or missing images
   - Ensure independence messaging is consistent
   - Test navigation flow from each entry point

2. **Technical Verification**
   - Build site and test on development server
   - Check mobile responsiveness
   - Verify search functionality
   - Test page load performance

3. **User Testing**
   - Conduct review with team members
   - Test common user journeys
   - Collect and implement feedback

### Phase 5: Deployment (Estimated time: 1 day)

1. **Deploy to Staging**
   - Deploy to staging environment
   - Conduct final review
   - Verify redirects function properly

2. **Production Deployment**
   - Schedule production deployment
   - Deploy to production
   - Verify live site functionality

3. **Post-Deployment Tasks**
   - Update documentation links in other projects
   - Announce changes to community
   - Monitor for issues

## Content Migration Rules

When migrating content, follow these specific rules to ensure consistency:

1. **Metadata Structure**
   ```yaml
   ---
   id: unique-page-id
   title: Page Title
   sidebar_position: position_number
   description: Brief description of the page content
   keywords: [relevant, keywords, for, search]
   ---
   ```

2. **Component Independence**
   - Add explicit statements about component independence in each component page
   - Use the standard phrasing: "{Component} is a fully independent component of the 0G ecosystem. It can be used as a standalone solution without requiring adoption of other 0G components."
   - Provide concrete examples of how the component can be used independently

3. **Cross-Referencing**
   - Update all internal links to use new URL structure: `/section/subsection/page`
   - For links between components, highlight optional nature of integration
   - Link to related components but emphasize independence

4. **Code Examples**
   - Preserve all code examples exactly as written
   - Update import paths and package references as needed
   - Add clarifying comments about independence where appropriate

## INFT Content Enhancement

Special attention has been given to enhancing the INFT documentation:

1. **Dedicated Section**
   - ✅ Moved from a single page to a three-page section under developer-hub/building-on-0g/inft/
   - ✅ Created overview.md as an entry point with expanded introduction
   - ✅ Created erc7857.md with detailed technical standard information
   - ✅ Created integration.md with implementation examples and guidance

2. **Enhanced Positioning**
   - ✅ Placed at the same hierarchy level as other major components
   - ✅ Expanded introduction to better explain significance and applications
   - ✅ Added more implementation details and examples

3. **Independence Clarification**
   - ✅ Added explicit statements about how INFTs can be used with or without other 0G components
   - ✅ Provided integration examples with alternative technologies

## File Naming Conventions

- Use all-lowercase file names with hyphens for spaces (e.g., `file-name.md`)
- Use descriptive file names that reflect content (e.g., `storage-sdk.md` not `sdk.md`)
- For index/overview pages, use descriptive names (e.g., `overview.md` not `index.md`)
- For component pages, use the component name (e.g., `storage.md`, `compute.md`)

## Implementation Tips

1. **Use Temporary IDs**
   - During migration, use temporary IDs in frontmatter that clearly indicate new structure
   - Example: `id: temp-concepts-storage`
   - This prevents ID conflicts during migration
   - Update to final IDs after all content is migrated

2. **Create Link Mapping Document**
   - Maintain a spreadsheet of old URLs to new URLs
   - Use for creating redirects and updating internal links
   - Helps verify all content is accounted for

3. **Test in Batches**
   - After migrating each section, build and test the documentation
   - Fix issues before proceeding to the next section
   - Use feature branches for each major section

4. **Coordinate with Team**
   - Freeze content changes during migration
   - Communicate timeline to all documentation contributors
   - Set clear handover point for new structure

## Next Steps

1. Continue the migration process following this implementation guide
2. Focus on completing developer hub content migration
3. Migrate node operations and resources content
4. Implement and test redirects
5. Conduct thorough content review
6. Deploy to staging and then production

## Migration Support Resources

- Docusaurus Migration Guide: [https://docusaurus.io/docs/migration](https://docusaurus.io/docs/migration)
- Markdown Style Guide: [https://docusaurus.io/docs/markdown-features](https://docusaurus.io/docs/markdown-features)
- URL Redirect Plugin: [https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)