<template>
  <div
    class="flex flex-col gap-[0px]"
    :class="configClass"
  >
    <QrBox
      v-for="(box, index) in col"
      :key="index"
      :colNum="box.col"
      :rowNum="box.row"
      :isBlack="box.isBlack"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QrBox from './QrBox.vue'

const props = defineProps<{
  col: { col: number; row: number; isBlack: boolean }[]
  isConfig: boolean
}>()

const configClass = computed(() => {
  return props.isConfig ? 'gap-[2px]' : 'gap-[0px]'
})
</script>

<style scoped></style>
