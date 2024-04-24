import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const libs = [
  //dve
  {
    id: "",
    out: "libs/core",
    entryPoints: ["../core/src/**/*"],
    tsconfig: "../core/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Core",
      position: 0,
      fullNames: false,
    },
  },
  {
    id: "",

    out: "libs/foundation",
    entryPoints: ["../foundation/src/**/*"],
    tsconfig: "../foundation/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Foundation",
      position: 1,
      fullNames: false,
    },
  },
  {
    id: "",

    out: "libs/magic",
    entryPoints: ["../magic/src/**/*"],
    tsconfig: "../magic/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Magic",
      position: 2,
      fullNames: false,
    },
  },
  {
    id: "",

    out: "libs/babylon-renderer",
    entryPoints: ["../babylon-renderer/src/**/*"],
    tsconfig: "../babylon-renderer/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Babylon Renderer",
      position: 3,
      fullNames: false,
    },
  },
  {
    id: "",

    out: "libs/three-renderer",
    entryPoints: ["../three-renderer/src/**/*"],
    tsconfig: "../three-renderer/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Three Renderer",
      position: 4,
      fullNames: false,
    },
  },
  {
    id: "",
    out: "libs/react-three",
    entryPoints: ["../react-three/src/**/*"],
    tsconfig: "../react-three/src/tsconfig.json",
    sidebar: {
      categoryLabel: "React Three",
      position: 5,
      fullNames: false,
    },
  },
  {
    id: "",

    out: "libs/quantum-renderer",
    entryPoints: ["../quantum-renderer/src/**/*"],
    tsconfig: "../quantum-renderer/src/tsconfig.json",
    sidebar: {
      categoryLabel: "Quantum Renderer",
      position: 6,
      fullNames: false,
    },
  },
];

const config: Config = {
  //https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc#readme
  plugins: libs.map((_) => {
    _.id = _.out;
    return ["docusaurus-plugin-typedoc", _];
  }),

  title: "Divine Voxel Engine",
  tagline: "Unleash Your Creativity, Voxel by Voxel.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.divinevoxelengine.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "DivineVoxelEngine", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/dve.png",
    navbar: {
      title: "Divine Voxel Engine",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "libsSideBar",
          position: "left",
          label: "APIs",
        },
        {
          type: "docSidebar",
          sidebarId: "overviewSidebar",
          position: "left",
          label: "Overviews",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorials",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/facebook/docusaurus",
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
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
