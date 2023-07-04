import { type ListItem } from "./types/ListItem";

export function pickAPair(
  array: ListItem[],
  pairedItems: ListItem[][]
): ListItem[] | null {
  if (!array || array.length < 2) {
    return null;
  }

  if (pairedItems.length === calculateTotalComparisons(array.length)) {
    return null;
  }

  const pairedSet = new Set<string>();
  for (const [item1, item2] of pairedItems) {
    pairedSet.add(`${item1.id}-${item2.id}`);
    pairedSet.add(`${item2.id}-${item1.id}`);
  }

  // pickTwoRandomNumbers function will run until finding non-existen pair in pairedSet
  const pair = pickTwoRandomNumbers(array.length, pairedSet, array);

  return pair;
}

function pickTwoRandomNumbers(
  max: number,
  pairedSet: Set<string>,
  array: ListItem[]
): ListItem[] {
  const randomNumber1 = Math.floor(Math.random() * max);
  let randomNumber2 = Math.floor(Math.random() * max);

  // Make sure the second random number is different from the first
  while (randomNumber2 === randomNumber1) {
    randomNumber2 = Math.floor(Math.random() * max);
  }
  const item1 = array[randomNumber1];
  const item2 = array[randomNumber2];

  const pairKey1 = `${item1.id}-${item2.id}`;
  const pairKey2 = `${item2.id}-${item1.id}`;

  if (!pairedSet.has(pairKey1) && !pairedSet.has(pairKey2)) {
    return [item1, item2];
  }

  return pickTwoRandomNumbers(max, pairedSet, array);
}

export function calculateTotalComparisons(totalItems: number): number {
  if (totalItems < 2) {
    return 0; // If there are less than 2 items, no comparisons can be made
  }

  const numComparisons =
    factorial(totalItems) / (2 * factorial(totalItems - 2));
  return numComparisons;
}

function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}
