import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import { nextTick } from "vue"; 

import Login from "../views/TheLogin.vue";
import Home from "../views/TheHome.vue";
import Cookies from "vue-cookies"; 
import CelebSingleProfile from "../views/HeroCelebCarosoulSingle.vue";
import MovieDetail from "../views/HeroMovieDetail.vue";
import WatchList from "../views/TheWatchList.vue";
import MenuTopMovies from "../views/Menu/MenuTopMovies.vue";
import MenuMostPopularMovies from "../views/Menu/MenuMostPopularMovies.vue";
import { movie } from './../data/MenuData';
import MenuMovieList from "../views/Menu/MenuMovieList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/Top250Movies",
    name: "Top250Movies",
    component: MenuTopMovies,
    meta: { requiresAuth: true },
  },
  {
    path: "/mostPopularMovies",
    name: "MostPopularMovies",
    component: MenuMostPopularMovies,
    meta: { requiresAuth: true },
  },
  {
    path: "/movie/:apiEnd",
    name: "MenuMovieList",
    component: MenuMovieList,
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
  scrollBehavior(to, from, savedPosition) {
      console.log("scrollBehavior is happening before router");
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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
})


router.afterEach(() => {
  console.log('scrollBehavior is happening before router');
  
  nextTick(() => {
    window.scrollTo(0, 0); 
  }  ,100);
});

export default router;
