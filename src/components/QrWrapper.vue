<template>
  <div
    class="w-full h-full"
  >
    <Row
      :qr="currentQr"
    />
  </div>
  <div class="w-full mt-5 px-5">
    <ElButton
      class="w-full"
      size="large"
      type="success"
      @click="isConfig = !isConfig"
    >
      {{ isConfig ? 'Save' : 'Config' }}
    </ElButton>
  </div>
  <div class="mt-5 px-5 flex justify-between">
    <ElButton
      @click="() => {}"
      disabled
      class="w-30"
      type="success"
    >
      Draw QR
    </ElButton>
    <ElButton
      @click="handleNewQr"
      class="w-30"
      type="danger"
      plain
      :disabled="isConfig"
    >
      New QR
    </ElButton>
  </div>

  <ElDialog
    v-model="isConfig"
    title="QR Code"
    width="100%"
  >
    <div class="w-full h-full">
      <RowDialog
        :qr="currentQr"
        :isConfig="isConfig"
      />
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
//lib
// import jsQR from 'jsqr-es6'
import { ElButton, ElDialog } from 'element-plus'
// import html2canvas from 'html2canvas'
//vue
import { onMounted, provide, ref } from 'vue'
import Row from './Row.vue'
import RowDialog from './RowDialog.vue'
//utils
import QrCode, { QrCodeType } from '../utils/QrCode.ts'

const localQr = () => {
  const qr = localStorage.getItem('qr')
  if (qr) {
    return JSON.parse(qr)
  }
  return null
}

const isConfig = ref<boolean>(false)

const currentQr = ref<QrCodeType>(localQr())

const handleNewQr = () => {
  const newQr = new QrCode().getQrCode()
  localStorage.setItem('qr', JSON.stringify(newQr))
  currentQr.value = newQr
}

const handleClick = (x: number, y: number) => {
  if (!isConfig.value) return
  if (currentQr.value[x][y].isDisabled) return
  currentQr.value[x][y].isBlackDot = !currentQr.value[x][y].isBlackDot

  localStorage.setItem('qr', JSON.stringify(currentQr.value))
}

// const handleDrawQr = () => {
//   const qrWrapper = document.getElementById('qr-wrapper')
//   if (!qrWrapper) return
//   html2canvas(qrWrapper).then((canvas) => {
//     const link = document.createElement('a')
//     link.download = 'qr.png'
//     link.href = canvas.toDataURL('image/png')
//     link.click()
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//     const code = jsQR(imageData.data, imageData.width, imageData.height)
//     console.log('code', code)
//   })
// }

onMounted(() => {
  if (localQr()) {
    currentQr.value = localQr()
  } else {
    handleNewQr()
  }
})
provide('handleClick', handleClick)
</script>

<style scoped></style>
