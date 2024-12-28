<template>
  <div
    @click="() => handleClick && handleClick(props.rowNum, props.colNum)"
    class="qr-box w-[13px] h-[13px]"
    :class="{ 'black-box': props.isBlack }"
  ></div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

type HandleClick = (row: number, col: number) => void
type Props = {
  colNum: number
  rowNum: number
  isBlack: boolean
}

const props = defineProps<Props>()
const handleClick = inject<HandleClick>('handleClick')
</script>

<style lang="scss" scoped>
.qr-box {
  background-color: white;
  // border: 1px solid #cacaca;
}

.black-box {
  background-color: black !important;
}
</style>
