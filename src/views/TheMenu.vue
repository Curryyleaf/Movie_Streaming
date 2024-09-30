<template>
  <section class="w-full bg-black flex  h-full text-white box-border  z-50 p-12">
    <!-- movie section -->
    <Sidebar  :menuItems="movieItems" title="Movie">
      <template v-slot:icon>
        <Icon icon="arcticons:google-movies" width="48" height="48" />
      </template>
    </Sidebar>
    <Sidebar  :menuItems="tvItems" title="TV Shows">
      <template v-slot:icon>
      <Icon icon="mdi-light:television" width="48" height="48" />
      </template>
    </Sidebar>
    <Sidebar :menuItems="celebItems" title="Celebrities">
      <template v-slot:icon>
      <Icon icon="healthicons:people" width="48" height="48" />
      </template>
    </Sidebar>
    <Sidebar  :menuItems="communityItems" title="Community">
      <template v-slot:icon>
   <Icon icon="material-symbols-light:globe" width="48" height="48" />
      </template>
    </Sidebar>
    <Sidebar  :menuItems="awardsItems" title="Awards">
      <template v-slot:icon>
      <Icon icon="f7:star-circle-fill" width="48" height="48" />
      </template>
    </Sidebar>
    <Sidebar  :menuItems="reviewItems" title="Review">
      <template v-slot:icon>
      <Icon icon="f7:star-circle-fill" width="48" height="48" />
      </template>
    </Sidebar>

    <Icon
      icon="ant-design:close-circle-filled"
      width="48"
      height="48"
      class="text-white flex-grow hover:cursor-pointer"
      @click="closeCategories"
    />
  </section>
</template>

<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import Sidebar from "../components/AppSideModal.vue";
export default {
  components: { Sidebar, Icon },
  data() {
    return {
      movieItems: [
        { anchorText: "Now Playing", routeName: "NowPlaying" },
        { anchorText: "Popular Movies", routeName: "PopularMovies" },
        { anchorText: "Top Rated Movies", routeName: "TopRatedMovies" },
        { anchorText: "Upcoming Movies", routeName: "UpcomingMovies" },
        { anchorText: "Action Movies", routeName: "ActionMovies" },
        { anchorText: "Comedy Movies", routeName: "ComedyMovies" },
        { anchorText: "Drama Movies", routeName: "DramaMovies" },
        { anchorText: "Horror Movies", routeName: "HorrorMovies" },
        { anchorText: "Romance Movies", routeName: "RomanceMovies" },
        { anchorText: "Science Fiction Movies", routeName: "SciFiMovies" },
        { anchorText: "Top 100 Movies", routeName: "Top100Movies" },
        { anchorText: "Award Winning Movies", routeName: "AwardWinningMovies" },
      ],
      tvItems: [
        { anchorText: "Current TV Shows", routeName: "CurrentTVShows" },
        { anchorText: "Popular TV Shows", routeName: "PopularTVShows" },
        { anchorText: "Top Rated TV Shows", routeName: "TopRatedTVShows" },
        { anchorText: "New Releases", routeName: "NewTVReleases" },
        { anchorText: "Action TV Shows", routeName: "ActionTVShows" },
        { anchorText: "Comedy TV Shows", routeName: "ComedyTVShows" },
        { anchorText: "Drama TV Shows", routeName: "DramaTVShows" },
        { anchorText: "Sci-Fi TV Shows", routeName: "SciFiTVShows" },
        { anchorText: "Reality Shows", routeName: "RealityShows" },
        { anchorText: "Animated Series", routeName: "AnimatedSeries" },
        { anchorText: "Top 250 TV Shows", routeName: "Top250TVShows" },
      ],
      celebItems: [
        { anchorText: "Popular People", routeName: "PopularPeople" },
        { anchorText: "Celebrity News", routeName: "CelebrityNews" },
        {
          anchorText: "Upcoming Celebrities",
          routeName: "UpcomingCelebrities",
        },
        { anchorText: "Top Actors", routeName: "TopActors" },
        { anchorText: "Top Actresses", routeName: "TopActresses" },
        { anchorText: "Celebrity Profiles", routeName: "CelebrityProfiles" },
        {
          anchorText: "Most Followed Celebrities",
          routeName: "MostFollowedCelebrities",
        },
        {
          anchorText: "Celebrities with the Most Oscars",
          routeName: "CelebritiesWithMostOscars",
        },
        {
          anchorText: "Celebrities with the Most Golden Globes",
          routeName: "CelebritiesWithMostGoldenGlobes",
        },
        { anchorText: "Rising Stars", routeName: "RisingStars" },
        { anchorText: "Celebrity Birthdays", routeName: "CelebrityBirthdays" },
        { anchorText: "Celebrity Quotes", routeName: "CelebrityQuotes" },
        { anchorText: "Celebrity Couples", routeName: "CelebrityCouples" },
        {
          anchorText: "Hollywood Walk of Fame",
          routeName: "HollywoodWalkOfFame",
        },
      ],
      communityItems: [
        { anchorText: "Community", routeName: "Community" },
        { anchorText: "Forums", routeName: "Forums" },
        { anchorText: "User Reviews", routeName: "UserReviews" },
      ],
      awardsItems: [
        { anchorText: "Awards", routeName: "Awards" },
        { anchorText: "Nominees", routeName: "Nominees" },
        { anchorText: "Winners", routeName: "Winners" },
      ],
      reviewItems: [
        { anchorText: "Best Review", routeName: "Awards" },
        { anchorText: "Most Review", routeName: "Nominees" },
        { anchorText: "Worst Review", routeName: "Winners" },
      ],
    };
  },
  methods:{
    closeCategories() {
      this.$emit('closeModal');
    },
  }
};
</script>

<style>
</style>
