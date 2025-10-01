/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Theory',
      items: [
        'theory/overview',
        'theory/adversarial-learning',
        'theory/opponent-synthesis',
        'theory/cybersecurity-context',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/environments',
        'api/agents',
        'api/models',
        'api/training',
      ],
    },
    {
      type: 'category',
      label: 'Experiments',
      items: [
        'experiments/overview',
        'experiments/baseline-comparisons',
        'experiments/ablation-studies',
        'experiments/reproduction-guide',
      ],
    },
  ],
};

module.exports = sidebars;