
import VueCookies from "vue-cookies";

const authService = {
  getAccessToken() {
    return VueCookies.get("accessToken"); 
  },

  clearAccessToken() {
    VueCookies.remove("accessToken"); 
  },


};

export default authService;
