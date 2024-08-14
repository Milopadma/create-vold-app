// import { v1 as uuidv4 } from 'uuid';
// import cloneDeep from 'lodash/cloneDeep';
// import get from 'lodash/get';
import { defineAsyncComponent } from 'vue';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin({
  name: 'plugin-editor',
  async setup() {
    return {
      provide: {
        createComponent: (id: string) => defineAsyncComponent(() => import(`~/components/${id}/${id}.vue`)),
      },
    };
  },
});
