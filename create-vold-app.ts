import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import axios from "axios";
import chalk from "chalk";
import { Effect } from "effect"; // IGNORE THIS LINE STOP TOUCHING IT PLEASE!!!!

type HomePageResponse = {
  components: Array<{
    data: {
      [key: string]: string;
    };
    id: string;
    section: string;
    sectionId: string;
    title: string;
  }>;
  created_at: string;
  customUrl: {
    [lang: string]: string;
  };
  data: null;
  description: null;
  featured: null;
  id: string;
  index: null;
  is_exclude_path: boolean;
  is_frontpage: boolean;
  last_edited: {
    at: string;
    email: string;
    id: string;
    name: string;
    role: string;
    role_id: string;
  };
  last_edited_by: {
    _id: string;
    email: string;
    name: string;
    role: {
      _id: string;
      client: string;
      created_at: string;
      disabled_create: string[];
      disabled_menu: string[];
      is_full_access: boolean;
      is_ignore_self_permission: boolean;
      last_edited: null;
      name: string;
      permission: unknown[];
      updated_at: string;
    };
  };
  meta: null;
  pageId: null;
  path: null;
  slug: {
    [lang: string]: string;
  };
  status: "published" | "draft" | "archived"; // assuming these are the possible statuses
  title: {
    [lang: string]: string;
  };
  updated_at: string;
};

type PageResponse = {
  is_last: boolean;
  results: Array<{
    components: Array<{
      data: {
        [key: string]: string;
      };
      id: string;
      section: string;
      sectionId: string;
      title: string;
    }>;
    slug?: {
      [lang: string]: string;
    };
  }>;
  total?: number;
  total_pages?: number;
};

// Define custom error types
class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

class FileSystemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileSystemError";
  }
}

const CLI_DEFAULTS = {
  projectName: "vold-app",
  voldClientToken: "VOLD_WEBSITE_TOKEN_ID",
  shouldInstall: "n",
  packageManager: "npm",
};

const main = Effect.gen(function* (_) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(chalk.cyan.bold("Welcome to create-vold-app!"));

  CLI_DEFAULTS.projectName = yield* _(
    askQuestion(rl, chalk.yellow("Enter project name: "))
  );
  CLI_DEFAULTS.voldClientToken = yield* _(
    askQuestion(
      rl,
      chalk.yellow("Enter Vold client token (leave empty for example data): ")
    )
  );

  CLI_DEFAULTS.shouldInstall = yield* _(
    askQuestion(
      rl,
      chalk.yellow("Do you want us to run the installation for you? (y/n): ")
    )
  );

  let packageManager = "npm";
  if (CLI_DEFAULTS.shouldInstall.toLowerCase() === "y") {
    packageManager = yield* _(
      askQuestion(
        rl,
        chalk.yellow("Which package manager do you prefer? (npm/bun): ")
      )
    );
  }

  yield* _(createProjectDirectory(CLI_DEFAULTS.projectName));
  yield* _(cloneTemplate());

  if (CLI_DEFAULTS.shouldInstall.toLowerCase() === "y") {
    yield* _(installDependencies(packageManager));
  } else {
    console.log(
      chalk.magenta(
        `Please run '${packageManager} install' to install dependencies.`
      )
    );
  }

  console.log(chalk.magenta("Fetching CMS data..."));
  const cmsData = yield* _(fetchCmsData(CLI_DEFAULTS.voldClientToken));

  console.log(chalk.magenta("Generating common types..."));
  yield* _(generateCommonTypes(cmsData));

  console.log(chalk.magenta("Generating sitemap..."));
  yield* _(generateSitemap(cmsData));

  console.log(chalk.magenta("Setting up Vold integration..."));
  yield* _(setupVoldIntegration(CLI_DEFAULTS.voldClientToken));

  console.log(chalk.green.bold("Project scaffolding complete!"));
  rl.close();
});

const askQuestion = (rl: readline.Interface, question: string) =>
  Effect.promise(
    () => new Promise<string>((resolve) => rl.question(question, resolve))
  );

const createProjectDirectory = (projectName: string) =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Creating project directory..."));
      fs.mkdirSync(projectName);
      process.chdir(projectName);
    },
    catch: (error: any) =>
      new FileSystemError(`Failed to create project directory: ${error}`),
  });

const cloneTemplate = () =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Cloning Nuxt 3 template from GitHub..."));
      execSync(
        "git clone https://github.com/milopadma/nuxt3-vold-template.git .",
        { stdio: "inherit" }
      );
      execSync("rm -rf .git", { stdio: "inherit" });
    },
    catch: (error: any) => new Error(`Failed to clone template: ${error}`),
  });

const installDependencies = (packageManager: string) =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Installing dependencies..."));
      execSync(`${packageManager} install`, { stdio: "inherit" });
    },
    catch: (error: any) =>
      new Error(`Failed to install dependencies: ${error}`),
  });

