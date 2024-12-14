<template>
  <div
    class="flex flex-col gap-[0px]"
    :class="configClass"
  >
    <QrBox
      v-for="(box, index) in col"
      :key="index"
      :colNum="box.y"
      :rowNum="box.x"
      :isBlack="box.isBlackDot"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QrBox from './QrBox.vue'
import { QrDotType } from '../utils/QrCode.ts';

const props = defineProps<{
  col: QrDotType[]
  isConfig?: boolean
}>()

const configClass = computed(() => {
  return props.isConfig ? 'gap-[2px]' : 'gap-[0px]'
})
</script>

<style scoped></style>
