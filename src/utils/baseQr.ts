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

const isBlackDot = (rowIndex: number, colIndex: number) => {
  if (
    (rowIndex === 0 && getColBorder(colIndex)) ||
    (rowIndex === 1 && getColDot(colIndex)) ||
    (rowIndex === 2 && (getColDot(colIndex) || getColMiddle(colIndex))) ||
    (rowIndex === 3 && (getColDot(colIndex) || getColMiddle(colIndex))) ||
    (rowIndex === 4 && (getColDot(colIndex) || getColMiddle(colIndex))) ||
    (rowIndex === 5 && getColDot(colIndex)) ||
    (rowIndex === 6 && getColBorder(colIndex)) ||
    (rowIndex === 14 && getColBorder(colIndex, true)) ||
    (rowIndex === 15 && getColDot(colIndex, true)) ||
    (rowIndex === 16 &&
      (getColDot(colIndex, true) || getColMiddle(colIndex, true))) ||
    (rowIndex === 17 &&
      (getColDot(colIndex, true) || getColMiddle(colIndex, true))) ||
    (rowIndex === 18 &&
      (getColDot(colIndex, true) || getColMiddle(colIndex, true))) ||
    (rowIndex === 19 && getColDot(colIndex, true)) ||
    (rowIndex === 20 && getColBorder(colIndex, true))
  ) {
    return true
  }
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
