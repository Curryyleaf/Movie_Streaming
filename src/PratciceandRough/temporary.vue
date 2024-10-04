<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <input type="checkbox" id="remember" v-model="rememberMe" class="mr-2" />
            <label for="remember" class="text-gray-600">Remember Me</label>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account? <a href="#" class="text-blue-600 hover:underline">Sign up</a>
      </p>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Replace this with your TMDB authentication logic
        const response = await this.authenticateUser(this.username, this.password);
        if (response.success) {
          // Handle successful login (e.g., store session, redirect, etc.)
          alert('Login successful!');
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    },
    async authenticateUser(username, password) {
      // Placeholder for TMDB authentication logic
      // For example, you might want to call your API here
      // Simulating successful login for demonstration
      const usersDatabase = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
      ];
      const user = usersDatabase.find(user => user.username === username && user.password === password);
      return { success: !!user }; // Returns true if user is found
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
