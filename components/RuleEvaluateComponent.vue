<script setup lang="ts">
const prop = defineProps(["rules"]);
</script>
<template>
  <div class="mb-4" v-for="rule in prop.rules.assertions">
    <div class="bg-slate-800 p-4" v-if="rule.results.length > 0">
      <div class="flex flex-row justify-between">
        <h4 class="text-2xl">{{ rule.name }}</h4>
        <p class="text-2xl">{{ rule.code.substring(3) }}</p>
      </div>

      <div>
        <div class="flex flex-col gap-4">
          <div>
            <p>Description</p>
            <p>{{ rule.description }}</p>
            <p class="break-words">{{ rule.metadata.url }}</p>
          </div>

          <p>Target element {{ rule.metadata.target.element }}</p>
          <p v-if="rule.metadata.target.attributes">
            Target attributes {{ rule.metadata.target.attributes }}
          </p>
        </div>

        <h4
          v-if="rule.metadata[`success-criteria`] && rule.metadata[`success-criteria`].length > 0"
          class="text-2xl mt-4"
        >
          Success criteria
        </h4>
        <ul>
          <li v-for="criteria in rule.metadata[`success-criteria`]">
            <p>
              {{ criteria.name }} - {{ criteria.principle }} Level
              {{ criteria.level }}
            </p>
          </li>
        </ul>
        <div class="p-8">
          <h4 class="text-2xl">Results</h4>
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
              <h5 class="text-xl">{{ result.description }}</h5>
              <div v-if="result.elements[0]">
                 <p class="bg-slate-700 break-words">
                {{ result.elements[0].htmlCode.substring(0, 200) }}
              </p>
              <p>{{ result.elements[0].pointer }}</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
