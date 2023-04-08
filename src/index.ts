import { bubbleSort, insertionSort, mergeSort, quickSort, quickSortCheatMode, radixSort, selectionSort } from './algorithms.js'
import terminalTable from 'terminal-table-output'

const programStart = performance.now()
const arrayOfRandomNumbers = (length, maxNumber) =>
  Array(length)
    .fill(0)
    .map((v) => Math.floor(Math.random() * maxNumber))

const testingArrays = (maxLength) => {
  return Array(maxLength)
    .fill(0)
    .map((v, i) => arrayOfRandomNumbers(Math.pow(10, i), 1000))
}

const mesure = (func: (arr: number[]) => number[], arr: number[][]): { length: number; time: number }[] => {
  const responses = []

  arr.forEach((data, i) => {
    const start = performance.now()
    const res = func(data)
    const end = performance.now()

    console.log(res)
    responses.push(parseFloat((end - start).toFixed(5)) + 'ms')
  })

  return responses
}
const coeficient = 2

const table = terminalTable.create()
table
  .pushrow([
    'Funtion Name',
    ...Array(coeficient)
      .fill(0)
      .map((v, i) => Math.pow(10, i).toString()),
  ])
  .line()

const data = testingArrays(coeficient)
table.pushrow(['zero', ...mesure((arr: number[]) => arr, data)])
table.pushrow(['bubbleSort', ...mesure(bubbleSort, data)])
table.pushrow(['insertionSort', ...mesure(insertionSort, data)])
table.pushrow(['selectionSort', ...mesure(selectionSort, data)])
console.log('mergeSort')
table.pushrow(['mergeSort', ...mesure(mergeSort, data)])
console.log('quickSort')
table.pushrow(['quickSort', ...mesure(quickSort, data)])
console.log('quickSortCheatMode')
table.pushrow(['quickSortCheatMode', ...mesure(quickSortCheatMode, data)])
console.log('radixSort')
table.pushrow(['radixSort', ...mesure(radixSort, data)])

table.print(true)
const programEnd = performance.now()

console.log('Testings takes ' + (programEnd - programStart) + 'ms')
