import { defineNuxtPlugin, useFetch, useRoute, useRuntimeConfig } from '#app';

const createApiPath = (apiUrl: string, tokenId: string): string => `${apiUrl}/${tokenId}`;

const fetchData = async (endpoint: string, options?: any) => {
  const { data } = await useFetch(endpoint, options);
  return data.value;
};

const GET = async (apiPath: string, type: string, opt?: any) => {
  if (!type) return null;
  return await fetchData(`${apiPath}/${type}`, opt);
};

const GET_POST_TYPE = async (apiPath: string, type: string) => {
  return await GET(apiPath, `post?where={"type": "${type}"}`);
};

const GET_POST_TYPE_BY_CATEGORY = async (apiPath: string, type: string, cat: string, limit: number) => {
  return await GET(apiPath, `post/type/${type}?sort=id,DESC&where={"status": "published"}&categories=${cat}&size=${limit}`);
};

const GET_POST_TYPE_CATEGORY = async (apiPath: string, type: string) => {
  return await GET(apiPath, `category/type/${type}`);
};

const GET_SINGLE = async (apiPath: string, slugCheck: string | null = null) => {
  const route = useRoute();
  const query = route.query;

  let status = 'publish';
  if (query.editing) status = 'draft';

  if (!slugCheck) {
    slugCheck = 'index';
  }

  if (slugCheck) {
    return await fetchData(`${apiPath}/page?where={"customUrl.en":"${slugCheck}"}&status=${status}`);
  }

  return null;
};

const HOMEPAGE = async (apiPath: string) => {
  const data = await fetchData(`${apiPath}/homepage`);
  return data;
};

const GET_SINGLE_BY_ID = async (apiPath: string, id: string, type: string = 'page') => {
  if (id && type) {
    return await fetchData(`${apiPath}/${type}/${id}`);
  }
  return null;
};

const POST = async (apiPath: string, slug: string, body: any) => {
  try {
    const response = await fetch(`${apiPath}/${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (err) {
    console.log('error in POST:', err);
    return null;
  }
};

const GET_CPT_DETAIL = async (apiPath: string, { params }: { params: { post: string } }) => {
  if (params) {
    const postType = params.post;
    const data = await fetchData(`${apiPath}/website-setting?where={"slug":"${postType}"}`);
    if (data?.length > 0) return data;
    return null;
  }

  return null;
};

const GET_WEBCONFIG = async (apiPath: string) => {
  return await GET(apiPath, 'webconfig');
};

const GET_NAVIGATION = async (apiPath: string) => {
  return await GET(apiPath, 'navigation');
};

export default defineNuxtPlugin({
  name: 'crud',
  enforce: 'pre',
  async setup() {
    const runtimeConfig = useRuntimeConfig();
    const apiPath = createApiPath(runtimeConfig.public.apiUrl, runtimeConfig.public.tokenId);

    return {
      provide: {
        crud: {
          GET: (type: string, opt?: any) => GET(apiPath, type, opt),
          GET_POST_TYPE: (type: string) => GET_POST_TYPE(apiPath, type),
          GET_POST_TYPE_BY_CATEGORY: (type: string, cat: string, limit: number) => GET_POST_TYPE_BY_CATEGORY(apiPath, type, cat, limit),
          GET_POST_TYPE_CATEGORY: (type: string) => GET_POST_TYPE_CATEGORY(apiPath, type),
          GET_SINGLE: (slugCheck: string | null = null) => GET_SINGLE(apiPath, slugCheck),
          HOMEPAGE: () => HOMEPAGE(apiPath),
          GET_SINGLE_BY_ID: (id: string, type: string = 'page') => GET_SINGLE_BY_ID(apiPath, id, type),
          POST: (slug: string, body: any) => POST(apiPath, slug, body),
          GET_CPT_DETAIL: ({ params }: { params: { post: string } }) => GET_CPT_DETAIL(apiPath, { params }),
          GET_WEBCONFIG: () => GET_WEBCONFIG(apiPath),
          GET_NAVIGATION: () => GET_NAVIGATION(apiPath),
        },
      },
    };
  },
});
