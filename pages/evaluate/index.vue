<script setup lang="ts">
import { onMounted } from "vue";

const loading = ref(false);
const evaluateData = ref();

onMounted(async () => {
  loading.value = true;
  const url = history.state.url;
  evaluateData.value = await $fetch(
    `/api/evaluate?url=${history.state.url}`
  ).then((res) => {
    return res[url];
  });
  console.log(evaluateData.value);
  loading.value = false;
});
</script>

<template>
  <main class="flex flex-row justify-center">
    <div class="flex flex-col gap-8 justify-center" v-if="evaluateData">
      <h1 class="text-4xl">Summary</h1>
      <p>{{ evaluateData.system.url.completeUrl }}</p>
      <div>
        <p>
          {{
            evaluateData.metadata.passed +
            evaluateData.metadata.failed +
            evaluateData.metadata.warning +
            evaluateData.metadata.inapplicable
          }}
          tested rules
        </p>
        <div class="flex flex-row gap-8">
          <p>passed {{ evaluateData.metadata.passed }}</p>
          <p>failed {{ evaluateData.metadata.failed }}</p>
          <p>warning {{ evaluateData.metadata.warning }}</p>
          <p>inapplicable {{ evaluateData.metadata.inapplicable }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl">Evaluation report</h2>
        <div v-for="rule in evaluateData.modules[`act-rules`].assertions">
          <div class="bg-slate-800 p-4" v-if="rule.results.length > 0">
            <div class="flex flex-row justify-between">
              <h3 class="text-2xl">{{ rule.name }}</h3>
              <p class="text-2xl">{{ rule.code.substring(3) }}</p>
            </div>

            <div>
              <div class="flex flex-col gap-4">
                <div>
                  <p>Description</p>
                  <p>{{ rule.description }}</p>
                  <p>{{ rule.metadata.url }}</p>
                </div>

                <p>Target element {{ rule.metadata.target.element }}</p>
                <p v-if="rule.metadata.target.attributes">
                  Target attributes {{ rule.metadata.target.attributes }}
                </p>
              </div>

              <h3
                v-if="rule.metadata[`success-criteria`].length > 0"
                class="text-2xl mt-4"
              >
                Success criteria
              </h3>
              <ul>
                <li v-for="criteria in rule.metadata[`success-criteria`]">
                  <p>
                    {{ criteria.name }} - {{ criteria.principle }} Level
                    {{ criteria.level }}
                  </p>
                </li>
              </ul>
              <div class="p-8">
                <h3 class="text-2xl">Results</h3>
                <p v-if="rule.metadata.passed">
                  Passed {{ rule.metadata.passed }} results
                </p>
                <p v-if="rule.metadata.failed">
                  Failed {{ rule.metadata.failed }} results
                </p>
                <p v-if="rule.metadata.warning">
                  Warning {{ rule.metadata.warning }} results
                </p>
                <p v-if="rule.metadata.inapplicable">
                  Inapplicable {{ rule.metadata.inapplicable }} results
                </p>
                <div class="p-4 h-72 overflow-auto flex flex-col gap-4 border">
                  <div
                    class="border p-4 flex flex-col gap-2"
                    v-for="result in rule.results"
                  >
                    <h4 class="text-xl">{{ result.description }}</h4>
                    <pre class="bg-slate-700">{{
                      result.elements[0].htmlCode.substring(0, 100)
                    }}</pre>
                    <p>{{ result.elements[0].pointer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
