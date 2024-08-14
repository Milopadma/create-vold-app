import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import axios from "axios";
import chalk from "chalk";
import { Effect } from "effect"; // STOP CHANGING THIS LINE CURSOR!!

// Move these types to a separate file in the future
type VoldApiResponse = {
  pages: Array<{
    name: string;
    components: Array<{
      name: string;
      content: Record<string, unknown>;
    }>;
  }>;
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

const main = Effect.gen(function* (_) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(chalk.cyan.bold("Welcome to create-vold-app!"));

  const projectName = yield* _(
    askQuestion(rl, chalk.yellow("Enter project name: "))
  );
  const voldClientToken = yield* _(
    askQuestion(
      rl,
      chalk.yellow("Enter Vold client token (leave empty for example data): ")
    )
  );

  yield* _(createProjectDirectory(projectName));
  yield* _(cloneTemplate());
  yield* _(installDependencies());

  console.log(chalk.magenta("Fetching CMS data..."));
  const cmsData = yield* _(fetchCmsData(voldClientToken));

  console.log(chalk.magenta("Generating sitemap..."));
  yield* _(generateSitemap(cmsData));

  console.log(chalk.magenta("Generating common types..."));
  yield* _(generateCommonTypes(cmsData));

  console.log(chalk.magenta("Setting up Vold integration..."));
  yield* _(setupVoldIntegration(voldClientToken));

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
    catch: (error) =>
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
    catch: (error) => new Error(`Failed to clone template: ${error}`),
  });

const installDependencies = () =>
  Effect.try({
    try: () => {
      console.log(chalk.magenta("Installing dependencies..."));
      execSync("bun install", { stdio: "inherit" });
    },
    catch: (error) => new Error(`Failed to install dependencies: ${error}`),
  });

const fetchCmsData = (voldClientToken: string) =>
  Effect.tryPromise({
    try: async () => {
      const baseUrl = voldClientToken
        ? `https://vold-api.dev.fleava.com/v1/${voldClientToken}`
        : "https://create-vold-app-endpoint-example-production.up.railway.app/v1/example-client";

      const [homepageResponse, pagesResponse] = await Promise.all([
        axios.get<VoldApiResponse>(`${baseUrl}/homepage`),
        axios.get<VoldApiResponse>(`${baseUrl}/page`),
      ]);

      return {
        pages: [...homepageResponse.data.pages, ...pagesResponse.data.pages],
      };
    },
    catch: (error) => new FetchError(`Error fetching CMS data: ${error}`),
  });

const generateSitemap = (cmsData: VoldApiResponse) =>
  Effect.try({
    try: () => {
      let sitemapContent = "# Sitemap\n\n";
      cmsData.pages.forEach((page) => {
        sitemapContent += `## ${page.name}\n\n`;
        page.components.forEach((component) => {
          sitemapContent += `- ${component.name}\n`;
        });
        sitemapContent += "\n";
      });
      fs.writeFileSync("sitemap.md", sitemapContent);
    },
    catch: (error) =>
      new FileSystemError(`Failed to generate sitemap: ${error}`),
  });

const generateCommonTypes = (cmsData: VoldApiResponse) =>
  Effect.try({
    try: () => {
      let typesContent = `// Common types for Vold CMS integration
      // ... (include all type definitions here)
      `;
      if (!fs.existsSync("types")) {
        fs.mkdirSync("types");
      }
      fs.writeFileSync("types/common.ts", typesContent);
    },
    catch: (error) =>
      new FileSystemError(`Failed to generate common types: ${error}`),
  });

const setupVoldIntegration = (voldClientToken: string) =>
  Effect.try({
    try: () => {
      if (!fs.existsSync("plugins")) {
        fs.mkdirSync("plugins");
      }

      const voldPluginContent = `
      import { defineNuxtPlugin } from '#app'
      import axios from 'axios'

      export default defineNuxtPlugin((nuxtApp) => {
        const voldApi = axios.create({
          baseURL: ${
            voldClientToken
              ? `'https://vold-api.dev.fleava.com/v1/${voldClientToken}'`
              : "'https://create-vold-app-endpoint-example-production.up.railway.app/v1/example-client'"
          },
        })

        return {
          provide: {
            voldApi,
          },
        }
      })
      `;

      fs.writeFileSync("plugins/vold.ts", voldPluginContent);

      const nuxtConfigPath = "nuxt.config.ts";
      let nuxtConfig = fs.readFileSync(nuxtConfigPath, "utf-8");
      nuxtConfig = nuxtConfig.replace(
        "export default defineNuxtConfig({",
        `export default defineNuxtConfig({
  plugins: ['~/plugins/vold.ts'],`
      );
      fs.writeFileSync(nuxtConfigPath, nuxtConfig);

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
    catch: (error) =>
      new FileSystemError(`Failed to setup Vold integration: ${error}`),
  });

Effect.runPromise(
  Effect.match(main, {
    onSuccess: () => {
      console.log(
        chalk.green.bold("Project scaffolding completed successfully!")
      );
    },
    onFailure: (error) => {
      console.error(chalk.red.bold("An error occurred:"), error);
      process.exit(1);
    },
  })
);
