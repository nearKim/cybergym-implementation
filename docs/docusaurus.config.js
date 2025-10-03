// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CyberGym',
  tagline: 'A Realistic Large-Scale Benchmark for AI Cybersecurity Capabilities',
  favicon: 'img/favicon.ico',

  url: 'https://nearkim.github.io',
  baseUrl: '/cybergym-implementation/',

  organizationName: 'nearKim', // GitHub org/user name
  projectName: 'cybergym-implementation', // GitHub repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // This makes docs the root
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/cybergym/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/cybergym-social-card.jpg',
      navbar: {
        title: 'CyberGym',
        logo: {
          alt: 'CyberGym Logo',
          src: 'img/logo.avif',
          srcDark: 'img/logo-invert.avif',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Weekly Reports',
            position: 'left',
            items: [
              {
                label: 'Template',
                to: '/weekly/template',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Getting Started',
            position: 'left',
            items: [
              {
                label: 'Introduction',
                to: '/getting-started/introduction',
              },
              {
                label: 'Installation',
                to: '/getting-started/installation',
              },
              {
                label: 'Quick Start (Colab)',
                to: '/getting-started/quick-start/google-Colab',
              },
              {
                label: 'Configuration',
                to: '/getting-started/configuration',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Theory',
            position: 'left',
            items: [
              {
                label: 'Overview',
                to: '/theory/overview',
              },
              {
                label: 'Adversarial Learning',
                to: '/theory/adversarial-learning',
              },
              {
                label: 'Opponent Synthesis',
                to: '/theory/opponent-synthesis',
              },
              {
                label: 'Cybersecurity Context',
                to: '/theory/cybersecurity-context',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'API Reference',
            position: 'left',
            items: [
              {
                label: 'Overview',
                to: '/api/overview',
              },
              {
                label: 'Environments',
                to: '/api/environments',
              },
              {
                label: 'Agents',
                to: '/api/agents',
              },
              {
                label: 'Models',
                to: '/api/models',
              },
              {
                label: 'Training',
                to: '/api/training',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Experiments',
            position: 'left',
            items: [
              {
                label: 'Overview',
                to: '/experiments/overview',
              },
              {
                label: 'Input Dataset',
                to: '/experiments/input-dataset',
              },
              {
                label: 'Baseline Comparisons',
                to: '/experiments/baseline-comparisons',
              },
              {
                label: 'Ablation Studies',
                to: '/experiments/ablation-studies',
              },
              {
                label: 'Reproduction Guide',
                to: '/experiments/reproduction-guide',
              },
            ],
          },
          {
            href: 'https://github.com/nearKim/cybergym-implementation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started/introduction',
              },
              {
                label: 'API Reference',
                to: '/api/overview',
              },
            ],
          },
          {
            title: 'Research',
            items: [
              {
                label: 'Paper',
                href: 'https://arxiv.org/pdf/2506.02548',
              },
              {
                label: 'Experiments',
                to: '/experiments/overview',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nearKim/cybergym-implementation',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CyberGym Project. Built with Docusaurus.`,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'bash', 'yaml'],
      },
    }),
};

module.exports = config;