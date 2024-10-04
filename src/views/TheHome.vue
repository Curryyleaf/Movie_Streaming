<template>
   
  <section class=" bg-black overflow-clip w-full  m-0 p-0  box-border">
    <header class=" box-border w-full mx-0 px-0">
   </header >
   <main class="w-full box-border   pl-4 pr-2 p-0">
       <Hero></Hero>
     <CelebList></CelebList>
    </main>
    <footer>
      
      <!-- what is intersection observer ? isIntersecting ? observer.unobserve? -->

    </footer>
  </section>
</template>

<script>
import { useAppStore } from '../store/AppStore.js';
import Hero from '../views/TheHero.vue';
import CelebList from './Hero/HeroCelebCarosoul.vue';

export default {
  components:{ Hero , CelebList} ,
  name: 'App',
  methods:{
  async  fetch(){
  const store=useAppStore()
    await store.fetchMovies()
    } ,
  } ,
 async created(){
  await this.fetch()

  }
}
</script>

<style>
</style>


<!-- When cloning a complex platform like IMDb, it's crucial to adopt strategies that enhance development speed, minimize errors, and ensure a successful implementation. Here’s a detailed guide to help you streamline the process:

### 1. **Planning and Design**

**1.1. Define Requirements Clearly:**
   - **Feature Set:** Document all features you want to clone, including both core and additional features.
   - **User Stories:** Create user stories to understand how users will interact with the platform.

**1.2. Design a Robust Architecture:**
   - **Frontend and Backend Separation:** Design a clear separation between frontend and backend for scalability and maintainability.
   - **Database Schema:** Plan your database schema to accommodate user data, movie details, reviews, and other content.

**1.3. Create Wireframes and Mockups:**
   - **UI/UX Design:** Design wireframes and mockups for all major pages and components.
   - **User Flows:** Map out user flows to ensure a smooth user experience.

### 2. **Speeding Up Development**

**2.1. Use Modern Tools and Frameworks:**
   - **Vite:** Leverage Vite for fast build times and a seamless development experience.
   - **Vue.js:** Utilize Vue's Options API or Composition API effectively to manage state and components.
   - **Tailwind CSS:** Use Tailwind for rapid styling and consistency.

**2.2. Component Reusability:**
   - **Modular Components:** Build reusable components to avoid redundant code and facilitate maintenance.
   - **Library Utilization:** Use existing libraries or components for common functionality (e.g., date pickers, modals).

**2.3. Implement Agile Practices:**
   - **Incremental Development:** Develop features incrementally and release in smaller, manageable chunks.
   - **Regular Reviews:** Conduct regular code reviews and sprint reviews to identify issues early.

**2.4. Automate Repetitive Tasks:**
   - **CI/CD Pipelines:** Set up continuous integration and deployment pipelines to automate testing and deployment.
   - **Code Generators:** Use code generators or scaffolding tools to quickly set up components and routes.

**2.5. Prioritize MVP (Minimum Viable Product):**
   - **Focus on Essentials:** Build a minimum viable product first to validate core functionalities.
   - **Iterative Improvements:** Enhance the platform iteratively based on user feedback.

### 3. **Minimizing Errors**

**3.1. Implement Comprehensive Testing:**
   - **Unit Testing:** Write unit tests for individual components and functions.
   - **Integration Testing:** Test interactions between components and services.
   - **End-to-End Testing:** Use tools like Cypress or Selenium to simulate user interactions and test complete workflows.

**3.2. Use Static Analysis Tools:**
   - **Linters:** Use linters (e.g., ESLint) to enforce coding standards and catch errors early.
   - **Type Checking:** Implement type checking (e.g., TypeScript) to reduce runtime errors.

**3.3. Error Handling and Logging:**
   - **Error Boundaries:** Implement error boundaries in Vue to catch and handle errors gracefully.
   - **Logging:** Use logging tools to track errors and monitor application health.

**3.4. Review and Refactor Code:**
   - **Code Reviews:** Conduct regular code reviews to catch issues and ensure code quality.
   - **Refactoring:** Continuously refactor code to improve readability and maintainability.

**3.5. Keep Dependencies Updated:**
   - **Security Updates:** Regularly update dependencies to include the latest security patches and improvements.
   - **Compatibility:** Ensure that updated dependencies are compatible with your project.

### 4. **Optimizing Performance**

**4.1. Optimize API Calls:**
   - **Caching:** Implement caching strategies to reduce redundant API calls and improve performance.
   - **Lazy Loading:** Use lazy loading for images and components to enhance initial load times.

**4.2. Optimize Asset Loading:**
   - **Minification:** Minify CSS and JavaScript files to reduce load times.
   - **Compression:** Use gzip or Brotli compression to minimize the size of assets transmitted over the network.

**4.3. Monitor Performance:**
   - **Performance Tools:** Use performance monitoring tools (e.g., Google Lighthouse) to analyze and optimize performance.
   - **User Analytics:** Track user interactions and performance metrics to identify bottlenecks.

### 5. **Documentation and Knowledge Sharing**

**5.1. Maintain Documentation:**
   - **Code Documentation:** Document your codebase, including functions, components, and API endpoints.
   - **User Guides:** Provide user guides and onboarding documentation for end-users.

**5.2. Share Knowledge:**
   - **Team Collaboration:** Share knowledge and best practices within your team to avoid common pitfalls.
   - **Community Involvement:** Engage with developer communities and forums for additional insights and support.

By adopting these strategies, you can streamline the development process, reduce errors, and efficiently build your movie streaming and review platform. -->
