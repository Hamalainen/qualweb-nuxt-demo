<script setup lang="ts">
import { onMounted } from "vue";

const loading = ref(false);
const evaluateData = ref();
const showAct = ref(false);
const showWcag = ref(false);
const showBp = ref(false);
const url = history.state.url;
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
const handleAct = () => {
  showAct.value = !showAct.value;
};
const handleWcag = () => {
  showWcag.value = !showWcag.value;
};
const handleBp = () => {
  showBp.value = !showBp.value;
};
const generateEarl = async () => {
  const result = await $fetch("/api/generateearl", {
    method: "post",
    body: { reports: evaluateData.value },
  });

  var a = document.createElement("a");
  var json = JSON.stringify(result.reports, null, 4)
  const blob = new Blob([json], { type: "octet/stream" }),
    downloadUrl = window.URL.createObjectURL(blob);
  a.href = downloadUrl;
  a.download = `${url}.json`;
  a.click();
};
</script>

<template>
  <main class="flex flex-col gap-8 justify-center" v-if="evaluateData">
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
    <div>
      <div class="flex flex-row justify-between mb-4">
        <h2 class="text-3xl mb-4">Evaluation report</h2>
        <button class="bg-slate-200 text-slate-900 p-4" @click="generateEarl">Generate EARL report</button>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-slate-600 p-4">
          <button class="w-full" @click="handleAct">
            <h3 class="text-3xl mb-4">ACT rules</h3>
          </button>

          <RuleEvaluateComponent
            v-if="showAct"
            :rules="evaluateData.modules[`act-rules`]"
          />
        </div>

        <div class="bg-slate-600 p-4">
          <button class="w-full" @click="handleWcag">
            <h3 class="text-3xl mb-4">WCAG techniques</h3>
          </button>

          <RuleEvaluateComponent
            v-if="showWcag"
            :rules="evaluateData.modules[`wcag-techniques`]"
          />
        </div>

        <div class="bg-slate-600 p-4">
          <button class="w-full" @click="handleBp">
            <h3 class="text-3xl mb-4">Best practices</h3>
          </button>

          <RuleEvaluateComponent
            v-if="showBp"
            :rules="evaluateData.modules[`best-practices`]"
          />
        </div>
      </div>
    </div>
  </main>
</template>
