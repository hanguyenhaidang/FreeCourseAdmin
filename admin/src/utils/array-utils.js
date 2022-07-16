export const getRandomItem = (arr, size) => {
  const max = arr.length;
  const randomIndex = Math.floor(Math.random() * max);
  return arr[randomIndex];
};
