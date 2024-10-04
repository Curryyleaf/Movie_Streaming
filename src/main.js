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
import VueLazyload from "vue-lazyload";
import "./assets/tailwind.css";
import "./style.css";

const app = createApp(App);
const pinia = createPinia()
library.add(
  faBars,
  faCaretDown,
  faMagnifyingGlass,
  faBookmark,
  faSortDown,
  faCirclePlay ,
  faPlus
);
app.use(router);
app.use(pinia)
app.use(VueCookies)
app.use(VueLazyload)
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
