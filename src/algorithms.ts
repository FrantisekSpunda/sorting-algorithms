export const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  return arr
}

export const insertionSort = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]

    let j = i - 1

    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = current
  }

  return arr
}

export const selectionSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j
    }
  }

  return arr
}

export const mergeSort = (arr: number[]) => {
  const mid = arr.length / 2

  if (arr.length < 2) {
    return arr
  }

  const left = arr.splice(0, mid)
  return merge(mergeSort(left), mergeSort(arr))
}

const merge = (left, right) => {
  let arr = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift())
    } else {
      arr.push(right.shift())
    }
  }

  return [...arr, ...left, ...right]
}

export function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return
  }

  let pivotIndex = partition(arr, left, right)
  quickSort(arr, left, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, right)

  return arr
}

function partition(arr, left, right) {
  let pivotValue = arr[right]
  let partitionIndex = left

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex)
      partitionIndex++
    }
  }

  swap(arr, right, partitionIndex)
  return partitionIndex
}

function swap(arr, firstIndex, secondIndex) {
  let temp = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = temp
}

export function quickSortCheatMode(arr) {
  if (arr.length <= 1) return arr
  let pivot = arr[0]
  let left = arr.filter((x) => x < pivot)
  let right = arr.filter((x) => x > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// radixSort
export function radixSort(arr) {
  let maxDigits = 0

  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, getNumberOfDigits(arr[i]))
  }

  for (let i = 0; i < maxDigits; i++) {
    let buckets = Array.from({ length: 10 }, () => [])

    for (let j = 0; j < arr.length; j++) {
      let digit = getDigit(arr[j], i)
      buckets[digit].push(arr[j])
    }

    arr = [].concat(...buckets)
  }

  return arr
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}

function getNumberOfDigits(num) {
  return Math.floor(Math.log10(Math.abs(num))) + 1
}
