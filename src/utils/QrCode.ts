import { isBlackDot, isDisabledChange } from './baseQr.ts'

export type QrDotType = {
  x: number
  y: number
  isBlackDot: boolean
  isDisabled: boolean
}

export type QrCodeType = QrDotType[][]


class QrCode {
  baseQr: QrCodeType

  constructor() {
    this.baseQr = generateQrCode()
  }

  getQrCode() {
    return this.baseQr
  }
}

const count = 21

const generateQrCode = () => {
  return Array.from({ length: count }, (_, rowIndex) =>
    Array.from({ length: count }, (_, colIndex) => {
      let isBlack = false
      let disabled = false
      if (isBlackDot(rowIndex, colIndex)) {
        isBlack = true
      }
      if (isDisabledChange(rowIndex, colIndex)) {
        disabled = true
      }
      return {
        x: rowIndex,
        y: colIndex,
        isBlackDot: isBlack,
        isDisabled: disabled
      }
    })
  )
}

export default QrCode