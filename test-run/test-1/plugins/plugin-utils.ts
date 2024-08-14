import _ from 'lodash';
import { useNuxtApp, useRoute, defineNuxtPlugin, useRuntimeConfig } from '#app';
import { usePageDetail, usePageSections, useWebConfig, useNavigations } from '../composables/states';

export default defineNuxtPlugin({
  name: 'utils',
  dependsOn: ['crud'],
  async setup() {
    const runtimeConfig = useRuntimeConfig();

    const translate = (langObj: Record<string, any> | string): string => {
      if (typeof langObj === 'object') return _.get(langObj, 'en', '');
      return langObj;
    };

    const renderSlug = (slug: { type?: string; slug?: string }): string => {
      if (slug) {
        if (slug.type) {
          const postTypeSlug = slug.type;
          if (postTypeSlug && slug.slug) return `${postTypeSlug}/${translate(slug.slug)}`;
        }
      }
      return '';
    };

    const renderPageTitle = (item: { customTitle?: string; data?: { title?: string } }): string | null => {
      if (item) {
        if (item.customTitle) return translate(item.customTitle);
        return translate(_.get(item, 'data.title', ''));
      }
      return null;
    };

    const renderPageLink = (item: { customUrl?: string; path?: string }): string | null => {
      if (item) {
        if (item.customUrl) return translate(item.customUrl);
        if (item.path) return `/${translate(item.path)}`;
      }
      return null;
    };

    const getNavigation = (position: string): any => {
      const useNavigation = useNavigations();
      let results = null;

      if (useNavigation) {
        const navigation = useNavigation.value.find((item: { position: string }) => item.position === position);
        if (navigation) results = navigation.menu;
      }

      return results;
    };

    const getWebConfig = async () => {
      const webConfig = useWebConfig();
      const { $crud } = useNuxtApp();
      webConfig.value = await $crud.GET_WEBCONFIG();
    };

    const getPageDetail = async () => {
      const { params, name } = useRoute();
      const { $crud } = useNuxtApp();
      const section = usePageSections();
      const pageDetail = usePageDetail();

      pageDetail.value = null;

      let getDetail = null;

      if (name === 'index') {
        getDetail = await $crud.HOMEPAGE();
      } else if (name === 'post-slug') {
        getDetail = await $crud.GET_SINGLE(params.slug as string);
      } else {
        getDetail = await $crud.GET_SINGLE(params.page as string);
      }

      section.value = getDetail?.components;
      pageDetail.value = getDetail;

      return getDetail;
    };

    const renderImagePath = (object: { path: string; filename: { webp: string } }): string => {
      if (object) {
        const path = [runtimeConfig.public.awsUrl, object.path, object.filename.webp];
        return path.join('/');
      }
      return '';
    };

    const headerMeta = () => {
      const pageDetail = usePageDetail();
      const metaDetail = pageDetail.value?.meta;
      const { name } = useRoute();
      if (name === 'thank-you')
        return {
          title: 'Thank you!',
        };

      if (!pageDetail)
        return {
          title: 'Not found!',
        };

      let title = translate(pageDetail.value?.title);
      const metaTitle = _.get(pageDetail.value, 'meta.title', '');
      const metaDescription = _.get(pageDetail.value, 'meta.description', '');
      const description = translate(metaDescription);
      const keyword = translate(_.get(pageDetail.value, 'meta.keyword', ''));
      const faviconImage = _.get({}, 'data.favicon', '');
      const noIndex = _.get(pageDetail.value, 'data.noindex', false);
      let favicon = '';
      if (faviconImage) favicon = renderImagePath(faviconImage);

      if (metaTitle) title = translate(metaTitle);

      const meta: Record<string, any> = {
        favicon,
        title,
        twitterCard: 'summary_large_image',
        charset: 'utf-8',
        keywords: keyword,
      };

      if (metaDetail) {
        if (title) meta.ogTitle = title;

        if (metaDescription) {
          meta.description = description;
          meta.ogDescription = description;
        }
        if (metaDetail?.image) meta.ogImage = renderImagePath(metaDetail?.image);
      }

      if (noIndex) meta.robot = 'noindex, nofollow';

      return meta;
    };

    return {
      provide: {
        utils: {
          translate,
          renderSlug,
          renderPageTitle,
          renderPageLink,
          getNavigation,
          getWebConfig,
          getPageDetail,
          renderImagePath,
          headerMeta,
        },
      },
    };
  },
});
