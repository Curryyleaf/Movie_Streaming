import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/TheLogin.vue";
import Home from "../views/LandingPage.vue";
import Cookies from "vue-cookies"; 
import CelebSingleProfile from "../views/CelebProfilesSingle.vue";
import MovieDetail from "../views/MovieDetails.vue";
import WatchList from "../views/WatchList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/watchList",
    name: "WatchList",
    component: WatchList,
    meta: { requiresAuth: true },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavbar: true },
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
    props: true,
  },
  {
    path: "/celebSingle",
    name: "CelebSingleProfile",
    component: CelebSingleProfile,
    meta: { requiresAuth: true },
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
