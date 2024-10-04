
<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="form.username"
          id="username"
          @input="sanitizeInput('username')"
          required
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          v-model="form.password"
          id="password"
          @input="sanitizeInput('password')"
          required
        />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      csrfToken: "", // CSRF token will be fetched and added
      error: null,
    };
  },
  mounted() {
    this.fetchCsrfToken();
  },
  methods: {
    sanitizeInput(field) {
      // Sanitize the input to avoid potential XSS attacks
      // you need to check if any maliciouis script is send through te input 
      this.form[field] = this.form[field].replace(/[<>]/g, "");
      // you should have a CSP(cross site policy ) that checks any script , right now we are taking awau /<>[]etc
      // for that you will need csp header like 
      // Content-Security-Policy: script-src 'self' https://trusted.cdn.com;
//  CSP enforceS such as restricting where scripts, images, or styles can be loaded from.
    },

    async fetchCsrfToken() {
      try {
        // Assuming CSRF token is available from an API or meta tag
        const response = await axios.get("/csrf-token");
        this.csrfToken = response.data.csrfToken;
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    },

    async login() {
      try {
        const response = await axios.post(
          "/api/login",
          {
            username: this.form.username,
            password: this.form.password,
          },
          {
            headers: {
              "X-CSRF-TOKEN": this.csrfToken, // CSRF protection
            },
            withCredentials: true, // SameSite cookies: Allows axios to send cookies for the domain
          }
        );
        if (response.data.success) {
          // Handle successful login
          alert("Login successful!");
        } else {
          this.error = "Invalid credentials";
        }
      } catch (error) {
        console.error("Login failed", error);
        this.error = "Login failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.error {
  color: red;
}
</style> 



<!-- When implementing authentication and authorization in a frontend application, several security measures can enhance protection. Here’s a comprehensive list of front-end security practices you might consider:

1. **Input Validation and Sanitization**: Validate and sanitize user inputs to prevent injection attacks and ensure data integrity.

2. **CSRF Protection**: Use Cross-Site Request Forgery (CSRF) tokens to protect against unauthorized requests on behalf of authenticated users.

3. **XSS Prevention**: Sanitize user inputs and escape output to prevent Cross-Site Scripting (XSS) attacks. Employ content security policies (CSP) to mitigate XSS risks.

4. **Secure Cookies**: Use secure and HttpOnly flags for cookies to prevent access from client-side scripts and ensure cookies are transmitted over HTTPS.

5. **HTTPS**: Ensure all communications between the client and server are encrypted using HTTPS.

6. **Session Management**: Implement proper session management, including expiration and renewal policies, to prevent session fixation and hijacking.

7. **Rate Limiting**: Implement rate limiting to prevent brute-force attacks on authentication endpoints.

8. **OAuth and OpenID Connect**: Use OAuth for authorization and OpenID Connect for authentication to leverage established security standards.

9. **Secure Token Storage**: Store authentication tokens securely, avoiding local storage when possible. Consider using secure storage solutions or in-memory storage.

10. **Password Hashing**: Ensure passwords are hashed and salted server-side before storage, and enforce strong password policies.

12. **Content Security Policy (CSP)**: Implement CSP headers to restrict the sources from which content can be loaded, mitigating the risk of XSS and data injection.

13. **Cross-Origin Resource Sharing (CORS)**: Configure CORS policies correctly to control which domains can interact with your server.

15. **Security Headers**: Implement security headers such as X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security to protect against common vulnerabilities.

16. **Multi-Factor Authentication (MFA)**: Implement MFA to add an extra layer of security beyond just passwords.

. -->


<!-- 
### 9. **Use Security Libraries and Frameworks**
- **Established Libraries**: Use well-known libraries and frameworks for authentication (e.g., Passport.js, Auth0) that follow security best practices.
. -->
<!-- 
 Use Vue’s built-in `v-bind` and `{{}}` for safe rendering, which automatically escapes the output.
### 4. **Authorization**
   - **Role-Based Access Control (RBAC)**: Implement RBAC for controlling what users can do based on their roles (e.g., admin, user). Store user roles securely in the JWT and ensure they are verified on the server side.
   - **Route Guards**: Use Vue Router’s `beforeEnter` or global navigation guards to protect routes and check user roles/permissions before granting access to specific pages.
   - **Server-Side Authorization**: Ensure that sensitive logic is enforced on the server. Even though you might control access to specific routes or UI elements on the client-side, the backend must also enforce permission checks.


### 6. **Avoiding Injection Attacks**
   - **Parameterized Queries**: When making requests to the server, always use parameterized queries (in SQL or MongoDB) to avoid SQL or NoSQL injection attacks.
   - **Avoid Eval**: Avoid using `eval()` or dynamically executing code based on user input, as it opens up the risk of code injection.

### 7. **Handling Session Hijacking and Replay Attacks**
   - **Invalidate Old Sessions**: Implement mechanisms to invalidate old tokens when a user logs out or changes their password.
   - **Token Binding**: Consider binding tokens to specific client-side attributes like IP or User-Agent to prevent token replay attacks. This would make tokens unusable if stolen by an attacker from a different environment.
   

