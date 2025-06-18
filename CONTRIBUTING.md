# Contributing to 0G Documentation

Thank you for your interest in contributing to the 0G documentation! This guide will help you understand our contribution process and standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Contribution Types](#contribution-types)
- [Contribution Process](#contribution-process)
- [Writing Guidelines](#writing-guidelines)
- [Review Process](#review-process)
- [Technical Setup](#technical-setup)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our community standards:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn, npm, or pnpm package manager
- Git
- Basic knowledge of Markdown and React (for advanced contributions)

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/0g-doc-new.git
   cd 0g-doc-new
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Start Development Server**
   ```bash
   yarn start
   ```

4. **Build and Test**
   ```bash
   yarn build
   ```

## 📝 Contribution Types

### 1. Documentation Content
- **New guides and tutorials**
- **Updates to existing documentation**
- **Technical accuracy fixes**

### 2. Website Improvements
- **Bug fixes**
- **Accessibility improvements**

## 🔄 Contribution Process

### Step 1: Issue Creation
**Before starting work, please:**
1. Check existing issues to avoid duplication
2. Create a new issue describing your proposed changes
3. Wait for maintainer approval before proceeding
4. Use appropriate issue templates

**Important Note:** All issue approvals are at the sole discretion of the 0G team. The team reserves the right to reject any contribution that doesn't meet our quality standards or doesn't add meaningful value to the documentation.

### Contribution Quality Standards
We value meaningful contributions that improve the documentation. Please note:
- **Meaningful Changes**: Minor changes like adding commas, dots, or single words without context will not be accepted
- **Value Addition**: Each contribution should add clear value to the documentation

### Step 2: Branch Creation
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
# or
git checkout -b docs/section-name
```

**Branch Naming Convention:**
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - UI/styling changes

### Step 3: Make Changes
- Follow our [Writing Guidelines](#writing-guidelines)
- Test your changes locally
- Ensure no broken links or build errors
- Add appropriate frontmatter to new docs

### Step 4: Commit and Push
```bash
git add .
git commit -m "type: brief description

Detailed description of changes made."
git push origin your-branch-name
```

**Commit Message Format:**
```
type: brief description (50 chars max)

- More detailed explanation if needed
- Use bullet points for multiple changes
- Reference issue numbers with #123
```

**Commit Types:**
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting or responsive changes

### Step 5: Create Pull Request
1. Use the PR template
2. Fill out all required sections
3. Link related issues
4. Add reviewers if known
5. Mark as draft if work in progress

## ✍️ Writing Guidelines

### Content Standards

#### 1. Clarity and Accuracy
- **Write for your audience** - Consider both technical and non-technical readers
- **Be precise** - Use exact terminology and avoid ambiguity
- **Stay current** - Ensure all information is up-to-date
- **Verify examples** - All code examples must work as written

#### 2. Structure and Organization
- **Use clear headings** - Follow hierarchical structure (H1 > H2 > H3)
- **Add table of contents** for longer documents
- **Use consistent formatting** throughout
- **Include frontmatter** for all new documentation files

#### 3. Style Guidelines
- **Tone**: Professional yet approachable
- **Voice**: Active voice preferred
- **Tense**: Present tense for instructions
- **Person**: Second person ("you") for user-facing content

### Markdown Conventions

#### Frontmatter Requirements
```yaml
---
id: unique-identifier
title: Page Title
sidebar_position: 1
slug: /custom-url-path
description: Brief description for SEO
keywords: [keyword1, keyword2, keyword3]
---
```

#### Formatting Standards
- **Headers**: Use `#` syntax, not underline style
- **Code blocks**: Always specify language
- **Links**: Use descriptive text, not "click here"
- **Images**: Include alt text and proper sizing
- **Lists**: Use consistent bullet style
- **Tables**: Include headers and proper alignment

#### Code Examples
```typescript
// ✅ Good: Complete, working example with comments
const config = {
  chainId: 16600,
  rpcUrl: "https://evmrpc-testnet.0g.ai",
  // Additional configuration options
};

// ✅ Include expected output when relevant
console.log(config.chainId); // Output: 16600
```

```typescript
// ❌ Bad: Incomplete or unclear example
const config = { ... };
```

### Content Guidelines

#### Technical Accuracy
- **Test all code examples** before submission
- **Verify links** work and point to correct resources
- **Check version compatibility** for all referenced tools
- **Include error handling** in code examples where appropriate

#### User Experience
- **Provide context** - Explain the "why" not just the "how"
- **Include prerequisites** for complex procedures
- **Add troubleshooting sections** for common issues
- **Use progressive disclosure** - basic to advanced concepts

## 🔍 Review Process

### Automated Checks
All contributions must pass:
- **Build verification** - Documentation builds without errors
- **Link validation** - All links are accessible
- **Linting** - Markdown and code formatting
- **Spell check** - Content review for typos

### Human Review
1. **Technical accuracy** - Content is correct and current
2. **Writing quality** - Clear, well-structured, and engaging
3. **Style consistency** - Follows project conventions
4. **User experience** - Easy to follow and understand

### Review Timeline
- **Initial review**: Within 2-3 business days
- **Feedback incorporation**: Contributor responsibility
- **Final approval**: 1-2 business days after feedback addressed
- **Merge**: Automated after all approvals

## 🛠 Technical Setup

### Required Files for New Sections
When adding new documentation sections:

1. **Main content file** (`docs/section/page.md`)
2. **Update sidebar** (`sidebars.ts`) if needed
3. **Add to navigation** if creating new top-level section
4. **Include images** in appropriate `/static/img/` subdirectory

### Advanced Contributions

#### Custom Components
```jsx
// Use existing components when possible
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="typescript" label="TypeScript">
    // TypeScript example
  </TabItem>
  <TabItem value="javascript" label="JavaScript">
    // JavaScript example
  </TabItem>
</Tabs>
```

#### Math Equations
```markdown
Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

## 🚫 What Not to Include

- **Promotional content** not directly related to 0G
- **Incomplete or untested code examples**
- **Personal opinions** presented as facts
- **Copyrighted content** without proper attribution
- **Sensitive information** like private keys or credentials
- **Outdated information** without proper deprecation notices

## 🆘 Getting Help

### Before Asking for Help
1. Check existing documentation
2. Search closed issues and discussions
3. Review this contributing guide
4. Try reproducing the issue locally

### How to Get Help
- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general help
- **Documentation Issues** - For content-related questions

### Response Times
- **Bug reports**: 1-2 business days
- **Feature requests**: 3-5 business days  
- **Questions**: 1-3 business days
- **General discussions**: Best effort basis

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for helping make 0G documentation better! 🎉