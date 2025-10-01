// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CyberGym',
  tagline: 'Competitive Multi-Agent Reinforcement Learning with Adaptive Opponent Synthesis',
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
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
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
                to: '/docs/getting-started/introduction',
              },
              {
                label: 'API Reference',
                to: '/docs/api/overview',
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
                to: '/docs/experiments/overview',
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
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'bash', 'yaml'],
      },
    }),
};

module.exports = config;