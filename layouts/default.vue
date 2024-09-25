<template>
  <div>
    <nav
      class="bg-[#121e31] h-screen fixed top-0 left-0 w-[250px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto"
    >
      <nuxt-link to="/">
        <div class="flex flex-wrap items-center cursor-pointer justify-center">
          <h1 class="text-white font-bold text-xl">MUSE</h1>
        </div>
      </nuxt-link>

      <hr class="my-6 border-gray-400" />

      <ul class="space-y-6">
        <div>
          <li>
            <NuxtLink
              to="/"
              class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
            >
              <span>Home</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/search"
              class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
            >
              <span>Search</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/library"
              class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
            >
              <span>Library</span>
            </NuxtLink>
          </li>
        </div>

        <div>
          <li>
            <NuxtLink
              to="/createdplaylist"
              class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
            >
              <span>Create Playlist</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/likedsongs"
              class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
            >
              <span>Liked Songs</span>
            </NuxtLink>
          </li>
        </div>
      </ul>
    </nav>
    <!-- Output the page content -->
    <div class="ml-[250px]">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.router-link-exact-active {
  color: #12b488;
  font-weight: 900;
  font-size: medium;
}
</style>