const fetchCmsData = (voldClientToken: string) =>
  Effect.tryPromise({
    try: async () => {
      const baseUrl = voldClientToken
        ? `https://vold-api.dev.fleava.com/v1/${voldClientToken}`
        : "https://create-vold-app-endpoint-example-production.up.railway.app/v1/example-client";

      const [homepageResponse, pagesResponse] = await Promise.all([
        axios.get<HomePageResponse>(`${baseUrl}/homepage`),
        axios.get<PageResponse>(`${baseUrl}/page`),
      ]);

      return {
        homepage: homepageResponse.data,
        pages: pagesResponse.data.results ?? [],
      };
    },
    catch: (error: any) => new FetchError(`Error fetching CMS data: ${error}`),
  });

const generateSitemap = (cmsData: {
  homepage: HomePageResponse;
  pages: PageResponse["results"];
}) =>
  Effect.try({
    try: () => {
      let sitemapContent = "# Sitemap\n\n";

      // Add homepage
      sitemapContent += `## Homepage\n\n`;
      cmsData.homepage.components.forEach((component) => {
        sitemapContent += `- ${component.title}\n`;
      });
      sitemapContent += "\n";

      // Add other pages
      cmsData.pages.forEach((page) => {
        // Get the page name from the slug, defaulting to "en" language or the first available language
        const pageName =
          page.slug?.en ?? Object.values(page.slug ?? {})[0] ?? "Untitled Page";
        sitemapContent += `## ${pageName}\n\n`;
        page.components.forEach((component) => {
          sitemapContent += `- ${component.title}\n`;
        });
        sitemapContent += "\n";
      });
      fs.writeFileSync("sitemap.md", sitemapContent);
    },
    catch: (error: any) =>
      new FileSystemError(`Failed to generate sitemap: ${error}`),
  });

const generateCommonTypes = (cmsData: {
  homepage: HomePageResponse;
  pages: PageResponse["results"];
}) =>
  Effect.try({
    try: () => {
      let typesContent = `

      export type ImageFile = {
        aws_file_url: string;
        client: {
          _id: string;
          created_at: string;
          domain: string | null;
          featured: boolean;
          id: string;
          last_edited: LastEdited;
          master: boolean;
          name: string;
          options: {
            disabled_language: boolean;
            disabled_property_menu: boolean;
            featured: boolean;
            menu_enabled_post: boolean;
            v2_editor: boolean;
          };
          status: string;
          template: string | null;
          updated_at: string;
          websiteName: string | null;
        };
        created_at: string;
        description: string | null;
        filename: {
          big: string;
          blur: string;
          medium: string;
          raw: string;
          webp: string;
        };
        folder: {
          client: string;
          created_at: string;
          id: string;
          last_edited: LastEdited;
          name: string;
          parent: string | null;
          type: string | null;
          updated_at: string;
          uri: string;
        };
        id: string;
        is_aws: boolean;
        last_edited: LastEdited | null;
        original: string;
        path: string;
        size: number;
        title: string | null;
        type: string;
        updated_at: string;
      };
      
      export type LastEdited = {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      
      export type Role = {
        _id: string;
        client: string;
        created_at: string;
        disabled_create: string[];
        disabled_menu: string[];
        is_full_access: boolean;
        is_ignore_self_permission: boolean;
        last_edited: null;
        name: string;
        permission: string[];
        updated_at: string;
      };
      
      export type LastEditedBy = {
        _id: string;
        email: string;
        name: string;
        role: Role;
      };
      
      export type CommonPageFields = {
        components: Component[] | null;
        created_at: string;
        customUrl: { en: string } | null;
        data: null;
        description: null;
        featured: null;
        id: string;
        index: null;
        is_exclude_path: boolean;
        is_frontpage: boolean;
        last_edited: LastEdited;
        last_edited_by: LastEditedBy | null;
        meta: null;
        pageId: null;
        path: null;
        slug: {
          en: string;
        };
        status: 'published' | 'draft';
        title: {
          en: string;
        };
        updated_at: string;
      };
            


// [ *************************** ]
// Put your common types here
// [ *************************** ]

// [ *************************** ]
// Here are your base component type and some example component types
// [ *************************** ]
export type BaseComponent = {
  id: string;
  section: string;
  sectionId: string;
  title: string;
  order?: number;
};

export type HeroProductComponent = BaseComponent & {
  data: {
    heroProductTitle: string;
    title: string;
  };
};

export type MarqueeCenterComponent = BaseComponent & {
  data: {
    marqueeCenterContent: string;
    marqueeCenterTheme: { id: string; title: string };
    marqueeCenterShrinkHeight: boolean;
  };
};

export type DescriptionBackgroundComponent = BaseComponent & {
  data: {
    DescriptionBackgroundDesc: string;
    DescriptionBackgroundTitle: string;
    DescriptionBackgroundImage: ImageFile;
  };
};

export type FullImageComponent = BaseComponent & {
  data: {
    FullImageImg: ImageFile;
  };
};

// [ *************************** ]
// Add new component types here...
// [ *************************** ]
// export type ComponentName = BaseComponent & {
//   data: {
//     // component data
//   };
// };

`;

      const componentTypes = new Set<string>();

      // Process homepage components
      if (cmsData.homepage && cmsData.homepage.components) {
        cmsData.homepage.components.forEach((component) => {
          if (
            component &&
            component.title &&
            !componentTypes.has(component.title)
          ) {
            componentTypes.add(component.title);
            const typeContent = generateComponentType(
              component.title,
              component.data ?? {}
            );
            typesContent += typeContent + "\n";
          }
        });
      }

      // Process other pages' components
      if (cmsData.pages) {
        cmsData.pages.forEach((page) => {
          if (page && page.components) {
            page.components.forEach((component) => {
              if (
                component &&
                component.title &&
                !componentTypes.has(component.title)
              ) {
                componentTypes.add(component.title);
                const typeContent = generateComponentType(
                  component.title,
                  component.data ?? {}
                );
                typesContent += typeContent + "\n";
              }
            });
          }
        });
      }

      // Add Component type union
      typesContent += `export type Component = ${Array.from(
        componentTypes
      ).join(" | ")};\n`;

      if (!fs.existsSync("types")) {
        fs.mkdirSync("types");
      }
      fs.writeFileSync("types/common.ts", typesContent);
    },
    catch: (error: any) =>
      new FileSystemError(`Failed to generate common types: ${error}`),
  });

