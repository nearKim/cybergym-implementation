const config = {
  title: "CyberGym",
  tagline:
    "A Realistic Large-Scale Benchmark for AI Cybersecurity Capabilities",
  favicon: "img/favicon.ico",

  url: "https://nearkim.github.io",
  baseUrl: "/cybergym-implementation/",

  organizationName: "nearKim", // GitHub org/user name
  projectName: "cybergym-implementation", // GitHub repo name

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      ({
        docs: {
          routeBasePath: "/", // This makes docs the root
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/your-org/cybergym/tree/main/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/cybergym-social-card.jpg",
      navbar: {
        title: "CyberGym",
        logo: {
          alt: "CyberGym Logo",
          src: "img/logo.avif",
          srcDark: "img/logo-invert.avif",
        },
        items: [
          {
            type: "dropdown",
            label: "Getting Started",
            position: "left",
            items: [
              {
                label: "Installation",
                to: "/getting-started/installation",
              },
              {
                label: "Quick Start (Local Machine)",
                to: "/getting-started/quick-start/local_machine",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Theory",
            position: "left",
            items: [
              {
                label: "Overview",
                to: "/theory/overview",
              },
              {
                label: "Method",
                to: "/theory/method",
              },
              {
                label: "Adversarial Learning",
                to: "/theory/adversarial-learning",
              },
              {
                label: "Opponent Synthesis",
                to: "/theory/opponent-synthesis",
              },
              {
                label: "Cybersecurity Context",
                to: "/theory/cybersecurity-context",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Experiments",
            position: "left",
            items: [
              {
                label: "Input Dataset",
                to: "/experiments/input-dataset",
              },
            ],
          },
          {
            href: "https://github.com/nearKim/cybergym-implementation",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/getting-started/installation",
              },
            ],
          },
          {
            title: "Research",
            items: [
              {
                label: "Paper",
                href: "https://arxiv.org/pdf/2506.02548",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/nearKim/cybergym-implementation",
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
    }),
};

module.exports = config;
