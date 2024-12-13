<template>
  <div
    class="w-full h-full"
    :class="isConfig ? 'py-10 px-0' : ''"
  >
    <Row
      :qr="qr"
      :isConfig="isConfig"
    />
  </div>
  <div class="w-full mt-5 px-5">
    <ElButton
      class="w-full"
      size="large"
      type="success"
      @click="isConfig = !isConfig"
    >
      Config
    </ElButton>
  </div>
  <div class="mt-5 px-5 flex justify-between">
    <ElButton
      @click="handleDrawQr"
      class="w-30"
      type="success"
      :disabled="isConfig"
    >
      Draw QR
    </ElButton>
    <ElButton
      @click="handleNewQr"
      class="w-30"
      type="danger"
      plain
    >
      New QR
    </ElButton>
  </div>
</template>

<script setup lang="ts">
// import jsQR from 'jsqr'
import jsQR from 'jsqr-es6'
import { onMounted, provide, ref } from 'vue'
import { base_qr } from '../utils/baseQr.ts'
import Row from './Row.vue'
import { ElButton } from 'element-plus'
import html2canvas from 'html2canvas'

const isConfig = ref<boolean>(false)

const handleNewQr = () => {
  localStorage.removeItem('qr')
  qr.value = base_qr
}
const baseQr = base_qr

const localQr = ref<string>(localStorage.getItem('qr') || '')

const qr = ref<{ col: number; row: number; isBlack: boolean, disabled: boolean }[][]>(baseQr)

const handleClick = (row: number, col: number) => {
  console.log({ row, col })
  if (!isConfig.value) return
  if (qr.value[row][col].disabled) return
  qr.value[row][col].isBlack = !qr.value[row][col].isBlack

  localStorage.setItem('qr', JSON.stringify(qr.value))
}

const handleDrawQr = () => {
  const qrWrapper = document.getElementById('qr-wrapper')
  if (!qrWrapper) return
  html2canvas(qrWrapper).then((canvas) => {
    const link = document.createElement('a')
    link.download = 'qr.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    console.log('code', code)
  })
}

onMounted(() => {
  console.log('localQr.value', localQr.value)
  if (localQr.value) {
    qr.value = JSON.parse(localQr.value)
  } else {
    qr.value = base_qr
  }
})
provide('handleClick', handleClick)
</script>

<style scoped></style>
