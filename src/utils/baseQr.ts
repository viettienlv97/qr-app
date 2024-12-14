const count = 21

const getColBorder = (colIndex: number, onlyTop: boolean = false) => {
  if (onlyTop) return colIndex < 7

  return colIndex < 7 || colIndex > 13
}

const getColDot = (colIndex: number, onlyTop: boolean = false) => {
  if (onlyTop) return colIndex === 0 || colIndex === 6

  return colIndex === 0 || colIndex === 6 || colIndex === 14 || colIndex === 20
}

const getColMiddle = (colIndex: number, onlyTop: boolean = false) => {
  if (onlyTop) return colIndex > 1 && colIndex < 5

  return (colIndex > 1 && colIndex < 5) || (colIndex > 15 && colIndex < 19)
}

export const isBlackDot = (rowIndex: number, colIndex: number) => {
  const borders = [0, 6, 14, 20]
  const dots = [1, 5, 15, 19]
  const middleRows = [2, 3, 4, 16, 17, 18]

  if (borders.includes(rowIndex)) {
    return getColBorder(colIndex, rowIndex >= 14)
  }
  if (dots.includes(rowIndex)) {
    return getColDot(colIndex, rowIndex >= 14)
  }
  if (middleRows.includes(rowIndex)) {
    return (
      getColDot(colIndex, rowIndex >= 14) ||
      getColMiddle(colIndex, rowIndex >= 14)
    )
  }
  return false
}

export const isDisabledChange = (rowIndex: number, colIndex: number) => {
  if (rowIndex < 8 && colIndex < 8) return true
  if (rowIndex < 8 && colIndex > 12) return true
  if (rowIndex > 12 && colIndex < 8) return true
  return false
}

export const base_qr = Array.from({ length: count }, (_, rowIndex) =>
  Array.from({ length: count }, (_, colIndex) => {
    let isBlack = false
    let disabled = false
    if (isBlackDot(rowIndex, colIndex)) {
      isBlack = true
      disabled = true
    }
    return {
      row: rowIndex,
      col: colIndex,
      isBlack,
      disabled
    }
  })
)

export type BaseQr = typeof base_qr
