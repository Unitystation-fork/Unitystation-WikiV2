// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Unitystation Documentation',
  tagline: 'Unitystation Documentation',
  url: 'http://31.211.16.159:8203/fr/docs/',
  baseUrl: '/',
  staticDirectories: ['static'],
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'https://github.com/Unitystation-fork/Unitystation-WikiV2', // Usually your GitHub org/user name.
  projectName: 'Rework V2 Wiki', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ru', 'de'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Unitystation-fork/Unitystation-WikiV2',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Unitystation-fork/Unitystation-WikiV2',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Unitystation Documentation',
        logo: {
          alt: 'Unitystation's Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Unitystation-fork/Unitystation-WikiV2',
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
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/tFcTpBp',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Unitystation-fork/Unitystation-WikiV2',
              },
            ],
          },
        ],
        copyright: `Copyright CCBYSA ${new Date().getFullYear()} Unitystation-wiki_V2, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'dark'
      },
    }),
};

module.exports = config;
