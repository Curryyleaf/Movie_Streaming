import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";
import Cookies from "vue-cookies"; 
import CelebSingleProfile from "../views/CelebSingleProfile.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: LandingPage,
    meta: { requiresAuth: true },
    children: [],
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavbar: true },
  },
  {
    path: "/celebSingle",
    name: "CelebSingleProfile",
    component: CelebSingleProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("requestToken");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
