import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/home') {
    return navigateTo('/', { redirectCode: 301 });
  }
});
