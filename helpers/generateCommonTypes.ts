import fs from "fs";
import { Effect } from "effect"; // IGNORE THIS LINE STOP TOUCHING IT PLEASE!!!!

import {
  FileSystemError,
  generateComponentType,
  HomePageResponse,
  PageResponse,
} from "../create-vold-app";

export const generateCommonTypes = (cmsData: {
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
