<template>
  <section class="relative w-full pt-2 box-border flex flex-row">
    <main class="h-[530px]overflow-clip flex w-full">
      <!-- Hero Image Section -->

      <div class="h-full w-[75%] relative bg-black overflow-hidden">
        <!-- poster image -->
        <div
          class="flex items-center absolute h-full top-0 bottom-0 left-0 right-0 justify-center text-white z-10 bg-gradient-to-t from-black via-20% to-transparent"
        >
          <!-- left overlay image -->
          <div class="absolute flex-col bottom-0 pl-9 w-full">
            <div class="relative box-border flex bottom-0 w-1/5 left-5">
              <img
                :src="`https://image.tmdb.org/t/p/original${currentImage.poster_path}`"
                alt="poster"
                class="object-center transition duration-200 ease-in-out object-contain"
              />
              <p class="text-black">{{ currentImage }}</p>
              <!-- <img
                :src="`https://image.tmdb.org/t/p/original${nextImage.poster_path}`"
                alt="poster"
                class="object-center absolute top-0 right-0 left-0 bottom-0 transition duration-200 ease-in-out object-contain"
                @load="changeImage"
              /> -->
              <font-awesome-icon
                :icon="['fas', 'plus']"
                class="absolute text-lg top-[5%] text-white left-[4%]"
              />
              <font-awesome-icon
                :icon="['far', 'bookmark']"
                size="3x"
                class="top-0 left-0 text-white absolute opacity-50"
              />
            </div>

            <!-- right movie title and play section -->
            <div
              class="h-32 flex pl-16 flex-row absolute bottom-0 right-0 w-4/5"
            >
              <font-awesome-icon
                class="text-7xl p-2 text-gray-300"
                :icon="['far', 'circle-play']"
              />

              <div class="text-left">
                <h1 class="tracking-wide text-white font-sans text-5xl">
                  {{ currentImage.title }}
                </h1>
                <p class="p-1">{{ currentImage.vote_average }}</p>
                <div class="flex pl-1">
                  <Icon
                    icon="mdi:thumbs-up-outline"
                    width="24"
                    height="24"
                    class="pr-1"
                  />{{ currentImage.vote_count }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- main poster image section  -->
        <div class="relative">
          <img
            v-show="isCurrentVisible"
            :src="`https://image.tmdb.org/t/p/original${currentImage.backdrop_path}`"
            alt="Hero Background"
            class="w-full h-full transition-opacity duration-1000 ease-in-out object-center object-cover"
          />
          <img
            v-show="!isCurrentVisible"
            :src="`https://image.tmdb.org/t/p/original${nextImage.backdrop_path}`"
            alt="Hero Background"
            class="w-full h-full transition-opacity duration-1000 ease-in-out absolute top-0 right-0 left-0 bottom-0 object-center object-cover"
            @load="onImageLoad"
          />
        </div>
      </div>

      <!-- Up Next Section -->
      <div
        class="flex-1 h-full overflow-clip bg-black box-border pt-2 text-white px-2"
      >
        <div class="w-full">
          <p
            class="text-xl pl-2 pb-2 rounded-lg whitespace-nowrap w-1/2 text-left font-bold text-white"
          >
            Up next
          </p>
        </div>

        <!-- up next inner main div section -->
        <div
          class="container bg-gradient-to-t pt-1 pl-1 mt-3 from-black from-40% to-black-200"
        >
          <div
            v-for="image in upNextImages"
            :key="image.id"
            class="h-max rounded-lg w-full"
          >
            <div class="w-full flex p-2 items-center">
              <img
                :src="`https://image.tmdb.org/t/p/original${image.backdrop_path}`"
                alt="Thumbnail"
                class="w-20 h-28 transition duration-200 ease-in-out object-center object-cover"
              />
              <div class="ml-2">
                <h1 class="text-lg">Movie Title</h1>
                <p class="text-sm">Short description of the movie.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>