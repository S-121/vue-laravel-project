import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";
import store from '@/store/store'
import { Role } from "./views/role";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      redirect: "/fulllogin",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "StarterPage",
          path: "/admin/starterpage",
          component: () => import("@/views/StarterPage"),
          meta: {
            authRequired: true,
            authorize: [Role.Admin],
          }
        },
      ],
    },
    {
      name: "Error",
      path: "/error",
      component: () => import("@/views/authentication/Error"),
    },
    {
      name: "FullLogin",
      path: "/fulllogin",
      component: () => import("@/views/authentication/FullLogin"),
      meta: {
        beforeResolve(routeTo, routeFrom, next) {
          // If the user is already logged in
          if (store.getters['auth/loggedIn']) {
            // Redirect to the home page instead
            next({ name: 'StarterPage' })
          } else {
            // Continue to the login page
            next()
          }
        },
      },
    },
    {
      name: "FullRegister",
      path: "/fullregister",
      component: () => import("@/views/authentication/FullRegister"),
      meta: {
        beforeResolve(routeTo, routeFrom, next) {
          // If the user is already logged in
          if (store.getters['auth/loggedIn']) {
            // Redirect to the home page instead
            next({ name: 'StarterPage' })
          } else {
            // Continue to the login page
            next()
          }
        },
      },
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {
        authRequired: true,
        // authorize: [Role.Admin],
        beforeResolve(routeTo, routeFrom, next) {
          store.dispatch('auth/logOut')
          const authRequiredOnPreviousRoute = routeFrom.matched.some(
            (route) => route.push('/fulllogin')
          )
          // Navigate back to previous page, or home as a fallback
          next(authRequiredOnPreviousRoute ? { name: 'StarterPage' } : { ...routeFrom })
        },
      },
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