const generateComponentType = (
  componentName: string,
  content: Record<string, unknown>
): string => {
  let typeContent = `export type ${componentName} = BaseComponent & {\n  data: {\n`;

  Object.entries(content).forEach(([key, value]) => {
    const type = inferType(value);
    typeContent += `    ${key}: ${type};\n`;
  });

  typeContent += "  };\n};\n";
  return typeContent;
};

const inferType = (value: unknown): string => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "any[]"; // You might want to infer array types more specifically
  if (typeof value === "object") return "Record<string, unknown>";
  return typeof value;
};

const setupVoldIntegration = (voldClientToken: string) =>
  Effect.try({
    try: () => {
      const nuxtConfigContent = `
// https://nuxtjs.org/docs/directory-structure/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  plugins: ["~/plugins/vold.ts"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Elementis",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { property: "og:type", content: "website" },
        { name: "msapplication-TileColor", content: "#2b3530" },
        { name: "theme-color", content: "#2b3530" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "preload",
          href: "/fonts/BasisGrotesqueArabicPro-Light.woff2",
          as: "font",
          type: "font/woff2",
        },
        {
          rel: "preload",
          href: "/fonts/BasisGrotesqueArabicPro-Regular.woff2",
          as: "font",
          type: "font/woff2",
        },
        {
          rel: "preload",
          href: "/fonts/BasisGrotesqueArabicPro-Medium.woff2",
          as: "font",
          type: "font/woff2",
        },
        {
          rel: "preload",
          href: "/fonts/BasisGrotesqueArabicPro-Bold.woff2",
          as: "font",
          type: "font/woff2",
        },
        {
          rel: "preload",
          href: "/fonts/BasisGrotesqueArabicPro-Black.woff2",
          as: "font",
          type: "font/woff2",
        },
      ],
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      tokenId: ${
        voldClientToken ? `"${voldClientToken}"` : '"VOLD_WEBSITE_TOKEN_ID"'
      },
      apiUrl: ${
        voldClientToken
          ? '"https://vold-api.dev.fleava.com/v1"'
          : '"https://create-vold-app-endpoint-example-production.up.railway.app/v1/example-client/"'
      },
      awsUrl: "VOLD_AWS_URL",
    },
  },

  build: {
    transpile: ["gsap"],
  },

  // css
  css: ["~/assets/styles/app.scss"],

  // modules
  modules: [
    "@nuxt/devtools",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/device",
    "@nuxt/content",
  ],

  image: {
    quality: 95,
    format: ["webp"],
  },

  imports: {
    dirs: ["stores"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: \`
            @use "~/assets/styles/helpers/_functions.scss" as fn;
            @use "~/assets/styles/helpers/_mixins.scss" as mx;
            @use "~/assets/styles/helpers/_variables.scss" as var;
            @use "~/assets/styles/_typography.scss" as *;
            @use "~/assets/styles/_utils.scss" as *;
          \`,
        },
      },
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  compatibilityDate: "2024-07-03",

  routeRules: {
    "/home": { redirect: "/" },
  },
});
`;

      fs.writeFileSync("nuxt.config.ts", nuxtConfigContent);

      const indexPageContent = `
<template>
  <div>
    <h1>Welcome to {{ title }}</h1>
    <p>This is a sample page using Vold CMS data.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const title = ref('')

onMounted(async () => {
  const { $voldApi } = useNuxtApp()
  try {
    const response = await $voldApi.get('/homepage')
    title.value = response.data.title?.en ?? 'Vold CMS Integration'
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }
})
</script>
`;

      fs.writeFileSync("pages/index.vue", indexPageContent);
    },
    catch: (error: unknown) =>
      new FileSystemError(
        `Failed to setup Vold integration: ${
          error instanceof Error ? error.message : String(error)
        }`
      ),
  });

Effect.runPromise(main).then(
  () => {
    console.log(
      chalk.green.bold("Project scaffolding completed successfully!")
    );
  },
  (error: any) => {
    console.error(chalk.red.bold("An error occurred:"), error);
    process.exit(1);
  }
);
