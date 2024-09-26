<template>
  <div class="flex justify-center items-center min-h-screen  bg-black-100 p-4">
    <div class="bg-black rounded-lg shadow-lg text-white  p-8  sm:max-w-xs lg:w-[30%] sm:max-h-[80dvh] mx-auto" >
      <div class="flex justify-center sm:mb-2 mb-4">
        <Icon icon="cbi:movies-anywhere" width="4rem" height="4rem"  class="text-white"/>
      </div>

      <h2 class="text-3xl  font-bold text-center  text-white mb-6 sm:mb-2">Login</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col">
        <div class="mb-4 sm:mb-2">
          <label for="username" class="block text-md text-left text-gray-300 font-medium">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            @input="sanitizeInput"
            placeholder="Enter your username"
            class="mt-1 block w-full p-3 sm:p-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            required
          />
        </div>
        <div class="mb-4 sm:mb-2">
          <label for="password" class="block text-md text-left text-gray-300 font-medium">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @input="sanitizeInput"
            placeholder="Enter your password"
            class="mt-1 block w-full p-3 sm:p-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            required
          />
        </div>
        <div class="flex items-center sm:mb-2 mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
            class="mr-2 leading-tight text-green-400"
          />
          <label for="rememberMe" class="text-sm text-gray-400">Remember me</label>
        </div>
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #121212; 
}

input {
  background-color: #2c2c2c; 
  color: white; 
}

input::placeholder {
  color: #aaa; 
}
</style>


<script>
import axios from "axios";
import { Icon } from "@iconify/vue/dist/iconify.js";
export default {
  name: "LoginForm",
  components: { Icon },
  data() {
    return {
      rememberMe: false,
      username: "",
      password: "",
      csrfToken: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      //       const sanitizedUsername = this.sanitizeInput(this.username);
      // const sanitizedPassword = this.sanitizeInput(this.password);
      const usersCredential = [
        {
          username: import.meta.env.VITE_APP_USER1_USERNAME,
          password: import.meta.env.VITE_APP_USER1_PASSWORD,
        },
        {
          username: import.meta.env.VITE_APP_USER2_USERNAME,
          password: import.meta.env.VITE_APP_USER2_PASSWORD,
        },
        {
          username: import.meta.env.VITE_APP_USER_NAME,
          password: import.meta.env.VITE_APP_PASSWORD,
        },
      ];
      const user = usersCredential.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );

      console.log("PASSWORD DODNENDOEDNEINDE", usersCredential);

      if (!user) {
        this.error = "Invalid username or password.";
        return;
      }
      try {
        const response = await axios.get(
          `/authentication/token/new`,
        );
        console.log("responses", response);

        const requestToken = response.data.request_token;
        this.$cookies.set("requestToken", requestToken);
        // // Step 2: Redirect user to authorize the request token
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/`;

      } catch (error) {
        this.errorMessage =
          "An error occurred while creating the request token.";
      }
    },

    async createSession() {
      console.log("create session");

      try {
        const response = await axios.post(
          "/authentication/session/new",
          {
            request_token: this.$cookies.get("requestToken"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: import.meta.env.VITE_API_ACCESS_TOKEN,
            },
          }
        );
        const sessionId = response.data.session_id;
        this.$cookies.set("sessionId", sessionId);
        console.log("Session ID:", sessionId);
        return sessionId;
      } catch (error) {
        console.error("Error creating session:", error);
      }
    },
    async fetchCsrfToken() {
      try {
        const response = await axios.get("/csrf-token");
        this.csrfToken = response.data.csrfToken;
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    },

    sanitizeInput(value) {
      // Sanitize the input to avoid potential XSS attacks
      // you need to check if any maliciouis script is send through te input
      return String(value).replace(/[<>]/g, "");
      // you should have a CSP(cross site policy ) that checks any script , right now we are taking awau /<script>[]etc
      // for that you will need csp header like
      // Content-Security-Policy: script-src 'self' https://trusted.cdn.com;
      //  CSP enforceS such as restricting where scripts, images, or styles can be loaded from.
    },
  },
  mounted() {
    console.log('mountedd');
    
    const urlParams = new URLSearchParams(window.location.search);
    const approved = urlParams.get("approved");

    if (approved === "true") {
      console.log("url params", urlParams);

      this.createSession();
    } else {
      console.log("User did not approve the request.");
    }
  },
};
</script>

<style scoped>
</style>
