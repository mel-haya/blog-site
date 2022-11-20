import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/dashboard"
      // component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/post/create",
      name: "create-post",
      component: () => import("../views/CreatePostView.vue"),
    },
    {
      path: "/post/edit/:id",
      name: "edit-post",
      component: () => import("../views/CreatePostView.vue"),
    }, 
    {
      path: "/post/edit-videos",
      name: "edit-videos",
      component: () => import("../views/EditVideosView.vue"),
    },
    {
      path: "/post/:id",
      name: "view-post",
      component: () => import("../views/ShowPostView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    }
  ],
});

export default router;
