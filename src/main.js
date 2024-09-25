import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueCookies from "vue-cookies";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCaretDown,
  faMagnifyingGlass,
  faSortDown,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark  , faCirclePlay} from "@fortawesome/free-regular-svg-icons";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import "./style.css";

const app = createApp(App);
const pinia = createPinia()
// Add icons to the library
library.add(
  faBars,
  faCaretDown,
  faMagnifyingGlass,
  faBookmark,
  faSortDown,
  faCirclePlay ,
  faPlus
);
// Use the router
app.use(router);
app.use(pinia)
app.use(VueCookies)
app.component("font-awesome-icon", FontAwesomeIcon);
// Mount the app
app.mount("#app");
