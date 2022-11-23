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
      path: "/verifyEmail",
      name: "verifyEmail",
      component: () => import("../views/VerifyEmailView.vue"),
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
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
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

// import { getUser } from "@/firebase";

// router.beforeEach((to, from, next) => {
//   try{
//     let u = getUser();
//     if (to.name !== "login") {
//       console.log(u)
//       if(!u){
//         return router.push("/login");
//       }
//     }
//     next();
//   }  
//   catch(error){
//     console.log(error);
//   }
//   // let u = getUser();
//   // if (to.name !== "login" && !u) {
//   //   return "/login";
//   // }
//   // return false
// })

export default router;
