<template>
  <div class="mt-5">
    <ElTabs v-model="activeTab" type="border-card">
      <ElTabPane label="Manual" name="manual">
        <Manual />
      </ElTabPane>
      <ElTabPane label="Auto" name="auto" disabled>
        $$$
      </ElTabPane>
      </ElTabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import Manual from './tabs/Manual.vue'

const activeTab = ref('manual')
</script>
<style lang="scss" scoped></style>
