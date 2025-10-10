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

  // Conditionally add mermaid theme if it's installed
  themes: (() => {
    try {
      require.resolve('@docusaurus/theme-mermaid');
      return ['@docusaurus/theme-mermaid'];
    } catch {
      console.warn('Warning: @docusaurus/theme-mermaid is not installed. Mermaid diagrams will not be rendered.');
      return [];
    }
  })(),
  
  markdown: {
    mermaid: (() => {
      try {
        require.resolve('@docusaurus/theme-mermaid');
        return true;
      } catch {
        return false;
      }
    })(),
  },

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
            label: "Weekly Reports",
            position: "left",
            items: [
              {
                label: "Week 1 (2025-10-03)",
                to: "/weekly/week1-2025-10-03",
              },
              {
                label: "Week 2 (2025-10-09)",
                to: "/weekly/week1-2025-10-09",
              },
              // Add more weekly reports here
            ],
          },
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
                label: "Quick Start (Basic)",
                to: "/getting-started/quick-start/local_machine",
              },
              {
                label: "Quick Start (Detailed)",
                to: "/getting-started/quick-start/local_machine2",
              },
                            {
                label: "Quick Start (Detailed)",
                to: "/getting-started/quick-start/poc_generation",
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
                label: "API Reference",
                to: "/theory/api",
              },
              {
                label: "Architecture Overview",
                to: "/theory/architecture",
              },
              {
                label: "CyberGym Method",
                to: "/theory/cybergym-method",
              },
              {
                label: "Evaluation Findings",
                to: "/theory/evaluation-findings",
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
              {
                label: "LLM Models",
                to: "/experiments/LLM-models",
              },
              {
                label: "PoC Generation with Cybench",
                to: "/experiments/cybench",
              },
              {
                label: "PoC Generation with Codex",
                to: "/experiments/codex",
              },
              {
                label: "PoC Generation with Enigma",
                to: "/experiments/enigma",
              },
              {
                label: "PoC Generation with OpenHands",
                to: "/experiments/openhands",
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
      prism: (() => {
        try {
          // Try to load prism-react-renderer themes
          let lightTheme, darkTheme;

          // Try newer version first
          try {
            const {themes} = require('prism-react-renderer');
            lightTheme = themes.github;
            darkTheme = themes.dracula;
          } catch {
            // Try older version format
            try {
              lightTheme = require('prism-react-renderer/themes/github');
              darkTheme = require('prism-react-renderer/themes/dracula');
            } catch {
              // If prism-react-renderer is not installed, use undefined
              // Docusaurus will use its default themes
              lightTheme = undefined;
              darkTheme = undefined;
            }
          }
          
          return {
            theme: lightTheme,
            darkTheme: darkTheme,
            additionalLanguages: ['bash', 'python', 'powershell', 'yaml', 'json'],
          };
        } catch (error) {
          // If all fails, return minimal config
          console.warn('Warning: Could not load prism-react-renderer. Using default code highlighting.');
          return {
            additionalLanguages: ['bash', 'python', 'powershell', 'yaml', 'json'],
          };
        }
      })(),
    }),
};

module.exports = config;
