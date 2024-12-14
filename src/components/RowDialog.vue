<template>
  <div id="qr-wrapper" class="flex flex-row justify-center bg-slate-100" :class="configClass">
      <Col
        v-for="(col, idx) in qr"
        :key="idx"
        :col="col"
        :isConfig="isConfig"
      />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Col from './Col.vue'

import { QrCodeType } from '../utils/QrCode.ts';

const props = defineProps<{
  qr: QrCodeType
  isConfig: boolean
}>()

const configClass = computed(() => {
  return props.isConfig ? 'gap-[2px]' : 'gap-[0px]'
})
</script>

<style scoped></style>
