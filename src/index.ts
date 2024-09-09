#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import readline from "readline";
import axios from "axios";
import chalk from "chalk";
import { Effect } from "effect"; // IGNORE THIS LINE STOP TOUCHING IT PLEASE!!!!
import { generateCommonTypes } from "./helpers/generateCommonTypes";
import { setupVoldIntegration } from "./helpers/setupVoldIntegration";
import packageJson from "../package.json";

export type HomePageResponse = {
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

export type PageResponse = {
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
export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

export class FileSystemError extends Error {
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

  console.log(
    chalk.cyan.bold(`
                                                                         
                     _                        _    _                     
 ___  ___  ___  ___ | |_  ___  ___  _ _  ___ | | _| | ___  ___  ___  ___ 
|  _||  _|| -_|| .'||  _|| -_||___|| | || . || || . ||___|| .'|| . || . |
|___||_|  |___||__,||_|  |___|      \_/ |___||_||___|     |__,||  _||  _|
                                                               |_|  |_|  


v${packageJson.version}

`)
  );

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

  rl.close();
});

const askQuestion = (
  rl: readline.Interface,
  question: string
): Effect.Effect<string, Error> =>
  Effect.promise(
    () => new Promise<string>((resolve) => rl.question(question, resolve))
  );

const createProjectDirectory = (
  projectName: string
): Effect.Effect<void, FileSystemError> =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Creating project directory..."));
      fs.mkdirSync(projectName);
      process.chdir(projectName);
    },
    catch: (error) =>
      new FileSystemError(`Failed to create project directory: ${error}`),
  });

const cloneTemplate = (): Effect.Effect<void, Error> =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Cloning Nuxt 3 template from GitHub..."));
      execSync(
        "git clone https://github.com/milopadma/nuxt3-vold-template.git .",
        { stdio: "inherit" }
      );
      execSync("rm -rf .git", { stdio: "inherit" });
    },
    catch: (error) => new Error(`Failed to clone template: ${error}`),
  });

const installDependencies = (
  packageManager: string
): Effect.Effect<void, Error> =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Installing dependencies..."));
      execSync(`${packageManager} install`, { stdio: "inherit" });
    },
    catch: (error) => new Error(`Failed to install dependencies: ${error}`),
  });

const fetchCmsData = (
  voldClientToken: string
): Effect.Effect<
  {
    homepage: HomePageResponse;
    pages: PageResponse["results"];
  },
  FetchError
> =>
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
    catch: (error) => new FetchError(`Error fetching CMS data: ${error}`),
  });

const generateSitemap = (cmsData: {
  homepage: HomePageResponse;
  pages: PageResponse["results"];
}): Effect.Effect<void, FileSystemError> =>
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
    catch: (error) =>
      new FileSystemError(`Failed to generate sitemap: ${error}`),
  });

export const generateComponentType = (
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

Effect.runPromise(main).then(
  () => {
    console.log(
      chalk.green.bold("Project scaffolding completed successfully!")
    );
  },
  (error) => {
    console.error(chalk.red.bold("An error occurred:"), error);
    process.exit(1);
  }
);
