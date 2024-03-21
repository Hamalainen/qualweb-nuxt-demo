<script setup lang="ts">
const url = ref("");
const loading = ref(false);
const crawldata = ref([]);
const crawlUrl = async () => {
  loading.value = true;
  crawldata.value = await $fetch("/api/urlcrawl?domain=" + url.value);
  loading.value = false;
};
</script>

<template>
  <main class="flex flex-col gap-8 justify-center">
    <div class="flex flex-row justify-center">
      <form class="flex flex-col gap-4 text-lg text-center w-72">
        <label class="" for="urlInput">input url to crawl</label>
        <input
          class="h-10 p-4 text-slate-900"
          id="urlInput"
          type="url"
          v-model="url"
        />
        <button
          class="bg-slate-900 p-4"
          :disabled="loading"
          @click.prevent="crawlUrl"
          type="submit"
        >
          Crawl
        </button>
      </form>
    </div>
    <div class="flex flex-row justify-center">
      <ul>
        <li
          v-for="url in crawldata"
          class="p-2 hover:cursor-pointer hover:bg-slate-600"
        >
          <NuxtLink :to="{ name: 'evaluate', state: { url } }">{{
            url
          }}</NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
